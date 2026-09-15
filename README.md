# Inkwell — a premium blog frontend + backend

A fully responsive, modern blog built with **Next.js (App Router)**,
**Tailwind CSS**, **Framer Motion**, and **NextAuth.js** — with real
authentication, a working author dashboard, live search, and a JSON-file
"database" so everything actually persists between requests.

## Design

- **Theme:** "Inkwell" — deep ink navy in dark mode, cool paper white in
  light mode, single violet accent (`#8b7bff` / `#6a4dff`), swappable to
  amber / emerald / rose from the preferences panel.
- **Type:** `Fraunces` (display serif, headlines) + `Inter` (UI & body).
- **Background:** a slow, softly blurred canvas gradient — no heavy WebGL
  dependency, GPU-light, pauses on `prefers-reduced-motion`, and re-colors
  itself live when you toggle dark/light.
- **UI:** glassmorphism surfaces (`.glass` / `.glass-panel` utility classes
  in `app/globals.css`) layered over the animated background.

## Getting started

```bash
npm install
cp .env.local.example .env.local
```

Open `.env.local` and set at minimum:

```
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
```

Then:

```bash
npm run dev
```

Open http://localhost:3000, click **Sign in → Create an account**, and
you'll land in a fully working dashboard — write a post, edit it, delete
it, edit your profile. Everything persists in `data/*.json` on disk.

### Enabling Google / Facebook login (optional)

The "Continue with Google/Facebook" buttons work as soon as you add OAuth
credentials to `.env.local`:

```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
FACEBOOK_CLIENT_ID=...
FACEBOOK_CLIENT_SECRET=...
```

See the comments in `.env.local.example` for where to create each app and
which redirect URI to register. Without these set, email/password login
still works fully — the buttons just won't be wired up.

## How data persists (no external database needed)

`lib/posts-store.ts`, `lib/users-store.ts`, and `lib/profiles-store.ts` are
small JSON-file-backed stores:

- `data/posts.seed.json` seeds `data/posts.json` on first run — after that,
  all reads/writes go through `data/posts.json`.
- `data/users.json` and `data/profiles.json` are created the first time
  someone signs up / edits their profile.
- The `data/*.json` working files are git-ignored; only the `*.seed.json`
  files are tracked, so a fresh clone always starts from the same seed
  content.

This works great for local development and single-instance Node hosting.
**It will not work on serverless/edge platforms** (Vercel's default
functions, Cloudflare Workers, etc.) because their filesystem is read-only
or reset per-request. To deploy for real, swap the three store files for a
real database (Prisma + Postgres/SQLite, Supabase, etc.) — every call site
already goes through `lib/data.ts`, so nothing else needs to change.

## Project structure

```
app/
  layout.tsx                Root layout: fonts, providers, background, nav, footer
  page.tsx                  Home page: hero slider + article grid + sidebar
  loading.tsx                Skeleton shown while a route is loading
  not-found.tsx               Custom 404 page
  error.tsx / global-error.tsx   Error boundaries
  icon.tsx / opengraph-image.tsx  Dynamically generated favicon + OG image
  manifest.ts                 Web app manifest
  sitemap.ts / robots.ts      SEO files, generated from real post data
  globals.css                 Theme tokens, glass utilities, article typography

  blog/[slug]/page.tsx        Single post: progress bar, TOC, related posts
  search/page.tsx              Full search results page
  settings/page.tsx            Full-page reader preferences

  login/page.tsx, signup/page.tsx    Auth pages
  dashboard/page.tsx                  Author dashboard (protected)
  dashboard/new/page.tsx               New post editor (protected)
  dashboard/edit/[slug]/page.tsx       Edit post editor (protected, owner-only)

  api/auth/[...nextauth]/route.ts     NextAuth handler (credentials + Google + Facebook)
  api/auth/register/route.ts           Sign-up endpoint
  api/account/route.ts                  Read/update your dashboard profile
  api/posts/route.ts                    List all posts / create a post
  api/posts/[slug]/route.ts             Read/update/delete one post (owner-only)
  api/search/route.ts                   Live search endpoint

middleware.ts                 Protects /dashboard/** — redirects signed-out visitors to /login

components/
  providers.tsx                Theme + reader-preference context (persisted to localStorage)
  session-provider.tsx          Wraps the app in NextAuth's SessionProvider
  animated-background.tsx       Canvas gradient background
  navbar.tsx                     Top nav, theme toggle, session-aware user menu
  preferences-panel.tsx / settings-form.tsx   Reader preferences (drawer + full page)
  hero-slider.tsx                 Featured/trending post carousel
  article-card.tsx / article-grid.tsx   Post cards (grid + list, with "load more")
  sidebar.tsx                      Live search, tag cloud, recent posts, newsletter (UI-only)
  reading-progress-bar.tsx          Sticky scroll progress bar
  table-of-contents.tsx             Scroll-spy table of contents
  dashboard-shell.tsx                Author dashboard: overview / posts / profile tabs
  post-editor.tsx                     Create/edit post form (dynamic sections)
  auth-form.tsx                        Login/signup form wired to NextAuth + /api/auth/register
  footer.tsx

lib/
  types.ts             Shared Post / Author / PostInput types
  authors.ts            Static seed authors + tags
  posts-store.ts         Server-only: JSON-file post CRUD
  users-store.ts          Server-only: JSON-file user accounts, salted password hashing
  profiles-store.ts        Server-only: editable dashboard profile fields (handle/role/bio)
  auth-options.ts           NextAuth configuration
  data.ts                    Single import point re-exporting the above for components/pages
  utils.ts                    Formatting helpers + resolvePostAuthor()

data/
  posts.seed.json, users.seed.json    Tracked seed data
  posts.json, users.json, profiles.json    Generated at runtime (git-ignored)
```

## Notes on what's real vs. placeholder

- **Real:** email/password signup & login, session management, post
  create/edit/delete with ownership checks, profile editing, live search,
  pagination, dark/light + accent theming, all persisted to disk.
- **Real but needs your own credentials:** Google/Facebook OAuth (code is
  fully wired, just needs client IDs/secrets — see above).
- **UI-only (by request):** the newsletter subscription widget in the
  sidebar. Wire its `handleSubmit` in `components/sidebar.tsx` to
  Mailchimp/ConvertKit/etc. when you're ready to collect real subscribers.

## Accessibility notes

- Every interactive element has a visible focus ring (`:focus-visible` in
  `globals.css`) and an `aria-label` where its purpose isn't conveyed by
  visible text.
- The animated background freezes to a single frame and all transitions
  collapse under `prefers-reduced-motion: reduce`.
- The reading progress bar and table of contents both expose their state
  via ARIA (`role="progressbar"`, live scroll-spy highlighting).
- A "Skip to content" link is included for keyboard users.
