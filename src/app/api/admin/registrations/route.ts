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
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 100);
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

    const [registrations, total, totalAll, websiteCount, vipCount, checkedIn, capSetting] = await Promise.all([
      prisma.registration.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.registration.count({ where }),
      prisma.registration.count(),
      prisma.registration.count({ where: { source: "website" } }),
      prisma.registration.count({ where: { source: "vip" } }),
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
        website: websiteCount,
        vip: vipCount,
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
    const MAX_LENGTH = 200;
    function trimStr(val: unknown): string {
      return typeof val === "string" ? val.trim().slice(0, MAX_LENGTH) : "";
    }

    const body = await request.json();

    const fullName = trimStr(body.fullName);
    const email = trimStr(body.email);
    const phone = trimStr(body.phone);
    const platform = trimStr(body.platform);
    const handle = trimStr(body.handle);
    const followers = trimStr(body.followers);
    const niche = trimStr(body.niche);
    const monetization = trimStr(body.monetization);
    const topics = body.topics;
    const sendEmail = body.sendEmail;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
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
        source: "vip",
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
