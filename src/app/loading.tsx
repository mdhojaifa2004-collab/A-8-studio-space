
export default function Loading() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#0b0506] px-4">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="relative mx-auto mb-8 h-20 w-20">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#211013] border-t-[#ff263f]" />

          <div className="absolute inset-4 animate-pulse rounded-full bg-[#ff263f]/20" />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-[#ff263f]">S</span>
          </div>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-white">
          Studio<span className="text-[#ff263f]">Space</span>
        </h2>

        <p className="text-sm text-gray-400">
          Preparing your creative space...
        </p>

        <div className="mx-auto mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-[#211013]">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[#ff263f]" />
        </div>
      </div>
    </main>
  );
}
