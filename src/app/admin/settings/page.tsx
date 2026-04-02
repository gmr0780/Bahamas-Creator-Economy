'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Settings {
  registrationCap: number;
  vipCap: number;
  registrationOpen: boolean;
  youtubeVideoId: string;
  liveEnabled: boolean;
  streamSize: string;
  xMasterclassRegistrationOpen: boolean;
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
    youtubeVideoId: '',
    liveEnabled: false,
    streamSize: 'large',
    xMasterclassRegistrationOpen: false,
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
            youtubeVideoId: json.youtubeVideoId ?? '',
            liveEnabled: json.liveEnabled ?? false,
            streamSize: json.streamSize ?? 'large',
            xMasterclassRegistrationOpen: json.xMasterclassRegistrationOpen ?? false,
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

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* X Masterclass Registration Toggle */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70">
              X Masterclass Registration
            </label>
            <button
              type="button"
              onClick={() =>
                setSettings((s) => ({ ...s, xMasterclassRegistrationOpen: !s.xMasterclassRegistrationOpen }))
              }
              className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors ${
                settings.xMasterclassRegistrationOpen
                  ? 'border-green-500/40 bg-green-500/20'
                  : 'border-white/20 bg-white/10'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full transition-transform ${
                  settings.xMasterclassRegistrationOpen
                    ? 'translate-x-6 bg-green-400'
                    : 'translate-x-1 bg-sand/50'
                }`}
              />
            </button>
            <p className="mt-1.5 text-xs text-sand/40">
              {settings.xMasterclassRegistrationOpen
                ? 'X Masterclass registration is OPEN — creators can sign up.'
                : 'X Masterclass registration is CLOSED — "Coming Soon" is shown.'}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* Live Stream Toggle */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70">
              Live Stream
            </label>
            <button
              type="button"
              onClick={() =>
                setSettings((s) => ({ ...s, liveEnabled: !s.liveEnabled }))
              }
              className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors ${
                settings.liveEnabled
                  ? 'border-red-500/40 bg-red-500/20'
                  : 'border-white/20 bg-white/10'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full transition-transform ${
                  settings.liveEnabled
                    ? 'translate-x-6 bg-red-400'
                    : 'translate-x-1 bg-sand/50'
                }`}
              />
            </button>
            <div className="mt-2 flex items-center gap-3">
              <a
                href="/live?preview=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/80 transition-colors hover:border-aqua/30 hover:text-aqua"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview Stream
              </a>
            </div>
            <p className="mt-1.5 text-xs text-sand/40">
              {settings.liveEnabled
                ? 'Live stream is ON — /live page is public.'
                : 'Live stream is OFF — only you can preview via the button above.'}
            </p>
          </div>

          {/* YouTube Video ID */}
          <div>
            <label
              htmlFor="youtubeVideoId"
              className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
            >
              YouTube Video ID
            </label>
            <input
              id="youtubeVideoId"
              type="text"
              value={settings.youtubeVideoId}
              onChange={(e) =>
                setSettings((s) => ({ ...s, youtubeVideoId: e.target.value }))
              }
              placeholder="e.g. dQw4w9WgXcQ"
              className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
            />
            <p className="mt-1.5 text-xs text-sand/40">
              The ID from the YouTube URL (e.g. youtube.com/watch?v=<span className="text-aqua">THIS_PART</span>). Set this before going live.
            </p>
          </div>

          {/* Stream Size */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70">
              Stream Window Size
            </label>
            <div className="flex gap-2">
              {[
                { value: 'medium', label: 'Medium', desc: '768px' },
                { value: 'large', label: 'Large', desc: '1024px' },
                { value: 'full', label: 'Full Width', desc: 'Edge to edge' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSettings((s) => ({ ...s, streamSize: opt.value }))}
                  className={`flex-1 rounded-xl border px-3 py-3 text-center transition-colors ${
                    settings.streamSize === opt.value
                      ? 'border-aqua/50 bg-aqua/10 text-aqua'
                      : 'border-white/10 text-sand/50 hover:text-sand/80'
                  }`}
                >
                  <p className="text-sm font-bold">{opt.label}</p>
                  <p className="text-[10px] mt-0.5 opacity-60">{opt.desc}</p>
                </button>
              ))}
            </div>
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
