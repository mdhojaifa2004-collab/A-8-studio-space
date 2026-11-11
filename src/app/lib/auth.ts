import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const mongoUrl = process.env.MONGO_DB_SERVER;

if (!mongoUrl) {
  throw new Error("MONGO_DB_SERVER is missing from environment variables");
}

// Trim and drop trailing slashes so a stray space or slash in the Vercel env
// var cannot produce `https://site//api/auth/callback/google`
// (which Google rejects with redirect_uri_mismatch).
const baseURL = process.env.BETTER_AUTH_URL?.trim().replace(/\/+$/, "");

const client = new MongoClient(mongoUrl);
const db = client.db("studiospace");

export const auth = betterAuth({
  baseURL: baseURL || undefined,

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  account: {
    accountLinking: {
      enabled: true,
      // Google verifies the email before issuing a token, so its
      // `email_verified` claim can be trusted to link an existing account.
      trustedProviders: ["google"],
      // Credential sign-ups in this app are created without email
      // verification (there is no mail provider configured), so every
      // existing user has `emailVerified: false`. Without this, Better Auth
      // refuses to link Google to those rows and redirects the OAuth callback
      // back to /auth/sign-in?error=account_not_linked. Emails must still
      // match exactly, so Google cannot attach itself to a different address.
      requireLocalEmailVerified: false,
    },
  },

  // Google OAuth. The env var names match the existing .env / Vercel config.
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string,
    },
  },

  plugins: [
    jwt({
      sessionCookieCache: true,
    }),
  ],

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },
});
