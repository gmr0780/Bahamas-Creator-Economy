import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const guides = await prisma.guide.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ guides });
  } catch (error) {
    console.error("Guides fetch error:", error);
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 500 }
    );
  }
}
