import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { rateLimit } from "../../../../lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (!rateLimit(ip, 5, 15 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
    }

    const { password } = await request.json();
    const doorPassword = process.env.DOOR_PASSWORD;

    if (!doorPassword || password !== doorPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }
    const secret = new TextEncoder().encode(jwtSecret);
    const token = await new SignJWT({ role: "door" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set("door_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Door login error:", error);
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 500 }
    );
  }
}
