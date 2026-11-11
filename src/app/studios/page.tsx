"use client";

import Link from "next/link";
import { useState } from "react";
import { studios } from "../../data/studios";
import { getRating } from "../../components/rating";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const categories = [
  { label: "All Studios", value: "All" },
  { label: "Music", value: "Music Studio" },
  { label: "Photography", value: "Photography Studio" },
  { label: "Recording", value: "Recording Studio" },
  { label: "Podcast", value: "Podcast Studio" },
];

function CategoryArt({ category }: { category: string }) {
  const common = {
    viewBox: "0 0 400 240",
    fill: "none",
    preserveAspectRatio: "xMidYMid slice",
    className: "h-full w-full",
  };

  if (category === "Music Studio") {
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="bgMusic" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3a0d16" />
            <stop offset="1" stopColor="#120708" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#bgMusic)" />
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

  if (category === "Recording Studio") {
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="bgRecording" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#120708" />
            <stop offset="1" stopColor="#4a0f1a" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#bgRecording)" />
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

  if (category === "Photography Studio") {
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="bgPhoto" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4a0f1a" />
            <stop offset="1" stopColor="#0f0607" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#bgPhoto)" />
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

  // Podcast Studio
  return (
    <svg {...common}>
      <defs>
        <linearGradient id="bgPodcast" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#120708" />
          <stop offset="1" stopColor="#3a0d16" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#bgPodcast)" />
      <path d="M112 150 A88 88 0 0 1 288 150" stroke="#ff263f" strokeWidth="10" strokeLinecap="round" />
      <rect x="94" y="138" width="38" height="68" rx="16" fill="#ff263f" />
      <rect x="268" y="138" width="38" height="68" rx="16" fill="#ff263f" />
      <rect x="158" y="105" width="84" height="36" rx="18" fill="#1a0c0f" stroke="#ff263f" strokeWidth="4" />
      <circle cx="178" cy="123" r="6" fill="#ff263f" />
      <text x="192" y="128" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700" fill="#ffffff">
        ON AIR
      </text>
    </svg>
  );
}

export default function StudiosPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredStudios = studios.filter((studio) => {
    const matchCategory =
      activeCategory === "All" || studio.category === activeCategory;

    const text = search.toLowerCase().trim();
    const matchSearch =
      studio.name.toLowerCase().includes(text) ||
      studio.location.toLowerCase().includes(text) ||
      studio.category.toLowerCase().includes(text);

    return matchCategory && matchSearch;
  });

  return (
    <main className="min-h-screen bg-[#0b0506] px-6 py-16 text-white">
      {/* Header */}
      <section className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-[#ff263f]">
          Discover Your Space
        </p>

        <h1 className="text-4xl font-bold md:text-6xl">
          Explore <span className="text-[#ff263f]">Studios</span>
        </h1>

        <p className="mt-5 max-w-xl text-gray-400">
          Find the perfect studio for your creativity, music, photography, and
          professional projects.
        </p>

        {/* Search */}
        <div className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search studios..."
            className="flex-1 rounded-xl border border-gray-800 bg-[#151011] px-5 py-4 outline-none focus:border-[#ff263f]"
          />

          <button
            onClick={() => setSearch("")}
            className="rounded-xl bg-[#ff263f] px-8 py-4 font-semibold transition hover:bg-red-700"
          >
            Clear
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto mt-14 max-w-7xl">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`rounded-full border px-5 py-2.5 text-sm transition hover:border-[#ff263f] hover:bg-[#ff263f] ${activeCategory === category.value
                ? "border-[#ff263f] bg-[#ff263f]"
                : "border-gray-800"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Studios */}
      <section className="mx-auto mt-12 max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Available Studios</h2>
          <span className="text-sm text-gray-400">
            {filteredStudios.length} Studios
          </span>
        </div>

        {filteredStudios.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-[#151011] p-12 text-center">
            <p className="text-5xl">🔍</p>
            <p className="mt-4 text-xl font-bold">No studios found</p>
            <p className="mt-2 text-sm text-gray-400">
              Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredStudios.map((studio) => (
              <div
                key={studio.name}
                className="group rounded-xl border border-gray-800 bg-[#151011] p-3 transition hover:-translate-y-1 hover:border-[#ff263f]"
              >
                <div className="h-32 overflow-hidden rounded-lg bg-[#211013]">
                  <div className="h-full w-full transition duration-500 group-hover:scale-105">
                    <CategoryArt category={studio.category} />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-[#ff263f]">{studio.category}</p>
                  <span className="rounded-md bg-[#ff263f] px-2 py-0.5 text-[11px] font-bold text-white">
                    ★ {getRating(studio.name).toFixed(1)}
                  </span>
                </div>

                <h3 className="mt-1 text-base font-bold">{studio.name}</h3>

                <p className="mt-1 text-xs text-gray-400">
                  📍 {studio.location}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#ff263f]">
                    {studio.price}
                  </span>

                  <Link
                    href={`/studios/${slugify(studio.name)}`}
                    className="rounded-lg bg-[#ff263f] px-4 py-2 text-xs font-semibold transition hover:bg-red-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}