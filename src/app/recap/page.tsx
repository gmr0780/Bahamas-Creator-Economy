import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Recap - 242 Influencers & Creative Conference",
  description: "Highlights from the 242 Influencers & Creative Conference on March 29, 2026 at Baha Mar Convention Center, Nassau.",
};

const speakers = [
  {
    name: "The Hon. Philip Edward Davis, KC, MP",
    image: "/speakers/pm-davis.jpeg",
    role: "Keynote Address",
    tagline: "Prime Minister of The Bahamas",
  },
  {
    name: "U.S. Ambassador Herschel Walker",
    image: "/speakers/herschel-walker.jpeg",
    role: "Speaker I",
    tagline: "United States Ambassador to The Bahamas",
  },
  {
    name: "The Hon. Mia Amor Mottley, KC, MP",
    image: "/speakers/mia-mottley.webp",
    imageZoom: true,
    role: "Guest Speaker",
    tagline: "Prime Minister of Barbados",
  },
  {
    name: "Deputy PM I. Chester Cooper",
    image: "/speakers/chester-cooper.webp",
    role: "Panelist",
    tagline: "Minister of Tourism, Investment and Aviation",
  },
  {
    name: "Alexa Alianiello",
    image: "/speakers/alexa-alianiello.jpeg",
    imageClass: "scale-150 translate-y-[5%]",
    role: "Presenter",
    tagline: "Agentio | Connecting Creators to Brands",
  },
  {
    name: "Tanya Leis",
    image: "/speakers/tanya-leis.png",
    imageClass: "scale-125 object-top",
    role: "Presenter",
    tagline: "EVP, Burson North America",
  },
  {
    name: "Aim\u00e9e Legault",
    image: "/speakers/aimee-legault.png",
    role: "Presenter",
    tagline: "VP, Influencer Marketing, Burson Canada",
  },
  {
    name: "Amad Rashad Thompson",
    image: "/speakers/ahmad-thompson.jpeg",
    role: "Panel Host",
    tagline: "Leveraging Our Platforms",
  },
  {
    name: "Jamie Bierman",
    image: "/speakers/jamie-bierman.jpeg",
    role: "Platform Presenter",
    tagline: "X (formerly Twitter)",
  },
  {
    name: "Greg Michelier",
    image: "/speakers/greg-michelier.jpg",
    role: "Closing Remarks",
    tagline: "Ambassador-at-Large to Technology and AI",
  },
  {
    name: "Latrae Rahming",
    image: "/speakers/latrae-rahming.jpeg",
    imageClass: "object-top",
    role: "Host",
    tagline: "Director of Communications, OPM",
  },
];

const agenda = [
  { time: "4:00 PM", title: "Doors Open & Registration" },
  { time: "4:30 PM", title: "Welcome & Opening Remarks" },
  { time: "4:45 PM", title: "Keynote: Prime Minister Philip Davis" },
  { time: "5:15 PM", title: "Speaker I: U.S. Ambassador Herschel Walker" },
  { time: "5:30 PM", title: "Guest Speaker: PM Mia Mottley (Barbados)" },
  { time: "5:50 PM", title: "Panel: Leveraging Our Platforms" },
  { time: "6:20 PM", title: "Brand Power & Influencer Marketing (Burson)" },
  { time: "6:50 PM", title: "Platform Presentations: X, Agentio" },
  { time: "7:20 PM", title: "Closing Remarks & Next Steps" },
  { time: "7:30 PM", title: "242 After Hours: Mix & Mingle Reception" },
];

