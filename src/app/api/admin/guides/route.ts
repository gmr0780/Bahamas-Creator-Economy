import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { isAuthenticated } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const guides = await prisma.guide.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ guides });
  } catch (error) {
    console.error("Admin guides fetch error:", error);
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug, title, subtitle, icon, order, published, content } = body;

    if (!slug || !title) {
      return NextResponse.json(
        { error: "Slug and title are required." },
        { status: 400 }
      );
    }

    const guide = await prisma.guide.create({
      data: {
        slug,
        title,
        subtitle: subtitle ?? "",
        icon: icon ?? "",
        order: order ?? 0,
        published: published ?? false,
        content: content ?? "",
      },
    });

    return NextResponse.json(guide, { status: 201 });
  } catch (error) {
    console.error("Guide create error:", error);
    return NextResponse.json(
      { error: "Failed to create guide." },
      { status: 500 }
    );
  }
}
