"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Studio = {
  _id?: string;
  title: string;
  category: string;
  hourlyRate: number;
  rating: number;
  location: string;
  imageUrl?: string;
};

const slides = [
  {
    image: "/hero-1.svg",
    title: "Find the room where your next frame comes alive",
    text: "Photo cyc walls, sound stages and podcast rooms you can book by the hour.",
  },
  {
    image: "/hero-2.svg",
    title: "Record loud. Rent quiet.",
    text: "Music suites and podcast booths with the gear already set up.",
  },
  {
    image: "/hero-3.svg",
    title: "Got a spare studio? Put it to work.",
    text: "List your space, set your rate and approve bookings from one dashboard.",
  },
];

const fallbackStudios: Studio[] = [
  { title: "Redline Cyc Wall", category: "Photo Studios", hourlyRate: 45, rating: 4.9, location: "Lahore Warehouse District" },
  { title: "Blackbox Sound Stage", category: "Sound Stages", hourlyRate: 120, rating: 4.8, location: "Dhaka, Tejgaon" },
  { title: "The Quiet Booth", category: "Podcast Rooms", hourlyRate: 28, rating: 4.7, location: "Narsingdi Town Center" },
  { title: "Crimson Tape Suite", category: "Music Suites", hourlyRate: 60, rating: 4.9, location: "Chattogram, GEC Circle" },
  { title: "Ink and Iron Workshop", category: "Art Workshops", hourlyRate: 22, rating: 4.6, location: "Dhaka, Dhanmondi" },
  { title: "Night Reel Loft", category: "Photo Studios", hourlyRate: 38, rating: 4.5, location: "Sylhet, Zindabazar" },
];

const categories = [
  { name: "Photo Studios", text: "Cyc walls and daylight rooms" },
  { name: "Sound Stages", text: "Film stages with rigging" },
  { name: "Podcast Rooms", text: "Treated rooms, mics ready" },
  { name: "Music Suites", text: "Recording and rehearsal" },
  { name: "Art Workshops", text: "Messy-friendly work space" },
];

const steps = [
  { title: "Discover spaces", text: "Filter by category, city and price." },
  { title: "Select shoot hours", text: "Pick a date and your start time." },
  { title: "Book instantly", text: "Clashes with confirmed slots are blocked." },
  { title: "Create and produce", text: "Show up, shoot, and leave a review." },
];

const guarantees = [
  { title: "Liability protection", text: "Damage cover on every confirmed booking." },
  { title: "Verified profiles", text: "Hosts and creators confirm identity first." },
  { title: "Equipment safety", text: "Gear checklists before and after each session." },
  { title: "24/7 host support", text: "A real person answers, day or night." },
];

// Background gradient behind each card picture
const gradients = [
  "from-[#4a0f1a] to-[#120708]",
  "from-[#120708] to-[#4a0f1a]",
  "from-[#3a0d16] to-[#0f0607]",
];

type Kind = "photo" | "stage" | "podcast" | "music" | "art";

function getKind(category: string): Kind {
  const c = category.toLowerCase();
  if (c.includes("podcast")) return "podcast";
  if (c.includes("photo")) return "photo";
  if (c.includes("sound") || c.includes("stage") || c.includes("film")) return "stage";
  if (c.includes("music") || c.includes("recording")) return "music";
  if (c.includes("art")) return "art";
  return "photo";
}

