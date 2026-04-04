import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { isAuthenticated } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pixels = await prisma.emailPixel.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        opens: {
          orderBy: { createdAt: "desc" },
          take: 50,
        },
        _count: { select: { opens: true } },
      },
    });

    return NextResponse.json({ pixels });
  } catch (error) {
    console.error("Pixels error:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug, label } = await request.json();

    if (!slug || !label) {
      return NextResponse.json(
        { error: "Slug and label are required." },
        { status: 400 }
      );
    }

    // Sanitize slug
    const cleanSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const pixel = await prisma.emailPixel.create({
      data: { slug: cleanSlug, label },
    });

    return NextResponse.json({ pixel });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A pixel with that slug already exists." },
        { status: 400 }
      );
    }
    console.error("Create pixel error:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
