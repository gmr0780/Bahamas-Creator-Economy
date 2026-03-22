import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Creator Platforms Directory | Bahamas Creator Economy",
  description:
    "Platforms where creators connect with brands for paid partnerships. A neutral resource directory for Bahamian creators.",
};

interface Platform {
  name: string;
  letter: string;
  gradient: string;
  description: string;
  bestFor: string;
}

const platforms: Platform[] = [
  {
    name: "Agentio",
    letter: "A",
    gradient: "from-aqua to-cyan-300",
    description:
      "AI-native platform for creator advertising. Connects creators with premium brands across Instagram and YouTube using artificial intelligence to match campaigns with the right voices.",
    bestFor:
      "Creators with established audiences looking for premium brand partnerships.",
  },
  {
    name: "AspireIQ",
    letter: "A",
    gradient: "from-purple-500 to-pink-400",
    description:
      "Community-driven influencer marketing platform that helps creators build long-term brand relationships rather than one-off campaigns. Strong focus on authentic partnerships.",
    bestFor: "Lifestyle, beauty, and fashion creators.",
  },
  {
    name: "CreatorIQ",
    letter: "C",
    gradient: "from-coral to-orange-300",
    description:
      "Enterprise influencer marketing platform used by major brands and agencies worldwide. Connects creators with Fortune 500 companies and large-scale campaigns.",
    bestFor:
      "Creators with larger audiences (50K+) seeking Fortune 500 partnerships.",
  },
  {
    name: "Grin",
    letter: "G",
    gradient: "from-green-400 to-emerald-500",
    description:
      "Creator management platform focused on e-commerce brands. Integrates directly with Shopify stores to track performance and manage creator relationships end-to-end.",
    bestFor:
      "Creators in product review, unboxing, and lifestyle niches.",
  },
  {
    name: "Klear",
    letter: "K",
    gradient: "from-blue-400 to-indigo-500",
    description:
      "Influencer marketing platform with strong analytics and data capabilities. Helps brands find creators based on detailed audience insights and performance metrics.",
    bestFor:
      "Data-driven creators who want to showcase their metrics.",
  },
  {
    name: "Hashtag Paid (#paid)",
    letter: "#",
    gradient: "from-rose-400 to-red-500",
    description:
      "Marketplace connecting creators directly with brands for sponsored content opportunities. Streamlined process from discovery to payment with transparent pricing.",
    bestFor:
      "Micro and mid-tier creators (5K\u2013500K followers).",
  },
  {
    name: "Collabstr",
    letter: "C",
    gradient: "from-amber-400 to-yellow-500",
    description:
      "Freelance marketplace for influencers with simple, direct bookings. Brands browse creator profiles and book collaborations without lengthy negotiations.",
    bestFor: "Creators just starting with brand deals.",
  },
  {
    name: "Stan Store",
    letter: "S",
    gradient: "from-aqua to-teal-400",
    description:
      "Not a marketplace but a monetization platform for selling digital products, bookings, and memberships directly from your link in bio. All-in-one creator storefront.",
    bestFor:
      "Creators wanting to sell their own products and services.",
  },
];

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Hero */}
      <section className="hero-mesh relative px-6 pb-24 pt-24 text-center">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-navy" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="mb-3 text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-aqua">
            Bahamas Creator Economy
          </p>
          <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-navy sm:text-4xl md:text-5xl">
            Creator Platforms{" "}
            <span className="gradient-text">Directory</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-navy">
            Platforms where creators connect with brands for paid partnerships
          </p>
        </div>
      </section>

      {/* Platform Cards Grid */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="glass-dark rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-aqua/10 hover:border-aqua/30 flex flex-col"
            >
              {/* Logo placeholder */}
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${platform.gradient} text-2xl font-extrabold text-white shadow-lg`}
              >
                {platform.letter}
              </div>

              <h3 className="mb-2 text-lg font-bold text-sand">
                {platform.name}
              </h3>

              <p className="mb-4 text-sm leading-relaxed text-sand/80">
                {platform.description}
              </p>

              <div className="mt-auto">
                <p className="text-xs font-semibold uppercase tracking-wider text-aqua mb-1">
                  Best for
                </p>
                <p className="text-sm text-sand/70">{platform.bestFor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
          <p className="text-sm text-sand/60 leading-relaxed">
            This is an informational resource. 242Creators.com is not affiliated
            with, endorsed by, or partnered with any of the platforms listed.
            Creators should research each platform independently.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-12 sm:py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-sand sm:text-3xl">
            Ready to connect with brands?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sand">
            Join our upcoming event to learn directly from successful creators
            and industry experts about landing brand partnerships.
          </p>
          <Link
            href="/register"
            className="cta-gradient inline-block rounded-full px-6 sm:px-8 py-4 text-base sm:text-lg font-bold text-white shadow-lg"
          >
            Register for the Event
          </Link>
        </div>
      </section>
    </div>
  );
}
