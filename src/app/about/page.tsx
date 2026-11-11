import Link from "next/link";

const stats = [
  { value: "50+", label: "Studio categories" },
  { value: "24/7", label: "Online booking" },
  { value: "2", label: "Double bookings allowed" },
  { value: "100%", label: "Upfront pricing" },
];

const values = [
  {
    title: "Creators first",
    text: "Every feature starts with one question: does this help someone get to the work faster?",
  },
  {
    title: "Clear pricing",
    text: "Hourly rate and security deposit are shown before you book. No surprise fees at checkout.",
  },
  {
    title: "Trust and safety",
    text: "Verified profiles, damage cover and equipment checklists protect both hosts and creators.",
  },
  {
    title: "Fair for hosts",
    text: "Hosts set their own rates, approve every request and keep control of their calendar.",
  },
];

const offers = [
  { title: "Photo Studios", text: "Cyc walls, daylight rooms and moody lofts." },
  { title: "Sound Stages", text: "Large stages with lighting grids and rigging." },
  { title: "Podcast Rooms", text: "Treated rooms with mics and mixers ready." },
  { title: "Music Suites", text: "Recording booths and full-band rehearsal halls." },
  { title: "Art Workshops", text: "Open tables and space that can get messy." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0b0506] text-white">
      {/* Intro */}
      <section className="relative overflow-hidden border-b border-[#2d1a1d] px-6 py-20 md:py-28">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#ff263f]/10 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full border border-[#ff263f]/40 bg-[#ff263f]/10 px-4 py-2 text-sm text-[#ff5265]">
            ✦ About us
          </span>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">            A room for every <span className="text-[#ff263f]">creative idea</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-400">
            StudioSpace is a peer-to-peer marketplace that connects creators with studio
            owners. Filmmakers, photographers, podcasters and musicians find the right room,
            and hosts earn from hours that would otherwise sit empty.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-gray-800 bg-[#151011] p-6 text-center">
              <p className="text-4xl font-extrabold text-[#ff263f]">{s.value}</p>
              <p className="mt-2 text-sm text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#ff263f]/30 bg-gradient-to-r from-[#290d13] to-[#13090b] px-6 py-14 text-center">
          <h2 className="text-3xl font-bold md:text-5xl">
            Join the <span className="text-[#ff263f]">StudioSpace</span> community
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
            Book your next session or open your own studio to creators nearby.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/studios"
              className="rounded-xl bg-[#ff263f] px-8 py-3 font-semibold transition hover:bg-red-700"
            >
              Explore Studios
            </Link>
            <Link
              href="/singer-form"
              className="rounded-xl border border-white px-8 py-3 font-semibold transition hover:bg-white/10"
            >
              Singer Registration
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#11090b] px-6 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10">          <div>
          <h2 className="text-3xl font-bold md:text-4xl">Our mission</h2>
          <p className="mt-4 leading-8 text-gray-400">
            Good work needs the right space, but finding one has always meant endless
            calls, unclear prices and long contracts. We built StudioSpace so a creator
            can discover a studio, see the real price and reserve a slot in a few minutes.
          </p>
          <p className="mt-4 leading-8 text-gray-400">
            For hosts, we make sharing a space simple and safe. Every booking is checked
            for clashes, and every host stays in control of who comes through the door.
          </p>
        </div>

          <div className="rounded-3xl border border-[#3a1c20] bg-gradient-to-br from-[#321016] to-[#13090b] p-8">
            <h3 className="text-xl font-bold">What you can book</h3>
            <ul className="mt-5 space-y-4">
              {offers.map((o) => (
                <li key={o.title} className="border-l-4 border-[#ff263f] pl-4">
                  <p className="font-semibold">{o.title}</p>
                  <p className="text-sm text-gray-400">{o.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">What we stand for</h2>
          <p className="mt-2 text-gray-400">The principles behind every feature we build.</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-gray-800 bg-[#151011] p-6 transition hover:-translate-y-1 hover:border-[#ff263f]"
              >
                <h3 className="text-lg font-bold text-[#ff5565]">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </main>
  );
}