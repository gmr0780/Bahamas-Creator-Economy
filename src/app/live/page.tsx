'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LiveContent() {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  const [videoId, setVideoId] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [streamSize, setStreamSize] = useState('large');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = isPreview ? '/api/live?preview=true' : '/api/live';
    fetch(url)
      .then((r) => {
        if (!r.ok) return null;
        return r.json();
      })
      .then((data) => {
        if (data) {
          setVideoId(data.youtubeVideoId ?? '');
          setEnabled(data.liveEnabled ?? false);
          setStreamSize(data.streamSize ?? 'large');
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-aqua border-t-transparent" />
          <p className="text-sm text-sand/60">Loading stream...</p>
        </div>
      </div>
    );
  }

  if (!enabled || !videoId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-black text-aqua">242</h1>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-aqua/60">
            Influencers &amp; Creative Conference
          </p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-8">
            <h2 className="text-xl font-bold text-white">Stream Not Live Yet</h2>
            <p className="mt-3 text-sm text-sand/70">
              The live stream will be available here on March 29, 2026 starting at 4:00 PM.
            </p>
            <p className="mt-2 text-sm text-sand/50">Check back soon.</p>
          </div>
          <Link
            href="/event"
            className="mt-6 inline-block text-sm font-semibold text-aqua underline underline-offset-4 hover:text-coral transition-colors"
          >
            View Event Details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-sand">
      {/* Header */}
      <div className="border-b border-white/10 bg-navy/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-aqua">242</span>
            <span className="text-white/30">|</span>
            <span className="text-sm font-semibold text-white">Live Stream</span>
            <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-500/40 px-2.5 py-0.5 text-xs font-bold text-red-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
              LIVE
            </span>
          </div>
          <Link
            href="/event"
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-sand/80 transition-colors hover:border-aqua/30 hover:text-aqua"
          >
            Event Details
          </Link>
        </div>
      </div>

      {/* Stream */}
      <div className={`mx-auto py-6 ${
        streamSize === 'full' ? 'max-w-full px-0' :
        streamSize === 'medium' ? 'max-w-3xl px-4 sm:px-6' :
        'max-w-5xl px-4 sm:px-6'
      }`}>
        <div className={`relative w-full overflow-hidden bg-black ${streamSize === 'full' ? '' : 'rounded-2xl border border-white/10'}`} style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&origin=https://242creators.com`}
            title="242 Creators Conference Live Stream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        {/* Info */}
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
            242 Influencers &amp; Creative Conference
          </h1>
          <p className="mt-2 text-sand/70">
            Sunday, March 29, 2026 &middot; Baha Mar Convention Center, Nassau
          </p>
          <p className="mt-1 text-xs text-sand/50">
            Hosted by the Office of the Prime Minister, Commonwealth of The Bahamas
          </p>
        </div>

        {/* Agenda quick ref */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-aqua/60">Programme</h2>
          <div className="grid gap-2 text-sm">
            {[
              ['4:00 PM', 'Welcome', 'Latrae Rahming, Director of Communications, OPM'],
              ['4:05 PM', 'National Anthem', 'CAPAS'],
              ['4:10 PM', 'Speaker I: Herschel Walker', 'U.S. Ambassador to The Bahamas'],
              ['4:25 PM', 'Speaker II: The Hon. Mia Amor Mottley, KC, MP', 'Prime Minister of Barbados (Virtual)'],
              ['4:35 PM', 'CAPAS Presentation by Ian Poitier', '48-Hour Short Film Challenge Winner'],
              ['4:45 PM', 'Introduction of the Prime Minister', 'Latrae Rahming'],
              ['4:50 PM', 'Keynote Address', 'The Hon. Philip Edward Davis, KC, MP — Prime Minister of The Bahamas'],
              ['5:10 PM', 'AI for Creators: The New Digital Renaissance', 'Tanya Leis | Burson'],
              ['5:25 PM', 'The 4 Cs Framework for Creator Success', 'Aimée Legault | Burson'],
              ['5:40 PM', 'Panel I: Building Domestic Brand Power', 'Host: Khrisna Russell. Deputy PM I. Chester Cooper'],
              ['6:00 PM', 'Connecting Creators to Brands and Revenue', 'Alexa Alianiello'],
              ['6:15 PM', 'Panel II: Leveraging Our Platforms', 'Host: Amad Rashad Thompson. Baha Yogi, Vocab, Das Quay, Bodine, Zhane\'o'],
              ['6:35 PM', 'Platform Presentations', 'Jamie Bierman, X.com'],
              ['7:00 PM', 'Closing Remarks', 'Ambassador-at-Large Mr. Greg Michelier'],
              ['7:05 PM', '242 After Hours: Mix & Mingle', ''],
            ].map(([time, title, speaker]) => (
              <div key={time} className="flex gap-4 py-1">
                <span className="shrink-0 font-mono text-xs text-aqua/70 w-16 pt-0.5">{time}</span>
                <div>
                  <span className="text-sand/80">{title}</span>
                  {speaker && <p className="text-xs text-sand/50">{speaker}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LivePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-navy">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-aqua border-t-transparent" />
        </div>
      }
    >
      <LiveContent />
    </Suspense>
  );
}
