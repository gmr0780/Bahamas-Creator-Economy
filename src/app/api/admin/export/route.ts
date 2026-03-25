import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { isAuthenticated } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

function escapeCsv(value: string): string {
  // Prevent formula injection in Excel/Sheets
  let safe = value;
  if (/^[=+\-@\t\r]/.test(safe)) {
    safe = "'" + safe;
  }
  if (safe.includes(",") || safe.includes('"') || safe.includes("\n")) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "Platform",
      "Handle",
      "Followers",
      "Niche",
      "Monetization",
      "Topics",
      "Status",
      "Registered At",
    ];

    const rows = registrations.map((r) =>
      [
        escapeCsv(r.fullName),
        escapeCsv(r.email),
        escapeCsv(r.phone ?? ""),
        escapeCsv(r.platform),
        escapeCsv(r.handle),
        escapeCsv(String(r.followers)),
        escapeCsv(r.niche),
        escapeCsv(r.monetization ?? ""),
        escapeCsv((r.topics ?? []).join("; ")),
        escapeCsv(r.status),
        escapeCsv(r.createdAt.toISOString()),
      ].join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          'attachment; filename="registrations.csv"',
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "An error occurred." },
      { status: 500 }
    );
  }
}
