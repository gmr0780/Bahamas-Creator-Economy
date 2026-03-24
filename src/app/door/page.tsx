'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DoorLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/door/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/door/scan');
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-aqua">242</h1>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-aqua/60">
            Influencers & Creative Conference
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8">
          <h2 className="mb-6 text-center text-xl font-bold text-white">
            Door Check-In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter door password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3 text-sm text-white placeholder-sand/40 outline-none transition-all focus:border-aqua/40 focus:ring-2 focus:ring-aqua/15"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-center text-sm font-medium text-coral">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-xl bg-gradient-to-r from-aqua to-coral py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
