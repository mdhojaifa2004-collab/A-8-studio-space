"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { studios } from "../data/studios";
import { getRating } from "../components/rating";
import {
  Booking,
  getBookings,
  removeBooking,
  clearBookings,
} from "./bookingStore";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [bookings, setBookings] = useState<Booking[]>([]);

  // সেভ করা বুকিং লোড করা
  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const categoryList = useMemo(
    () => ["All", ...Array.from(new Set(studios.map((s) => s.category)))],
    []
  );

  const rows = useMemo(() => {
    const text = search.toLowerCase().trim();
    return studios.filter((s) => {
      const matchCategory = category === "All" || s.category === category;
      const matchSearch =
        s.name.toLowerCase().includes(text) ||
        s.location.toLowerCase().includes(text) ||
        s.category.toLowerCase().includes(text);
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  const avgRating = useMemo(() => {
    if (studios.length === 0) return "0.0";
    const sum = studios.reduce((acc, s) => acc + getRating(s.name), 0);
    return (sum / studios.length).toFixed(1);
  }, []);

  const totalHours = bookings.reduce((acc, b) => acc + b.hours, 0);

  const stats = [
    { label: "Total Studios", value: studios.length },
    { label: "Average Rating", value: `★ ${avgRating}` },
    { label: "My Bookings", value: bookings.length },
    { label: "Booked Hours", value: totalHours },
  ];

  return (
    <main className="min-h-screen bg-[#0b0506] px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-[#ff263f]">
          Overview
        </p>
        <h1 className="text-4xl font-bold md:text-5xl">
          Your <span className="text-[#ff263f]">Dashboard</span>
        </h1>
        <p className="mt-4 max-w-xl text-gray-400">
          Your bookings and every studio on the platform in one place.
        </p>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-gray-800 border-l-4 border-l-[#ff263f] bg-[#151011] p-5"
            >
              <p className="text-sm text-gray-400">{s.label}</p>
              <p className="mt-2 text-3xl font-extrabold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* My Bookings */}
        <section className="mt-14">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Bookings</h2>
            {bookings.length > 0 && (
              <button
                onClick={() => {
                  clearBookings();
                  setBookings([]);
                }}
                className="text-sm text-gray-400 transition hover:text-[#ff263f]"
              >
                Clear all
              </button>
            )}
          </div>

          {bookings.length === 0 ? (
            <div className="rounded-2xl border border-gray-800 bg-[#151011] p-10 text-center">
              <p className="text-4xl">📅</p>
              <p className="mt-3 text-lg font-bold">No bookings yet</p>
              <p className="mt-1 text-sm text-gray-400">
                Book a studio and it will show up here.
              </p>
              <Link
                href="/studios"
                className="mt-5 inline-block rounded-xl bg-[#ff263f] px-6 py-3 text-sm font-semibold transition hover:bg-red-700"
              >
                Explore Studios
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#151011]">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-gray-800 bg-[#1a0c0f] text-xs uppercase tracking-wider text-gray-400">
                  <tr>
                    <th className="px-5 py-4">Studio</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Time</th>
                    <th className="px-5 py-4">Hours</th>
                    <th className="px-5 py-4">Total</th>
                    <th className="px-5 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b border-gray-800/60 transition last:border-0 hover:bg-[#1f1013]"
                    >
                      <td className="px-5 py-4 font-semibold">
                        <Link
                          href={`/studios/${b.studioId}`}
                          className="transition hover:text-[#ff263f]"
                        >
                          {b.studioName}
                        </Link>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-md bg-black px-2.5 py-1 text-xs font-bold text-[#ff263f]">
                          {b.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-300">{b.date}</td>
                      <td className="px-5 py-4 text-gray-300">{b.time}</td>
                      <td className="px-5 py-4 text-gray-300">{b.hours}</td>
                      <td className="px-5 py-4 font-semibold text-[#ff263f]">
                        {b.currency}
                        {b.total.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setBookings(removeBooking(b.id))}
                          className="rounded-lg border border-gray-700 px-3 py-1.5 text-xs font-semibold transition hover:border-[#ff263f] hover:bg-[#ff263f]"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* All Studios */}
        <section className="mt-14">
          <h2 className="mb-4 text-2xl font-bold">All Studios</h2>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, location or category..."
              className="flex-1 rounded-xl border border-gray-800 bg-[#151011] px-5 py-3 outline-none focus:border-[#ff263f]"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-gray-800 bg-[#151011] px-5 py-3 outline-none focus:border-[#ff263f]"
            >
              {categoryList.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Categories" : c}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="rounded-xl bg-[#ff263f] px-6 py-3 font-semibold transition hover:bg-red-700"
            >
              Reset
            </button>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-800 bg-[#151011]">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-gray-800 bg-[#1a0c0f] text-xs uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="px-5 py-4">#</th>
                  <th className="px-5 py-4">Studio</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Rating</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-gray-400">
                      No studios found. Try a different search or category.
                    </td>
                  </tr>
                ) : (
                  rows.map((s, i) => (
                    <tr
                      key={s.name}
                      className="border-b border-gray-800/60 transition last:border-0 hover:bg-[#1f1013]"
                    >
                      <td className="px-5 py-4 text-gray-500">{i + 1}</td>
                      <td className="px-5 py-4 font-semibold">{s.name}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-md bg-black px-2.5 py-1 text-xs font-bold text-[#ff263f]">
                          {s.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-400">{s.location}</td>
                      <td className="px-5 py-4 font-semibold text-[#ff263f]">
                        {s.price}
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-md bg-[#ff263f] px-2 py-0.5 text-xs font-bold">
                          ★ {getRating(s.name).toFixed(1)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/studios/${slugify(s.name)}`}
                          className="rounded-lg border border-[#ff263f] px-3 py-1.5 text-xs font-semibold transition hover:bg-[#ff263f]"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}