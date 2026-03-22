import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { path, referrer } = await req.json();
    const userAgent = req.headers.get("user-agent") || "";

    await prisma.pageView.create({
      data: {
        path: path || "/",
        referrer: referrer || "",
        userAgent: userAgent.slice(0, 500),
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // fail silently
  }
}
