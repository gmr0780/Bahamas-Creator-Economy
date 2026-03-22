import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/db";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = await prisma.guide.findUnique({
    where: { slug, published: true },
  });

  if (!guide) return { title: "Guide Not Found" };

  return {
    title: `${guide.title} | Bahamas Creator Economy`,
    description: guide.subtitle,
  };
}

/* ── Simple content renderer ──────────────────────── */

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === "") {
      i++;
      continue;
    }

    // H2 heading
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="mt-10 mb-4 text-2xl font-bold text-aqua sm:text-3xl"
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3 heading
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={key++}
          className="mt-8 mb-3 text-xl font-bold text-sand sm:text-2xl"
        >
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Bullet list: collect consecutive list items
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="mb-4 space-y-2 pl-5">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="text-sand/90 leading-relaxed list-disc marker:text-aqua"
            >
              {renderInlineFormatting(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="mb-4 text-sand/90 leading-relaxed">
        {renderInlineFormatting(line)}
      </p>
    );
    i++;
  }

  return elements;
}

function renderInlineFormatting(text: string): React.ReactNode {
  // Split on **bold** markers
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;

  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-sand">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

/* ── Page component ───────────────────────────────── */

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;

  const guide = await prisma.guide.findUnique({
    where: { slug, published: true },
  });

  if (!guide) notFound();

  // Fetch all guides for prev/next navigation
  const allGuides = await prisma.guide.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: { slug: true, title: true, order: true },
  });

  const currentIndex = allGuides.findIndex((g) => g.slug === slug);
  const prevGuide = currentIndex > 0 ? allGuides[currentIndex - 1] : null;
  const nextGuide =
    currentIndex < allGuides.length - 1 ? allGuides[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-navy">
      {/* Hero */}
      <section className="bg-navy px-6 pb-16 pt-24 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-aqua">
            Bahamas Creator Economy
          </p>
          <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            {guide.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-sand">
            {guide.subtitle}
          </p>
        </div>
      </section>

      {/* Guide Navigation Sidebar + Content */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar — all guides list */}
          <aside className="lg:w-72 shrink-0">
            <div className="max-h-64 overflow-y-auto lg:max-h-none lg:overflow-visible lg:sticky lg:top-24">
              <Link
                href="/learn"
                className="mb-4 inline-flex items-center gap-2 text-base font-bold text-aqua hover:text-coral transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                All Guides
              </Link>
              <nav className="space-y-1">
                {allGuides.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/learn/${g.slug}`}
                    className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      g.slug === slug
                        ? "bg-aqua/20 text-aqua border border-aqua/30"
                        : "text-sand hover:bg-white/5 hover:text-aqua"
                    }`}
                  >
                    {g.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <article className="prose-custom max-w-3xl">
              {renderContent(guide.content)}
            </article>
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col sm:flex-row items-stretch gap-4 border-t border-white/10 pt-10 lg:pl-80">
          {prevGuide ? (
            <Link
              href={`/learn/${prevGuide.slug}`}
              className="glass-dark flex-1 rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:border-aqua/30 group"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-aqua mb-2 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Previous Guide
              </p>
              <p className="font-bold text-sand group-hover:text-aqua transition-colors">{prevGuide.title}</p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextGuide ? (
            <Link
              href={`/learn/${nextGuide.slug}`}
              className="glass-dark flex-1 rounded-xl p-5 text-right transition-all hover:-translate-y-0.5 hover:border-aqua/30 group"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-aqua mb-2 flex items-center justify-end gap-1">
                Next Guide
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </p>
              <p className="font-bold text-sand group-hover:text-aqua transition-colors">{nextGuide.title}</p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-12 sm:py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-sand sm:text-3xl">
            Ready to put this into practice?
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
        </div>
      </section>
    </div>
  );
}
