'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Analytics {
  totalViews: number;
  todayViews: number;
  weekViews: number;
  uniqueVisitors: number;
  todayUniqueVisitors: number;
  topPages: { path: string; views: number }[];
  topReferrers: { source: string; count: number }[];
  topIps: { ip: string; views: number }[];
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then((r) => {
        if (r.status === 401) {
          router.push('/admin');
          return null;
        }
        return r.json();
      })
      .then((json) => {
        if (json) setData(json);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-aqua border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 bg-navy/80 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-aqua/60">
              242Creators
            </span>
            <span className="text-white/30">|</span>
            <span className="text-sm font-semibold text-white">Analytics</span>
          </div>
          <Link
            href="/admin/dashboard"
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/80 transition-colors hover:border-aqua/30 hover:text-aqua"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { label: 'Total Views', value: data?.totalViews ?? 0, color: 'text-white' },
            { label: 'Today Views', value: data?.todayViews ?? 0, color: 'text-aqua' },
            { label: 'Last 7 Days', value: data?.weekViews ?? 0, color: 'text-coral' },
            { label: 'Unique Visitors', value: data?.uniqueVisitors ?? 0, color: 'text-green-400' },
            { label: 'Today Unique', value: data?.todayUniqueVisitors ?? 0, color: 'text-yellow-400' },
          ].map((stat) => (
            <div key={stat.label} className="glass-dark rounded-xl px-6 py-5 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-sand/60 mb-2">
                {stat.label}
              </p>
              <p className={`text-4xl font-extrabold ${stat.color}`}>
                {stat.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Pages */}
          <div className="glass-dark rounded-xl p-6">
            <h3 className="mb-4 text-lg font-bold text-white">Top Pages</h3>
            {data?.topPages && data.topPages.length > 0 ? (
              <div className="space-y-3">
                {data.topPages.map((p, i) => (
                  <div key={p.path} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aqua/20 text-xs font-bold text-aqua">
                        {i + 1}
                      </span>
                      <span className="text-sm text-sand font-medium">{p.path}</span>
                    </div>
                    <span className="text-sm font-bold text-white">{p.views.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-sand/50">No data yet. Views will appear as visitors browse the site.</p>
            )}
          </div>

          {/* Top Referrers */}
          <div className="glass-dark rounded-xl p-6">
            <h3 className="mb-4 text-lg font-bold text-white">Top Referrers</h3>
            {data?.topReferrers && data.topReferrers.length > 0 ? (
              <div className="space-y-3">
                {data.topReferrers.map((r, i) => (
                  <div key={r.source} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral/20 text-xs font-bold text-coral">
                        {i + 1}
                      </span>
                      <span className="text-sm text-sand font-medium">{r.source}</span>
                    </div>
                    <span className="text-sm font-bold text-white">{r.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-sand/50">No referrer data yet. This shows where your traffic comes from.</p>
            )}
          </div>
        </div>

        {/* Top IPs */}
        <div className="mt-6 glass-dark rounded-xl p-6">
          <h3 className="mb-4 text-lg font-bold text-white">Top IP Addresses</h3>
          {data?.topIps && data.topIps.length > 0 ? (
            <div className="space-y-3">
              {data.topIps.map((ip, i) => (
                <div key={ip.ip} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-xs font-bold text-green-400">
                      {i + 1}
                    </span>
                    <span className="text-sm text-sand font-mono">{ip.ip}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{ip.views.toLocaleString()} views</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-sand/50">No IP data yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
