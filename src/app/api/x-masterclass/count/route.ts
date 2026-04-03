import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [countResult, openSetting] = await Promise.allSettled([
      prisma.xMasterclassRegistration.count(),
      prisma.setting.findUnique({
        where: { key: "xMasterclassRegistrationOpen" },
      }),
    ]);

    const count = countResult.status === "fulfilled" ? countResult.value : 0;
    const open =
      openSetting.status === "fulfilled"
        ? (openSetting.value?.value ?? "false") === "true"
        : false;

    if (countResult.status === "rejected") {
      console.error("X Masterclass count query failed:", countResult.reason);
    }

    return NextResponse.json({ count, open });
  } catch (error) {
    console.error("X Masterclass count error:", error);
    return NextResponse.json({ count: 0, open: false });
  }
}
