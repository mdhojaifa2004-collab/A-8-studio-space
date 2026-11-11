
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { studios } from "../../../data/studios";
import CategoryArt from "../../../components/CategoryArt";
import { getRating } from "../../../components/rating";
import BookNowButton from "../../../components/BookNowbutton";

type Props = {
  id: string;
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function StudioDetailsClient({ id }: Props) {
  const router = useRouter();

  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [time, setTime] = useState("10:00");
  const [hours, setHours] = useState(1);
  const [showRules, setShowRules] = useState(false);

  // Find studio by numeric ID or by its slug (e.g. /studios/1 or /studios/creative-music-studio)
  const normalizedId = id.toLowerCase();
  const studio = studios.find(
    (item) => item.id === id || slugify(item.name) === normalizedId
  );

  if (!studio) {
    return (
      <main className="min-h-screen bg-[#0B0B0D] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">
            Studio Not Found
          </h1>
          <p className="text-gray-400">
            এই Studio টি খুঁজে পাওয়া যায়নি।
          </p>
          <Link
            href="/studios"
            className="inline-block mt-5 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"
          >
            Browse Studios
          </Link>
        </div>
      </main>
    );
  }

  const rate =
    Number(studio.price.replace(/[^\d]/g, "")) || 0;

  const total = rate * hours;
  const currency = "৳";

  const amenities = Array.isArray(studio.amenities)
    ? studio.amenities
    : [];

  const rules = Array.isArray(studio.rules)
    ? studio.rules
    : [];

  const rating = getRating(studio.name);

  return (
    <main className="min-h-screen bg-[#0B0B0D] text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-red-500">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/studios" className="hover:text-red-500">
            Studios
          </Link>
          <span className="mx-2">/</span>
          <span className="text-red-500">
            {studio.name}
          </span>
        </div>

        {/* Studio Header */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Studio Artwork */}
          <div className="rounded-3xl overflow-hidden bg-[#151518] border border-white/10 min-h-[300px] md:min-h-[420px] flex items-center justify-center">
            {studio.imageUrl ? (
              <img
                src={studio.imageUrl}
                alt={studio.name}
                className="w-full h-full min-h-[300px] md:min-h-[420px] object-cover"
              />
            ) : (
              <div className="w-full min-h-[300px] md:min-h-[420px] flex items-center justify-center">
                <CategoryArt category={studio.category} />
              </div>
            )}
          </div>

          {/* Studio Information */}
          <div>
            <span className="inline-flex items-center rounded-full bg-red-500/10 border border-red-500/30 px-4 py-2 text-sm text-red-400 mb-5">
              {studio.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
              {studio.name}
            </h1>

            <p className="text-gray-400 leading-7 mb-6">
              {studio.description ||
                "আপনার সৃজনশীল কাজের জন্য একটি সুন্দর ও আধুনিক Studio Space।"}
            </p>

            <div className="flex flex-wrap gap-5 text-sm text-gray-300 mb-7">
              <div className="flex items-center gap-2">
                <span className="text-red-500">📍</span>
                {studio.location || "Location not available"}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-yellow-400">★</span>
                {rating ?? "New"}
              </div>
            </div>

            <div className="bg-[#151518] border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                Starting Price
              </p>

              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-red-500">
                  {currency}{rate}
                </span>
                <span className="text-gray-400 mb-1">
                  / hour
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-14">

          {/* Left Side */}
          <div className="lg:col-span-2 space-y-8">

            {/* About */}
            <div className="bg-[#151518] border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">
                About This Studio
              </h2>

              <p className="text-gray-400 leading-8">
                {studio.description ||
                  "এই Studio-তে আপনি আপনার প্রয়োজন অনুযায়ী বিভিন্ন ধরনের creative কাজ করতে পারবেন।"}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-[#151518] border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">
                Studio Amenities
              </h2>

              {amenities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <span className="text-red-500">✓</span>
                      {typeof item === "string"
                        ? item
                        : item.name || item.title}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  Amenities information is not available.
                </p>
              )}
            </div>

            {/* Rules */}
            <div className="bg-[#151518] border border-white/10 rounded-2xl p-6 md:p-8">
              <button
                onClick={() => setShowRules(!showRules)}
                className="w-full flex justify-between items-center text-left"
              >
                <h2 className="text-2xl font-bold">
                  Studio Rules
                </h2>

                <span className="text-red-500 text-xl">
                  {showRules ? "−" : "+"}
                </span>
              </button>

              {showRules && (
                <div className="mt-6 space-y-3">
                  {rules.length > 0 ? (
                    rules.map((rule, index) => (
                      <p
                        key={index}
                        className="text-gray-400 flex gap-3"
                      >
                        <span className="text-red-500">•</span>
                        {typeof rule === "string"
                          ? rule
                          : rule.name || rule.title}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No additional rules available.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-[#151518] border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-2">
                Book This Studio
              </h2>

              <p className="text-gray-400 text-sm mb-7">
                Choose your preferred date and time.
              </p>

              {/* Date */}
              <label className="block text-sm text-gray-300 mb-2">
                Booking Date
              </label>

              <input
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#0B0B0D] border border-white/10 rounded-xl px-4 py-3 mb-5 text-white outline-none focus:border-red-500"
              />

              {/* Time */}
              <label className="block text-sm text-gray-300 mb-2">
                Booking Time
              </label>

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#0B0B0D] border border-white/10 rounded-xl px-4 py-3 mb-5 text-white outline-none focus:border-red-500"
              />

              {/* Hours */}
              <label className="block text-sm text-gray-300 mb-2">
                Booking Hours
              </label>

              <select
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full bg-[#0B0B0D] border border-white/10 rounded-xl px-4 py-3 mb-6 text-white outline-none focus:border-red-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                  <option key={hour} value={hour}>
                    {hour} {hour === 1 ? "Hour" : "Hours"}
                  </option>
                ))}
              </select>

              {/* Price Summary */}
              <div className="border-t border-white/10 pt-5 space-y-3 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Price per hour</span>
                  <span>{currency}{rate}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Duration</span>
                  <span>{hours} hours</span>
                </div>

                <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-red-500">
                    {currency}{total}
                  </span>
                </div>
              </div>

              {/* Booking Button */}
              <BookNowButton
                studioId={slugify(studio.name)}
                studioName={studio.name}
                category={studio.category}
                location={studio.location || ""}
                date={date}
                time={time}
                hours={hours}
                total={total}
                currency={currency}
                onSuccess={() => {
                  router.push("/my-bookings");
                }}
              />

              <p className="text-center text-xs text-gray-500 mt-4">
                Please review your booking details before confirming.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
