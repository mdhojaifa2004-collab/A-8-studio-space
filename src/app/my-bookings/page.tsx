
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Booking = {
  _id: string;
  studioId: string;
  studioName: string;
  category: string;
  date: string;
  time: string;
  hours: number;
  total: number;
  currency: string;
};

type ToastType = "success" | "error";

// Base URL of the Express API (same env var used on the home page).
// Falls back to the legacy dev listener on port 8000.
const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"
).replace(/\/+$/, "");

const API_URL = `${API_BASE_URL}/my-bookings`;

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editHours, setEditHours] = useState(1);
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: ToastType;
  }>({
    show: false,
    message: "",
    type: "success",
  });

  // Toast Notification
  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ show: true, message, type });

    window.setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // Fetch Bookings
  const fetchBookings = useCallback(async () => {
    try {
      setError("");

      const response = await fetch(API_URL, {
        // Send the Better Auth session cookie to the API server.
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        err instanceof Error ? err.message : "Bookings load করা যাচ্ছে না!"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Statistics
  const totalHours = bookings.reduce(
    (acc, booking) => acc + Number(booking.hours),
    0
  );

  // Open Edit Modal
  const openEditModal = (booking: Booking) => {
    setEditingBooking(booking);
    setEditDate(booking.date);
    setEditTime(booking.time);
    setEditHours(Number(booking.hours));
  };

  // Update Booking
  const updateBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingBooking) return;

    if (!editDate || !editTime || editHours < 1 || editHours > 24) {
      showToast("Please enter valid booking information!", "error");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/${editingBooking._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: editDate,
          time: editTime,
          hours: editHours,
        }),
      });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Update failed");
    }

    setEditingBooking(null);
    await fetchBookings();

    showToast("Booking updated successfully!", "success");
  } catch (err) {
    console.error("Update error:", err);
    showToast(
      err instanceof Error ? err.message : "Booking update failed!",
      "error"
    );
  } finally {
    setSaving(false);
  }
};

// Cancel Booking
const cancelBooking = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmed) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Cancel failed");
    }

    setBookings((prev) =>
      prev.filter((booking) => booking._id !== id)
    );

    showToast("Booking cancelled successfully!", "success");
  } catch (err) {
    console.error("Cancel error:", err);
    showToast(
      err instanceof Error ? err.message : "Booking cancellation failed!",
      "error"
    );
  }
};

