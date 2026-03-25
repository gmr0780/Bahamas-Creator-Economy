import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "../../../../lib/db";

export const dynamic = "force-dynamic";

async function hasStaffAccess(): Promise<boolean> {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return false;
  const secret = new TextEncoder().encode(jwtSecret);
  const cookieStore = await cookies();

  const doorToken = cookieStore.get("door_token")?.value;
  if (doorToken) {
    try {
      await jwtVerify(doorToken, secret);
      return true;
    } catch { /* invalid */ }
  }

  const adminToken = cookieStore.get("admin_token")?.value;
  if (adminToken) {
    try {
      await jwtVerify(adminToken, secret);
      return true;
    } catch { /* invalid */ }
  }

  return false;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const registration = await prisma.registration.findUnique({
      where: { id },
      select: {
        fullName: true,
        platform: true,
        handle: true,
        status: true,
        checkedIn: true,
        checkedInAt: true,
      },
    });

    if (!registration) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const staff = await hasStaffAccess();

    if (staff) {
      return NextResponse.json(registration);
    }

    // Unauthenticated: return only minimal info, no PII
    return NextResponse.json({
      valid: true,
      checkedIn: registration.checkedIn,
    });
  } catch (error) {
    console.error("Check-in lookup error:", error);
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 500 }
    );
  }
}
