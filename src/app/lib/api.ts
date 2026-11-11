// Browser calls go through the same-origin Next.js rewrite proxy defined in
// next.config.ts. This means the Better Auth session cookie (which belongs to
// the frontend origin) is sent with the request and forwarded to the Express
// backend by Next.js, instead of relying on cross-site cookies.
export const API_PROXY_BASE = "/api/backend";

export function backendUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_PROXY_BASE}${normalized}`;
}
