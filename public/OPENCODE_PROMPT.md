# OpenCode Prompt: StudioSpace (copy everything below into OpenCode)

Build a complete full-stack project called **StudioSpace**, a peer-to-peer creative workspace and production studio sharing platform. Create TWO separate folders: `studiospace-client` (Next.js) and `studiospace-server` (Express). Work step by step, finish each step, and make a git commit after each one (see "Commit plan").

## 1. Tech stack
- **Client:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Swiper.js (hero slider), `sonner` (toasts), `next-themes` (dark/light), `lucide-react` icons, `jspdf` (invoice PDF).
- **Auth:** BetterAuth with the MongoDB adapter, Google social login, email and password. After login the server issues a **JWT stored in an HTTPOnly cookie**.
- **Server:** Express.js, TypeScript, MongoDB (official driver), `cookie-parser`, `jsonwebtoken`, `cors` (credentials: true), `dotenv`.
- **Images:** imgbb API upload (or accept an image URL).
- **Deploy:** client on Vercel, server on Render or Vercel. Add `vercel.json` / rewrites so reloading any route never throws a 404 or error.

## 2. Design system (strict)
- **Primary colors: red and black.**
  - Red `#d90f23` (hover `#a30a19`, bright accent on dark `#ff2a3d`)
  - Black `#0b0405`, dark surface `#170a0c`, light background `#fbf7f6`, border `#e8dcdb` (dark border `#2d1a1d`)
- Fonts: **Bricolage Grotesque** (headings, weight 600/800) and **Manrope** (body) via `next/font/google`.
- Header and footer are always black with a 3px red border (bottom for header, top for footer). Primary buttons are red with white text, 10px radius, and the same style everywhere. Cards have a 14px radius and equal height and width inside a grid.
- Keep all section headings the same font, size and color. Keep spacing balanced. Fully responsive (mobile, tablet, desktop).
- No lorem ipsum anywhere. Never use `alert()`. Use Sonner toasts and custom modal dialogs (shadcn `AlertDialog`/`Dialog`) for every success, error and confirmation.
- Use the new **X logo** (not the Twitter bird) in the footer.
- Branded loading states: skeleton loaders for cards and tables, a red spinner for route transitions (`loading.tsx` files).
- Custom `not-found.tsx` with a studio illustration (use `/public/images/hero-3.svg` style art) and a "Return to Home" button.
- Friendly empty states with CTA buttons (no search results, no bookings, no listings).

## 3. Assets
I will put these files in `studiospace-client/public/`:
- `/logo.svg` (full logo, white and red text, for the black navbar and footer)
- `/logo-icon.svg` (favicon and app icon; also set it as the site favicon)
- `/images/hero-1.svg`, `/images/hero-2.svg`, `/images/hero-3.svg` (hero slider backgrounds)

Use them as is. Do not replace them with remote images. For studio card images, use the `imageUrl` field from the database, and show a red/black gradient placeholder when it is missing.

## 4. Client routes and layout
**Navbar** (sticky, black): logo on the left; links Home `/`, Explore Studios `/studios`, How It Works `/how-it-works`, About Us `/about` with an active-route indicator (red pill). Logged out: Login and Register buttons. Logged in: avatar (user photo, fallback to initial); hover or click shows the user name plus a dropdown with Dashboard, Add New Studio, My Studio Listings, My Bookings, Logout. Include a theme toggle button (sun/moon). Mobile: hamburger menu.

**Footer** (black): logo, mission statement, copyright and terms notice, quick links, popular categories, newsletter input (toast on submit), social links including the X logo.

**Pages**
1. `/` Home
   - Swiper hero slider, 3 slides, autoplay, using hero-1/2/3 as backgrounds. Each slide has a punchy headline, subtext, and buttons "Explore Studios" and "Host Your Space", both linking to `/studios`.
     - Slide 1: "Find the room where your next frame comes alive"
     - Slide 2: "Record loud. Rent quiet."
     - Slide 3: "Got a spare studio? Put it to work."
   - Featured Studios: fetch from `GET /api/studios?limit=6&sort=rating` (MongoDB `.limit(6)`). Card: image, category badge, title, `$XX / hr`, rating badge, location, "View Details" button.
   - Browse by Category: Photo Studios, Sound Stages, Podcast Rooms, Music Suites, Art Workshops. Clicking goes to `/studios?category=...` with the filter pre-selected.
   - How Booking Works: 4 steps (Discover Spaces, Select Shoot Hours, Book Instantly, Create and Produce).
   - Host Guarantee and Creator Support: liability protection, verified profiles, equipment safety, 24/7 host support.
