import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Revenue Potential & Tax Guide | Bahamas Creator Economy Initiative",
  description:
    "Illustrative earnings estimates for Bahamian creators by niche, plus an educational overview of U.S. tax considerations for non-resident creators.",
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

const MAX_RPM = 35;

function NicheBar({ niche }: { niche: Niche }) {
  const widthPct = Math.round((niche.high / MAX_RPM) * 100);

  return (
    <div className="group">
      <div className="mb-2 flex items-baseline justify-between">
        <p className="font-semibold text-sand">{niche.name}</p>
        <p className="text-sm font-bold text-aqua">
          ${niche.low} &ndash; ${niche.high}+
        </p>
      </div>
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-aqua/20"
          style={{ width: `${widthPct}%` }}
        />
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
        <p className="text-sm leading-relaxed text-sand">{description}</p>
      </div>
    </div>
  );
}

export default function EarnPage() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Hero */}
      <section className="hero-mesh relative px-6 pb-32 pt-24 text-center">
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-navy/50 to-navy" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="mb-3 text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-aqua">
            Bahamas Creator Economy
          </p>
          <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-navy sm:text-4xl md:text-5xl">
            Revenue Potential{" "}
            <span className="gradient-text">&amp; Tax Guide</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-navy">
            Illustrative earning potential for Bahamian creators and an educational overview of key tax considerations
          </p>
        </div>
      </section>

      {/* ─── Section A: Revenue Potential ─── */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="mb-2 text-lg sm:text-2xl md:text-3xl font-extrabold uppercase tracking-[0.15em] text-coral">
          Section A
        </h2>
        <h3 className="mb-4 text-2xl sm:text-3xl font-bold text-sand">
          Top Earning Niches{" "}
          <span className="text-sand">(Estimated RPM in USD)</span>
        </h3>
        <p className="mb-10 text-sm text-sand italic">
          RPM (Revenue Per Mille) estimates are illustrative ranges based on publicly available industry benchmarks as of early 2026. Actual RPMs vary significantly by platform, audience geography, niche, seasonality, content format, and individual creator performance. These figures are not guarantees of earnings.
        </p>

        <div className="space-y-6">
          {niches.map((n) => (
            <NicheBar key={n.name} niche={n} />
          ))}
        </div>

        {/* Income scenario callout */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-aqua/20 bg-gradient-to-br from-aqua/10 to-coral/5">
          <div className="border-b border-aqua/20 px-4 sm:px-8 py-5">
            <h4 className="text-base sm:text-lg font-bold text-aqua">
              Illustrative Scenario: Finance Creator on YouTube
            </h4>
            <p className="text-xs text-sand mt-1 italic">
              This is a hypothetical example for educational purposes only. Individual results will vary.
            </p>
          </div>
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Monthly Views", value: "100,000" },
              { label: "Est. RPM", value: "$20.00" },
              { label: "Est. Ad Revenue", value: "$2,000/mo" },
              { label: "Assumed U.S. Share (30%)", value: "$600" },
              { label: "U.S. Withholding (30% of $600)", value: "\u2212$180" },
              { label: "Est. Sponsorships", value: "+$1,500/mo" },
            ].map((item) => (
              <div
                key={item.label}
                className="border-b border-white/5 px-4 sm:px-8 py-4 sm:py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-sand">
                  {item.label}
                </p>
                <p className="text-lg sm:text-xl font-bold text-sand">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-aqua/20 bg-aqua/5 px-4 sm:px-8 py-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-1 sm:gap-0">
              <p className="text-sm font-semibold uppercase tracking-widest text-sand">
                Illustrative Net
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-aqua">
                ~$3,320<span className="text-base sm:text-lg text-sand">/month</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section B: U.S. Tax Considerations ─── */}
      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-lg sm:text-2xl md:text-3xl font-extrabold uppercase tracking-[0.15em] text-coral">
            Section B
          </h2>
          <h3 className="mb-4 text-2xl sm:text-3xl font-bold text-sand">
            U.S. Tax Considerations for Bahamian Creators
          </h3>
          <div className="mb-12 rounded-xl bg-amber-500/10 border border-amber-500/25 px-5 py-4">
            <p className="text-sm leading-relaxed text-amber-200 font-medium">
              <span className="font-bold">Important:</span> The information below is for educational purposes only and does not constitute tax or legal advice. Tax treatment varies by platform, payment type, and personal circumstances. Creators should consult a qualified tax professional for guidance specific to their situation.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Steps */}
            <div className="space-y-8">
              <TaxStep
                step={1}
                title="U.S. Tax Documentation (W-8BEN)"
                description="Bahamian creators earning through U.S.-based platforms such as YouTube may be required to submit Form W-8BEN to document non-U.S. status. Depending on the platform and context, a Bahamian Tax Identification Number (TIN) or other identifying information may be requested. Check your platform's specific requirements."
              />
              <TaxStep
                step={2}
                title="Understanding Platform Withholding"
                description="For YouTube/Google AdSense specifically, Google has stated that withholding may apply to the portion of revenue attributed to U.S.-based viewers. Tax treatment may differ on other platforms and for other revenue types (e.g., sponsorships, affiliate income). Confirm details directly with each platform."
              />
              <TaxStep
                step={3}
                title="Audience Geography &amp; Revenue"
                description="Your audience's geographic distribution can affect your platform revenue mix. Understanding how geography impacts your earnings is valuable context. For any tax planning decisions, consult a qualified tax professional."
              />
            </div>

            {/* Tax example box */}
            <div className="glass-dark rounded-2xl p-5 sm:p-8">
              <h4 className="mb-2 text-lg font-bold text-aqua">
                Illustrative Example: YouTube AdSense
              </h4>
              <p className="mb-6 text-xs text-sand italic">
                Based on Google&apos;s publicly documented AdSense withholding for non-U.S. creators. This example is for educational illustration only.
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <span className="text-sand font-medium">Total AdSense Earnings</span>
                  <span className="font-bold text-white">$1,000</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <span className="text-sand font-medium">Revenue from U.S. Viewers (est.)</span>
                  <span className="font-bold text-white">$300</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <span className="text-sand font-medium">
                    U.S. Withholding (30% of U.S. portion)
                  </span>
                  <span className="font-bold text-coral">&minus;$90</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-semibold text-white">Illustrative Net Payout</span>
                  <span className="text-2xl font-extrabold text-aqua">$910</span>
                </div>
              </div>

            </div>
          </div>

          {/* Sources */}
          <div className="mt-12 rounded-xl bg-white/5 border border-white/10 px-5 py-4">
            <h4 className="text-sm font-bold text-sand mb-2">Sources &amp; References</h4>
            <ul className="text-xs text-sand space-y-1 list-disc pl-4">
              <li>IRS Form W-8BEN: <span className="text-aqua">irs.gov/forms-pubs/about-form-w-8-ben</span></li>
              <li>Google AdSense Tax Info for Non-U.S. Creators: <span className="text-aqua">support.google.com/adsense (Managing U.S. tax info)</span></li>
              <li>RPM ranges: Industry benchmarks from publicly available creator economy reports, early 2026. Actual results vary.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-sand sm:text-3xl">
            Turn views into real income
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sand">
            Join the Bahamas Creator Economy Launch on March 29 for keynotes, panels, and networking with creators, government leaders, and platform partners.
          </p>
          <Link
            href="/retrieve"
            className="cta-gradient inline-block rounded-full px-6 sm:px-8 py-4 text-base sm:text-lg font-bold text-white shadow-lg"
          >
            Retrieve My Pass
          </Link>
        </div>
      </section>
    </div>
  );
}
