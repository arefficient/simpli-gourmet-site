# Simpli Gourmet

Luxury catering website for Chef Simpli (Tanaia Jones), Detroit, MI.
**Exceeding Your Expectations.**

Next.js 14 (App Router) · Tailwind CSS · Supabase · Resend · Netlify-ready.

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev
```

Open http://localhost:3000.

## What's Built (Phase 1)

- **Public pages** — Home, Menu & Packages ($499 Repass / $599 Hibachi / Corporate), Gallery (26 photos), About (with corrected business card), Reviews, Contact.
- **Quote requests** — Contact form saves to Supabase `quote_requests` and sends a real confirmation email via Resend. Tied to the logged-in account when signed in, guest lead otherwise.
- **Customer accounts** — Sign up / log in / logout / password reset (Supabase Auth) + a dashboard of past quote requests.
- **Admin dashboard** (`/admin`) — Page views over time, top pages, and the full quote/lead list. Only for users whose `profiles.role` is `admin`.
- **Page-view logging** — `src/middleware.ts` inserts a row into `page_views` on every navigation.

## Supabase Setup

1. Create a project (free tier) at https://supabase.com.
2. In **SQL Editor**, run the entire `supabase/schema.sql`.
3. Grab `Project URL` + `anon public` key and the `service_role` key from **Project Settings → API**.
4. Make yourself an admin (SQL Editor):
   ```sql
   update public.profiles set role = 'admin'
   from auth.users
   where auth.users.id = public.profiles.id
     and auth.users.email = 'your@email.com';
   ```
5. Enable Email provider in **Authentication → Providers** (on by default) and set the site URL to your app URL (for auth redirects).

## Resend Setup

1. Create an account at https://resend.com.
2. Get an API key.
3. For local testing before adding a domain, the free sender `onboarding@resend.dev` works. Add your own verified domain + sender for production.

## Deploy to Netlify

This project is configured for Netlify's Next.js runtime via `netlify.toml`
with the `@netlify/plugin-nextjs` plugin (required for App Router, middleware,
and Node API routes).

1. Push this folder to GitHub and import it in Netlify (Build settings are read
   from `netlify.toml` automatically).
2. Add all values from `.env.example` as **Environment Variables** (use
   **Production** and any preview scopes).
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL.
4. In Supabase Auth settings, add your Netlify URL to **Allowed redirect URLs**
   (e.g. `https://your-site.netlify.app/auth/callback`).

Local deploy preview (optional):

```bash
npx netlify-cli dev
```

## Phase 2 (Stubs Only)

- `src/app/api/chat/route.ts` — placeholder AI chat reply; swap in a real model call without frontend changes.
- `src/lib/automations/booking-confirmation.ts` — first automation example (booking confirmation email); add more functions in this folder following the same pattern.
