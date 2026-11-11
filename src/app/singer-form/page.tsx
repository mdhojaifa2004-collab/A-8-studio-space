"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import Link from "next/link";
import { toast } from "sonner";

const genres = ["Pop", "Rock", "Classical", "Folk", "Hip Hop / Rap", "Jazz", "Devotional / Gospel", "Other"];
const levels = ["Beginner", "Intermediate", "Professional"];
const voices = ["Soprano", "Alto", "Tenor", "Bass", "Not sure"];
const genders = ["Male", "Female", "Other", "Prefer not to say"];

type FormData = {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  city: string;
  genre: string;
  level: string;
  voice: string;
  songTitle: string;
  link: string;
  sessionDate: string;
  sessionTime: string;
  hours: string;
  needBacking: boolean;
  about: string;
  agree: boolean;
};

type Errors = Partial<Record<keyof FormData, string>>;

const empty: FormData = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  city: "",
  genre: "",
  level: "",
  voice: "",
  songTitle: "",
  link: "",
  sessionDate: "",
  sessionTime: "",
  hours: "1",
  needBacking: false,
  about: "",
  agree: false,
};

const inputClass =
  "w-full rounded-lg border border-gray-800 bg-[#151011] px-4 py-3 text-sm text-white outline-none transition focus:border-[#ff263f]";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-[#ff5565]">{error}</p> : null}
    </div>
  );
}

