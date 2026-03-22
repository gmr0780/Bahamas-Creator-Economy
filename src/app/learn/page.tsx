import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "../../lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Creator Education Hub | Bahamas Creator Economy",
  description:
    "Everything you need to start, grow, and earn as a Bahamian digital creator. Free guides on platforms, monetization, brand deals, and more.",
};

export default async function LearnPage() {
  const guides = await prisma.guide.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-navy">
      {/* Hero */}
      <section className="hero-mesh px-6 pb-16 pt-24 text-center">
        <p className="mb-3 text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-aqua">
          Bahamas Creator Economy
        </p>
        <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-navy sm:text-4xl md:text-5xl">
          Creator Education{" "}
          <span className="gradient-text">Hub</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-navy">
          Everything you need to start, grow, and earn as a Bahamian digital
          creator
        </p>
      </section>

      {/* Guide Cards Grid */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        {guides.length === 0 ? (
          <p className="text-center text-sand/60 text-lg py-12">
            Guides coming soon. Check back shortly!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={`/learn/${guide.slug}`}
                className="glass-dark group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-aqua/10 hover:border-aqua/30 flex items-start gap-4"
              >
                <div className="text-3xl shrink-0 mt-0.5">{guide.icon}</div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-sand group-hover:text-aqua transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-sand leading-relaxed">
                    {guide.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold text-sand sm:text-3xl">
          Ready to start your creator journey?
        </h2>
        <p className="mx-auto mb-8 max-w-md text-sand">
          Join our upcoming event to learn directly from successful creators and
          industry experts.
        </p>
        <Link
          href="/register"
          className="cta-gradient inline-block rounded-full px-6 sm:px-8 py-4 text-base sm:text-lg font-bold text-white shadow-lg"
        >
          Register for the Event
        </Link>
      </section>
    </div>
  );
}