return (
  <main className="min-h-screen bg-[#0b0506] px-6 py-16 text-white">

    {/* Toast Notification */}
    {toast.show && (
      <div
        role="status"
        className={`fixed right-5 top-5 z-[100] flex items-center gap-3 rounded-xl border px-5 py-4 shadow-2xl ${toast.type === "success"
            ? "border-green-500/40 bg-[#10251b] text-green-400"
            : "border-red-500/40 bg-[#2b1014] text-red-400"
          }`}
      >
        <span className="text-xl">
          {toast.type === "success" ? "✓" : "!"}
        </span>

        <p className="text-sm font-semibold">{toast.message}</p>

        <button
          type="button"
          onClick={() =>
            setToast((prev) => ({ ...prev, show: false }))
          }
          className="ml-2 text-lg opacity-70 hover:opacity-100"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    )}

    <div className="mx-auto max-w-7xl">

      {/* Header */}
      <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-[#ff263f]">
        Your Sessions
      </p>

      <h1 className="text-4xl font-bold md:text-5xl">
        My <span className="text-[#ff263f]">Bookings</span>
      </h1>

      <p className="mt-4 max-w-xl text-gray-400">
        All the studios you have booked, in one place.
      </p>

      {/* Statistics */}
      <div className="mt-10 grid max-w-xl grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-800 border-l-4 border-l-[#ff263f] bg-[#151011] p-5">
          <p className="text-sm text-gray-400">Total Bookings</p>
          <p className="mt-2 text-3xl font-extrabold">
            {bookings.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-800 border-l-4 border-l-[#ff263f] bg-[#151011] p-5">
          <p className="text-sm text-gray-400">Booked Hours</p>
          <p className="mt-2 text-3xl font-extrabold">
            {totalHours}
          </p>
        </div>
      </div>

      {/* Booking List */}
      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold">Booking List</h2>

        {loading ? (
          <p className="py-16 text-center text-gray-400">
            Loading bookings...
          </p>
        ) : error ? (
          <div className="py-16 text-center">
            <p className="text-red-500">{error}</p>

            <button
              onClick={fetchBookings}
              className="mt-4 rounded-lg bg-[#ff263f] px-5 py-2 font-semibold hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-gray-800 bg-[#151011] p-12 text-center">
            <p className="text-5xl">📅</p>

            <p className="mt-4 text-xl font-bold">
              No bookings yet
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Book a studio and it will show up here.
            </p>

            <Link
              href="/studios"
              className="mt-6 inline-block rounded-xl bg-[#ff263f] px-6 py-3 text-sm font-semibold hover:bg-red-700"
            >
              Explore Studios
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#151011]">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="border-b border-gray-800 bg-[#1a0c0f] text-xs uppercase text-gray-400">
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
                    key={b._id}
                    className="border-b border-gray-800/60 hover:bg-[#1f1013]"
                  >
                    <td className="px-5 py-4 font-semibold">
                      <Link
                        href={`/studios/${b.studioId}`}
                        className="hover:text-[#ff263f]"
                      >
                        {b.studioName}
                      </Link>
                    </td>

                    <td className="px-5 py-4">{b.category}</td>
                    <td className="px-5 py-4 text-gray-300">{b.date}</td>
                    <td className="px-5 py-4 text-gray-300">{b.time}</td>
                    <td className="px-5 py-4 text-gray-300">{b.hours}</td>

                    <td className="px-5 py-4 font-semibold text-[#ff263f]">
                      {b.currency}
                      {Number(b.total).toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(b)}
                          className="rounded-lg border border-gray-700 px-3 py-1.5 text-xs font-semibold transition hover:border-[#ff263f] hover:bg-[#ff263f]"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => cancelBooking(b._id)}
                          className="rounded-lg border border-gray-700 px-3 py-1.5 text-xs font-semibold transition hover:border-red-500 hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>

    {/* Edit Booking Modal */}
    {editingBooking && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#151011] p-6 shadow-2xl">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-[#ff263f]">
                Update Session
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Edit Booking
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setEditingBooking(null)}
              className="text-2xl text-gray-400 hover:text-white"
              aria-label="Close edit form"
            >
              &times;
            </button>
          </div>

          <p className="mb-5 text-sm text-gray-400">
            Studio:{" "}
            <span className="font-semibold text-white">
              {editingBooking.studioName}
            </span>
          </p>

          <form onSubmit={updateBooking} className="space-y-5">

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Booking Date
              </label>

              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-700 bg-[#0b0506] px-4 py-3 text-white outline-none focus:border-[#ff263f]"
              />
            </div>

            {/* Time */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Booking Time
              </label>

              <input
                type="time"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-700 bg-[#0b0506] px-4 py-3 text-white outline-none focus:border-[#ff263f]"
              />
            </div>

            {/* Hours */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Booking Hours
              </label>

              <input
                type="number"
                min="1"
                max="24"
                value={editHours}
                onChange={(e) => setEditHours(Number(e.target.value))}
                required
                className="w-full rounded-xl border border-gray-700 bg-[#0b0506] px-4 py-3 text-white outline-none focus:border-[#ff263f]"
              />
            </div>

            {/* Total */}
            <div className="rounded-xl border border-gray-800 bg-[#0b0506] p-4">
              <p className="text-sm text-gray-400">
                Estimated Total
              </p>

              <p className="mt-1 text-2xl font-bold text-[#ff263f]">
                {editingBooking.currency}
                {(
                  (Number(editingBooking.total) /
                    Number(editingBooking.hours)) *
                  editHours
                ).toLocaleString()}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingBooking(null)}
                className="w-full rounded-xl border border-gray-700 px-4 py-3 font-semibold transition hover:bg-gray-800"
              >
                Close
              </button>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl bg-[#ff263f] px-4 py-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </main>
);
}
