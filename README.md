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
- ThreeUI `StructureFlowCollection` (three.js) as the global backdrop — pinned to `three@0.149.0`,
  imported from the subpath `@designcodeio/threeui/components/StructureFlowCollection`
  (the barrel import breaks Next 14's webpack build)
- Supabase (Postgres + Auth) for enquiries & admin — **optional**
- Google Gemini for the live voice & chat demos — **optional**, needs one env var

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

### Turning on the AI voice & chat demos

Both demos are real: the browser transcribes speech (`webkitSpeechRecognition`) and sends
only the finished text to `/api/chat`, which asks Google Gemini and replies with a natural
system voice. The key stays on the server — it is never shipped to the browser.

1. Get a free key at https://aistudio.google.com/apikey
2. Local: put it in `.env.local` as `GEMINI_API_KEY=...` and restart `npm run dev`.
   Vercel: Project → Settings → Environment Variables → `GEMINI_API_KEY` (then redeploy).
3. Check it: open `/api/chat` in the browser. It answers
   `{"configured": true, "model": "gemini-2.5-flash"}`.

Without a key the demos still run but say plainly that the AI brain is not connected.
`GEMINI_MODEL` can pin a specific model; by default the best flash model the key can see
is discovered at runtime.

FAIRA never publishes rates. Keep it that way — no price figures anywhere on the main site
(demo-business sample prices under `/demos/*` are fine).

### Live train data (/demos/train-voice)

`src/app/api/train-status/route.ts` calls the RapidAPI app **Indian Railway IRCTC** with
`RAPIDAPI_KEY`. Verified against the live API on 2026-11-03:

```
GET https://indian-railway-irctc.p.rapidapi.com/api/trains/v1/train/status
    ?train_number=12759&departure_date=20261103&isH5=true&client=web
```

- Host must be exactly `indian-railway-irctc.p.rapidapi.com` (no "s" in "railway").
- `isH5=true` **and** `client=web` are required. Without them the API answers
  `400 "'Live Train Status' feature is not supported on this version"`.
- `departure_date` is required, as `YYYYMMDD` (today in IST by default; `?date=` overrides it).
- No two-step search is needed: this app has no search/detail endpoint (they answer
  `404 Endpoint does not exist`), and the status endpoint takes the train number directly.
- The reply is built from `body.current_station` (mapped to a station name through
  `body.stations`), `body.train_status_message`, the schedule-vs-actual delay of the stations
  already passed, and the next scheduled stop.

Override the path with `RAPIDAPI_TRAIN_URL` (base URL only, no query string — the four
parameters above are appended by the code) if RapidAPI ever moves the endpoint.

Any failure (missing key, HTTP error, `result: "failure"`, unreadable JSON, network timeout)
returns `source: "sample"`, `label: "Sample (API error)"` and a `note` explaining why; the page
shows "Source: Sample (API error) — not live" plus an "FAIRA AI (sample):" transcript label. It
never passes fake data off as live. Test numbers that had live data on 2026-11-03: 12759, 12051,
12715.

## What the voice widget does

`src/components/VoiceAgent.tsx` is used on the home hero (compact) and at `/demos/voice`.
Mic → browser speech recognition → `/api/chat` (Gemini) → the reply is both read aloud by a real
system voice (Nova / Atlas / Aria, each with its own pitch and rate) and typed out
character-by-character in the transcript, the same instant. Transcript bubbles are labelled
"You:" and "FAIRA AI:", it auto-scrolls to the newest line, and **Stop** silences speech and
typing together while **Clear Conversation** also wipes the chat history.

Every demo page carries a small "FAIRA Demo" chip that links back to `/demos`. On phones the main
site gets a floating bottom dock (Home / Demos / Voice AI / Contact) because the top navbar links
are hidden below `md`.

## Routes

| Route | What |
| --- | --- |
| `/` | Home — hero with the live AI voice demo, services, demo links |
| `/services` | 4 service sections + FAQ |
| `/demos` | Gallery of all demos |
| `/demos/voice` | Live AI voice agent (mic → Gemini → spoken reply) |
| `/demos/chatbot` | Live AI chat assistant (text → Gemini) |
| `/demos/train-voice` | Voice agent that reads live Indian Railways status for a train number |
| `/api/chat` | Server route that calls Gemini (key stays server-side) |
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
