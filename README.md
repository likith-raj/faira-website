# FAIRA — Agency Website + 7 Demo Projects

A production-ready marketing website for **FAIRA**, a digital agency in Nellore, Andhra
Pradesh — plus 7 fully-designed demo sites/apps that business owners can browse.

Design language: dark cinematic theme — black (#0A0A0A) with a live 3D "Temple Night"
scene fixed behind every main-site page, burnt-orange accent (#E05A33), white text,
glassmorphic cards, elegant ALL-CAPS headings with wide letter-spacing.
The 7 demo sites keep their own light palettes on purpose (they show client variety).

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom theme tokens in `tailwind.config.ts`)
- Framer Motion · Lucide React · Recharts
- ThreeUI `TempleNightScene` (three.js) as the global backdrop — pinned to `three@0.149.0`,
  imported from the subpath `@designcodeio/threeui/components/TempleNightScene`
  (the barrel import breaks Next 14's webpack build)
- Supabase (Postgres + Auth) for enquiries & admin — **optional**

## Runs without Supabase (demo mode)

Out of the box there are no external credentials needed:

- Enquiry/contact/quote forms save to the browser's `localStorage`.
- `/admin` login accepts the demo password **`faira123`** (configurable via
  `NEXT_PUBLIC_ADMIN_PASSWORD`).
- The admin dashboard ships with 5 seeded sample enquiries.

## Setup

```bash
npm install
cp .env.example .env.local   # optional — fill Supabase keys for real storage
npm run dev                  # http://localhost:3000
```

### Connecting Supabase (optional)

1. Create a project at supabase.com.
2. Run `supabase/schema.sql` in the SQL editor (creates `enquiries` + RLS policies).
3. Put `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.
4. Create one authenticated user (email/password) for admin reads.

Forms now write to Postgres; without keys they fall back to local mode automatically.

## Routes

| Route | What |
| --- | --- |
| `/` | Home — hero, services, demos preview, process, pricing, testimonials |
| `/services` | 4 service sections + FAQ |
| `/demos` | Gallery of all 7 demos |
| `/demos/restaurant` | Spice Route — restaurant site with menu tabs + reservation |
| `/demos/clinic` | Sunrise Multispeciality Clinic — appointments |
| `/demos/real-estate` | Nellore Homes & Lands — listings + lead form |
| `/demos/coaching` | BrightPath Academy — courses + admissions |
| `/demos/retail` | UrbanKart Store — products, cart badge, offers |
| `/demos/webapp` | FAIRA ClientDesk — interactive dashboard (Recharts) |
| `/demos/mobileapp` | QuickServe — interactive phone mockup, 5 app screens |
| `/quote` | 4-step enquiry wizard (supports `?service=webapp` prefill) |
| `/contact`, `/about`, `/legal` | Standard pages |
| `/admin/login`, `/admin` | Enquiry dashboard: stats, filters, detail drawer, notes |

## Deploy to GitHub + Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "FAIRA website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/faira.git
   git push -u origin main
   ```
   (`.env.local` is git-ignored — never commit real keys.)
2. **Import in Vercel** — vercel.com → Add New → Project → import the repo.
   Framework is auto-detected as Next.js; accept the defaults.
3. **Set env vars** (optional) — `NEXT_PUBLIC_SITE_URL` = your domain, plus any
   Supabase keys from `.env.example`.
4. Click **Deploy**. Every later `git push` to `main` re-deploys automatically.

If the home page shows no 3D scene after deploy, check that the build log has no
`three` version warnings — the scene requires `three@0.149.0` (pinned in package.json).

## Project structure

```
src/app/(site)/        public pages (share Navbar/Footer/Toast layout)
src/app/admin/         login + dashboard
src/app/demos/<slug>/  7 standalone demo sites, each with its own layout/palette
src/components/        shared UI (glass cards, buttons, counters, toast, badge)
src/lib/               site data, enquiry storage (Supabase or localStorage), utils
supabase/schema.sql    enquiries table + RLS
```
