import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { isAuthenticated } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { handle: { contains: search, mode: "insensitive" } },
      ];
    }

    const [registrations, total, totalAll, approved, pending, rejected, capSetting] = await Promise.all([
      prisma.registration.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.registration.count({ where }),
      prisma.registration.count(),
      prisma.registration.count({ where: { status: "approved" } }),
      prisma.registration.count({ where: { status: "pending" } }),
      prisma.registration.count({ where: { status: "rejected" } }),
      prisma.setting.findUnique({ where: { key: "registration_cap" } }),
    ]);

    const cap = parseInt(capSetting?.value ?? "400", 10);

    return NextResponse.json({
      registrations,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: {
        total: totalAll,
        approved,
        pending,
        rejected,
        cap,
      },
    });
  } catch (error) {
    console.error("Registrations error:", error);
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 500 }
    );
  }
}
