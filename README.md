# Han Tong — Korean BBQ

A Portuguese-first restaurant landing page built with Next.js 16 App Router, strict TypeScript, Tailwind CSS 4, Framer Motion 12 and Lucide. The page sections are server components; language-aware text, images and interactive controls are small client components.

Production builds use Next.js 16’s default Turbopack bundler, including its persistent build cache. Local development keeps Webpack because of the sandbox’s worker-port restriction. `npm run build:webpack` is an explicit fallback for similarly restricted environments.

## Run locally

Use Node.js 22 (pinned in `.nvmrc` and `package.json`) and npm. The committed `package-lock.json` is the dependency source of truth.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview:

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Configuration

Restaurant facts, navigation, social and press URLs, reservation settings and legal links live in `config/site.ts`. All PT-PT/EN interface strings live in `config/translations.ts`.

- **Menu PDF:** all menu buttons open `/menu/hantong-menu.pdf` in a new tab. The supplied 20-page PDF is compressed from 17.0 MB to 3.5 MB with images downsampled to 180 dpi; the source in Downloads is unchanged.
- **Reservations:** `restaurant.reservationWidgetUrl` in `config/site.ts` is set to `https://reserve.intelis.pt/hantong`. Every reservation CTA is a normal Next.js link to `/reservation`, defined by `reservationPageUrl` in the same configuration. That route displays the solid navbar and an eager, borderless iframe filling the remaining viewport. The frame scrolls independently, with no popup, card, extra heading or footer. Navbar section links return to the landing page, and mobile navigation closes when following a link. The phone number remains a normal contact link.
- **Canonical origin:** `config/seo.ts` detects Vercel’s real production domain automatically using `VERCEL_PROJECT_PRODUCTION_URL` (falling back to `VERCEL_URL`). Set optional `NEXT_PUBLIC_SITE_URL` to override it with your confirmed custom-domain origin. Production gets canonical links, indexable metadata and a sitemap; Vercel Preview deployments stay non-indexable and use their own origin for social images. Local builds without an origin remain non-indexable.
- **Legal links / Supabase:** set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. `lib/supabase.ts` creates a stateless server-only client; `lib/legal.ts` reads `privacy_policy_url` and `terms_and_conditions_url` from `public.restaurants` where `id = 'hantong'`. The query is read-only and its fetch cache refreshes every five minutes. Both PT/EN interfaces use the same supplied URLs, with translated labels. Valid HTTP(S) URLs become footer links opening safely in a new tab. Null/empty/invalid URLs hide the corresponding footer link. Missing configuration, missing rows, denied reads or network failures hide both legal links. The publishable key must be allowed to select this row by your existing RLS policies; no service-role key is needed.

- **Live promotions:** the root layout mounts `PromotionBanner` from `@andrezhan27/intelis-restaurant-ui` for `hantong`, explicitly passing the same two public environment variables. The package loads the initial snapshot and subscribes to live updates. `.env.local` contains the connected project’s URL and publishable key and is ignored by Git. Set the same variables in the deployment environment before building.

## Photography

All photographs are supplied local assets; there are no stock placeholders. Original PNGs are preserved in `assets/originals/` and never served directly. Rebuild the optimized assets with:

```sh
npm run assets
```

The Sharp script applies orientation, preserves aspect ratios, caps width at 2200px without upscaling and produces WebP at quality 84. Logos use lossless WebP. It always reads originals and never recompresses an existing WebP. It also generates the logo icon and 1200×630 social image.

`config/assets.ts` is the typed manifest for paths, translated descriptions, image selection and focal points. Hero focal positions can be adjusted independently for mobile and desktop. The hero uses `space-1`; the moving rows preserve `space-1`–`space-5` and `space-6`–`space-10` in exactly that order. The space gallery uses all ten supplied photos, `space-1` through `space-10`, in order in a fully packed mosaic with 6px seams on desktop and tablet, and tightly spaced full-width photos on mobile. Individual focal positions keep important details visible in the crops.

Marquee tracks move left at 42px/second, measured with ResizeObserver so speed stays consistent across breakpoints. Each repeated group includes its trailing gap, making a full animation cycle exactly one group wide. Copies are hidden from assistive technology. IntersectionObserver and document visibility pause offscreen/background motion; reduced-motion visitors receive static, keyboard-scrollable rows. Reservation buttons have fixed contents and no cursor-follow effect. The hero uses a smaller, centered heading, centered supporting text and CTAs, and a centered location label.