2. `/studios` grid of all studios with search, category filter, price sort, pagination. Empty state when nothing matches.
3. `/studios/[id]` details: gallery carousel, specs, amenities, host details, reviews, and a "Book Workspace Now" button that opens a booking modal (date, start time, hours, live total price, security deposit shown).
4. `/add-studio` (private): form with Title, Category select, Hourly Rate, Security Deposit, Max Capacity, Location, Image (imgbb upload or URL), Amenities (tag input), Detailed Overview, read-only host name and email. Save, show success toast, redirect to `/my-listings`.
5. `/my-listings` (private): table or cards of studios where `ownerEmail` equals the logged-in user. Update and Delete buttons. Delete shows a confirmation modal first, then a success toast.
6. `/studios/edit/[id]` (private): pre-filled form, read-only host info, PATCH on submit, success toast, redirect to `/my-listings`.
7. `/my-bookings` (private): list of reservations with a status badge (Pending, Confirmed, Completed, Cancelled) and a "Cancel Booking" button (with confirm modal) only for Pending.
8. `/login` (email, password, Login button, link to Register, Google button; wrong credentials show an error toast).
9. `/register` (name, email, photo URL, password, Register button, Google button). Password rules: at least one uppercase letter, one lowercase letter, minimum 6 characters. Show the error under the field and do not register on failure. After success, redirect to `/login`. No email verification and no forgot-password flow.
10. `/how-it-works`, `/about`, `/dashboard` (simple stats: my listings, my bookings, pending requests).

**Private route rule:** a logged-in user must NOT be redirected to login when reloading a private page. Wait for the session to load (show a skeleton), and only then redirect if there is truly no session. Preserve the intended path and return to it after login.

## 5. Server API (Express, MongoDB)
Collections: `studios`, `bookings`, `wishlists`, `reviews`.

Studio document: `title, category, hourlyRate, securityDeposit, maxCapacity, location, imageUrl, gallery[], amenities[], overview, ownerName, ownerEmail, rating, reviewCount, createdAt`.
Booking document: `studioId, studioTitle, userEmail, userName, date, startHour, hours, totalPrice, status ("Pending" default), createdAt`.

Endpoints:
- `GET /api/studios` (query: `category, search, sort, limit, page`)
- `GET /api/studios/:id`
- `POST /api/studios` (protected)
- `PATCH /api/studios/:id` (protected, owner only)
- `DELETE /api/studios/:id` (protected, owner only)
- `GET /api/my-studios` (protected)
- `POST /api/bookings` (protected)
- `GET /api/my-bookings` (protected)
- `PATCH /api/bookings/:id/cancel` (protected, only Pending, only the booking owner)
- `PATCH /api/bookings/:id/status` (protected, studio owner sets Confirmed/Completed)
- `POST /api/wishlist/:studioId` and `GET /api/wishlist` (protected)
- `POST /api/auth/jwt` (issue JWT cookie after BetterAuth login) and `POST /api/auth/logout` (clear cookie)

## 6. Challenges to implement
1. **JWT with HTTPOnly cookies:** the cookie is `httpOnly`, `secure` in production, `sameSite: "none"` in production and `"lax"` in development. A `verifyJWT` middleware protects every POST, PATCH and DELETE route and returns `401 Unauthorized` (JSON message) when the token is missing or invalid. Use `403` when the user is logged in but not the owner.
2. **Double-booking prevention:** before saving a booking, query existing **Confirmed** bookings for the same studio and date. A collision happens when `newStart < existingEnd && newEnd > existingStart`. If it collides, return `409` with the message "This time overlaps a confirmed booking. Pick another slot." and show it in a toast. Also reject past dates.
3. **Theme customization:** light and dark themes for the whole app (`next-themes`, `class` strategy), persisted, with the red/black palette adapted to both.

**Optional (do both):**
- **PDF invoice:** a "Download Invoice" button on Confirmed bookings that generates a branded red/black PDF receipt with `jspdf` (booking id, studio, date, hours, total, deposit).
- **Wishlist:** heart icon on studio cards; logged-in users save and unsave favorite studios in MongoDB; add a Saved Studios section on the dashboard.

## 7. Seed data
Create `scripts/seed.ts` in the server that inserts 12 realistic studios across the 5 categories (real-sounding names, cities, prices from $20 to $150/hr, ratings 4.3 to 4.9, amenity lists, overviews). Include 2 sample confirmed bookings so overlap rejection can be demoed.

## 8. Environment variables
Client `.env.local`: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_IMGBB_KEY`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
Server `.env`: `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`.
Provide `.env.example` files for both. Never commit real secrets.

## 9. README.md (client repo)
Include: project name **StudioSpace**, live site URL placeholder, at least 5 feature bullets, tech stack, local setup steps (clone, install, env, seed, run), and **examiner test credentials** (create a demo user: `examiner@studiospace.com` / `Studio123`).

## 10. Commit plan
Make meaningful commits with clear messages.
- **Client (at least 15):** project setup and Tailwind theme; fonts and design tokens; navbar and footer; theme toggle; hero slider; featured studios section; category and extra home sections; auth pages and password validation; BetterAuth and Google login; private route guard; explore studios page with filters; studio details and gallery; booking modal; add-studio form; my-listings with delete modal; edit-studio page; my-bookings page; skeleton loaders and 404; wishlist and PDF invoice; README and deploy config.
- **Server (at least 8):** Express and TypeScript setup; MongoDB connection; studios read routes; JWT cookie middleware; studio create, update and delete with owner checks; bookings routes; double-booking check; wishlist and status routes; seed script; deploy config.

## 11. Final checklist (verify before finishing)
- No `alert()` anywhere; no lorem ipsum.
- Reloading any route works with no errors, including private routes.
- Mutations without a valid cookie return 401.
- Overlapping booking against a Confirmed slot is rejected with a clear toast.
- Layout is responsive, cards are equal size, and the red/black theme is consistent in light and dark mode.
- Run `npm run build` in both projects and fix every error.
