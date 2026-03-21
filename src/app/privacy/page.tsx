import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-navy text-sand">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-3xl font-extrabold text-white mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Information We Collect</h2>
            <p>When you register for the Bahamas Creator Economy Launch event, we collect the following information: full name, email address, phone number, primary social media platform, social media handle, follower count range, content niche, current monetization status, and learning interests. This information is collected solely for the purpose of event registration and programme planning.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">How We Use Your Information</h2>
            <p>Your personal information is used to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Process and confirm your event registration</li>
              <li>Communicate event details, updates, and logistics</li>
              <li>Plan and tailor event programming to attendee interests</li>
              <li>Contact you about future Creator Economy Initiative programmes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Data Sharing</h2>
            <p>We do not sell your personal information. Registration data may be shared with the Office of the Prime Minister and event partners solely for event coordination and programme delivery purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Data Security</h2>
            <p>We implement reasonable technical and organisational measures to protect your personal information. Registration data is stored in secure, encrypted databases.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal information at any time by contacting us at <a href="mailto:info@242creators.com" className="text-aqua underline">info@242creators.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-aqua mb-2">Contact</h2>
            <p>For privacy-related questions, contact: <a href="mailto:info@242creators.com" className="text-aqua underline">info@242creators.com</a></p>
          </section>

          <p className="text-xs text-sand/70 pt-4">Last updated: March 2026</p>
        </div>
      </div>
    </div>
  );
}
