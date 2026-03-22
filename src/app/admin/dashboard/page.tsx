'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  platform: string;
  handle: string;
  followers: string;
  niche: string;
  monetization: string;
  topics: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardData {
  registrations: Registration[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  stats: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
    cap: number;
  };
}

const STATUSES = ['pending', 'approved', 'rejected'] as const;
type Status = (typeof STATUSES)[number];

const STATUS_COLORS: Record<Status, string> = {
  approved: 'bg-green-500/20 text-green-400 border-green-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
};

function nextStatus(current: string): Status {
  if (current === 'pending') return 'approved';
  if (current === 'approved') return 'rejected';
  return 'pending';
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | Status>('all');
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: '20',
      });
      if (search) params.set('search', search);
      if (filter !== 'all') params.set('status', filter);

      const res = await fetch(`/api/admin/registrations?${params}`);
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch {
      // network error — stay on page, data remains stale
    } finally {
      setLoading(false);
    }
  }, [page, search, filter, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Debounce search
  useEffect(() => {
    setPage(1);
  }, [search, filter]);

  async function handleStatusChange(id: string, currentStatus: string) {
    const newStatus = nextStatus(currentStatus);
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      if (res.ok) {
        await fetchData();
      }
    } catch {
      // silently fail
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, { method: 'DELETE' });
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      if (res.ok) {
        setDeleteConfirm(null);
        await fetchData();
      }
    } catch {
      // silently fail
    } finally {
      setDeletingId(null);
    }
  }

  function handleLogout() {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin');
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-aqua border-t-transparent" />
          <p className="text-sm text-sand/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats ?? { total: 0, approved: 0, pending: 0, rejected: 0, cap: 400 };
  const registrations = data?.registrations ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="min-h-screen">
      {/* Admin header */}
      <header className="border-b border-white/10 bg-navy/80 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-aqua/60">
              242Creators
            </span>
            <span className="text-white/30">|</span>
            <span className="text-sm font-semibold text-white">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/analytics"
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/80 transition-colors hover:border-aqua/30 hover:text-aqua"
            >
              Analytics
            </Link>
            <Link
              href="/admin/guides"
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/80 transition-colors hover:border-aqua/30 hover:text-aqua"
            >
              Guides
            </Link>
            <Link
              href="/admin/settings"
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/80 transition-colors hover:border-aqua/30 hover:text-aqua"
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/80 transition-colors hover:border-coral/30 hover:text-coral"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Stats bar */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { label: 'Total', value: stats.total, color: 'text-white' },
            { label: 'Approved', value: stats.approved, color: 'text-green-400' },
            { label: 'Pending', value: stats.pending, color: 'text-yellow-400' },
            { label: 'Rejected', value: stats.rejected, color: 'text-red-400' },
            { label: 'Spots Left', value: stats.cap - stats.total, color: 'text-aqua' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-dark rounded-xl px-4 py-3 text-center"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-sand/50">
                {stat.label}
              </p>
              <p className={`mt-1 text-2xl font-extrabold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Search + filters + export */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <input
              type="text"
              placeholder="Search name, email, or handle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-sm text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15 sm:max-w-xs"
            />

            {/* Filter buttons */}
            <div className="flex gap-2">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                    filter === f
                      ? 'bg-aqua/20 text-aqua border border-aqua/30'
                      : 'border border-white/10 text-sand/60 hover:border-white/20 hover:text-sand'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Export */}
          <a
            href="/api/admin/export"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-sand/80 transition-colors hover:border-aqua/30 hover:text-aqua"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </a>
        </div>

        {/* Table */}
        <div className="glass-dark overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Name
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Email
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Platform
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Handle
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Followers
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Status
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Date
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-sand/40">
                      {search || filter !== 'all'
                        ? 'No registrations match your filters.'
                        : 'No registrations yet.'}
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr
                      key={reg.id}
                      className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3 font-medium text-white">
                        {reg.fullName}
                      </td>
                      <td className="px-4 py-3 text-sand/70">{reg.email}</td>
                      <td className="px-4 py-3 text-sand/70">{reg.platform}</td>
                      <td className="px-4 py-3 text-sand/70">@{reg.handle}</td>
                      <td className="px-4 py-3 text-sand/70">{reg.followers}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleStatusChange(reg.id, reg.status)}
                          disabled={updatingId === reg.id}
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold capitalize transition-all hover:opacity-80 disabled:opacity-40 ${
                            STATUS_COLORS[reg.status as Status] ?? STATUS_COLORS.pending
                          }`}
                        >
                          {updatingId === reg.id ? (
                            <span className="inline-block h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
                          ) : (
                            reg.status
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-sand/50 whitespace-nowrap">
                        {new Date(reg.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3">
                        {deleteConfirm === reg.id ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDelete(reg.id)}
                              disabled={deletingId === reg.id}
                              className="rounded-lg bg-red-500/20 border border-red-500/30 px-3 py-1 text-xs font-bold text-red-400 transition-colors hover:bg-red-500/30 disabled:opacity-40"
                            >
                              {deletingId === reg.id ? 'Deleting...' : 'Confirm'}
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="rounded-lg border border-white/10 px-3 py-1 text-xs font-bold text-sand/60 transition-colors hover:text-sand"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(reg.id)}
                            className="rounded-lg border border-white/10 px-3 py-1 text-xs font-bold text-sand/60 transition-colors hover:border-red-500/30 hover:text-red-400"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-sand/40">
              Page {page} of {totalPages} ({data?.total ?? 0} total)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/60 transition-colors hover:border-white/20 hover:text-sand disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/60 transition-colors hover:border-white/20 hover:text-sand disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
