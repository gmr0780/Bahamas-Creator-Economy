import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/db";
import { sendConfirmationEmail } from "../../../lib/email";
import { rateLimit } from "../../../lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (!rateLimit(ip, 10, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.findFirst({
      where: { email: { equals: email.trim(), mode: "insensitive" } },
      select: { id: true, fullName: true, email: true },
    });

    // Always return success to prevent email enumeration
    if (!registration) {
      return NextResponse.json({
        success: true,
        message:
          "If that email is registered, you will receive your check-in details shortly.",
      });
    }

    // Re-send the confirmation email with QR code
    await sendConfirmationEmail({
      to: registration.email,
      fullName: registration.fullName,
      registrationId: registration.id,
    });

    return NextResponse.json({
      success: true,
      message:
        "If that email is registered, you will receive your check-in details shortly.",
    });
  } catch (error) {
    console.error("Retrieve error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
