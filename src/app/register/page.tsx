'use client';

import { useState, FormEvent } from "react";
import Link from "next/link";

const platforms = ["YouTube", "TikTok", "Instagram", "Twitch", "X/Twitter", "Facebook", "Other"];

const followerRanges = [
  "Under 1K",
  "1K-10K",
  "10K-50K",
  "50K-100K",
  "100K-500K",
  "500K+",
];

const niches = [
  "Finance/Investing",
  "Business",
  "Technology",
  "Entertainment",
  "Lifestyle",
  "Food/Travel",
  "Education",
  "Music",
  "Sports",
  "Other",
];

const monetizationStatuses = [
  "Not yet earning",
  "Earning under $500/mo",
  "Earning $500-2000/mo",
  "Earning $2000+/mo",
];

const learningTopics = [
  "Platform Monetization",
  "Tax & W-8BEN Setup",
  "Content Strategy",
  "Brand Partnerships",
  "Payment Setup",
  "All of the above",
];

const shareText =
  "I'm joining the first-ever Bahamas Creator Economy Launch, backed by the Office of the Prime Minister \u{1F1E7}\u{1F1F8} #BahamasCreatorEconomy";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [platform, setPlatform] = useState("");
  const [handle, setHandle] = useState("");
  const [followers, setFollowers] = useState("");
  const [niche, setNiche] = useState("");
  const [monetization, setMonetization] = useState("");
  const [topics, setTopics] = useState<string[]>([]);

  function handleTopicToggle(topic: string) {
    if (topic === "All of the above") {
      if (topics.includes("All of the above")) {
        setTopics([]);
      } else {
        setTopics([...learningTopics]);
      }
      return;
    }
    setTopics((prev) => {
      const next = prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev.filter((t) => t !== "All of the above"), topic];
      // If all individual topics selected, add "All of the above"
      const individualTopics = learningTopics.filter((t) => t !== "All of the above");
      if (individualTopics.every((t) => next.includes(t))) {
        return [...learningTopics];
      }
      return next;
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const encodedShareText = encodeURIComponent(shareText);

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6 py-24">
        {/* VIP Pass Card */}
        <div className="vip-pass relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
          {/* Gradient background */}
          <div className="animate-gradient-shift bg-gradient-to-br from-aqua via-coral to-aqua p-[2px] rounded-3xl">
            <div className="relative overflow-hidden rounded-[calc(1.5rem-2px)] bg-gradient-to-br from-aqua/90 via-coral/80 to-aqua/90 p-6 sm:p-8 md:p-10">
              {/* Shimmer overlay */}
              <div
                className="animate-shimmer pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
                }}
              />

              <div className="relative z-10 text-center">
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.35em] text-white/70">
                  Office of the Prime Minister
                </p>
                <div className="my-6">
                  <p className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                    Access<br />Granted
                  </p>
                </div>
                <div className="my-6 h-px bg-white/30" />
                <p className="text-2xl font-extrabold text-white">{fullName}</p>
                <p className="mt-3 text-sm font-semibold text-white/80">
                  Bahamas Creator Economy Launch
                </p>
                <p className="mt-1 text-sm font-medium text-white/60">
                  March 29, 2026
                </p>
                <div className="mt-6 inline-block rounded-full bg-white/20 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                  VIP Invitation
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-10 w-full max-w-md text-center">
          <p className="mb-2 text-lg font-bold text-sand">Share Your Invitation</p>
          <p className="mb-6 text-sm text-sand/80">
            Let your audience know you&apos;re part of history.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://www.instagram.com/?text=${encodedShareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-3 text-xs font-bold text-white transition-transform hover:scale-105"
            >
              Share on Instagram
            </a>
            <a
              href={`https://www.tiktok.com/`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black px-5 py-3 text-xs font-bold text-white ring-1 ring-white/20 transition-transform hover:scale-105"
            >
              Share on TikTok
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodedShareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-zinc-900 px-5 py-3 text-xs font-bold text-white ring-1 ring-white/20 transition-transform hover:scale-105"
            >
              Share on X
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?quote=${encodedShareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-blue-600 px-5 py-3 text-xs font-bold text-white transition-transform hover:scale-105"
            >
              Share on Facebook
            </a>
            <button
              className="rounded-full bg-white/10 px-5 py-3 text-xs font-bold text-sand ring-1 ring-white/20 transition-transform hover:scale-105"
              onClick={() => {
                // Placeholder for html2canvas download
                alert("Image download coming soon! For now, take a screenshot of your VIP pass.");
              }}
            >
              Download Image
            </button>
          </div>

          <div className="mt-8 rounded-2xl bg-white/[0.08] p-4 border border-white/[0.08]">
            <p className="text-sm text-sand/85 italic">&ldquo;{shareText}&rdquo;</p>
          </div>

          <Link
            href="/event"
            className="mt-8 inline-block text-sm font-semibold text-aqua underline underline-offset-4 hover:text-coral transition-colors"
          >
            View Full Event Details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-sand">
      {/* Header */}
      <section className="hero-mesh relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-aqua">
            By Invitation Only
          </p>
          <h1 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-5xl">
            Register for the{" "}
            <span className="gradient-text">Creator Economy Launch</span>
          </h1>
          <p className="mx-auto max-w-xl text-base text-sand/85 md:text-lg">
            You&apos;ve been invited by the Office of the Prime Minister to join
            the inaugural Creator Economy Launch.
          </p>
        </div>
      </section>

      {/* Motivational copy */}
      <section className="relative z-10 -mt-2 mx-auto max-w-2xl px-6">
        <div className="rounded-2xl border border-aqua/20 bg-aqua/5 p-6 text-center mb-6">
          <p className="text-base text-sand leading-relaxed">
            Every great movement starts with a single step. By registering, you&apos;re not just signing up for an event &mdash; you&apos;re joining a national movement to put Bahamian creators on the global map.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="relative z-10 mx-auto max-w-2xl px-6 pb-24">
        <form
          onSubmit={handleSubmit}
          className="glass-dark rounded-3xl p-5 sm:p-8 md:p-12 space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white placeholder-sand/70 outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white placeholder-sand/70 outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white">
              Phone
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (242) 000-0000"
              className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white placeholder-sand/70 outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
            />
          </div>

          {/* Platform + Handle row */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white">
                Primary Platform
              </label>
              <select
                required
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20 appearance-none"
              >
                <option value="" disabled className="bg-navy text-sand/80">
                  Select platform
                </option>
                {platforms.map((p) => (
                  <option key={p} value={p} className="bg-navy text-sand">
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white">
                Social Media Handle
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-semibold">
                  @
                </span>
                <input
                  type="text"
                  required
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="yourhandle"
                  className="w-full rounded-xl border border-white/25 bg-white/[0.12] pl-9 pr-5 py-3.5 text-white placeholder-sand/70 outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20"
                />
              </div>
            </div>
          </div>

          {/* Followers + Niche row */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white">
                Follower Count Range
              </label>
              <select
                required
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20 appearance-none"
              >
                <option value="" disabled className="bg-navy text-sand/80">
                  Select range
                </option>
                {followerRanges.map((r) => (
                  <option key={r} value={r} className="bg-navy text-sand">
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white">
                Content Niche
              </label>
              <select
                required
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20 appearance-none"
              >
                <option value="" disabled className="bg-navy text-sand/80">
                  Select niche
                </option>
                {niches.map((n) => (
                  <option key={n} value={n} className="bg-navy text-sand">
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Monetization */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-white">
              Current Monetization Status
            </label>
            <select
              required
              value={monetization}
              onChange={(e) => setMonetization(e.target.value)}
              className="w-full rounded-xl border border-white/25 bg-white/[0.12] px-5 py-3.5 text-white outline-none transition-all focus:border-aqua/50 focus:ring-2 focus:ring-aqua/20 appearance-none"
            >
              <option value="" disabled className="bg-navy text-sand/80">
                Select status
              </option>
              {monetizationStatuses.map((s) => (
                <option key={s} value={s} className="bg-navy text-sand">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Learning Topics */}
          <div>
            <label className="mb-4 block text-xs font-bold uppercase tracking-widest text-white">
              What do you want to learn?
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {learningTopics.map((topic) => (
                <label
                  key={topic}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all ${
                    topics.includes(topic)
                      ? "border-aqua/50 bg-aqua/10 text-sand"
                      : "border-white/10 bg-white/[0.02] text-sand hover:border-white/20"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                      topics.includes(topic)
                        ? "border-aqua bg-aqua text-white"
                        : "border-white/40 bg-transparent"
                    }`}
                  >
                    {topics.includes(topic) && (
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={topics.includes(topic)}
                    onChange={() => handleTopicToggle(topic)}
                    className="sr-only"
                  />
                  {topic}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="cta-gradient w-full rounded-2xl py-4 text-lg font-extrabold text-white shadow-xl transition-all"
            >
              Secure My Spot
            </button>
            <p className="mt-4 text-center text-xs text-sand">
              By registering, you confirm your attendance at the Bahamas Creator Economy Launch on March 29, 2026.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
