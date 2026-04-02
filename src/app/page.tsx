import Image from "next/image";
import BahamianFlag from "./components/BahamianFlag";
import HeroAnimation from "./components/HeroAnimation";

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

function IconX() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ──────────────────────────────────────────
   Data
   ────────────────────────────────────────── */

const opportunities = [
  {
    icon: <IconPlatform />,
    title: "Platform Opportunity",
    desc: "We're opening doors to global creator platforms for Caribbean users, expanding discoverability and unlocking new monetization paths for Bahamian creators.",
  },
  {
    icon: <IconTax />,
    title: "Tax Clarity Ahead",
    desc: "We're making it simple to navigate international tax treaties and W-8BEN forms so you can focus on creating, not paperwork.",
  },
  {
    icon: <IconPayment />,
    title: "Payment Solutions",
    desc: "We're building better pathways to payment processors, reducing foreign-exchange fees, and streamlining banking so your global earnings reach you faster.",
  },
  {
    icon: <IconGuidance />,
    title: "Government-Backed Support",
    desc: "The government is launching a dedicated framework and resource center to help you build a sustainable career as a digital creator. You won't be doing this alone.",
  },
];

const pillars = [
  {
    num: "01",
    title: "Creator Education",
    desc: "Free guides and resources on 242Creators.com covering platforms, monetization, brand deals, and more. Start learning today.",
  },
  {
    num: "02",
    title: "Industry Panels & Masterclasses",
    desc: "Ongoing events featuring creators, platforms, and industry voices — starting with the X Masterclass on April 17.",
  },
  {
    num: "03",
    title: "Networking & Community",
    desc: "Connect with fellow Bahamian creators, brands, and government leaders building the creator economy together.",
  },
  {
    num: "04",
    title: "Government Creator Partnerships",
    desc: "Verified Bahamian creators will have the opportunity to promote The Bahamas through official social media campaigns, backed by the Office of the Prime Minister.",
  },
  {
    num: "05",
    title: "Platform Access",
    desc: "We're actively working to expand platform eligibility and monetization access for Bahamian creators across all major platforms.",
  },
];

