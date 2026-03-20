import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Revenue Potential & Tax Guide | Bahamas Creator Economy Initiative",
  description:
    "How much Bahamian creators can earn by niche, plus a concise U.S. tax guide for non-resident creators.",
};

interface Niche {
  name: string;
  low: number;
  high: number;
}

const niches: Niche[] = [
  { name: "Finance / Investing", low: 15, high: 30 },
  { name: "Business / Entrepreneurship", low: 10, high: 25 },
  { name: "Technology & AI Reviews", low: 6, high: 20 },
  { name: "Legal / Insurance", low: 10, high: 20 },
  { name: "Real Estate", low: 6, high: 15 },
  { name: "Health & Fitness", low: 3, high: 10 },
];

const MAX_RPM = 35; // scale reference

function NicheBar({ niche }: { niche: Niche }) {
  const widthPct = Math.round((niche.high / MAX_RPM) * 100);
  const startPct = Math.round((niche.low / MAX_RPM) * 100);

  return (
    <div className="group">
      <div className="mb-2 flex items-baseline justify-between">
        <p className="font-semibold text-sand">{niche.name}</p>
        <p className="text-sm font-bold text-aqua">
          ${niche.low} &ndash; ${niche.high}+
        </p>
      </div>
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-white/10">
        {/* low range faint fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-aqua/20"
          style={{ width: `${widthPct}%` }}
        />
        {/* high range solid fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-aqua to-coral transition-all duration-500 group-hover:brightness-110"
          style={{ width: `${widthPct}%` }}
        />
      </div>
    </div>
  );
}

function TaxStep({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-aqua to-coral text-lg font-extrabold text-white shadow-lg">
        {step}
      </div>
      <div>
        <h4 className="mb-1 text-lg font-bold text-sand">{title}</h4>
        <p className="text-sm leading-relaxed text-sand/60">{description}</p>
      </div>
    </div>
  );
}

export default function EarnPage() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Hero */}
      <section className="hero-mesh px-6 pb-16 pt-24 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-aqua">
          Bahamas Creator Economy
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-sand sm:text-5xl">
          Revenue Potential{" "}
          <span className="gradient-text">&amp; Tax Guide</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-sand/60">
          What Bahamian creators can realistically earn and how to keep more of
          it
        </p>
      </section>

      {/* ─── Section A: Revenue Potential ─── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-coral">
          Section A
        </h2>
        <h3 className="mb-10 text-3xl font-bold text-sand">
          Top Earning Niches{" "}
          <span className="text-sand/40">(RPM in USD)</span>
        </h3>

        <div className="space-y-6">
          {niches.map((n) => (
            <NicheBar key={n.name} niche={n} />
          ))}
        </div>

        {/* Income scenario callout */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-aqua/20 bg-gradient-to-br from-aqua/10 to-coral/5">
          <div className="border-b border-aqua/20 px-8 py-5">
            <h4 className="text-lg font-bold text-aqua">
              Income Scenario: Finance Creator on YouTube
            </h4>
          </div>
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-5">
            {[
              { label: "Monthly Views", value: "100,000" },
              { label: "RPM", value: "$20.00" },
              { label: "Platform Revenue", value: "$2,000/mo" },
              { label: "U.S. Withholding (~9%)", value: "\u2212$180" },
              { label: "Sponsorships", value: "+$1,500/mo" },
            ].map((item) => (
              <div
                key={item.label}
                className="border-b border-white/5 px-8 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-sand/40">
                  {item.label}
                </p>
                <p className="text-xl font-bold text-sand">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-aqua/20 bg-aqua/5 px-8 py-5">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-semibold uppercase tracking-widest text-sand/50">
                Estimated Net
              </p>
              <p className="text-3xl font-extrabold text-aqua">
                ~$3,320<span className="text-lg text-sand/50">/month</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section B: U.S. Tax Navigation ─── */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-coral">
            Section B
          </h2>
          <h3 className="mb-12 text-3xl font-bold text-sand">
            U.S. Tax Navigation for Bahamian Creators
          </h3>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Steps */}
            <div className="space-y-8">
              <TaxStep
                step={1}
                title="Submit W-8BEN"
                description="Establishes your non-resident alien status with U.S. platforms. You will need your Bahamian Tax Identification Number (TIN) to complete the form."
              />
              <TaxStep
                step={2}
                title="Understand Withholding"
                description="Only revenue generated from U.S.-based viewers is subject to the 30% withholding tax. Revenue from viewers in other countries is not taxed by the U.S."
              />
              <TaxStep
                step={3}
                title="Optimize Audience Geography"
                description="Strategically grow your non-U.S. audience segments -- target the UK, Canada, and Australia to minimize withholding while maintaining high RPMs."
              />
            </div>

            {/* Tax example box */}
            <div className="glass rounded-2xl p-8">
              <h4 className="mb-6 text-lg font-bold text-aqua">
                Tax Example: $1,000 AdSense Month
              </h4>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-sand/70">Total AdSense Earnings</span>
                  <span className="font-bold text-sand">$1,000</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-sand/70">Revenue from U.S. Viewers</span>
                  <span className="font-bold text-sand">$300</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-sand/70">
                    U.S. Withholding (30% of $300)
                  </span>
                  <span className="font-bold text-coral">&minus;$90</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-semibold text-sand">Net Payout</span>
                  <span className="text-2xl font-extrabold text-aqua">$910</span>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-5 py-4">
                <p className="text-sm leading-relaxed text-emerald-400">
                  <span className="font-bold">Bahamas Advantage:</span> The
                  Bahamas has no personal income tax. Your $910 net payout is
                  yours to keep -- no further local tax liability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold text-sand sm:text-3xl">
          Turn views into real income
        </h2>
        <p className="mx-auto mb-8 max-w-md text-sand/60">
          Our workshop walks you through every step -- from platform
          applications to tax forms to your first brand deal.
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
