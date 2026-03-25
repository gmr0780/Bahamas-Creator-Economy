import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return NextResponse.json({ isDoorStaff: false });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("door_token")?.value;
  if (!token) {
    return NextResponse.json({ isDoorStaff: false });
  }

  try {
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret);
    return NextResponse.json({ isDoorStaff: payload.role === "door" });
  } catch {
    return NextResponse.json({ isDoorStaff: false });
  }
}
