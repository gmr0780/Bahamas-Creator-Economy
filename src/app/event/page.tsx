import Link from "next/link";

const agendaItems = [
  { time: "4:00 PM", tag: "KEYNOTE", tagColor: "bg-aqua", title: "Opening: Office of the Prime Minister" },
  { time: "4:15 PM", tag: "VIP", tagColor: "bg-coral", title: "UpSkill VIP Recognition", subtitle: "60 Digital Marketing Graduates" },
  { time: "4:25 PM", tag: "ADDRESS", tagColor: "bg-aqua", title: "Technology and AI Address", subtitle: "Ambassador-at-Large Greg Michelier" },
  { time: "4:45 PM", tag: "KEYNOTE", tagColor: "bg-aqua", title: "Featured Influencer Keynote" },
  { time: "5:20 PM", tag: "PANEL", tagColor: "bg-coral", title: "Creator Panel: Bahamians Earning Globally", subtitle: "Moderator: Latrae Rahming" },
  { time: "5:55 PM", tag: "LAUNCH", tagColor: "bg-gradient-to-r from-aqua to-coral", title: "Official Creator Registry Launch + Signing" },
  { time: "6:00 PM", tag: "RECEPTION", tagColor: "bg-coral", title: "Outdoor Reception: Music, Networking and Drinks" },
  { time: "8:00 PM", tag: "CLOSE", tagColor: "bg-navy border border-sand/30", title: "Event Concludes" },
];

const speakers = [
  {
    name: "The Prime Minister",
    role: "Host",
    description: "Office of the Prime Minister",
    gradient: "from-aqua to-cyan-300",
    size: "large",
  },
  {
    name: "Greg Michelier",
    role: "Ambassador-at-Large",
    description: "Technology and AI Address",
    gradient: "from-coral to-orange-300",
    size: "normal",
  },
  {
    name: "Featured Influencer",
    role: "Keynote Speaker",
    description: "To Be Announced",
    gradient: "from-purple-500 to-pink-400",
    size: "normal",
  },
  {
    name: "Latrae Rahming",
    role: "Panel Moderator",
    description: "Creator Panel: Bahamians Earning Globally",
    gradient: "from-aqua to-teal-300",
    size: "normal",
  },
];

const partnerGroups = [
  {
    label: "Government Lead",
    partners: [
      "Office of the Prime Minister",
      "Ministry of Finance",
      "Ministry of Youth",
      "Ambassador-at-Large",
    ],
  },
  {
    label: "Program Delivery",
    partners: [
      "National Training Agency",
      "University of The Bahamas",
      "Bahamas Chamber of Commerce",
      "Bahamas Information Services",
    ],
  },
  {
    label: "Private Sector",
    partners: [
      "Banking Partners",
      "Payoneer",
      "Legal / Accounting",
      "BTC / Aliv",
    ],
  },
  {
    label: "Platform Engagement",
    partners: [
      "Google / YouTube",
      "Meta",
      "Twitch / Amazon",
      "Affiliate Networks",
    ],
  },
];

