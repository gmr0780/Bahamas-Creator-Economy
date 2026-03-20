import Countdown from "./components/Countdown";

/* ──────────────────────────────────────────
   Icon components (simple geometric SVGs)
   ────────────────────────────────────────── */

function IconPlatform() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="32" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
      <line x1="20" y1="28" x2="20" y2="34" stroke="currentColor" strokeWidth="2" />
      <line x1="13" y1="34" x2="27" y2="34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconTax() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="4" width="24" height="32" rx="2" stroke="currentColor" strokeWidth="2" />
      <line x1="13" y1="12" x2="27" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="13" y1="18" x2="27" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <line x1="13" y1="24" x2="21" y2="24" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="27" cy="28" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M27 25.5V30.5M25 27.5H29" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function IconPayment() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="32" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
      <line x1="4" y1="17" x2="36" y2="17" stroke="currentColor" strokeWidth="2" />
      <rect x="8" y="22" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <line x1="28" y1="25" x2="32" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconGuidance() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" />
      <path d="M20 12V20L26 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}

/* ──────────────────────────────────────────
   Data
   ────────────────────────────────────────── */

const problems = [
  {
    icon: <IconPlatform />,
    title: "Platform Gaps",
    desc: "Many global creator platforms are not optimized for Caribbean users, limiting discoverability and monetization options for Bahamian creators.",
  },
  {
    icon: <IconTax />,
    title: "Tax Confusion",
    desc: "Creators face uncertainty navigating international tax treaties, W-8BEN forms, and VAT obligations across multiple revenue streams.",
  },
  {
    icon: <IconPayment />,
    title: "Payment Barriers",
    desc: "Limited access to payment processors, high foreign-exchange fees, and banking friction make it difficult to receive global earnings efficiently.",
  },
  {
    icon: <IconGuidance />,
    title: "No Official Guidance",
    desc: "There is currently no government-backed framework or resource center to support digital creators in building sustainable careers.",
  },
];

const pillars = [
  {
    num: "01",
    title: "Training Workshops",
    desc: "Intensive, hands-on workshops covering content creation, audience growth, and platform-specific monetization strategies tailored for the Bahamian context.",
  },
  {
    num: "02",
    title: "Tax & Payment Setup Clinics",
    desc: "Guided sessions to properly configure tax documentation, open compliant payment accounts, and optimize cross-border earnings.",
  },
  {
    num: "03",
    title: "Niche & Growth Strategy",
    desc: "Personalized coaching to identify high-value content niches, leverage The Bahamas' unique cultural assets, and accelerate channel growth.",
  },
  {
    num: "04",
    title: "Brand & Sponsor Matchmaking",
    desc: "Direct introductions to brands and sponsors seeking authentic Caribbean voices, with contract guidance and rate benchmarking.",
  },
  {
    num: "05",
    title: "Official Creator Registry",
    desc: "A government-endorsed registry of verified Bahamian creators, building credibility and unlocking institutional partnership opportunities.",
  },
];

const speakers = [
  {
    name: "The Prime Minister",
    role: "Host & Keynote Speaker",
    tagline: "Commonwealth of The Bahamas",
    featured: true,
  },
  {
    name: "Greg Michelier",
    role: "Ambassador-at-Large",
    tagline: "Technology & AI",
    featured: false,
  },
  {
    name: "Featured Influencer",
    role: "Creator Keynote",
    tagline: "To Be Announced",
    featured: false,
  },
  {
    name: "Latrae Rahming",
    role: "Panel Moderator",
    tagline: "Creator Economy Panel",
    featured: false,
  },
];

