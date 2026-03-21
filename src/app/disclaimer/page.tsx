import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-navy text-sand">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-3xl font-extrabold text-white mb-8">Disclaimer</h1>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Educational Information Only</h2>
            <p>The content on 242Creators.com is provided for educational and informational purposes only. Nothing on this website constitutes tax advice, legal advice, financial advice, or any other form of professional advice. You should not act or refrain from acting based on any information on this website without first seeking professional advice specific to your circumstances.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Earnings Estimates</h2>
            <p>All revenue projections, RPM (Revenue Per Mille) figures, income scenarios, and financial examples presented on this website are illustrative estimates based on publicly available industry benchmarks. They are not guarantees or promises of earnings. Actual creator income varies significantly based on platform, audience geography, content niche, seasonality, content format, engagement rates, and many other factors. Past performance or industry averages do not predict individual results.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Tax Information</h2>
            <p>Tax-related information on this website is a general educational overview and should not be relied upon as tax advice. Tax treatment varies by platform, payment type, treaty status, and personal circumstances. Information about U.S. withholding, Form W-8BEN, and related topics is based on publicly available IRS and platform documentation and may change. Creators should consult a qualified tax professional and confirm requirements directly with each platform.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Platform Information</h2>
            <p>Information about platform eligibility, requirements, and monetization programs is based on publicly available documentation from the respective platforms and may change without notice. We recommend verifying current requirements directly with each platform before taking action.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Government Affiliation</h2>
            <p>The Bahamas Creator Economy Initiative is presented in collaboration with the Office of the Prime Minister, Commonwealth of The Bahamas. For official government information, please visit the official government website at <a href="https://opm.gov.bs" className="text-aqua underline">opm.gov.bs</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">No Liability</h2>
            <p>To the fullest extent permitted by law, 242Creators.com and its operators disclaim all liability for any loss or damage arising from the use of, or reliance on, the information provided on this website.</p>
          </section>

          <p className="text-xs text-sand/70 pt-4">Last updated: March 2026</p>
        </div>
      </div>
    </div>
  );
}
