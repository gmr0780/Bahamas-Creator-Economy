import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Platform Eligibility | Bahamas Creator Economy Initiative",
  description:
    "Where Bahamian creators can earn direct platform revenue today. YouTube, Twitch, TikTok, Meta, X and more.",
};

type PlatformStatus = "AVAILABLE" | "NOT ELIGIBLE" | "HIGH THRESHOLD";

interface Platform {
  name: string;
  status: PlatformStatus;
  requirements: string;
  rpm: string;
  payout: string;
}

const platforms: Platform[] = [
  {
    name: "YouTube Partner Program",
    status: "AVAILABLE",
    requirements:
      "1,000 subs + 4,000 watch hours or 10M Shorts views",
    rpm: "$0.25 \u2013 $5",
    payout: "AdSense (SWIFT)",
  },
  {
    name: "Twitch Affiliate",
    status: "AVAILABLE",
    requirements:
      "25 followers, avg 3 viewers, 4 broadcast days/month",
    rpm: "$3.50 \u2013 $5",
    payout: "PayPal / Wire",
  },
  {
    name: "Meta CMP",
    status: "NOT ELIGIBLE",
    requirements:
      "Not available in The Bahamas. Meta unified all programs into CMP in late 2025.",
    rpm: "N/A",
    payout: "N/A",
  },
  {
    name: "TikTok Creator Rewards",
    status: "NOT ELIGIBLE",
    requirements:
      "Not available in The Bahamas. Pivot to brand sponsorships.",
    rpm: "N/A",
    payout: "N/A",
  },
  {
    name: "X (Twitter) Revenue",
    status: "HIGH THRESHOLD",
    requirements:
      "Bahamas eligible. Requires 5M impressions per 90 days.",
    rpm: "Low",
    payout: "Stripe only",
  },
  {
    name: "Instagram Reels",
    status: "NOT ELIGIBLE",
    requirements:
      "Falls under Meta\u2019s unified CMP. Check Creator Studio for updates.",
    rpm: "N/A",
    payout: "N/A",
  },
];

function StatusBadge({ status }: { status: PlatformStatus }) {
  const styles: Record<PlatformStatus, string> = {
    AVAILABLE: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "NOT ELIGIBLE": "bg-red-500/20 text-red-400 border-red-500/30",
    "HIGH THRESHOLD": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  };

  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PlatformCard({ platform }: { platform: Platform }) {
  const borderAccent: Record<PlatformStatus, string> = {
    AVAILABLE: "border-t-emerald-500",
    "NOT ELIGIBLE": "border-t-red-500",
    "HIGH THRESHOLD": "border-t-amber-500",
  };

  const isAvailable = platform.status === "AVAILABLE";

  return (
    <div
      className={`glass rounded-2xl border-t-4 ${borderAccent[platform.status]} p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-aqua/10`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold text-sand">{platform.name}</h3>
        <StatusBadge status={platform.status} />
      </div>

      <p className="mb-5 text-sm leading-relaxed text-sand/70">
        {platform.requirements}
      </p>

      <div className="flex gap-4">
        <div className="flex-1 rounded-xl bg-white/5 px-4 py-3">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-sand/40">
            RPM
          </p>
          <p
            className={`text-sm font-bold ${isAvailable ? "text-aqua" : "text-sand/40"}`}
          >
            {platform.rpm}
          </p>
        </div>
        <div className="flex-1 rounded-xl bg-white/5 px-4 py-3">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-sand/40">
            Payout
          </p>
          <p
            className={`text-sm font-bold ${isAvailable ? "text-aqua" : "text-sand/40"}`}
          >
            {platform.payout}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PlatformsPage() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Hero header */}
      <section className="hero-mesh px-6 pb-16 pt-24 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-aqua">
          Bahamas Creator Economy
        </p>
        <h1 className="mx-auto max-w-2xl text-4xl font-extrabold leading-tight text-sand sm:text-5xl">
          Platform{" "}
          <span className="gradient-text">Eligibility</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-sand/60">
          Where Bahamian creators can earn direct platform revenue today
        </p>
      </section>

      {/* Platform cards grid */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <PlatformCard key={p.name} platform={p} />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-sand/50">
          <span className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-emerald-500" />
            Available
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-amber-500" />
            High Threshold
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-red-500" />
            Not Eligible
          </span>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold text-sand sm:text-3xl">
          Ready to start earning?
        </h2>
        <p className="mx-auto mb-8 max-w-md text-sand/60">
          Join our live workshop and learn exactly how to get accepted on
          every eligible platform.
        </p>
        <Link
          href="/#register"
          className="cta-gradient inline-block rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg"
        >
          Register for the Event
        </Link>
      </section>
    </div>
  );
}
