import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#0b0506] px-4 py-16 text-white">
      <div className="mx-auto max-w-2xl text-center">
        {/* Creative 404 Illustration */}
        <div className="relative mx-auto mb-8 flex h-52 w-52 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#ff263f]/20" />
          <div className="absolute inset-5 rounded-full border border-[#ff263f]/30" />
          <div className="absolute inset-10 rounded-full border border-[#ff263f]/40" />

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#ff263f] shadow-2xl shadow-red-500/30">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-12 w-12 text-white"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="4" />
              <path d="M12 3v5M12 16v5M3 12h5M16 12h5" />
            </svg>
          </div>

          <span className="absolute right-2 top-6 rounded-full bg-[#211013] px-3 py-1 text-xs text-red-400">
            Lost in space?
          </span>
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#ff263f]">
          Error 404
        </p>

        <h1 className="text-4xl font-bold sm:text-6xl">
          Oops! <span className="text-[#ff263f]">Lost</span> Your Focus?
        </h1>

        <p className="mx-auto mt-5 max-w-lg leading-7 text-gray-400">
          Looks like this creative space doesn&apos;t exist. The page you are
          searching for may have been moved or is no longer available.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-[#ff263f] px-7 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            Return to Home
          </Link>

          <Link
            href="/studios"
            className="rounded-xl border border-white/10 bg-[#151011] px-7 py-3 font-semibold text-white transition hover:border-[#ff263f]"
          >
            Explore Studios
          </Link>
        </div>

        <p className="mt-10 text-xs text-gray-600">
          StudioSpace — Where creativity finds its space.
        </p>
      </div>
    </main>
  );
}