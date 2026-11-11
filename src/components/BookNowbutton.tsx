
"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";

// Base URL of the Express API (same env var used on the home page).
// Falls back to the legacy dev listener on port 8000.
const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"
).replace(/\/+$/, "");

type BookNowButtonProps = {
  studioId: string;
  studioName: string;
  category: string;
  location: string;
  date: string;
  time: string;
  hours: number;
  total: number;
  currency: string;
  onSuccess: () => void;
};

export default function BookNowButton({
  studioId,
  studioName,
  category,
  location,
  date,
  time,
  hours,
  total,
  currency,
  onSuccess,
}: BookNowButtonProps) {
  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false);

  const handleBooking = async () => {
    // Guard against rapid double-clicks before React re-renders.
    if (submittingRef.current) return;

    if (!date) {
      toast.error("Please select a booking date.");
      return;
    }

    submittingRef.current = true;
    setLoading(true);

    try {
      const bookingData = {
        studioId,
        studioName,
        category,
        location,
        date,
        time,
        hours,
        total,
        currency,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(
        `${API_BASE_URL}/my-bookings`,
        {
          method: "POST",
          // Required for cross-origin requests (localhost:3000 -> localhost:8000)
          // so the Better Auth session cookie is sent to the backend.
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const raw = await response.text();

      let result: { message?: string } | null = null;
      try {
        result = raw ? JSON.parse(raw) : null;
      } catch {
        result = null;
      }

      if (!response.ok) {
        throw new Error(
          result?.message || `Booking failed (${response.status})`
        );
      }

      toast.success(result?.message || "Booking confirmed successfully!");
      onSuccess();
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Booking save করা যায়নি! Please try again."
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBooking}
      disabled={loading}
      className="w-full rounded-xl bg-[#ff263f] py-3 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Booking..." : "Book Now"}
    </button>
  );
}
