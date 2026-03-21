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
      <section className="hero-mesh px-6 pb-16 pt-24 text-center">
        <p className="mb-3 text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-aqua">
          Bahamas Creator Economy
        </p>
        <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-navy sm:text-4xl md:text-5xl">
          {guide.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-navy">
          {guide.subtitle}
        </p>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 pb-12">
        {/* Back link */}
        <Link
          href="/learn"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-aqua hover:text-coral transition-colors"
        >
          <span>&larr;</span> Back to Learn
        </Link>

        {/* Rendered content */}
        <article className="prose-custom">
          {renderContent(guide.content)}
        </article>
      </section>

      {/* Prev / Next navigation */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="flex items-stretch gap-4 border-t border-white/10 pt-10">
          {prevGuide ? (
            <Link
              href={`/learn/${prevGuide.slug}`}
              className="glass-dark flex-1 rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:border-aqua/30"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-sand/50 mb-1">
                Previous
              </p>
              <p className="font-bold text-sand">{prevGuide.title}</p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextGuide ? (
            <Link
              href={`/learn/${nextGuide.slug}`}
              className="glass-dark flex-1 rounded-xl p-5 text-right transition-all hover:-translate-y-0.5 hover:border-aqua/30"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-sand/50 mb-1">
                Next
              </p>
              <p className="font-bold text-sand">{nextGuide.title}</p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-20 text-center">
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
      </section>
    </div>
  );
}
