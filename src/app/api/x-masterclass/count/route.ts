import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await prisma.xMasterclassRegistration.count();

    const openSetting = await prisma.setting.findUnique({
      where: { key: "xMasterclassRegistrationOpen" },
    });
    const open = (openSetting?.value ?? "false") === "true";

    return NextResponse.json({ count, open });
  } catch (error) {
    console.error("X Masterclass count error:", error);
    return NextResponse.json({ count: 0, open: false });
  }
}
