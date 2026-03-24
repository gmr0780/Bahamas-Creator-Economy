'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DoorScanPage() {
  const router = useRouter();
  const [input, setInput] = useState('');

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;

    // Extract registration ID from a full URL or use as-is
    let id = value;
    const match = value.match(/\/checkin\/([a-zA-Z0-9_-]+)/);
    if (match) {
      id = match[1];
    }

    router.push(`/checkin/${id}`);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-aqua">242</h1>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua/60">
            Influencers & Creative Conference
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8">
          <h2 className="mb-2 text-center text-xl font-bold text-white">
            Scan QR Code
          </h2>
          <p className="mb-6 text-center text-sm text-sand/60">
            Scan an attendee&apos;s QR code with your phone camera, or paste the URL / ID below.
          </p>

          <form onSubmit={handleLookup} className="space-y-4">
            <input
              type="text"
              placeholder="Paste URL or registration ID..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3 text-sm text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15"
              autoFocus
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="w-full rounded-xl bg-gradient-to-r from-aqua to-coral py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              Look Up
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-2xl border border-aqua/20 bg-aqua/5 p-6 text-center">
          <p className="text-sm font-medium text-aqua">
            Tip: When you scan a QR code with your phone camera, it will open the check-in page directly.
          </p>
        </div>
      </div>
    </div>
  );
}
