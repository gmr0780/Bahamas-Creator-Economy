import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { isAuthenticated } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await prisma.setting.findMany();
    const raw: Record<string, string> = {};
    for (const s of settings) {
      raw[s.key] = s.value;
    }

    return NextResponse.json({
      registrationCap: parseInt(raw.registrationCap ?? raw.registration_cap ?? "400", 10),
      vipCap: parseInt(raw.vipCap ?? "100", 10),
      registrationOpen: (raw.registrationOpen ?? raw.registration_open ?? "true") === "true",
      youtubeVideoId: raw.youtubeVideoId ?? "",
      liveEnabled: (raw.liveEnabled ?? "false") === "true",
      streamSize: raw.streamSize ?? "large",
    });
  } catch (error) {
    console.error("Settings error:", error);
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Map camelCase <-> snake_case so both formats stay in sync
    const KEY_ALIASES: Record<string, string> = {
      registrationCap: 'registration_cap',
      registration_cap: 'registrationCap',
      registrationOpen: 'registration_open',
      registration_open: 'registrationOpen',
    };
    const ALLOWED_KEYS = new Set(['registrationCap', 'registration_cap', 'registrationOpen', 'registration_open', 'vipCap', 'youtubeVideoId', 'liveEnabled', 'streamSize']);

    for (const [key, value] of Object.entries(body)) {
      if (!ALLOWED_KEYS.has(key)) continue;
      const strValue = String(value);

      // Write the key itself
      await prisma.setting.upsert({
        where: { key },
        update: { value: strValue },
        create: { key, value: strValue },
      });

      // Also write its alias so snake_case and camelCase stay in sync
      const alias = KEY_ALIASES[key];
      if (alias) {
        await prisma.setting.upsert({
          where: { key: alias },
          update: { value: strValue },
          create: { key: alias, value: strValue },
        });
      }
    }

    const settings = await prisma.setting.findMany();
    const result: Record<string, string> = {};
    for (const s of settings) {
      result[s.key] = s.value;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 500 }
    );
  }
}