function CategoryArt({ category }: { category: string }) {
  const kind = getKind(category);
  const common = {
    viewBox: "0 0 400 240",
    fill: "none",
    preserveAspectRatio: "xMidYMid meet",
    className: "h-full w-full",
  };

  if (kind === "music") {
    return (
      <svg {...common}>
        <g fill="#ff263f" opacity="0.3">
          <rect x="30" y="150" width="14" height="60" rx="7" />
          <rect x="55" y="120" width="14" height="90" rx="7" />
          <rect x="80" y="165" width="14" height="45" rx="7" />
          <rect x="306" y="140" width="14" height="70" rx="7" />
          <rect x="331" y="110" width="14" height="100" rx="7" />
          <rect x="356" y="160" width="14" height="50" rx="7" />
        </g>
        <g fill="#ff263f">
          <ellipse cx="170" cy="165" rx="30" ry="22" transform="rotate(-20 170 165)" />
          <ellipse cx="260" cy="145" rx="30" ry="22" transform="rotate(-20 260 145)" />
          <rect x="193" y="55" width="10" height="105" />
          <rect x="283" y="35" width="10" height="105" />
          <polygon points="193,55 293,33 293,63 193,85" />
        </g>
      </svg>
    );
  }

  if (kind === "podcast") {
    return (
      <svg {...common}>
        <g stroke="#ff263f" strokeWidth="5" strokeLinecap="round" opacity="0.5">
          <path d="M110 95 Q95 120 110 145" />
          <path d="M85 80 Q60 120 85 160" />
          <path d="M290 95 Q305 120 290 145" />
          <path d="M315 80 Q340 120 315 160" />
        </g>
        <rect x="170" y="35" width="60" height="105" rx="30" fill="#1a0c0f" stroke="#ff263f" strokeWidth="5" />
        <g stroke="#ff263f" strokeWidth="2" opacity="0.6">
          <line x1="170" y1="70" x2="230" y2="70" />
          <line x1="170" y1="90" x2="230" y2="90" />
          <line x1="170" y1="110" x2="230" y2="110" />
          <line x1="200" y1="35" x2="200" y2="140" />
        </g>
        <path d="M140 105 V120 A60 60 0 0 0 260 120 V105" stroke="#ff263f" strokeWidth="5" strokeLinecap="round" />
        <line x1="200" y1="180" x2="200" y2="210" stroke="#ff263f" strokeWidth="5" />
        <line x1="165" y1="210" x2="235" y2="210" stroke="#ff263f" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "stage") {
    return (
      <svg {...common}>
        {/* spotlight beams */}
        <g fill="#ff263f" opacity="0.15">
          <polygon points="60,0 100,0 170,120 90,120" />
          <polygon points="300,0 340,0 310,120 230,120" />
        </g>
        {/* clapperboard body */}
        <rect x="120" y="105" width="160" height="95" rx="8" fill="#1a0c0f" stroke="#ff263f" strokeWidth="5" />
        <line x1="120" y1="135" x2="280" y2="135" stroke="#ff263f" strokeWidth="3" opacity="0.6" />
        <line x1="150" y1="160" x2="250" y2="160" stroke="#ff263f" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
        <line x1="150" y1="178" x2="220" y2="178" stroke="#ff263f" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
        {/* clapper top */}
        <g transform="rotate(-14 120 100)">
          <rect x="120" y="68" width="160" height="30" rx="6" fill="#ff263f" />
          <g fill="#1a0c0f">
            <polygon points="145,68 165,68 150,98 130,98" />
            <polygon points="185,68 205,68 190,98 170,98" />
            <polygon points="225,68 245,68 230,98 210,98" />
            <polygon points="265,68 280,68 280,98 250,98" />
          </g>
        </g>
      </svg>
    );
  }

  if (kind === "art") {
    return (
      <svg {...common}>
        {/* palette */}
        <path
          d="M190 50 C110 50 60 100 60 150 C60 195 105 210 140 200 C165 193 160 170 180 168 C205 165 215 195 255 190 C305 184 335 150 335 115 C335 75 270 50 190 50 Z"
          fill="#1a0c0f"
          stroke="#ff263f"
          strokeWidth="5"
        />
        <circle cx="120" cy="115" r="14" fill="#ff263f" />
        <circle cx="165" cy="85" r="14" fill="#ff5565" />
        <circle cx="220" cy="80" r="14" fill="#ff263f" opacity="0.7" />
        <circle cx="272" cy="105" r="14" fill="#ff5565" opacity="0.8" />
        <circle cx="140" cy="165" r="10" fill="#0b0506" stroke="#ff263f" strokeWidth="3" />
        {/* brush */}
        <g transform="rotate(35 300 170)">
          <rect x="290" y="95" width="12" height="90" rx="5" fill="#ff263f" />
          <rect x="288" y="82" width="16" height="16" fill="#ffffff" opacity="0.85" />
          <path d="M288 82 Q296 55 304 82 Z" fill="#ff263f" />
        </g>
      </svg>
    );
  }

  // photo
  return (
    <svg {...common}>
      <rect x="165" y="52" width="70" height="28" rx="8" fill="#1a0c0f" stroke="#ff263f" strokeWidth="5" />
      <rect x="105" y="72" width="190" height="125" rx="18" fill="#1a0c0f" stroke="#ff263f" strokeWidth="5" />
      <circle cx="200" cy="135" r="45" fill="#0b0506" stroke="#ff263f" strokeWidth="5" />
      <circle cx="200" cy="135" r="30" stroke="#ff263f" strokeWidth="3" opacity="0.7" />
      <circle cx="200" cy="135" r="14" fill="#ff263f" />
      <circle cx="188" cy="123" r="5" fill="#ffffff" opacity="0.8" />
      <rect x="258" y="88" width="22" height="14" rx="4" fill="#ff263f" />
    </svg>
  );
}

export default function HomePage() {
  const [active, setActive] = useState(0);
  const [studios, setStudios] = useState<Studio[]>(fallbackStudios);

  // Hero slider autoplay
  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  // Featured studios from the server (falls back to the list above)
  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    if (!api) return;
    fetch(`${api}/api/studios?limit=6&sort=rating`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const list = Array.isArray(data) ? data : data.studios;
        if (list?.length) setStudios(list.slice(0, 6));
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0506] text-white">
      {/* Hero Slider */}
      <section className="relative overflow-hidden border-b border-[#2d1a1d]">
        {slides.map((s, i) => (
          <div
            key={s.title}
            className={`${i === active ? "flex" : "hidden"} relative min-h-[520px] items-center bg-cover bg-center px-6 py-20`}
            style={{ backgroundImage: `url(${s.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0405] via-[#0b0405]/70 to-transparent" />
            <div className="relative mx-auto w-full max-w-7xl">
              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight md:text-7xl">
                {s.title}
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-gray-300">{s.text}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/studios"
                  className="rounded-xl bg-[#ff263f] px-7 py-3 font-semibold transition hover:bg-red-700"
                >
                  Explore Studios
                </Link>
                <Link
                  href="/how-it-works"
                  className="rounded-xl border border-white px-7 py-3 font-semibold transition hover:bg-white/10"
                >
                  Host Your Space
                </Link>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 w-9 rounded-full transition ${i === active ? "bg-[#ff263f]" : "bg-white/40"}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Studios */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">Featured studios</h2>
          <p className="mt-2 text-gray-400">Top-rated rooms booked most this month.</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((s, i) => (
              <article
                key={s._id ?? s.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-[#151011] transition hover:-translate-y-1 hover:border-[#ff263f]"
              >
                <div
                  className={`relative h-48 overflow-hidden bg-gradient-to-br ${gradients[i % gradients.length]}`}
                >
                  {s.imageUrl ? (
                    <div
                      className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${s.imageUrl})` }}
                    />
                  ) : (
                    <div className="h-full w-full p-4 transition duration-500 group-hover:scale-105">
                      <CategoryArt category={s.category} />
                    </div>
                  )}

                  <span className="absolute left-3 top-3 rounded-md bg-black px-3 py-1 text-xs font-bold">
                    {s.category}
                  </span>
                  <span className="absolute right-3 top-3 rounded-md bg-[#ff263f] px-2.5 py-1 text-xs font-bold">
                    ★ {s.rating}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-1 p-5">
                  <h3 className="min-h-[56px] text-xl font-bold">{s.title}</h3>
                  <p className="text-sm text-gray-400">{s.location}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <p className="text-2xl font-extrabold">
                      ${s.hourlyRate}
                      <span className="text-sm font-normal text-gray-500"> / hr</span>
                    </p>
                    <Link
                      href="/studios"
                      className="rounded-lg bg-[#ff263f] px-4 py-2 text-sm font-semibold transition hover:bg-red-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by category */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">Browse by category</h2>
          <p className="mt-2 text-gray-400">Pick a type of space and we will filter the list for you.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((c) => (
              <Link
                key={c.name}
                href={`/studios?category=${encodeURIComponent(c.name)}`}
                className="group rounded-xl border-l-4 border-[#ff263f] bg-[#151011] p-5 transition hover:bg-[#ff263f]"
              >
                <h3 className="text-lg font-bold">{c.name}</h3>
                <p className="mt-1 text-sm text-gray-400 group-hover:text-white">{c.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How booking works */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">How booking works</h2>
          <p className="mt-2 text-gray-400">From search to set in four moves.</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
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

      {/* Host guarantee */}
      <section className="bg-[#11090b] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">Host guarantee and creator support</h2>
          <p className="mt-2 text-gray-400">Every booking is covered, so both sides can focus on the work.</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g) => (
              <div key={g.title} className="rounded-2xl border border-[#3a1c20] bg-[#0b0506] p-6">
                <h3 className="text-lg font-bold text-[#ff5565]">{g.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}