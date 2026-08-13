# Simpli Gourmet — Build Log

Section-by-section log of the full Phase 1 build. Every command run and every
file created or modified is recorded here for review.

---

## Section 1 — Project Scaffold & Foundation

### Commands

```bash
# Scaffold Next.js 14 (App Router + TS + Tailwind + src dir) in a temp dir,
# then moved into the project folder alongside the existing image assets.
npx --yes create-next-app@14 . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes

# Runtime dependencies installed
npm install @supabase/ssr @supabase/supabase-js resend
```

### Files created
- `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`
- `.eslintrc.json`, `.gitignore`, `next-env.d.ts`
- Scaffold defaults removed: Geist fonts + `favicon.ico`

---

## Section 2 — Assets

### Commands

```bash
# Copy logo, 26 real photos, and (at the time) a video into public/
cp 1.png public/logo.png
cp *.jpg public/images/
cp "Firefly Create a business video... (1).mp4" public/business-card.mp4
```

### Files created
- `public/logo.png` — replaced by gold/white-hat logo (see Section 7)
- `public/images/` — 26 real `.jpg` photos

### Video removal (Section 7 change)
- `public/business-card.mp4` — **deleted**
- Both `Firefly*.mp4` files in project root — **deleted**
- All `<video>` references removed from code.

---

## Section 3 — Theme & Design System

### Files created / modified
- `tailwind.config.ts` — brand palette:
  - burgundy `#5A0A0A`, burgundy-dark `#3A0606`, gold `#D4A830`, cream `#F5E6C8`
  - fonts: `Cormorant Garamond` (serif, italic) + `Lato` (sans)
  - `tracking-luxury` letter-spacing token
- `src/app/globals.css` — component classes: `container-lux`, `eyebrow`, `h-serif`, `gold-line`, `btn-gold`, `btn-ghost`
- `src/app/layout.tsx` — Google fonts, global Nav + Footer, site metadata

### Commands

```bash
npm run build   # verify compile
```

---

## Section 4 — Data Layer

### Files created
- `src/lib/data.ts` — site info, packages ($499 Repass / $599 Hibachi / Corporate), testimonials, gallery image list (26)
- `src/lib/supabase/client.ts` — browser Supabase client
- `src/lib/supabase/server.ts` — server (cookie) Supabase client
- `src/lib/supabase/admin.ts` — service-role admin client
- `supabase/schema.sql` — tables `profiles`, `quote_requests`, `page_views` + RLS + auto-profile trigger + admin helper

---

## Section 5 — Shared Components

### Files created
- `src/components/Logo.tsx`
- `src/components/Nav.tsx` — fixed header, mobile menu, My Account CTA
- `src/components/Footer.tsx`
- `src/components/QuoteForm.tsx` — client-side quote form → `/api/quote`

---

## Section 6 — Pages (Phase 1)

### Files created
- `src/app/page.tsx` — Home (typographic hero, packages, gallery preview, testimonials, CTA)
- `src/app/menu/page.tsx` — Menu/Packages
- `src/app/gallery/page.tsx` — Gallery (26 photos)
- `src/app/about/page.tsx` — About (video replaced by card image in Section 7)
- `src/app/reviews/page.tsx` — Reviews
- `src/app/contact/page.tsx` — Contact + quote form
- `src/app/login/page.tsx`, `src/app/signup/page.tsx`, `src/app/forgot-password/page.tsx`
- `src/app/account/page.tsx` — dashboard of past quotes
- `src/app/account/update-password/page.tsx`
- `src/app/admin/page.tsx` — admin dashboard (page views, top pages, leads)
- `src/app/auth/actions.ts` — server actions (login/signup/logout/reset)
- `src/app/auth/callback/route.ts` — OAuth/email callback

### API
- `src/app/api/quote/route.ts` — saves quote + sends Resend confirmation
- `src/app/api/chat/route.ts` — Phase 2 placeholder
- `src/middleware.ts` — logs page views to Supabase

### Email / Automations
- `src/lib/email.ts` — Resend client + quote confirmation email
- `src/lib/automations/booking-confirmation.ts` — Phase 2 stub

### Commands

```bash
npm run build   # fixed alias path bug, Map iterator target, count typing
npm run lint    # clean
```

---

## Section 7 — Video Removal + Final Brand Assets (this pass)

### Commands

```bash
rm public/business-card.mp4
rm "Firefly Create a business video using these images as a business card. I would also like to generate (1).mp4"
rm "Firefly Create a business video using these images as a business card. I would also like to generate.mp4"
cp "/Users/user/Downloads/SimpliGourmet_Logo_Gold_WhiteHat.png" public/logo.png
cp "/Users/user/Downloads/CorrectedCard_NewKitchen.jpg" public/images/card.jpg
```

### Files modified
- `src/components/Logo.tsx` — new gold/white-hat logo (wider, horizontal lockup, no circular crop)
- `src/app/about/page.tsx` — `<video>` replaced with `<Image>` of `card.jpg`

---

## Section 8 — Netlify Deployment Config

### Files created
- `netlify.toml` — Next.js runtime build config
- `.nvmrc` — Node 22

### Files modified
- `README.md` — Netlify deploy steps (replaces Vercel)

### Commands

```bash
npm run build   # final verification
npm run lint
```

### Verification result (Section 7–8 changes)
- `tsc --noEmit` — passed, zero type errors
- `eslint src` — clean, zero warnings/errors
- `next build` — **✓ Compiled successfully**, 18/18 static pages generated,
  all 16 routes + middleware built. Full route table above the fold in logs.
- Note: local build speed was throttled by macOS background daemon load
  (modelcatalogd/duetexpertd, load avg up to 13). Netlify's cloud build runs
  on dedicated resources and is unaffected. When load is calm the same
  command completes in ~1–2 min.

---

## Remaining To-Do Before Going Live

1. **Supabase** — create project, run `supabase/schema.sql` in SQL Editor,
   add URL + anon key + service-role key to `.env.local` / Netlify env vars,
   set yourself as admin (SQL in README).
2. **Resend** — create account, add `RESEND_API_KEY`, set `RESEND_FROM_EMAIL`.
3. **Netlify** — push repo, import, add env vars, set `NEXT_PUBLIC_SITE_URL`,
   add production URL to Supabase allowed redirect URLs.