/* ──────────────────────────────────────────
   Page Component
   ────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────── */}
      <section className="hero-mesh relative min-h-[100dvh] flex items-center justify-center px-4 py-28 sm:py-32">
        {/* Decorative blurs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-aqua/15 blur-3xl animate-float" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-coral/12 blur-3xl animate-float delay-500" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-aqua/5 to-coral/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <p className="animate-fade-in-up text-sm sm:text-base tracking-[0.25em] uppercase text-aqua font-medium">
            An Initiative of the Office of the Prime Minister
          </p>

          <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
            <span className="text-navy">The Bahamas</span>
            <br />
            <span className="gradient-text">Creator Economy</span>
            <br />
            <span className="text-navy">Initiative</span>
          </h1>

          <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-navy/80 max-w-2xl mx-auto leading-relaxed">
            Empowering Bahamian digital creators to earn globally
          </p>

          <div className="animate-fade-in-up delay-300 pt-4">
            <p className="text-xs uppercase tracking-[0.3em] text-navy/70 mb-4 font-medium">
              Summit Begins In
            </p>
            <Countdown />
          </div>

          <div className="animate-fade-in-up delay-400 pt-6">
            <a
              href="/register"
              className="cta-gradient animate-pulse-glow inline-block rounded-full px-10 py-4 text-lg sm:text-xl font-bold text-white shadow-2xl transition-all"
            >
              Register Now
            </a>
          </div>

          {/* Scroll hint */}
          <div className="animate-fade-in-up delay-700 pt-12">
            <div className="mx-auto h-10 w-6 rounded-full border-2 border-navy/15 flex items-start justify-center p-1">
              <div className="h-2 w-1.5 rounded-full bg-navy/25 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PM QUOTE ──────────────────────────────── */}
      <section className="relative px-6 py-24 sm:py-32 bg-white">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <blockquote className="border-l-4 border-coral pl-6 sm:pl-10 py-4">
            <p className="text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed text-navy italic">
              &ldquo;This initiative represents our commitment to empowering a
              new generation of Bahamian digital entrepreneurs. The creative
              economy is the future, and The Bahamas will lead the
              Caribbean.&rdquo;
            </p>
            <footer className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 max-w-16 bg-coral/40" />
              <cite className="not-italic text-sm sm:text-base text-coral font-semibold tracking-wide">
                The Prime Minister, Commonwealth of The Bahamas
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────── */}
      <section className="px-6 py-20 sm:py-28 bg-sand/30">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { value: "500+", label: "Target Creators Year 1" },
            { value: "$2M+", label: "Projected Digital Income" },
            { value: "3", label: "Priority Platforms" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`animate-fade-in-scale ${
                i === 0 ? "delay-100" : i === 1 ? "delay-200" : "delay-300"
              } glass rounded-3xl p-8 sm:p-10 text-center shadow-sm`}
            >
              <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold gradient-text">
                {stat.value}
              </p>
              <p className="mt-3 text-sm sm:text-base text-navy/70 tracking-wide uppercase font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROBLEM SECTION ───────────────────────── */}
      <section className="px-6 py-24 sm:py-32 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="animate-fade-in-up text-sm uppercase tracking-[0.25em] text-aqua font-semibold">
              The Challenge
            </p>
            <h2 className="animate-fade-in-up delay-100 text-3xl sm:text-5xl font-extrabold text-navy">
              Why This Matters
            </h2>
            <p className="animate-fade-in-up delay-200 text-navy/75 max-w-2xl mx-auto text-lg leading-relaxed">
              Bahamian creators face systemic obstacles that prevent them from
              fully participating in the global creator economy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {problems.map((p, i) => (
              <div
                key={p.title}
                className={`animate-fade-in-up ${
                  i === 0
                    ? "delay-100"
                    : i === 1
                      ? "delay-200"
                      : i === 2
                        ? "delay-300"
                        : "delay-400"
                } rounded-2xl border border-navy/8 bg-sand/20 p-8 group hover:border-aqua/30 hover:shadow-lg transition-all duration-300`}
              >
                <div className="text-aqua mb-5">{p.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-coral transition-colors">
                  {p.title}
                </h3>
                <p className="text-navy/75 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIVE PILLARS ──────────────────────────── */}
      <section className="px-6 py-24 sm:py-32 bg-navy text-sand">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="animate-fade-in-up text-sm uppercase tracking-[0.25em] text-coral font-semibold">
              Our Approach
            </p>
            <h2 className="animate-fade-in-up delay-100 text-3xl sm:text-5xl font-extrabold text-white">
              Five Pillars of Support
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <div
                key={p.num}
                className={`animate-fade-in-up ${
                  i === 0
                    ? "delay-100"
                    : i === 1
                      ? "delay-200"
                      : i === 2
                        ? "delay-300"
                        : i === 3
                          ? "delay-400"
                          : "delay-500"
                } glass-dark rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300 ${
                  i === 4 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""
                }`}
              >
                <span className="text-5xl sm:text-6xl font-black text-white/[0.06] block mb-2 leading-none select-none">
                  {p.num}
                </span>
                <h3 className="text-xl font-bold text-white mb-3 -mt-4 group-hover:text-aqua transition-colors">
                  {p.title}
                </h3>
                <p className="text-sand/85 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPEAKERS ──────────────────────────────── */}
      <section className="px-6 py-24 sm:py-32 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="animate-fade-in-up text-sm uppercase tracking-[0.25em] text-aqua font-semibold">
              Who You&apos;ll Hear From
            </p>
            <h2 className="animate-fade-in-up delay-100 text-3xl sm:text-5xl font-extrabold text-navy">
              Featured Speakers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {speakers.map((s, i) => {
              const gradients = [
                "from-aqua to-coral",
                "from-coral to-aqua",
                "from-aqua to-sand",
                "from-coral to-sand",
              ];
              return (
                <div
                  key={s.name}
                  className={`animate-fade-in-up ${
                    i === 0
                      ? "delay-100"
                      : i === 1
                        ? "delay-200"
                        : i === 2
                          ? "delay-300"
                          : "delay-400"
                  } ${s.featured ? "md:col-span-6 md:row-span-2" : "md:col-span-6"}`}
                >
                  <div
                    className={`rounded-3xl border border-navy/8 bg-sand/15 p-8 sm:p-10 text-center h-full flex flex-col items-center justify-center group hover:shadow-xl hover:border-aqua/25 transition-all duration-300 ${
                      s.featured ? "py-16 sm:py-20" : ""
                    }`}
                  >
                    {/* Avatar placeholder */}
                    <div
                      className={`rounded-full bg-gradient-to-br ${gradients[i]} flex items-center justify-center mb-6 shadow-lg ${
                        s.featured
                          ? "h-32 w-32 sm:h-40 sm:w-40"
                          : "h-20 w-20 sm:h-24 sm:w-24"
                      }`}
                    >
                      <span
                        className={`font-bold text-white/90 ${
                          s.featured
                            ? "text-3xl sm:text-4xl"
                            : "text-xl sm:text-2xl"
                        }`}
                      >
                        {s.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </span>
                    </div>

                    <h3
                      className={`font-bold text-navy mb-1 ${
                        s.featured
                          ? "text-2xl sm:text-3xl"
                          : "text-lg sm:text-xl"
                      }`}
                    >
                      {s.name}
                    </h3>
                    <p className="text-aqua font-medium text-sm sm:text-base">
                      {s.role}
                    </p>
                    <p className="text-navy/70 text-sm mt-1">{s.tagline}</p>

                    {s.featured && (
                      <div className="mt-6 inline-block rounded-full border border-coral/50 px-5 py-1.5 text-xs uppercase tracking-widest text-coral font-semibold">
                        Headliner
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────── */}
      <section
        id="register"
        className="relative px-6 py-28 sm:py-40 overflow-hidden bg-navy"
      >
        {/* Background gradient animation */}
        <div className="absolute inset-0 animate-gradient-shift bg-gradient-to-br from-aqua/20 via-navy to-coral/20" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-aqua/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-coral/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <h2 className="animate-fade-in-up text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Join the Movement
          </h2>
          <p className="animate-fade-in-up delay-100 text-lg sm:text-xl text-sand/85 max-w-xl mx-auto leading-relaxed">
            Be part of the first cohort of officially supported Bahamian digital
            creators. Secure your spot for the March 29 summit.
          </p>
          <div className="animate-fade-in-up delay-200">
            <a
              href="/register"
              className="cta-gradient animate-pulse-glow inline-block rounded-full px-12 py-5 text-lg sm:text-xl font-bold text-white shadow-2xl transition-all"
            >
              Register Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
