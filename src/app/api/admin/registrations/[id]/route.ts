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
    const { status } = await request.json();

    if (!["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be approved, rejected, or pending." },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(registration);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Registration not found or update failed." },
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

    await prisma.registration.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Registration not found or delete failed." },
      { status: 404 }
    );
  }
}
