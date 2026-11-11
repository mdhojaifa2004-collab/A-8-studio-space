import type { NextConfig } from "next";

// Express backend base URL. This must stay a full http(s) URL; browser code
// reaches the backend through the same-origin /api/backend rewrite below.
const backendBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // Proxy protected API calls through the frontend origin. The Better Auth
  // session cookie is scoped to the frontend domain, so the browser cannot
  // send it directly to a different domain (e.g. the Vercel backend). Next.js
  // forwards the cookie header to Express, where requireAuth verifies it.
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