Portuguese is the deterministic server and hydration language. A saved language is restored after hydration, and switching updates the document language. Language storage is optional and safely handles unavailable browser storage. Corresponding CTAs have explicit widths based on both translations.

## GitHub and Vercel

The project is ready to add to a GitHub repository. No remote, push or deployment is performed automatically.

1. Import the Git repository into Vercel. `vercel.json` selects the Next.js preset and `npm run build`; the install command uses Vercel’s npm default to reuse cached dependencies instead of deleting them with `npm ci`; `package.json` pins Node 22. Keep the Output Directory at the Next.js default.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in Vercel Environment Variables for Production and Preview. Copy names from `.env.example`; add real values only in Vercel or an ignored `.env.local`.
3. Leave Vercel’s system environment variables exposed (the default) for automatic production-domain metadata. Optional `NEXT_PUBLIC_SITE_URL` overrides the domain when needed.
4. Deploy after setting the variables. Redeploy when environment values change; Next.js public variables are embedded during the build. Legal URLs and promotion snapshots are read when serving the page.
5. Verify the Supabase row’s legal URLs, reservations and the menu PDF before public launch. Changes to legal URL values refresh through the five-minute cache, without changing application code.

No database schema or policies are created automatically. The existing `restaurants` table contract above is the only query. The page still builds without Supabase configuration, hiding unavailable legal links. `.gitignore` excludes local environment files and temporary artifacts. `.vercelignore` excludes original photography and generated local artifacts from CLI uploads; optimized public assets are already included and do not need regeneration during deployment.

Official references: [Vercel Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables), [Supabase publishable keys](https://supabase.com/docs/guides/getting-started/api-keys).

The updated Google Maps embed URL is stored in `restaurant.mapEmbed`. The original URL omitted `!2f0` from its `pb` parameter and Google rejected it. The replacement URL was verified to display the restaurant map. The iframe remains responsive, with a separate directions link in the contact details.

The supplied Intelis reservation URL now loads the Han Tong booking form correctly (verified on 27 October 2026). All reservation CTAs use the shared `restaurant.reservationWidgetUrl` configuration. The dedicated `/reservation` page keeps the navbar visible on portrait and landscape screens while the widget scrolls within its own frame. No test reservation was submitted.

## Deployment speed

The November 5 Vercel logs showed `npm ci` taking 40 seconds even after restoring the build cache, and 51 seconds on a redeploy triggered without cache. The forced install override has been removed so Vercel can use its default npm install and reuse cached `node_modules`. Keep `package-lock.json` committed; `npm ci` remains useful for clean local/CI validation.

Production uses Turbopack, whose persistent build cache is enabled by default in the installed Next.js version. Vercel restores `.next/cache` automatically. For dashboard redeploys, enable **Use existing Build Cache**; avoid `vercel --force` for routine deploys. The first build after changing bundlers still needs to populate the new cache. Keep any dashboard Install Command override disabled as well.

Manrope and Cormorant Garamond are bundled as local variable WOFF2 fonts under `app/fonts`, with their SIL Open Font Licenses. These are the same Latin font assets previously generated by `next/font/google`, including Portuguese accents. `next/font/local` preserves automatic preloading and removes Google font downloads/retries during builds. No image regeneration runs during deployment, and TypeScript validation remains enabled.

Compare dependency installation, compilation, tracing, and total duration in the next cached Vercel deployment. Local build timings do not measure Vercel upload, queue, installation, or cache-transfer time.

## Verification

Verified on 27 October 2026: `npm run lint`, `npm run typecheck`, `npm run build` and a local production preview pass on Node 22. Browser checks at 320×568, 375×812, 390×844, 768×1024, 844×390 (landscape) and 1440×1000 found no horizontal overflow or navbar overlap. Mobile controls have touch targets at least 44px high. The reservation route fills the viewport below the navbar on portrait and landscape screens, and the real Intelis form renders correctly. No reservation was submitted. The production preview produced no console errors.

The Supabase provider was tested against a local mock HTTP API: exact table/filter/column selection, terms/privacy URL mapping, unsafe/null URLs, missing rows, denied reads and missing environment variables. Deployment metadata tests covered local, Vercel Production, Vercel Preview and custom-domain overrides. Live reads were verified with the connected project’s publishable key for the `hantong` row. Both legal columns are currently null, so their links are hidden.
