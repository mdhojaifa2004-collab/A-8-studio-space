import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

// No explicit baseURL is needed: the client defaults to the same-origin
// /api/auth path where the Next.js route handler is mounted. Reading a
// server-only variable such as BETTER_AUTH_URL here would be undefined in
// the browser bundle.
export const authClient = createAuthClient({
  plugins: [jwtClient()],
});
