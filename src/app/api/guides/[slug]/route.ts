import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const guide = await prisma.guide.findUnique({
      where: { slug, published: true },
    });

    if (!guide) {
      return NextResponse.json(
        { error: "Guide not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(guide);
  } catch (error) {
    console.error("Guide fetch error:", error);
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 500 }
    );
  }
}
