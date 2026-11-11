
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { backendUrl } from "@/app/lib/api";

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
  const router = useRouter();
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

      const response = await fetch(backendUrl("/my-bookings"), {
        method: "POST",
        // Same-origin request through the Next.js proxy, so the Better Auth
        // session cookie is sent and then forwarded to the Express backend.
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const raw = await response.text();

      let result: { message?: string } | null = null;
      try {
        result = raw ? JSON.parse(raw) : null;
      } catch {
        result = null;
      }

      if (response.status === 401) {
        toast.error("Please sign in to book a studio.");
        router.push(
          `/auth/sign-in?callbackURL=${encodeURIComponent(
            window.location.pathname
          )}`
        );
        return;
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
