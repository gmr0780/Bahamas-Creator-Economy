import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";
import { rateLimit } from "../../../lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
    if (!rateLimit(ip, 30, 60 * 1000)) {
      return NextResponse.json({ ok: true }); // silent rate limit
    }

    const { path, referrer } = await req.json();
    const userAgent = req.headers.get("user-agent") || "";

    await prisma.pageView.create({
      data: {
        path: path || "/",
        referrer: referrer || "",
        userAgent: userAgent.slice(0, 500),
        ip,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // fail silently
  }
}