const speakers = [
  {
    name: "The Hon. Philip Edward Davis, KC, MP",
    image: "/speakers/pm-davis.jpeg",
    role: "Keynote Address",
    tagline: "Prime Minister of The Bahamas",
    featured: true,
  },
  {
    name: "U.S. Ambassador Herschel Walker",
    image: "/speakers/herschel-walker.jpeg",
    role: "Speaker I",
    tagline: "United States Ambassador to The Bahamas",
  },
  {
    name: "The Hon. Mia Amor Mottley, KC, MP",
    image: "/speakers/mia-mottley.webp",
    imageZoom: true,
    role: "Guest Speaker",
    tagline: "Prime Minister of Barbados",
  },
  {
    name: "Deputy PM I. Chester Cooper",
    image: "/speakers/chester-cooper.webp",
    role: "Panelist",
    tagline: "Minister of Tourism, Investment and Aviation",
  },
  {
    name: "Jamie Bierman",
    image: "/speakers/jamie-bierman.jpeg",
    role: "Platform Presenter",
    tagline: "X (formerly Twitter)",
  },
  {
    name: "Greg Michelier",
    image: "/speakers/greg-michelier.jpg",
    role: "Closing Remarks",
    tagline: "Ambassador-at-Large to Technology and AI",
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
        <HeroAnimation />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-aqua/15 blur-3xl animate-float" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-coral/12 blur-3xl animate-float delay-500" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-aqua/5 to-coral/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <p className="animate-fade-in-up text-base sm:text-xl md:text-2xl lg:text-3xl tracking-[0.1em] sm:tracking-[0.15em] uppercase text-aqua font-extrabold flex items-center justify-center gap-3 flex-wrap">
            <BahamianFlag width={72} className="rounded-sm shrink-0" />
            <span>An Initiative of the Office of the Prime Minister</span>
          </p>

          <h1 className="animate-fade-in-up delay-100 text-3xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
            <span className="text-navy">The Bahamas</span>
            <br />
            <span className="gradient-text">Creator Economy</span>
            <br />
            <span className="text-navy">Initiative</span>
          </h1>

          <p className="animate-fade-in-up delay-200 text-base sm:text-xl text-navy max-w-2xl mx-auto leading-relaxed">
            Your hub for opportunities, education, and resources. Empowering Bahamian creators to build, monetize, and thrive on global digital platforms.
          </p>

          <div className="animate-fade-in-up delay-300 pt-6 space-y-4">
            <a
              href="/x-masterclass"
              className="cta-gradient animate-pulse-glow inline-block rounded-full px-8 sm:px-10 py-4 text-base sm:text-xl font-bold text-white shadow-2xl transition-all"
            >
              Next Up: X Masterclass
            </a>
            <p className="text-sm text-navy/70 font-medium">
              April 17 at 6:00 PM &middot; Free for all Bahamian Creators
            </p>
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
                Philip Brave Davis, Prime Minister, Commonwealth of The Bahamas
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── X MASTERCLASS PROMO ────────────────────── */}
      <section className="px-6 py-24 sm:py-32 bg-navy text-white overflow-hidden relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-aqua/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-coral/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <p className="animate-fade-in-up text-xl sm:text-3xl md:text-4xl uppercase tracking-[0.15em] sm:tracking-[0.2em] text-aqua font-extrabold">
              Next Up
            </p>
            <h2 className="animate-fade-in-up delay-100 text-2xl sm:text-5xl font-extrabold text-white">
              Free X Masterclass for Bahamian Creators
            </h2>
          </div>

          <div className="animate-fade-in-up delay-200 glass-dark rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/10 text-white">
                <IconX />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-white">X Masterclass</p>
                <p className="text-sm text-sand/70">with Jamie Bierman</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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

            <div className="space-y-3 mb-8 text-sand/90">
              <p className="leading-relaxed">
                Following Sunday&apos;s 242 Influencers and Creative Conference, X has committed to hosting a free Masterclass for Bahamian creators and influencers.
              </p>
              <p className="leading-relaxed">
                Learn directly from X on how to <strong className="text-white">grow</strong>, <strong className="text-white">monetize</strong>, and <strong className="text-white">build your presence</strong> on the platform.
              </p>
            </div>

            {/* Contest callout */}
            <div className="rounded-2xl bg-gradient-to-r from-aqua/10 to-coral/10 border border-aqua/20 p-5 sm:p-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5 text-coral">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-white text-lg mb-1">Win a Lifetime X Premium Subscription</p>
                  <p className="text-sand/80 text-sm leading-relaxed">
                    Creators who attend and sign up to X will have the chance to enter a contest judged by X. The winner receives a lifetime subscription to X Premium — unlocking brand deals, monetization features, and global visibility.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/x-masterclass"
                className="cta-gradient inline-block rounded-full px-8 sm:px-12 py-4 text-base sm:text-lg font-bold text-white shadow-2xl transition-all"
              >
                Learn More & Register
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── EVENT RECAP ──────────────────────────────── */}
      <section className="px-6 py-24 sm:py-32 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <p className="animate-fade-in-up text-xl sm:text-3xl md:text-4xl uppercase tracking-[0.15em] sm:tracking-[0.2em] text-aqua font-extrabold">
              What We Built
            </p>
            <h2 className="animate-fade-in-up delay-100 text-2xl sm:text-5xl font-extrabold text-navy">
              242 Influencers & Creative Conference
            </h2>
            <p className="animate-fade-in-up delay-200 text-navy/70 text-base sm:text-lg max-w-2xl mx-auto">
              March 29, 2026 at Baha Mar Convention Center, Nassau
            </p>
          </div>

          {/* Quote */}
          <div className="animate-fade-in-up delay-200 max-w-3xl mx-auto mb-12">
            <blockquote className="text-center">
              <p className="text-lg sm:text-2xl font-medium text-navy italic leading-relaxed">
                &ldquo;This is exactly what we set out to achieve. Not just a conversation — but real, tangible opportunities for Bahamian creators.&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Speaker highlights from the event */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {speakers.map((s) => (
              <div
                key={s.name}
                className="animate-fade-in-up rounded-2xl border border-navy/8 bg-sand/15 p-4 text-center group hover:shadow-lg hover:border-aqua/25 transition-all duration-300"
              >
                <div className="relative rounded-full bg-gradient-to-br from-aqua to-coral h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-3 overflow-hidden shadow-lg">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    className={`object-cover ${s.imageZoom ? "scale-[1.6] translate-y-[30%]" : "object-top"}`}
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-navy leading-tight">{s.name}</h3>
                <p className="text-[10px] sm:text-xs text-navy/60 mt-1">{s.tagline}</p>
              </div>
            ))}
          </div>

          {/* Recap CTA */}
          <div className="text-center">
            <a
              href="/recap"
              className="inline-block rounded-full border-2 border-navy px-8 py-3 text-base font-bold text-navy hover:bg-navy hover:text-white transition-all"
            >
              View Full Recap
            </a>
          </div>
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
              } glass rounded-3xl p-6 sm:p-10 text-center shadow-sm`}
            >
              <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold gradient-text">
                {stat.value}
              </p>
              <p className="mt-3 text-sm sm:text-base text-navy tracking-wide uppercase font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OPPORTUNITY SECTION ──────────────────────── */}
      <section className="px-6 py-24 sm:py-32 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="animate-fade-in-up text-xl sm:text-3xl md:text-4xl uppercase tracking-[0.15em] sm:tracking-[0.2em] text-aqua font-extrabold">
              The Opportunity
            </p>
            <h2 className="animate-fade-in-up delay-100 text-2xl sm:text-5xl font-extrabold text-navy">
              Why This Matters
            </h2>
            <p className="animate-fade-in-up delay-200 text-navy/90 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Here&apos;s what we&apos;re solving so Bahamian creators can fully
              thrive in the global creator economy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {opportunities.map((p, i) => (
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
                } rounded-2xl border border-navy/8 bg-sand/20 p-5 sm:p-8 group hover:border-aqua/30 hover:shadow-lg transition-all duration-300`}
              >
                <div className="text-aqua mb-5">{p.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-coral transition-colors">
                  {p.title}
                </h3>
                <p className="text-navy/90 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIVE PILLARS ──────────────────────────── */}
      <section className="px-6 py-24 sm:py-32 bg-navy text-sand">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="animate-fade-in-up text-xl sm:text-3xl md:text-4xl uppercase tracking-[0.15em] sm:tracking-[0.2em] text-coral font-extrabold">
              Our Approach
            </p>
            <h2 className="animate-fade-in-up delay-100 text-2xl sm:text-5xl font-extrabold text-white">
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
                } glass-dark rounded-2xl p-5 sm:p-8 group hover:bg-white/10 transition-all duration-300 ${
                  i === 4 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""
                }`}
              >
                <span className="text-5xl sm:text-6xl font-black text-white/30 block mb-2 leading-none select-none">
                  {p.num}
                </span>
                <h3 className="text-xl font-bold text-white mb-3 -mt-4 group-hover:text-aqua transition-colors">
                  {p.title}
                </h3>
                <p className="text-sand leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────── */}
      <section className="relative px-6 py-28 sm:py-40 overflow-hidden bg-navy">
        <div className="absolute inset-0 animate-gradient-shift bg-gradient-to-br from-aqua/20 via-navy to-coral/20" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-aqua/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-coral/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <h2 className="animate-fade-in-up text-2xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            This Is Your Moment
          </h2>
          <p className="animate-fade-in-up delay-100 text-base sm:text-xl text-sand max-w-xl mx-auto leading-relaxed">
            The Government of The Bahamas is standing behind its digital creators with real resources, real training, and real opportunity. This is a movement.
          </p>
          <div className="animate-fade-in-up delay-200 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/x-masterclass"
              className="cta-gradient animate-pulse-glow inline-block rounded-full px-8 sm:px-12 py-5 text-base sm:text-xl font-bold text-white shadow-2xl transition-all"
            >
              Register for X Masterclass
            </a>
            <a
              href="/learn"
              className="inline-block rounded-full border-2 border-white/30 px-8 py-4 text-base sm:text-lg font-bold text-white hover:bg-white/10 transition-all"
            >
              Start Learning
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
