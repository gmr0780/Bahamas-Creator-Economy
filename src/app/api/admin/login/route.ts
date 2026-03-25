import { NextRequest, NextResponse } from "next/server";
import { createToken } from "../../../../lib/auth";
import { rateLimit } from "../../../../lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (!rateLimit(ip, 10, 15 * 60 * 1000)) {
      return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
    }

    const { password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password." },
        { status: 401 }
      );
    }

    const token = await createToken();

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 500 }
    );
  }
}
