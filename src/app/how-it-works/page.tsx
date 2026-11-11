import Link from "next/link";

const creatorSteps = [
  {
    title: "Discover spaces",
    text: "Browse photo studios, sound stages, podcast rooms, music suites and art workshops. Filter by category, city and hourly price to narrow the list.",
  },
  {
    title: "Select shoot hours",
    text: "Open a studio, check its amenities and capacity, then pick the date, start time and number of hours. The total price updates as you choose.",
  },
  {
    title: "Book instantly",
    text: "Send your request in one click. If the slot overlaps a confirmed booking, we block it and ask you to pick another time.",
  },
  {
    title: "Create and produce",
    text: "Once the host confirms, show up and make your work. After the session, leave a review to help other creators.",
  },
];

const hostSteps = [
  {
    title: "List your space",
    text: "Add photos, amenities, capacity, your hourly rate and a security deposit. It takes a few minutes.",
  },
  {
    title: "Review requests",
    text: "Every booking arrives as Pending. Confirm the ones that fit your calendar and the system keeps the rest from clashing.",
  },
  {
    title: "Get paid for idle hours",
    text: "Turn empty hours into income. Manage, edit or remove your listings any time from My Studio Listings.",
  },
];

const statuses = [
  { name: "Pending", text: "Request sent. You can still cancel it.", color: "bg-yellow-500 text-black" },
  { name: "Confirmed", text: "The host approved your slot.", color: "bg-green-600 text-white" },
  { name: "Completed", text: "The session is done.", color: "bg-gray-600 text-white" },
  { name: "Cancelled", text: "The booking was cancelled.", color: "bg-[#ff263f] text-white" },
];

const faqs = [
  {
    q: "Can I cancel a booking?",
    a: "Yes. You can cancel any booking that is still Pending from the My Bookings page. Confirmed bookings need the host's approval to change.",
  },
  {
    q: "What happens if two people want the same time?",
    a: "Once a booking is confirmed, that time is locked. Any new request that overlaps it is rejected with a clear message.",
  },
  {
    q: "What is the security deposit?",
    a: "Hosts can set a refundable deposit that covers accidental damage. It is shown on the studio page before you book.",
  },
  {
    q: "Do I need an account to browse?",
    a: "No. Anyone can explore studios. You only need to log in when you want to book or list a space.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#0b0506] text-white">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-[#2d1a1d] px-6 py-20 md:py-28">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#ff263f]/10 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full border border-[#ff263f]/40 bg-[#ff263f]/10 px-4 py-2 text-sm text-[#ff5265]">
            ✦ Simple from start to finish
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
            How <span className="text-[#ff263f]">StudioSpace</span> works
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-400">
            Whether you need a room for a shoot or have a room to share, here is the whole
            process in a few clear steps.
          </p>
        </div>
      </section>

      <section>
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
      </section>

      {/* Creators */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">For creators</h2>
          <p className="mt-2 text-gray-400">Find a space and book it in minutes.</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {creatorSteps.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-gray-800 bg-[#151011] p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ff263f] text-lg font-extrabold">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hosts */}
      <section className="bg-[#11090b] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">For hosts</h2>
          <p className="mt-2 text-gray-400">Share your studio and earn from the hours it sits empty.</p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {hostSteps.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-[#3a1c20] bg-[#0b0506] p-6">
                <span className="text-4xl font-extrabold text-[#ff263f]">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking statuses */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">Booking statuses</h2>
          <p className="mt-2 text-gray-400">Every reservation moves through four stages.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statuses.map((s) => (
              <div key={s.name} className="rounded-xl border-l-4 border-[#ff263f] bg-[#151011] p-5">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${s.color}`}>
                  {s.name}
                </span>
                <p className="mt-3 text-sm text-gray-400">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#11090b] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold md:text-4xl">Common questions</h2>

          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-gray-800 bg-[#0b0506] p-5 open:border-[#ff263f]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  {f.q}
                  <span className="text-[#ff263f] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-gray-400">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#ff263f]/30 bg-gradient-to-r from-[#290d13] to-[#13090b] px-6 py-14 text-center">
          <h2 className="text-3xl font-bold md:text-5xl">
            Ready to <span className="text-[#ff263f]">get started?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
            Find a studio for your next project or register as a singer to get matched with the
            right room.
          </p>

        </div>
      </section>
    </main>
  );
}