export default function EventPage() {
  return (
    <div className="min-h-screen bg-navy text-sand">
      {/* Hero Header */}
      <section className="hero-mesh relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/80" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-aqua">
            March 29, 2026 &middot; Baha Mar Convention Center
          </p>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            The Prime Minister{" "}
            <span className="gradient-text">Invites You</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-navy/80 md:text-xl">
            Join the inaugural Bahamas Creator Economy Launch &mdash; an exclusive
            gathering of creators, government leaders, and platform partners
            charting the future of the digital economy.
          </p>
          <div className="mt-10">
            <Link
              href="/register"
              className="cta-gradient inline-block rounded-full px-10 py-4 text-lg font-bold text-white shadow-lg"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Event Details Card */}
      <section className="relative z-10 -mt-10 mx-auto max-w-4xl px-6">
        <div className="glass rounded-3xl p-8 md:p-12">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">
            Event Details
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
            {[
              { label: "Date", value: "Mar 29, 2026", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
              { label: "Time", value: "4:00 \u2013 8:00 PM", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
              { label: "Format", value: "Panel & Keynote", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
              { label: "Guests", value: "300 Invited", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
              { label: "Venue", value: "Baha Mar", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
              { label: "Host", value: "Office of PM", icon: "M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-aqua/10">
                  <svg className="h-6 w-6 text-aqua" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-sand/80">{item.label}</p>
                <p className="mt-1 text-sm font-bold text-sand">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda Timeline */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
          Agenda
        </h2>
        <p className="mb-16 text-center text-sand/80">
          An evening of keynotes, panels, and celebration
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7.5rem] top-0 bottom-0 hidden w-px bg-gradient-to-b from-aqua via-coral to-aqua/20 md:block" />
          <div className="absolute left-4 top-0 bottom-0 block w-px bg-gradient-to-b from-aqua via-coral to-aqua/20 md:hidden" />

          <div className="flex flex-col gap-8">
            {agendaItems.map((item, i) => (
              <div key={i} className="group relative flex items-start gap-4 md:gap-8">
                {/* Time (desktop) */}
                <div className="hidden w-24 shrink-0 pt-1 text-right md:block">
                  <span className="font-mono text-sm font-bold text-aqua">{item.time}</span>
                </div>

                {/* Dot */}
                <div className="relative z-10 mt-2 hidden md:block">
                  <div className="h-3 w-3 rounded-full bg-aqua shadow-[0_0_12px_rgba(8,145,178,0.6)] transition-all group-hover:scale-150 group-hover:bg-coral" />
                </div>
                <div className="relative z-10 mt-2 block md:hidden">
                  <div className="h-3 w-3 rounded-full bg-aqua shadow-[0_0_12px_rgba(8,145,178,0.6)]" />
                </div>

                {/* Card */}
                <div className="flex-1 rounded-2xl bg-white/[0.04] p-5 transition-all hover:bg-white/[0.08] border border-white/[0.06]">
                  {/* Time (mobile) */}
                  <span className="mb-2 inline-block font-mono text-xs font-bold text-aqua md:hidden">{item.time}</span>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`inline-block rounded-full ${item.tagColor} px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-widest text-white`}>
                      {item.tag}
                    </span>
                    <h3 className="text-base font-bold text-sand md:text-lg">{item.title}</h3>
                  </div>
                  {item.subtitle && (
                    <p className="mt-2 text-sm text-sand/80">{item.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
          Speakers
        </h2>
        <p className="mb-16 text-center text-sand/80">
          Leaders shaping the Bahamian creator economy
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className={`group glass rounded-3xl p-6 text-center transition-all hover:scale-[1.03] ${
                speaker.size === "large"
                  ? "sm:col-span-2 lg:col-span-2 lg:row-span-1"
                  : ""
              }`}
            >
              {/* Avatar placeholder */}
              <div
                className={`mx-auto mb-5 flex items-center justify-center rounded-full bg-gradient-to-br ${speaker.gradient} ${
                  speaker.size === "large" ? "h-28 w-28" : "h-20 w-20"
                } shadow-lg`}
              >
                <span className="text-2xl font-extrabold text-white/90">
                  {speaker.name.split(" ").map((w) => w[0]).join("")}
                </span>
              </div>
              <h3
                className={`font-extrabold tracking-tight text-sand ${
                  speaker.size === "large" ? "text-2xl" : "text-lg"
                }`}
              >
                {speaker.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-aqua">{speaker.role}</p>
              <p className="mt-2 text-xs text-sand/80">{speaker.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-4 text-center text-3xl font-extrabold tracking-tight md:text-4xl">
          Partners &amp; Stakeholders
        </h2>
        <p className="mb-16 text-center text-sand/80">
          A cross-sector coalition powering the creator economy
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {partnerGroups.map((group) => (
            <div key={group.label} className="glass rounded-2xl p-6">
              <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-aqua">
                {group.label}
              </h3>
              <ul className="space-y-3">
                {group.partners.map((partner) => (
                  <li
                    key={partner}
                    className="flex items-center gap-3 text-sm text-sand/70"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                    {partner}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-aqua/10 via-coral/10 to-aqua/10" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            Ready to Join?
          </h2>
          <p className="mb-10 text-lg text-sand/85">
            300 seats. By invitation from the Office of the Prime Minister.
          </p>
          <Link
            href="/register"
            className="cta-gradient inline-block rounded-full px-12 py-5 text-lg font-bold text-white shadow-xl"
          >
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
}
