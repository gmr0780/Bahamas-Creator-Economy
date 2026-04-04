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
  source: string;
  checkedIn: boolean;
  checkedInAt: string | null;
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
    website: number;
    vip: number;
    checkedIn: number;
    cap: number;
  };
}

const PLATFORMS = ['YouTube', 'TikTok', 'Instagram', 'Twitch', 'X/Twitter', 'Facebook', 'Other'];
const FOLLOWER_RANGES = ['Under 1K', '1K-10K', '10K-50K', '50K-100K', '100K-500K', '500K+'];
const NICHES = ['Finance/Investing', 'Business', 'Technology', 'Entertainment', 'Lifestyle', 'Food/Travel', 'Education', 'Music', 'Sports', 'Other'];
const MONETIZATION_STATUSES = ['Not yet earning', 'Earning under $500/mo', 'Earning $500-2000/mo', 'Earning $2000+/mo'];

const STATUSES = ['pending', 'approved'] as const;
type Status = (typeof STATUSES)[number];

const STATUS_COLORS: Record<Status, string> = {
  approved: 'bg-green-500/20 text-green-400 border-green-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

function nextStatus(current: string): Status | null {
  if (current === 'pending') return 'approved';
  return null;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filter, setFilter] = useState<'all' | Status>('all');
  const [checkedInFilter, setCheckedInFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [editEmailValue, setEditEmailValue] = useState('');
  const [savingEmail, setSavingEmail] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Add Registration modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    platform: '',
    handle: '',
    followers: '',
    niche: '',
    monetization: '',
    sendEmail: true,
  });
  const [addSubmitting, setAddSubmitting] = useState(false);
  const [addError, setAddError] = useState('');

  // Blast email state
  const [blastStatus, setBlastStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [blastResult, setBlastResult] = useState('');
  const [blastTestEmail, setBlastTestEmail] = useState('');
  const [showBlastModal, setShowBlastModal] = useState(false);

  async function handleBlast(testEmail?: string) {
    setBlastStatus('sending');
    setBlastResult('');
    try {
      const url = testEmail
        ? `/api/admin/blast-conference?test=${encodeURIComponent(testEmail)}`
        : '/api/admin/blast-conference';
      const res = await fetch(url, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setBlastStatus('error');
        setBlastResult(data.error || 'Failed to send.');
        return;
      }
      setBlastStatus('done');
      setBlastResult(`Sent: ${data.sent} | Failed: ${data.failed} | Total: ${data.total}`);
    } catch {
      setBlastStatus('error');
      setBlastResult('Network error. Try again.');
    }
  }

  const fetchData = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: '20',
      });
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (filter !== 'all') params.set('status', filter);
      if (checkedInFilter !== 'all') params.set('checkedIn', checkedInFilter === 'yes' ? 'true' : 'false');

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
  }, [page, debouncedSearch, filter, checkedInFilter, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Debounce search: update debouncedSearch 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filter, checkedInFilter]);

  async function handleStatusChange(id: string, currentStatus: string) {
    const newStatus = nextStatus(currentStatus);
    if (!newStatus) return;
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

  async function handleSaveEmail(id: string) {
    setSavingEmail(true);
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: editEmailValue }),
      });
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      if (res.ok) {
        setEditingEmail(null);
        await fetchData();
      }
    } catch {
      // silently fail
    } finally {
      setSavingEmail(false);
    }
  }

  function handleLogout() {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin');
  }

  async function handleAddRegistration(e: React.FormEvent) {
    e.preventDefault();
    setAddSubmitting(true);
    setAddError('');
    try {
      const res = await fetch('/api/admin/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...addForm,
          topics: [],
        }),
      });
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setAddError(data.error || 'Failed to add registration.');
        return;
      }
      // Success: close modal, reset form, refresh data
      setShowAddModal(false);
      setAddForm({
        fullName: '',
        email: '',
        phone: '',
        platform: '',
        handle: '',
        followers: '',
        niche: '',
        monetization: '',
        sendEmail: true,
      });
      await fetchData();
    } catch {
      setAddError('Something went wrong. Please try again.');
    } finally {
      setAddSubmitting(false);
    }
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

  const stats = data?.stats ?? { total: 0, website: 0, vip: 0, checkedIn: 0, cap: 400 };
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
              href="/admin/x-masterclass"
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/80 transition-colors hover:border-aqua/30 hover:text-aqua"
            >
              X Masterclass
            </Link>
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
            { label: 'Online', value: stats.website, color: 'text-aqua' },
            { label: 'VIP', value: stats.vip, color: 'text-coral' },
            { label: 'Checked In', value: stats.checkedIn, color: 'text-green-400' },
            { label: 'Online Spots Left', value: stats.cap - stats.website, color: 'text-yellow-400' },
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

            {/* Checked-in filter */}
            <div className="flex gap-1.5">
              {(['all', 'yes', 'no'] as const).map((val) => (
                <button
                  key={val}
                  onClick={() => setCheckedInFilter(val)}
                  className={`rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
                    checkedInFilter === val
                      ? val === 'yes'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : val === 'no'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-white/10 text-white border border-white/20'
                      : 'border border-white/10 text-sand/50 hover:text-sand/80'
                  }`}
                >
                  {val === 'all' ? 'All' : val === 'yes' ? 'Checked In' : 'Not Checked In'}
                </button>
              ))}
            </div>
          </div>

          {/* Add Registration + Export */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setShowBlastModal(true); setBlastStatus('idle'); setBlastResult(''); }}
              className="inline-flex items-center gap-2 rounded-lg border border-coral/30 bg-coral/10 px-4 py-2 text-xs font-semibold text-coral transition-colors hover:bg-coral/20"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Blast
            </button>
            <button
              onClick={() => { setShowAddModal(true); setAddError(''); }}
              className="inline-flex items-center gap-2 rounded-lg border border-aqua/30 bg-aqua/10 px-4 py-2 text-xs font-semibold text-aqua transition-colors hover:bg-aqua/20"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Registration
            </button>
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
                    Date
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">
                    Checked In
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
                        <span className="flex items-center gap-2">
                          {reg.fullName}
                          {reg.source === 'vip' && (
                            <span className="inline-block rounded-full bg-coral/20 border border-coral/30 px-2 py-0.5 text-[10px] font-bold text-coral uppercase">VIP</span>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sand/70">
                        {editingEmail === reg.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="email"
                              value={editEmailValue}
                              onChange={(e) => setEditEmailValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveEmail(reg.id);
                                if (e.key === 'Escape') setEditingEmail(null);
                              }}
                              autoFocus
                              className="w-full min-w-[180px] rounded-lg border border-aqua/40 bg-white/[0.08] px-2 py-1 text-xs text-white outline-none focus:ring-1 focus:ring-aqua/30"
                            />
                            <button
                              onClick={() => handleSaveEmail(reg.id)}
                              disabled={savingEmail}
                              className="rounded-md bg-aqua/20 border border-aqua/30 px-2 py-1 text-[10px] font-bold text-aqua hover:bg-aqua/30 disabled:opacity-40"
                            >
                              {savingEmail ? '...' : 'Save'}
                            </button>
                            <button
                              onClick={() => setEditingEmail(null)}
                              className="rounded-md border border-white/10 px-2 py-1 text-[10px] font-bold text-sand/50 hover:text-sand"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span
                            onClick={() => { setEditingEmail(reg.id); setEditEmailValue(reg.email); }}
                            className="cursor-pointer hover:text-aqua transition-colors"
                            title="Click to edit email"
                          >
                            {reg.email}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sand/70">{reg.platform}</td>
                      <td className="px-4 py-3 text-sand/70">@{reg.handle}</td>
                      <td className="px-4 py-3 text-sand/70">{reg.followers}</td>
                      <td className="px-4 py-3 text-sand/50 whitespace-nowrap">
                        {new Date(reg.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                        <br />
                        <span className="text-[11px] text-sand/40">
                          {new Date(reg.createdAt).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {reg.checkedIn ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 border border-green-500/30 px-2.5 py-1 text-[11px] font-bold text-green-400">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {reg.checkedInAt
                              ? new Date(reg.checkedInAt).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true,
                                })
                              : 'Yes'}
                          </span>
                        ) : (
                          <span className="text-sand/30 text-xs">&mdash;</span>
                        )}
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

      {/* Email Blast Modal */}
      {showBlastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowBlastModal(false)}
          />
          <div className="relative glass-dark rounded-2xl border border-white/10 w-full max-w-md p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">X Masterclass Email Blast</h2>
              <button
                onClick={() => setShowBlastModal(false)}
                className="rounded-lg border border-white/10 p-1.5 text-sand/60 transition-colors hover:border-white/20 hover:text-sand"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-sand/70 mb-4">
              Send the X Masterclass invitation to all conference registrants.
            </p>

            {/* Test email */}
            <div className="mb-4">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-sand/50">
                Send Test First
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={blastTestEmail}
                  onChange={(e) => setBlastTestEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-sm text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15"
                />
                <button
                  onClick={() => handleBlast(blastTestEmail)}
                  disabled={!blastTestEmail || blastStatus === 'sending'}
                  className="rounded-xl border border-aqua/30 bg-aqua/10 px-4 py-2.5 text-xs font-bold text-aqua transition-colors hover:bg-aqua/20 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {blastStatus === 'sending' ? 'Sending...' : 'Send Test'}
                </button>
              </div>
            </div>

            {/* Result */}
            {blastResult && (
              <div className={`mb-4 rounded-xl border px-4 py-3 text-sm font-medium ${
                blastStatus === 'done'
                  ? 'border-green-500/30 bg-green-500/10 text-green-400'
                  : 'border-red-500/30 bg-red-500/10 text-red-400'
              }`}>
                {blastResult}
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-white/10 my-4" />

            {/* Send to all */}
            <button
              onClick={() => {
                if (confirm('Send the X Masterclass email to ALL conference registrants?')) {
                  handleBlast();
                }
              }}
              disabled={blastStatus === 'sending'}
              className="w-full rounded-xl bg-coral/20 border border-coral/30 px-4 py-3 text-sm font-bold text-coral transition-colors hover:bg-coral/30 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {blastStatus === 'sending' ? 'Sending...' : 'Send to All Conference Registrants'}
            </button>
          </div>
        </div>
      )}

      {/* Add Registration Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Dark overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />

          {/* Modal card */}
          <div className="relative glass-dark rounded-2xl border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Add Registration</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg border border-white/10 p-1.5 text-sand/60 transition-colors hover:border-white/20 hover:text-sand"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddRegistration} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-sand/50">
                  Full Name <span className="text-coral">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={addForm.fullName}
                  onChange={(e) => setAddForm((f) => ({ ...f, fullName: e.target.value }))}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-sm text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-sand/50">
                  Email <span className="text-coral">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={addForm.email}
                  onChange={(e) => setAddForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="email@example.com"
                  className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-sm text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-sand/50">
                  Phone
                </label>
                <input
                  type="tel"
                  value={addForm.phone}
                  onChange={(e) => setAddForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="+1 (242) 000-0000"
                  className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-sm text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15"
                />
              </div>

              {/* Platform + Handle */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-sand/50">
                    Platform
                  </label>
                  <select
                    value={addForm.platform}
                    onChange={(e) => setAddForm((f) => ({ ...f, platform: e.target.value }))}
                    className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-sm text-white outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15 appearance-none"
                  >
                    <option value="" className="bg-navy text-sand">Select platform</option>
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p} className="bg-navy text-sand">{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-sand/50">
                    Social Handle
                  </label>
                  <input
                    type="text"
                    value={addForm.handle}
                    onChange={(e) => setAddForm((f) => ({ ...f, handle: e.target.value }))}
                    placeholder="@handle"
                    className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-sm text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15"
                  />
                </div>
              </div>

              {/* Followers + Niche */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-sand/50">
                    Follower Range
                  </label>
                  <select
                    value={addForm.followers}
                    onChange={(e) => setAddForm((f) => ({ ...f, followers: e.target.value }))}
                    className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-sm text-white outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15 appearance-none"
                  >
                    <option value="" className="bg-navy text-sand">Select range</option>
                    {FOLLOWER_RANGES.map((r) => (
                      <option key={r} value={r} className="bg-navy text-sand">{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-sand/50">
                    Niche
                  </label>
                  <select
                    value={addForm.niche}
                    onChange={(e) => setAddForm((f) => ({ ...f, niche: e.target.value }))}
                    className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-sm text-white outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15 appearance-none"
                  >
                    <option value="" className="bg-navy text-sand">Select niche</option>
                    {NICHES.map((n) => (
                      <option key={n} value={n} className="bg-navy text-sand">{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Monetization */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-sand/50">
                  Monetization Status
                </label>
                <select
                  value={addForm.monetization}
                  onChange={(e) => setAddForm((f) => ({ ...f, monetization: e.target.value }))}
                  className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-sm text-white outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15 appearance-none"
                >
                  <option value="" className="bg-navy text-sand">Select status</option>
                  {MONETIZATION_STATUSES.map((s) => (
                    <option key={s} value={s} className="bg-navy text-sand">{s}</option>
                  ))}
                </select>
              </div>

              {/* Send Email checkbox */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                    addForm.sendEmail
                      ? 'border-aqua bg-aqua text-white'
                      : 'border-white/40 bg-transparent'
                  }`}
                >
                  {addForm.sendEmail && (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={addForm.sendEmail}
                  onChange={(e) => setAddForm((f) => ({ ...f, sendEmail: e.target.checked }))}
                  className="sr-only"
                />
                <span className="text-sm text-sand/80">Send invite email with QR code</span>
              </label>

              {/* Error message */}
              {addError && (
                <p className="text-sm text-coral font-semibold">{addError}</p>
              )}

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={addSubmitting}
                  className="flex-1 rounded-xl bg-aqua/20 border border-aqua/30 px-4 py-2.5 text-sm font-bold text-aqua transition-colors hover:bg-aqua/30 disabled:opacity-50"
                >
                  {addSubmitting
                    ? 'Adding...'
                    : addForm.sendEmail
                    ? 'Add & Invite'
                    : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-sand/60 transition-colors hover:border-white/20 hover:text-sand"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
