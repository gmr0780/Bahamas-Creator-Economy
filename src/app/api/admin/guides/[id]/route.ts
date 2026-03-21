import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/db";
import { isAuthenticated } from "../../../../../lib/auth";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const data: Record<string, unknown> = {};
    if (body.slug !== undefined) data.slug = body.slug;
    if (body.title !== undefined) data.title = body.title;
    if (body.subtitle !== undefined) data.subtitle = body.subtitle;
    if (body.icon !== undefined) data.icon = body.icon;
    if (body.order !== undefined) data.order = body.order;
    if (body.published !== undefined) data.published = body.published;
    if (body.content !== undefined) data.content = body.content;

    const guide = await prisma.guide.update({
      where: { id },
      data,
    });

    return NextResponse.json(guide);
  } catch (error) {
    console.error("Guide update error:", error);
    return NextResponse.json(
      { error: "Guide not found or update failed." },
      { status: 404 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    await prisma.guide.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Guide delete error:", error);
    return NextResponse.json(
      { error: "Guide not found or delete failed." },
      { status: 404 }
    );
  }
}