export default function RecapPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative px-6 py-24 sm:py-32 bg-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-aqua/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-coral/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <p className="text-xl sm:text-3xl md:text-4xl uppercase tracking-[0.15em] sm:tracking-[0.2em] text-aqua font-extrabold">
            Event Recap
          </p>
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
            242 Influencers &<br />
            <span className="gradient-text">Creative Conference</span>
          </h1>
          <p className="text-base sm:text-xl text-sand max-w-2xl mx-auto leading-relaxed">
            March 29, 2026 &middot; Baha Mar Convention Center, Nassau
          </p>
          <p className="text-sm text-sand/60">
            Hosted by the Office of the Prime Minister, Commonwealth of The Bahamas
          </p>
        </div>
      </section>

      {/* ── HIGHLIGHT QUOTE ──────────────────────────── */}
      <section className="px-6 py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto">
          <blockquote className="text-center mb-16">
            <p className="text-xl sm:text-3xl font-light leading-relaxed text-navy italic">
              &ldquo;This is exactly what we set out to achieve. Not just a conversation — but real, tangible opportunities for Bahamian creators.&rdquo;
            </p>
          </blockquote>

          {/* Photo/Video placeholder */}
          <div className="rounded-3xl border-2 border-dashed border-navy/15 bg-sand/10 p-12 sm:p-20 text-center mb-16">
            <div className="mx-auto mb-4">
              <svg className="h-16 w-16 text-navy/20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-navy/40 font-medium text-lg">Event Photos & Video Coming Soon</p>
            <p className="text-navy/30 text-sm mt-2">Highlights from the conference will be added here</p>
          </div>

          {/* Key outcomes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="rounded-2xl border border-navy/8 bg-sand/15 p-6 text-center">
              <p className="text-4xl font-extrabold gradient-text mb-2">400+</p>
              <p className="text-sm font-medium text-navy/70 uppercase tracking-wide">Creators Registered</p>
            </div>
            <div className="rounded-2xl border border-navy/8 bg-sand/15 p-6 text-center">
              <p className="text-4xl font-extrabold gradient-text mb-2">11</p>
              <p className="text-sm font-medium text-navy/70 uppercase tracking-wide">Featured Speakers</p>
            </div>
            <div className="rounded-2xl border border-navy/8 bg-sand/15 p-6 text-center sm:col-span-2 lg:col-span-1">
              <p className="text-4xl font-extrabold gradient-text mb-2">1st</p>
              <p className="text-sm font-medium text-navy/70 uppercase tracking-wide">Of Its Kind in The Bahamas</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPEAKERS ──────────────────────────────── */}
      <section className="px-6 py-20 sm:py-28 bg-sand/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <p className="text-xl sm:text-3xl md:text-4xl uppercase tracking-[0.15em] sm:tracking-[0.2em] text-aqua font-extrabold">
              Who Spoke
            </p>
            <h2 className="text-2xl sm:text-5xl font-extrabold text-navy">
              Featured Speakers
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {speakers.map((s) => {
              const gradients = [
                "from-aqua to-coral",
                "from-coral to-aqua",
                "from-purple-500 to-pink-400",
                "from-aqua to-sand",
                "from-coral to-sand",
                "from-indigo-400 to-violet-400",
                "from-amber-400 to-orange-300",
                "from-blue-400 to-indigo-400",
                "from-aqua to-teal-300",
                "from-coral to-pink-300",
                "from-zinc-600 to-zinc-400",
              ];
              const idx = speakers.indexOf(s);
              return (
                <div
                  key={s.name}
                  className="rounded-2xl border border-navy/8 bg-white p-4 sm:p-6 text-center group hover:shadow-lg hover:border-aqua/25 transition-all duration-300"
                >
                  <div className={`relative rounded-full bg-gradient-to-br ${gradients[idx]} h-20 w-20 sm:h-24 sm:w-24 mx-auto mb-3 overflow-hidden shadow-lg`}>
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      className={`object-cover ${s.imageClass ?? (s.imageZoom ? "scale-[1.6] translate-y-[30%]" : "object-top")}`}
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-navy leading-tight">{s.name}</h3>
                  <p className="text-aqua font-medium text-xs sm:text-sm mt-1">{s.role}</p>
                  <p className="text-navy/50 text-xs mt-1">{s.tagline}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AGENDA ──────────────────────────────── */}
      <section className="px-6 py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <p className="text-xl sm:text-3xl md:text-4xl uppercase tracking-[0.15em] sm:tracking-[0.2em] text-aqua font-extrabold">
              The Programme
            </p>
            <h2 className="text-2xl sm:text-5xl font-extrabold text-navy">
              Event Agenda
            </h2>
          </div>

          <div className="space-y-0">
            {agenda.map((item, i) => (
              <div
                key={item.time}
                className="flex gap-4 sm:gap-6 py-4 border-b border-navy/8 last:border-b-0"
              >
                <div className="shrink-0 w-20 sm:w-24 text-right">
                  <p className="text-sm sm:text-base font-bold text-aqua">{item.time}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-medium text-navy">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT CAME FROM IT ──────────────────────── */}
      <section className="px-6 py-20 sm:py-28 bg-navy text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-xl sm:text-3xl md:text-4xl uppercase tracking-[0.15em] sm:tracking-[0.2em] text-coral font-extrabold">
            What Came From It
          </p>
          <h2 className="text-2xl sm:text-5xl font-extrabold text-white">
            Real Opportunities, Not Just Talk
          </h2>
          <p className="text-base sm:text-xl text-sand max-w-2xl mx-auto leading-relaxed">
            The conference wasn&apos;t just a conversation. It led directly to X committing to a free Masterclass for Bahamian creators, with a lifetime X Premium subscription on the line.
          </p>
          <a
            href="/x-masterclass"
            className="cta-gradient inline-block rounded-full px-8 sm:px-12 py-5 text-base sm:text-xl font-bold text-white shadow-2xl transition-all"
          >
            Register for the X Masterclass
          </a>
        </div>
      </section>
    </>
  );
}