export default function SingerFormPage() {
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Local calendar date (YYYY-MM-DD). toISOString() uses UTC, which is a day
  // behind for timezones like UTC+6 and breaks the date min/max checks.
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`;

  const set = (key: keyof FormData, value: string | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: Errors = {};
    if (form.name.trim().length < 3) e.name = "Enter your full name (at least 3 characters)";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!/^[0-9+\-\s]{10,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.dob) e.dob = "Select your date of birth";
    else if (form.dob > today) e.dob = "Date of birth cannot be in the future";
    if (!form.gender) e.gender = "Select an option";
    if (!form.city.trim()) e.city = "Enter your city";
    if (!form.genre) e.genre = "Select a genre";
    if (!form.level) e.level = "Select your experience level";
    if (!form.songTitle.trim()) e.songTitle = "Enter the song title";
    if (form.link && !/^https?:\/\/\S+$/.test(form.link)) e.link = "Link must start with http:// or https://";
    if (!form.sessionDate) e.sessionDate = "Select a session date";
    else if (form.sessionDate < today) e.sessionDate = "Session date cannot be in the past";
    if (!form.sessionTime) e.sessionTime = "Select a start time";
    if (form.about.trim().length < 20) e.about = "Tell us about yourself (at least 20 characters)";
    if (!form.agree) e.agree = "You must agree to the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!validate()) {
      toast.error("Some fields need your attention. Please fix the fields marked in red.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/singer-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) throw new Error("Request failed");

      toast.success("Your application has been submitted!");
      setDone(true);
      setForm(empty);
    } catch {
      toast.error("Could not submit the form. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0506] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold md:text-5xl">
            Singer <span className="text-[#ff263f]">Application Form</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
            Are you a singer? Fill out the form below and we will help you find the right studio.
          </p>
        </div>

        <form
          onSubmit={submit}
          noValidate
          className="mt-10 space-y-8 rounded-3xl border border-gray-800 bg-[#11090b] p-6 md:p-10"
        >
          {/* Personal details */}
          <fieldset className="space-y-5">
            <legend className="mb-2 border-l-4 border-[#ff263f] pl-3 text-xl font-bold">
              Personal Details
            </legend>

            <Field label="Full name *" error={errors.name}>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </Field>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Email *" error={errors.email}>
                <input
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>
              <Field label="Phone number *" error={errors.phone}>
                <input
                  type="tel"
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </Field>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Date of birth *" error={errors.dob}>
                <input
                  type="date"
                  max={today}
                  className={inputClass}
                  value={form.dob}
                  onChange={(e) => set("dob", e.target.value)}
                />
              </Field>
              <Field label="Gender *" error={errors.gender}>
                <select
                  className={inputClass}
                  value={form.gender}
                  onChange={(e) => set("gender", e.target.value)}
                >
                  <option value="">Select</option>
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="City *" error={errors.city}>
                <input
                  className={inputClass}
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                />
              </Field>
            </div>
          </fieldset>

          {/* Singing details */}
          <fieldset className="space-y-5">
            <legend className="mb-2 border-l-4 border-[#ff263f] pl-3 text-xl font-bold">
              Singing Details
            </legend>

            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Genre *" error={errors.genre}>
                <select
                  className={inputClass}
                  value={form.genre}
                  onChange={(e) => set("genre", e.target.value)}
                >
                  <option value="">Select</option>
                  {genres.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Experience level *" error={errors.level}>
                <select
                  className={inputClass}
                  value={form.level}
                  onChange={(e) => set("level", e.target.value)}
                >
                  <option value="">Select</option>
                  {levels.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Voice type">
                <select
                  className={inputClass}
                  value={form.voice}
                  onChange={(e) => set("voice", e.target.value)}
                >
                  <option value="">Select</option>
                  {voices.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Song you want to record *" error={errors.songTitle}>
                <input
                  className={inputClass}
                  value={form.songTitle}
                  onChange={(e) => set("songTitle", e.target.value)}
                />
              </Field>
              <Field label="Link to your previous work (optional)" error={errors.link}>
                <input
                  className={inputClass}
                  value={form.link}
                  onChange={(e) => set("link", e.target.value)}
                />
              </Field>
            </div>
          </fieldset>

          {/* Studio session */}
          <fieldset className="space-y-5">
            <legend className="mb-2 border-l-4 border-[#ff263f] pl-3 text-xl font-bold">
              Studio Session
            </legend>

            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Preferred date *" error={errors.sessionDate}>
                <input
                  type="date"
                  min={today}
                  className={inputClass}
                  value={form.sessionDate}
                  onChange={(e) => set("sessionDate", e.target.value)}
                />
              </Field>
              <Field label="Start time *" error={errors.sessionTime}>
                <input
                  type="time"
                  className={inputClass}
                  value={form.sessionTime}
                  onChange={(e) => set("sessionTime", e.target.value)}
                />
              </Field>
              <Field label="Duration">
                <select
                  className={inputClass}
                  value={form.hours}
                  onChange={(e) => set("hours", e.target.value)}
                >
                  {[1, 2, 3, 4, 6, 8].map((h) => (
                    <option key={h} value={h}>
                      {h} {h === 1 ? "hour" : "hours"}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#ff263f]"
                checked={form.needBacking}
                onChange={(e) => set("needBacking", e.target.checked)}
              />
              I need a backing track or session musicians
            </label>
          </fieldset>

          {/* About */}
          <fieldset className="space-y-5">
            <legend className="mb-2 border-l-4 border-[#ff263f] pl-3 text-xl font-bold">
              About You
            </legend>

            <Field label="Tell us about yourself *" error={errors.about}>
              <textarea
                rows={5}
                className={inputClass}
                value={form.about}
                onChange={(e) => set("about", e.target.value)}
              />
            </Field>

            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-300">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[#ff263f]"
                  checked={form.agree}
                  onChange={(e) => set("agree", e.target.checked)}
                />
                I confirm that the information above is correct and I agree to the StudioSpace terms.
              </label>
              {errors.agree ? (
                <p className="mt-1 text-xs text-[#ff5565]">{errors.agree}</p>
              ) : null}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#ff263f] px-8 py-4 font-semibold transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>

      {/* Success modal */}
      {done && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4"
          onClick={() => setDone(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[#ff263f]/40 bg-[#151011] p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#ff263f] text-2xl">
              ✓
            </div>
            <h2 className="mt-5 text-2xl font-bold">Thank you!</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              We have received your application. We will contact you by email soon.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setDone(false)}
                className="rounded-xl border border-gray-600 px-5 py-2.5 text-sm font-semibold hover:border-[#ff263f]"
              >
                Close
              </button>
              <Link
                href="/studios"
                className="rounded-xl bg-[#ff263f] px-5 py-2.5 text-sm font-semibold hover:bg-red-700"
              >
                Explore Studios
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}