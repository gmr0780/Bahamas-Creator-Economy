import Link from "next/link";
import BahamianFlag from "../components/BahamianFlag";

const agendaItems = [
  { time: "4:00 PM", tag: "WELCOME", tagColor: "bg-aqua", title: "Welcome", subtitle: "Latrae Rahming, Director of Communications, OPM" },
  { time: "4:05 PM", tag: "ANTHEM", tagColor: "bg-coral", title: "National Anthem", subtitle: "Creative and Performing Arts School of The Bahamas (CAPAS)" },
  { time: "4:10 PM", tag: "SPEAKER", tagColor: "bg-aqua", title: "Speaker I: Greg Michelier", subtitle: "Bahamas Ambassador-at-Large to Technology and AI. \"The Future We Are Choosing\"" },
  { time: "4:25 PM", tag: "GUEST", tagColor: "bg-aqua", title: "Speaker II: The Rt. Hon. Mia Amor Mottley, KC, MP", subtitle: "Prime Minister of Barbados. \"Owning Our Product as a Region\"" },
  { time: "4:35 PM", tag: "CAPAS", tagColor: "bg-coral", title: "CAPAS Presentation", subtitle: "48-Hour Short Film Challenge Winner. Video Screening" },
  { time: "4:45 PM", tag: "INTRO", tagColor: "bg-aqua", title: "Introduction of the Prime Minister", subtitle: "Latrae Rahming, Director of Communications, OPM" },
  { time: "4:50 PM", tag: "KEYNOTE", tagColor: "bg-gradient-to-r from-aqua to-coral", title: "Keynote Address", subtitle: "The Rt. Hon. Philip Edward Davis, KC, MP. Prime Minister of The Bahamas" },
  { time: "5:10 PM", tag: "PRESENT", tagColor: "bg-coral", title: "AI for Creators: The New Digital Renaissance", subtitle: "Tanya Leis | Burson" },
  { time: "5:25 PM", tag: "PRESENT", tagColor: "bg-coral", title: "Create with Purpose: The 4 Cs Framework for Creator Success", subtitle: "Aimée Legault | Burson" },
  { time: "5:40 PM", tag: "PANEL", tagColor: "bg-coral", title: "Panel I: Building Domestic Brand Power", subtitle: "Host: Jillian Grey. Deputy PM Chester Cooper, Minister of Tourism" },
  { time: "6:00 PM", tag: "PRESENT", tagColor: "bg-coral", title: "Connecting Content Creators to Brands and Audiences for Revenue", subtitle: "Alexa Alianiello" },
  { time: "6:15 PM", tag: "PANEL", tagColor: "bg-aqua", title: "Panel II: Leveraging Our Platforms", subtitle: "Host: Ahmad Rashad Thompson. Panel: Baha Yogi, Vocab, Das Quey, Bodine, and Zhano" },
  { time: "6:35 PM", tag: "PLATFORM", tagColor: "bg-gradient-to-r from-aqua to-coral", title: "Platform Presentations: Creator Eligibility & Monetisation", subtitle: "" },
  { time: "7:00 PM", tag: "CLOSING", tagColor: "bg-aqua", title: "Closing Thanks", subtitle: "" },
  { time: "7:05 PM", tag: "RECEPTION", tagColor: "bg-gradient-to-r from-aqua to-coral", title: "242 After Hours: Mix & Mingle Reception", subtitle: "7:05 PM – 8:00 PM" },
];

const speakers = [
  {
    name: "The Rt. Hon. Philip Edward Davis, KC, MP",
    initials: "PD",
    image: "/speakers/pm-davis.jpeg",
    role: "Keynote Address",
    description: "Prime Minister of The Bahamas",
    gradient: "from-aqua to-cyan-300",
    size: "large",
  },
  {
    name: "The Rt. Hon. Mia Amor Mottley, KC, MP",
    initials: "MM",
    image: "/speakers/mia-mottley.webp",
    imageZoom: true,
    role: "Guest Speaker",
    description: "Prime Minister of Barbados",
    gradient: "from-coral to-orange-300",
    size: "normal",
  },
  {
    name: "Greg Michelier",
    initials: "GM",
    image: "/speakers/greg-michelier.jpg",
    role: "Speaker I",
    description: "Ambassador-at-Large to Technology and AI",
    gradient: "from-aqua to-teal-300",
    size: "normal",
  },
  {
    name: "Deputy PM Chester Cooper",
    initials: "CC",
    image: "/speakers/chester-cooper.webp",
    role: "Panelist",
    description: "Minister of Tourism",
    gradient: "from-purple-500 to-pink-400",
    size: "normal",
  },
  {
    name: "Latrae Rahming",
    initials: "LR",
    image: "/speakers/latrae-rahming.jpeg",
    imageClass: "object-top",
    role: "Host",
    description: "Director of Communications, OPM",
    gradient: "from-coral to-pink-300",
    size: "normal",
  },
  {
    name: "Alexa Alianiello",
    initials: "AA",
    image: "/speakers/alexa-alianiello.jpeg",
    imageClass: "scale-150 translate-y-[5%]",
    role: "Presenter",
    description: "Agentio | Connecting Creators to Brands and Revenue",
    gradient: "from-indigo-400 to-violet-400",
    size: "normal",
  },
  {
    name: "Tanya Leis",
    initials: "TL",
    image: "/speakers/tanya-leis.png",
    imageClass: "scale-125 object-top",
    role: "Presenter",
    description: "EVP, Digital Issues & Crisis Lead, Burson North America",
    gradient: "from-rose-400 to-pink-400",
    size: "normal",
  },
  {
    name: "Aimée Legault",
    initials: "AL",
    image: "/speakers/aimee-legault.png",
    role: "Presenter",
    description: "VP & National Lead, Influencer Marketing, Burson Canada",
    gradient: "from-violet-400 to-purple-400",
    size: "normal",
  },
  {
    name: "Ahmad Rashad Thompson",
    initials: "AT",
    image: "/speakers/ahmad-thompson.jpeg",
    role: "Panel Host",
    description: "Leveraging Our Platforms",
    gradient: "from-amber-400 to-orange-300",
    size: "normal",
  },
];


