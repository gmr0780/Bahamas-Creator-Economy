'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface XMasterclassReg {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  island: string;
  xHandle: string;
  createdAt: string;
}

interface PageData {
  registrations: XMasterclassReg[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export default function AdminXMasterclassPage() {
  const router = useRouter();
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: '20',
      });
      if (debouncedSearch) params.set('search', debouncedSearch);

      const res = await fetch(`/api/x-masterclass/registrations?${params}`);
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch {
      // network error
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-aqua border-t-transparent" />
          <p className="text-sm text-sand/60">Loading registrations...</p>
        </div>
      </div>
    );
  }

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
            <span className="text-sm font-semibold text-white">X Masterclass Registrations</span>
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
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="glass-dark rounded-xl px-4 py-3 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-sand/50">Total Registered</p>
            <p className="mt-1 text-2xl font-extrabold text-white">{data?.total ?? 0}</p>
          </div>
          <div className="glass-dark rounded-xl px-4 py-3 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-sand/50">Event Date</p>
            <p className="mt-1 text-2xl font-extrabold text-aqua">April 17, 2026</p>
          </div>
        </div>

        {/* Search + Export */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search name, email, or X handle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-sm text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15 sm:max-w-xs"
          />
          <a
            href="/api/x-masterclass/registrations?pageSize=10000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-sand/80 transition-colors hover:border-aqua/30 hover:text-aqua"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export JSON
          </a>
        </div>

        {/* Table */}
        <div className="glass-dark overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">Name</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">Email</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">Phone</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">Island</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">X Handle</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-sand/50">Registered</th>
                </tr>
              </thead>
              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-sand/40">
                      {search ? 'No registrations match your search.' : 'No registrations yet.'}
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr
                      key={reg.id}
                      className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3 font-medium text-white">{reg.fullName}</td>
                      <td className="px-4 py-3 text-sand/70">{reg.email}</td>
                      <td className="px-4 py-3 text-sand/70">{reg.phone}</td>
                      <td className="px-4 py-3 text-sand/70">{reg.island}</td>
                      <td className="px-4 py-3 text-aqua font-medium">{reg.xHandle}</td>
                      <td className="px-4 py-3 text-sand/50 whitespace-nowrap">
                        {new Date(reg.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
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
