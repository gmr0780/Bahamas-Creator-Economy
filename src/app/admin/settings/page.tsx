'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Settings {
  registrationCap: number;
  vipCap: number;
  registrationOpen: boolean;
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    registrationCap: 400,
    vipCap: 100,
    registrationOpen: true,
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.status === 401) {
          router.push('/admin');
          return;
        }
        if (res.ok) {
          const json = await res.json();
          setSettings({
            registrationCap: json.registrationCap ?? 400,
            vipCap: json.vipCap ?? 100,
            registrationOpen: json.registrationOpen ?? true,
          });
        }
      } catch {
        // use defaults
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-aqua border-t-transparent" />
          <p className="text-sm text-sand/60">Loading settings...</p>
        </div>
      </div>
    );
  }

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
            <span className="text-sm font-semibold text-white">Settings</span>
          </div>
          <Link
            href="/admin/dashboard"
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/80 transition-colors hover:border-aqua/30 hover:text-aqua"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-10 sm:px-6">
        <h1 className="mb-8 text-2xl font-extrabold text-white">Settings</h1>

        <form onSubmit={handleSubmit} className="glass-dark rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Registration Cap */}
          <div>
            <label
              htmlFor="cap"
              className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
            >
              Registration Cap
            </label>
            <input
              id="cap"
              type="number"
              min={1}
              value={settings.registrationCap}
              onChange={(e) =>
                setSettings((s) => ({ ...s, registrationCap: Number(e.target.value) }))
              }
              className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
            />
            <p className="mt-1.5 text-xs text-sand/40">
              Maximum number of online registrations allowed.
            </p>
          </div>

          {/* VIP Cap */}
          <div>
            <label
              htmlFor="vipCap"
              className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
            >
              VIP Cap
            </label>
            <input
              id="vipCap"
              type="number"
              min={1}
              value={settings.vipCap}
              onChange={(e) =>
                setSettings((s) => ({ ...s, vipCap: Number(e.target.value) }))
              }
              className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
            />
            <p className="mt-1.5 text-xs text-sand/40">
              Maximum number of VIP registrations (added from admin).
            </p>
          </div>

          {/* Registration Open toggle */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70">
              Registration Open
            </label>
            <button
              type="button"
              onClick={() =>
                setSettings((s) => ({ ...s, registrationOpen: !s.registrationOpen }))
              }
              className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors ${
                settings.registrationOpen
                  ? 'border-green-500/40 bg-green-500/20'
                  : 'border-white/20 bg-white/10'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full transition-transform ${
                  settings.registrationOpen
                    ? 'translate-x-6 bg-green-400'
                    : 'translate-x-1 bg-sand/50'
                }`}
              />
            </button>
            <p className="mt-1.5 text-xs text-sand/40">
              {settings.registrationOpen
                ? 'Registration is currently open.'
                : 'Registration is currently closed.'}
            </p>
          </div>

          {/* Save */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="cta-gradient rounded-xl px-6 py-3 text-sm font-extrabold text-white shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>

            {saved && (
              <p className="text-sm font-medium text-green-400 animate-fade-in-up">
                Settings saved.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
