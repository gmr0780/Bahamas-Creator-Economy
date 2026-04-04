'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PixelOpen {
  id: string;
  ip: string;
  userAgent: string;
  createdAt: string;
}

interface Pixel {
  id: string;
  slug: string;
  label: string;
  createdAt: string;
  opens: PixelOpen[];
  _count: { opens: number };
}

export default function AdminPixelsPage() {
  const router = useRouter();
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [slug, setSlug] = useState('');
  const [label, setLabel] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function fetchPixels() {
    try {
      const res = await fetch('/api/admin/pixels');
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await res.json();
      setPixels(data.pixels || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPixels();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      const res = await fetch('/api/admin/pixels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, label }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      setSlug('');
      setLabel('');
      await fetchPixels();
    } catch {
      setError('Something went wrong.');
    } finally {
      setCreating(false);
    }
  }

  function getPixelHtml(pixelSlug: string) {
    return `<img src="https://242creators.com/api/track/pixel/${pixelSlug}" width="1" height="1" alt="" style="display:none" />`;
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  function formatAgent(ua: string) {
    if (ua.includes('Outlook')) return 'Outlook';
    if (ua.includes('Thunderbird')) return 'Thunderbird';
    if (ua.includes('Apple Mail') || ua.includes('AppleWebKit')) return 'Apple Mail';
    if (ua.includes('Gmail')) return 'Gmail';
    if (ua.includes('Yahoo')) return 'Yahoo';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('GoogleImageProxy')) return 'Gmail (proxy)';
    if (ua.length > 40) return ua.slice(0, 40) + '...';
    return ua || 'Unknown';
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-aqua border-t-transparent" />
          <p className="text-sm text-sand/60">Loading pixels...</p>
        </div>
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
            <span className="text-sm font-semibold text-white">Email Pixels</span>
          </div>
          <Link
            href="/admin/dashboard"
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/80 transition-colors hover:border-aqua/30 hover:text-aqua"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="mb-2 text-2xl font-extrabold text-white">Email Tracking Pixels</h1>
        <p className="mb-8 text-sm text-sand/60">
          Create a pixel, paste the HTML into your email, and see when it gets opened.
        </p>

        {/* Create form */}
        <form onSubmit={handleCreate} className="glass-dark rounded-2xl p-6 mb-8">
          <h2 className="text-sm font-bold text-white mb-4">Create New Pixel</h2>
          <div className="grid gap-4 sm:grid-cols-2 mb-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-sand/50">
                Label
              </label>
              <input
                type="text"
                required
                value={label}
                onChange={(e) => {
                  setLabel(e.target.value);
                  if (!slug || slug === label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
                  }
                }}
                placeholder="Meta email Apr 4"
                className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-sm text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-sand/50">
                Slug
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="meta-email-apr4"
                className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-sm text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15"
              />
            </div>
          </div>
          {error && <p className="text-sm text-coral font-semibold mb-4">{error}</p>}
          <button
            type="submit"
            disabled={creating}
            className="rounded-xl bg-aqua/20 border border-aqua/30 px-6 py-2.5 text-sm font-bold text-aqua transition-colors hover:bg-aqua/30 disabled:opacity-50"
          >
            {creating ? 'Creating...' : 'Create Pixel'}
          </button>
        </form>

        {/* Pixels list */}
        {pixels.length === 0 ? (
          <div className="glass-dark rounded-2xl p-8 text-center">
            <p className="text-sand/40">No pixels yet. Create one above.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pixels.map((pixel) => (
              <div key={pixel.id} className="glass-dark rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">{pixel.label}</h3>
                    <p className="text-xs text-sand/40 mt-0.5">
                      Created {new Date(pixel.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                        hour: 'numeric', minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                      pixel._count.opens > 0
                        ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                        : 'bg-white/5 border border-white/10 text-sand/40'
                    }`}>
                      {pixel._count.opens > 0 ? (
                        <>
                          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                          {pixel._count.opens} open{pixel._count.opens !== 1 ? 's' : ''}
                        </>
                      ) : (
                        'No opens yet'
                      )}
                    </span>
                  </div>
                </div>

                {/* Copy HTML */}
                <div className="rounded-xl bg-black/30 border border-white/10 p-3 mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-sand/40">Paste this in your email</p>
                    <button
                      onClick={() => copyToClipboard(getPixelHtml(pixel.slug), pixel.id)}
                      className="text-xs font-bold text-aqua hover:text-aqua/80 transition-colors"
                    >
                      {copied === pixel.id ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <code className="text-xs text-sand/70 break-all">{getPixelHtml(pixel.slug)}</code>
                </div>

                {/* Opens */}
                {pixel._count.opens > 0 && (
                  <div>
                    <button
                      onClick={() => setExpanded(expanded === pixel.id ? null : pixel.id)}
                      className="text-xs font-semibold text-aqua/70 hover:text-aqua transition-colors"
                    >
                      {expanded === pixel.id ? 'Hide' : 'Show'} open details
                    </button>

                    {expanded === pixel.id && (
                      <div className="mt-3 space-y-2">
                        {pixel.opens.map((open) => (
                          <div key={open.id} className="flex items-center justify-between rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2">
                            <div className="flex items-center gap-3">
                              <span className="h-2 w-2 rounded-full bg-green-400" />
                              <span className="text-xs text-white">
                                {new Date(open.createdAt).toLocaleString('en-US', {
                                  month: 'short', day: 'numeric',
                                  hour: 'numeric', minute: '2-digit',
                                  second: '2-digit',
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-[11px] text-sand/40">{formatAgent(open.userAgent)}</span>
                              <span className="text-[11px] text-sand/30">{open.ip}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
