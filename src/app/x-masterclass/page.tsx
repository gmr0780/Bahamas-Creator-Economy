"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";

const ISLANDS = [
  "Nassau / New Providence",
  "Grand Bahama",
  "Abaco",
  "Eleuthera",
  "Exuma",
  "Andros",
  "Long Island",
  "Cat Island",
  "Bimini",
  "Inagua",
  "Berry Islands",
  "Acklins",
  "Crooked Island",
  "Mayaguana",
  "Rum Cay",
  "San Salvador",
  "Ragged Island",
  "Other",
];

function IconX() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function XMasterclassPage() {
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    island: "",
    xHandle: "",
  });

  useEffect(() => {
    fetch("/api/x-masterclass/count")
      .then((r) => r.json())
      .then((data) => setRegistrationOpen(data.open))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/x-masterclass/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative px-6 py-24 sm:py-32 bg-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-aqua/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-coral/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-white/10 text-white">
              <IconX />
            </div>
          </div>

          <p className="text-xl sm:text-3xl md:text-4xl uppercase tracking-[0.15em] sm:tracking-[0.2em] text-aqua font-extrabold">
            Free Masterclass
          </p>
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
            Learn to Grow &<br />
            <span className="gradient-text">Monetize on X</span>
          </h1>
          <p className="text-base sm:text-xl text-sand max-w-2xl mx-auto leading-relaxed">
            X has committed to hosting a free Masterclass for Bahamian creators and influencers. Learn directly from X on how to grow, monetize, and build your presence on the platform.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto pt-4">
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-aqua/70 mb-1">Date</p>
              <p className="text-lg font-bold text-white">April 17, 2026</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-aqua/70 mb-1">Time</p>
              <p className="text-lg font-bold text-white">6:00 PM</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-aqua/70 mb-1">Format</p>
              <p className="text-lg font-bold text-white">Online (Free)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DETAILS ─────────────────────────────────── */}
      <section className="px-6 py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Info */}
            <div className="space-y-8">
              {/* Who */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-4">
                  Your Instructor
                </h2>
                <div className="flex items-center gap-4 rounded-2xl border border-navy/8 bg-sand/15 p-5">
                  <div className="shrink-0 h-16 w-16 rounded-full bg-gradient-to-br from-aqua to-coral flex items-center justify-center text-white font-bold text-xl">
                    JB
                  </div>
                  <div>
                    <p className="text-lg font-bold text-navy">Jamie Bierman</p>
                    <p className="text-sm text-navy/60">X (formerly Twitter)</p>
                  </div>
                </div>
              </div>

              {/* What you'll learn */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy mb-4">
                  What You&apos;ll Learn
                </h2>
                <ul className="space-y-3">
                  {[
                    "How to grow your audience on X",
                    "How to monetize your content and earn revenue",
                    "How to build a professional presence on the platform",
                    "Best practices for engagement and visibility",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="shrink-0 mt-1.5 h-2 w-2 rounded-full bg-aqua" />
                      <span className="text-navy/90 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contest */}
              <div className="rounded-2xl bg-gradient-to-r from-coral/5 to-aqua/5 border border-coral/20 p-6">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5 text-coral">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-navy text-lg mb-1">Win Lifetime X Premium</p>
                    <p className="text-navy/80 text-sm leading-relaxed">
                      Creators who attend and sign up to X will have the chance to enter a contest judged by X. The winner receives a <strong>lifetime subscription to X Premium</strong> — opening doors to brand deals, monetization features, and global visibility that were previously out of reach.
                    </p>
                  </div>
                </div>
              </div>

              {/* Context */}
              <div className="rounded-2xl border border-navy/8 bg-sand/10 p-6">
                <p className="text-navy/80 text-sm leading-relaxed italic">
                  Following Sunday&apos;s 242 Influencers and Creative Conference, X committed to hosting this Masterclass. This is exactly what we set out to achieve — not just a conversation, but real, tangible opportunities for Bahamian creators.
                </p>
              </div>
            </div>

            {/* Right: Registration Form */}
            <div>
              {loading ? (
                <div className="rounded-3xl border border-navy/10 bg-sand/20 p-8 text-center">
                  <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-aqua border-t-transparent" />
                  <p className="text-sm text-navy/50">Loading...</p>
                </div>
              ) : success ? (
                /* Success state */
                <div className="rounded-3xl border border-green-500/20 bg-green-50 p-8 sm:p-10 text-center space-y-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-navy mb-2">You&apos;re In!</h3>
                    <p className="text-navy/70 leading-relaxed">
                      You&apos;re registered for the X Masterclass on April 17. Check your email for confirmation details.
                    </p>
                  </div>
                  <div className="rounded-xl bg-white border border-navy/10 p-4">
                    <p className="text-sm font-bold text-navy mb-1">You&apos;re entered to win</p>
                    <p className="text-xs text-navy/60">Lifetime X Premium Subscription</p>
                  </div>

                  {/* Share to X */}
                  <a
                    href={`https://x.com/intent/tweet?text=${encodeURIComponent("I just registered for the free X Masterclass for Bahamian Creators! April 17 at 6PM. Learn to grow, monetize and build your presence on X. Register at 242creators.com/x-masterclass 🇧🇸")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white hover:bg-black/80 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Share on X
                  </a>
                </div>
              ) : registrationOpen ? (
                /* Registration form */
                <div className="rounded-3xl border border-navy/10 bg-sand/20 p-6 sm:p-8">
                  <h2 className="text-2xl font-extrabold text-navy mb-2">Register Now</h2>
                  <p className="text-sm text-navy/60 mb-6">All fields are required. You must have an X account to register.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-navy/50">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder-navy/30 outline-none transition-all focus:border-aqua focus:ring-2 focus:ring-aqua/20"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-navy/50">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@email.com"
                        className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder-navy/30 outline-none transition-all focus:border-aqua focus:ring-2 focus:ring-aqua/20"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-navy/50">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+1 (242) 000-0000"
                        className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder-navy/30 outline-none transition-all focus:border-aqua focus:ring-2 focus:ring-aqua/20"
                      />
                    </div>

                    {/* Island */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-navy/50">
                        Island
                      </label>
                      <select
                        required
                        value={form.island}
                        onChange={(e) => setForm((f) => ({ ...f, island: e.target.value }))}
                        className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-all focus:border-aqua focus:ring-2 focus:ring-aqua/20 appearance-none"
                      >
                        <option value="">Select your island</option>
                        {ISLANDS.map((island) => (
                          <option key={island} value={island}>
                            {island}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* X Handle */}
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-navy/50">
                        X Handle
                      </label>
                      <input
                        type="text"
                        required
                        value={form.xHandle}
                        onChange={(e) => setForm((f) => ({ ...f, xHandle: e.target.value }))}
                        placeholder="@yourhandle"
                        className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder-navy/30 outline-none transition-all focus:border-aqua focus:ring-2 focus:ring-aqua/20"
                      />
                      <p className="mt-1.5 text-xs text-navy/40">
                        Your X (Twitter) username. Required for contest entry.
                      </p>
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 font-semibold">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full cta-gradient rounded-xl px-6 py-4 text-base font-bold text-white shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Registering..." : "Register for Free"}
                    </button>

                    <p className="text-[11px] text-navy/40 text-center leading-relaxed">
                      By registering, you&apos;re automatically entered for a chance to win a lifetime X Premium subscription.
                    </p>
                  </form>
                </div>
              ) : (
                /* Registration not yet open */
                <div className="rounded-3xl border border-navy/10 bg-sand/20 p-8 sm:p-10 text-center space-y-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-aqua/10">
                    <svg className="h-8 w-8 text-aqua" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-navy mb-2">Registration Opening Soon</h3>
                    <p className="text-navy/70 leading-relaxed">
                      Registration for the X Masterclass will open shortly. Check back soon to secure your spot.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-xl border border-navy/10 bg-white p-3 text-center">
                      <p className="text-xs font-bold text-navy/40 uppercase">Date</p>
                      <p className="text-sm font-bold text-navy">April 17</p>
                    </div>
                    <div className="rounded-xl border border-navy/10 bg-white p-3 text-center">
                      <p className="text-xs font-bold text-navy/40 uppercase">Time</p>
                      <p className="text-sm font-bold text-navy">6:00 PM</p>
                    </div>
                    <div className="rounded-xl border border-navy/10 bg-white p-3 text-center">
                      <p className="text-xs font-bold text-navy/40 uppercase">Cost</p>
                      <p className="text-sm font-bold text-navy">Free</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
