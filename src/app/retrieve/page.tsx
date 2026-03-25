'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function RetrievePage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/retrieve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }
      setSent(true);
    } catch {
      setError('Connection error. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy text-sand">
      <section className="hero-mesh relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-aqua">
            Already Registered?
          </p>
          <h1 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl">
            Retrieve Your{' '}
            <span className="gradient-text">Check-In Pass</span>
          </h1>
          <p className="mx-auto max-w-xl text-base text-sand md:text-lg">
            Enter the email you registered with and we will resend your check-in QR code and event details.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-md px-6 pb-24 -mt-4">
        {sent ? (
          <div className="glass-dark rounded-3xl p-8 sm:p-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
              <svg
                className="h-8 w-8 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold text-white">Check Your Inbox</h2>
            <p className="mt-3 text-sm text-sand/80 leading-relaxed">
              If that email is registered, you will receive your check-in QR code and event details shortly. Be sure to check your spam or junk folder.
            </p>
            <div className="mt-6 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
              <p className="text-xs font-bold text-yellow-400">
                Do not share your QR code with anyone. It allows a single entry only.
              </p>
            </div>
            <Link
              href="/"
              className="mt-6 inline-block text-sm font-semibold text-aqua underline underline-offset-4 hover:text-coral transition-colors"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="glass-dark rounded-3xl p-8 sm:p-10 space-y-6"
          >
            <div>
              <label
                htmlFor="retrieve-email"
                className="mb-2 block text-xs font-bold uppercase tracking-widest text-white"
              >
                Email Address
              </label>
              <input
                id="retrieve-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="The email you registered with"
                className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white placeholder-sand/70 outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
              />
            </div>

            {error && (
              <p className="text-center text-sm text-coral font-semibold">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="cta-gradient w-full rounded-2xl py-4 text-lg font-extrabold text-white shadow-xl transition-all disabled:opacity-60"
            >
              {submitting ? 'Sending...' : 'Resend My Check-In Pass'}
            </button>

            <p className="text-center text-xs text-sand/60">
              We will email your QR code and check-in link. No data is shown on this page for your security.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
