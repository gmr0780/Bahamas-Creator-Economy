import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { isAuthenticated } from "../../../../lib/auth";
import { sendConfirmationEmail } from "../../../../lib/email";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { handle: { contains: search, mode: "insensitive" } },
      ];
    }

    const [registrations, total, totalAll, approved, pending, rejected, checkedIn, capSetting] = await Promise.all([
      prisma.registration.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.registration.count({ where }),
      prisma.registration.count(),
      prisma.registration.count({ where: { status: "approved" } }),
      prisma.registration.count({ where: { status: "pending" } }),
      prisma.registration.count({ where: { status: "rejected" } }),
      prisma.registration.count({ where: { checkedIn: true } }),
      prisma.setting.findUnique({ where: { key: "registration_cap" } }),
    ]);

    const cap = parseInt(capSetting?.value ?? "400", 10);

    return NextResponse.json({
      registrations,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: {
        total: totalAll,
        approved,
        pending,
        rejected,
        checkedIn,
        cap,
      },
    });
  } catch (error) {
    console.error("Registrations error:", error);
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      platform,
      handle,
      followers,
      niche,
      monetization,
      topics,
      sendEmail,
    } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existing = await prisma.registration.findUnique({
      where: { email },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A registration with this email already exists." },
        { status: 409 }
      );
    }

    // Admin-added registrations are auto-approved and bypass the cap
    const registration = await prisma.registration.create({
      data: {
        fullName,
        email,
        phone: phone ?? "",
        platform: platform ?? "",
        handle: handle ?? "",
        followers: followers ?? "",
        niche: niche ?? "",
        monetization: monetization ?? "",
        topics: topics ?? [],
        status: "approved",
      },
    });

    // Send confirmation email with QR code if requested
    if (sendEmail) {
      await sendConfirmationEmail({
        to: email,
        fullName,
        registrationId: registration.id,
      });
    }

    return NextResponse.json({ registration }, { status: 201 });
  } catch (error) {
    console.error("Admin add registration error:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the registration." },
      { status: 500 }
    );
  }
}
