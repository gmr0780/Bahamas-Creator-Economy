import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { isAuthenticated } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [totalViews, todayViews, weekViews, topPages, recentReferrers] =
    await Promise.all([
      prisma.pageView.count(),
      prisma.pageView.count({
        where: { createdAt: { gte: today } },
      }),
      prisma.pageView.count({
        where: { createdAt: { gte: weekAgo } },
      }),
      prisma.pageView.groupBy({
        by: ["path"],
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 10,
      }),
      prisma.pageView.findMany({
        where: {
          referrer: { not: "" },
        },
        select: { referrer: true },
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
    ]);

  // Count unique referrers
  const referrerCounts: Record<string, number> = {};
  for (const r of recentReferrers) {
    try {
      const host = new URL(r.referrer).hostname;
      referrerCounts[host] = (referrerCounts[host] || 0) + 1;
    } catch {
      referrerCounts[r.referrer] = (referrerCounts[r.referrer] || 0) + 1;
    }
  }
  const topReferrers = Object.entries(referrerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([source, count]) => ({ source, count }));

  return NextResponse.json({
    totalViews,
    todayViews,
    weekViews,
    topPages: topPages.map((p) => ({ path: p.path, views: p._count.path })),
    topReferrers,
  });
}
