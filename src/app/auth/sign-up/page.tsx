"use client";

import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error.message || "Signup failed. Please try again.");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/sign-in");
      router.refresh();

    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0506] px-4 py-12 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-[-150px] top-[-150px] h-[400px] w-[400px] rounded-full bg-[#ff263f]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-150px] right-[-150px] h-[400px] w-[400px] rounded-full bg-red-600/10 blur-[120px]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#120b0c] shadow-2xl shadow-black/50 md:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#ff263f] via-[#a10d20] to-[#190507] p-10 md:flex">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute left-10 top-10 h-40 w-40 rounded-full border-[30px] border-white" />
            <div className="absolute bottom-10 right-10 h-60 w-60 rounded-full border-[40px] border-white" />
          </div>

          <Link href="/" className="relative text-2xl font-black tracking-tight">
            Studio<span className="text-black">Space</span>
          </Link>

          <div className="relative">
            <p className="mb-4 text-sm font-bold uppercase tracking-[4px] text-white/70">
              Create. Record. Inspire.
            </p>

            <h1 className="text-5xl font-black leading-tight">
              Your sound.
              <br />
              Your space.
              <br />
              Your story.
            </h1>

            <p className="mt-6 max-w-sm leading-7 text-white/70">
              Find the perfect studio, book your session, and bring your
              creative vision to life.
            </p>
          </div>

          <p className="relative text-sm text-white/50">
            © 2026 StudioSpace. All rights reserved.
          </p>
        </div>

        {/* Right Side: Signup Form */}
        <div className="p-6 sm:p-10 md:p-12">
          <Link
            href="/"
            className="mb-8 inline-block text-xl font-black tracking-tight md:hidden"
          >
            Studio<span className="text-[#ff263f]">Space</span>
          </Link>

          <div className="mb-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[3px] text-[#ff263f]">
              Get Started
            </p>

            <h2 className="text-3xl font-black sm:text-4xl">
              Create Account
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              Join StudioSpace and start your creative journey.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="w-full rounded-xl border border-white/10 bg-[#0b0506] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-[#ff263f] focus:ring-2 focus:ring-[#ff263f]/20"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-xl border border-white/10 bg-[#0b0506] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-[#ff263f] focus:ring-2 focus:ring-[#ff263f]/20"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-white/10 bg-[#0b0506] px-4 py-3.5 pr-16 text-white outline-none transition placeholder:text-gray-600 focus:border-[#ff263f] focus:ring-2 focus:ring-[#ff263f]/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-[#ff263f]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-white/10 bg-[#0b0506] px-4 py-3.5 pr-16 text-white outline-none transition placeholder:text-gray-600 focus:border-[#ff263f] focus:ring-2 focus:ring-[#ff263f]/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-[#ff263f]"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 text-sm text-gray-400">
              <input
                type="checkbox"
                required
                className="mt-1 accent-[#ff263f]"
              />

              <span>
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-[#ff263f] hover:underline"
                >
                  Terms & Conditions
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#ff263f] py-4 font-bold text-white shadow-lg shadow-[#ff263f]/20 transition hover:bg-red-700 hover:shadow-[#ff263f]/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Sign In */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-bold text-[#ff263f] transition hover:text-red-400"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}