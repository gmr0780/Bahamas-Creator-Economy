import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-navy text-sand">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-3xl font-extrabold text-white mb-8">Terms of Use</h1>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Acceptance of Terms</h2>
            <p>By accessing and using 242Creators.com, you agree to these Terms of Use. If you do not agree, please do not use this website.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Use of Website</h2>
            <p>This website is provided for informational and event registration purposes related to the Bahamas Creator Economy Initiative. You agree to use it only for lawful purposes and in accordance with these terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Registration</h2>
            <p>By submitting a registration, you confirm that the information you provide is accurate and complete. Registration is subject to capacity limits and approval. Submitting a registration does not guarantee admission to the event.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, and design, is the property of the Bahamas Creator Economy Initiative or its licensors and is protected by applicable intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Disclaimer of Warranties</h2>
            <p>This website is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of harmful components.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, 242Creators.com and its operators shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Governing Law</h2>
            <p>These terms are governed by the laws of the Commonwealth of The Bahamas.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Contact</h2>
            <p>Questions about these terms: <a href="mailto:info@242creators.com" className="text-aqua underline">info@242creators.com</a></p>
          </section>

          <p className="text-xs text-sand/70 pt-4">Last updated: March 2026</p>
        </div>
      </div>
    </div>
  );
}
