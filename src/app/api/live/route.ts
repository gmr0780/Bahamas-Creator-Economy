import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: ["youtubeVideoId", "liveEnabled"] } },
    });

    const raw: Record<string, string> = {};
    for (const s of settings) {
      raw[s.key] = s.value;
    }

    return NextResponse.json({
      youtubeVideoId: raw.youtubeVideoId ?? "",
      liveEnabled: (raw.liveEnabled ?? "false") === "true",
    });
  } catch (error) {
    console.error("Live settings error:", error);
    return NextResponse.json({ youtubeVideoId: "", liveEnabled: false });
  }
}
