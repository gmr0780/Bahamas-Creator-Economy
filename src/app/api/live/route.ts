import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/db";
import { isAuthenticated } from "../../../lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const preview = request.nextUrl.searchParams.get("preview") === "true";
  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: ["youtubeVideoId", "liveEnabled", "streamSize"] } },
    });

    const raw: Record<string, string> = {};
    for (const s of settings) {
      raw[s.key] = s.value;
    }

    const liveEnabled = (raw.liveEnabled ?? "false") === "true";

    // In preview mode, admin can see the stream even when not live
    if (preview && !liveEnabled) {
      const isAdmin = await isAuthenticated();
      if (isAdmin) {
        return NextResponse.json({
          youtubeVideoId: raw.youtubeVideoId ?? "",
          liveEnabled: true,
          streamSize: raw.streamSize ?? "large",
          preview: true,
        });
      }
    }

    return NextResponse.json({
      youtubeVideoId: raw.youtubeVideoId ?? "",
      liveEnabled,
      streamSize: raw.streamSize ?? "large",
    });
  } catch (error) {
    console.error("Live settings error:", error);
    return NextResponse.json({ youtubeVideoId: "", liveEnabled: false });
  }
}