export default function EventPage() {
  return (
    <div className="min-h-screen bg-navy text-sand">
      {/* Hero Header */}
      <section className="hero-mesh relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/80" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <p className="mb-4 text-base sm:text-xl md:text-2xl font-extrabold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-aqua flex items-center justify-center gap-3 flex-wrap">
            <BahamianFlag width={40} className="rounded-sm shrink-0" />
            <span>Sunday, March 29, 2026 &middot; Nassau, The Bahamas</span>
          </p>
          <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-6xl lg:text-7xl">
            242 Influencers &amp;{" "}
            <span className="gradient-text">Creative Conference</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white sm:text-lg md:text-xl">
            An exclusive gathering of creators, government leaders, and platform partners
            charting the future of the digital economy. 4:00 PM to 8:00 PM.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-navy font-bold italic">
            For the first time in Caribbean history, a national government is standing behind its digital creators. This is that moment.
          </p>
          <div className="mt-10">
            <Link
              href="/register"
              className="cta-gradient inline-block rounded-full px-8 sm:px-10 py-4 text-base sm:text-lg font-bold text-white shadow-lg"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Event Details Card */}
      <section className="relative z-10 -mt-10 mx-auto max-w-4xl px-6">
        <div className="glass-dark rounded-3xl p-5 sm:p-8 md:p-12">
          <h2 className="mb-8 text-center text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            Event Details
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 min-[480px]:grid-cols-3 lg:grid-cols-6">
            {[
              { label: "Date", value: "Mar 29, 2026", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
              { label: "Time", value: "4:00 \u2013 8:00 PM", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
              { label: "Format", value: "Panel & Keynote", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
              { label: "Guests", value: "400 Invited", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
              { label: "Venue", value: "Baha Mar", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
              { label: "Host", value: "Office of PM", icon: "M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-aqua/10">
                  <svg className="h-6 w-6 text-aqua" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-sand">{item.label}</p>
                <p className="mt-1 text-sm font-bold text-sand">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda Timeline */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <h2 className="mb-4 text-center text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
          Agenda
        </h2>
        <p className="mb-16 text-center text-sand">
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
                    <p className="mt-2 text-sm text-sand">{item.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="mb-4 text-center text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
          Speakers
        </h2>
        <p className="mb-16 text-center text-sand">
          Leaders shaping the Bahamian creator economy
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className={`group glass-dark rounded-3xl p-6 text-center transition-all hover:scale-[1.03] ${
                speaker.size === "large"
                  ? "sm:col-span-2 lg:col-span-2 lg:row-span-1"
                  : ""
              }`}
            >
              {/* Avatar */}
              <div
                className={`mx-auto mb-5 flex items-center justify-center rounded-full bg-gradient-to-br ${speaker.gradient} ${
                  speaker.size === "large" ? "h-28 w-28" : "h-20 w-20"
                } shadow-lg overflow-hidden`}
              >
                {speaker.image ? (
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className={`h-full w-full object-cover ${speaker.imageClass ? speaker.imageClass : speaker.imageZoom ? "scale-[1.6] translate-y-[30%]" : "object-top"}`}
                  />
                ) : (
                  <span className="text-2xl font-extrabold text-white/90">
                    {speaker.initials}
                  </span>
                )}
              </div>
              <h3
                className={`font-extrabold tracking-tight text-sand ${
                  speaker.size === "large" ? "text-2xl" : "text-lg"
                }`}
              >
                {speaker.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-aqua">{speaker.role}</p>
              <p className="mt-2 text-xs text-sand">{speaker.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-aqua/10 via-coral/10 to-aqua/10" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-5xl">
            Ready to Join?
          </h2>
          <p className="mb-10 text-base sm:text-lg text-sand">
            400 seats. By invitation from the Office of the Prime Minister.
          </p>
          <Link
            href="/register"
            className="cta-gradient inline-block rounded-full px-8 sm:px-12 py-5 text-base sm:text-lg font-bold text-white shadow-xl"
          >
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
}
