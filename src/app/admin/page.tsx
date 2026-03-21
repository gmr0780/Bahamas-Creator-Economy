'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      {/* Brand */}
      <div className="mb-10 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-aqua/60">
          242Creators.com
        </p>
      </div>

      {/* Login card */}
      <div className="glass-dark w-full max-w-sm rounded-2xl p-8">
        <h1 className="mb-6 text-center text-2xl font-extrabold text-white">
          Admin Access
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/70"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white placeholder-sand/50 outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-coral/10 border border-coral/30 px-4 py-2.5 text-sm font-medium text-coral">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="cta-gradient w-full rounded-xl py-3.5 text-sm font-extrabold text-white shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
