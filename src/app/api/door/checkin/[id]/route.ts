import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "../../../../../lib/db";

export const dynamic = "force-dynamic";

async function isDoorAuthenticated(): Promise<boolean> {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get("door_token")?.value;
  if (!token) return false;

  try {
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret);
    return payload.role === "door";
  } catch {
    return false;
  }
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isDoorAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const registration = await prisma.registration.findUnique({
      where: { id },
    });

    if (!registration) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (registration.status !== "approved") {
      return NextResponse.json({
        error: "Registration not approved",
        status: registration.status,
        fullName: registration.fullName,
      }, { status: 403 });
    }

    if (registration.checkedIn) {
      return NextResponse.json({
        alreadyCheckedIn: true,
        checkedInAt: registration.checkedInAt,
        fullName: registration.fullName,
      });
    }

    const updated = await prisma.registration.update({
      where: { id },
      data: {
        checkedIn: true,
        checkedInAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      fullName: updated.fullName,
      checkedIn: updated.checkedIn,
      checkedInAt: updated.checkedInAt,
    });
  } catch (error) {
    console.error("Door check-in error:", error);
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 500 }
    );
  }
}
