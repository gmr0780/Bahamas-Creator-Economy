import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "../../../../lib/db";

export const dynamic = "force-dynamic";

async function isDoorOrAdmin(): Promise<boolean> {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return false;
  const secret = new TextEncoder().encode(jwtSecret);
  const cookieStore = await cookies();

  for (const name of ["door_token", "admin_token"]) {
    const token = cookieStore.get(name)?.value;
    if (token) {
      try {
        const { payload } = await jwtVerify(token, secret);
        if (payload.role === "door" || payload.role === "admin") return true;
      } catch {
        /* invalid */
      }
    }
  }
  return false;
}

export async function GET(request: NextRequest) {
  if (!(await isDoorOrAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const registrations = await prisma.registration.findMany({
      where: {
        OR: [
          { fullName: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
          { handle: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        handle: true,
        platform: true,
        status: true,
        checkedIn: true,
      },
      take: 10,
      orderBy: { fullName: "asc" },
    });

    return NextResponse.json({ results: registrations });
  } catch (error) {
    console.error("Door search error:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
