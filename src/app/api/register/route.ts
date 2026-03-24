import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/db";
import { sendConfirmationEmail } from "../../../lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if registration is open
    const openSetting = await prisma.setting.findUnique({
      where: { key: "registration_open" },
    });
    const isOpen = (openSetting?.value ?? "true") === "true";

    if (!isOpen) {
      return NextResponse.json(
        { error: "Registration is currently closed." },
        { status: 400 }
      );
    }

    // Check cap
    const capSetting = await prisma.setting.findUnique({
      where: { key: "registration_cap" },
    });
    const cap = parseInt(capSetting?.value ?? "400", 10);
    const count = await prisma.registration.count({ where: { source: "website" } });

    if (count >= cap) {
      return NextResponse.json(
        { error: "Registration is full. All spots have been taken." },
        { status: 400 }
      );
    }

    // Check duplicate email
    const existing = await prisma.registration.findFirst({
      where: { email: body.email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "This email has already been registered." },
        { status: 400 }
      );
    }

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        platform: body.platform,
        handle: body.handle,
        followers: body.followers,
        niche: body.niche,
        monetization: body.monetization,
        topics: body.topics ?? [],
        status: "pending",
      },
    });

    // Send confirmation email (non-blocking)
    sendConfirmationEmail({
      to: body.email,
      fullName: body.fullName,
      registrationId: registration.id,
    }).catch((err) => console.error("Email failed:", err));

    return NextResponse.json({
      success: true,
      count: count + 1,
      cap,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration." },
      { status: 500 }
    );
  }
}
