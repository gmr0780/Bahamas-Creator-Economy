import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { rateLimit } from "../../../../lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (!rateLimit(ip, 30, 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }

    const count = await prisma.registration.count({ where: { source: "website" } });

    const capSetting = await prisma.setting.findUnique({
      where: { key: "registration_cap" },
    });
    const cap = parseInt(capSetting?.value ?? "400", 10);

    const openSetting = await prisma.setting.findUnique({
      where: { key: "registration_open" },
    });
    const open = (openSetting?.value ?? "true") === "true";

    return NextResponse.json({ count, cap, open });
  } catch (error) {
    console.error("Count error:", error);
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 500 }
    );
  }
}
