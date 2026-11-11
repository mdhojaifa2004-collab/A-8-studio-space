"use client";

import Link from "next/link";
import { toast } from "sonner";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
  { href: "/singer-form", label: "Singer Registration" },
];

const popular = ["Photo Studios", "Podcast Rooms", "Music Suites", "Sound Stages"];

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-[#ff263f] bg-black px-6 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-xl font-bold">
            Studio<span className="text-[#ff263f]">Space</span>
          </h3>
          <p className="mt-3 text-sm leading-6 text-gray-400">
            We help creators find the right room, book it in minutes and get back to making things.
          </p>
        </div>

        <div>
          <h4 className="font-bold">Quick links</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold">Popular categories</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            {popular.map((c) => (
              <li key={c}>
                <Link href={`/studios?category=${encodeURIComponent(c)}`} className="hover:text-white">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold">Newsletter</h4>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement | null;
              if (!input?.value) {
                toast.error("Please enter your email first.");
                return;
              }
              toast.success("You are on the list. Thanks for joining!");
              e.currentTarget.reset();
            }}
          >
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              aria-label="Email"
              className="w-full rounded-lg border border-gray-800 bg-[#151011] px-3 py-2 text-sm outline-none focus:border-[#ff263f]"
            />
            <button className="rounded-lg bg-[#ff263f] px-4 py-2 text-sm font-semibold hover:bg-red-700">
              Join
            </button>
          </form>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="mt-4 inline-block text-gray-400 hover:text-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.2 2h3.4l-7.4 8.5L23 22h-6.8l-5.3-7-6.1 7H1.4l7.9-9.1L1 2h7l4.8 6.4L18.2 2zm-1.2 18h1.9L7 3.9H5L17 20z" />
            </svg>
          </a>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-7xl border-t border-gray-800 pt-5 text-sm text-gray-500">
        © 2026 StudioSpace. Use of the platform means you accept our terms and privacy notice.
      </p>
    </footer>
  );
}
