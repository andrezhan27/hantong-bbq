# Han Tong — Korean BBQ

A Portuguese-first restaurant landing page built with Next.js 16 App Router, strict TypeScript, Tailwind CSS 4, Framer Motion 12 and Lucide. The page sections are server components; language-aware text, images and interactive controls are small client components.

The dev/build scripts use Next.js's supported Webpack bundler. This avoids a Turbopack worker-port restriction encountered in the local execution environment.

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

- **Menu PDF:** put the future PDF in `public/menu/` and set `menuPdfUrl` in `config/site.ts` to its public path (for example `/menu/han-tong.pdf`), or use its confirmed HTTPS URL. Until then, every menu button opens a translated message with a working telephone link.
- **Reservations:** `restaurant.reservationWidgetUrl` in `config/site.ts` is set to `https://reserve.intelis.pt/hantong`. Every reservation CTA is a normal Next.js link to `/reservation`, defined by `reservationPageUrl` in the same configuration. That route displays the solid navbar and an eager, borderless iframe filling the remaining viewport. The frame scrolls independently, with no popup, card, extra heading or footer. Navbar section links return to the landing page, and mobile navigation closes when following a link. The phone number remains a normal contact link.
- **Canonical origin:** `config/seo.ts` detects Vercel’s real production domain automatically using `VERCEL_PROJECT_PRODUCTION_URL` (falling back to `VERCEL_URL`). Set optional `NEXT_PUBLIC_SITE_URL` to override it with your confirmed custom-domain origin. Production gets canonical links, indexable metadata and a sitemap; Vercel Preview deployments stay non-indexable and use their own origin for social images. Local builds without an origin remain non-indexable.
- **Legal links / Supabase:** set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. `lib/supabase.ts` creates a stateless server-only client; `lib/legal.ts` reads `privacy_policy_url` and `terms_and_conditions_url` from `restaurants` where `id = 'hantong'`. The query is read-only and its fetch cache refreshes every five minutes. Both PT/EN interfaces use the same supplied URLs, with translated labels. Valid HTTP(S) URLs become footer links opening safely in a new tab. Missing configuration, missing/invalid URLs, missing rows, denied reads or network failures keep the accessible placeholder dialogs. The publishable key must be allowed to select this row by your existing RLS policies; no service-role key is needed.

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

1. Import the Git repository into Vercel. `vercel.json` selects the Next.js preset, `npm ci` and `npm run build`; `package.json` pins Node 22. Keep the Output Directory at the Next.js default.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in Vercel Environment Variables for Production and Preview. Copy names from `.env.example`; add real values only in Vercel or an ignored `.env.local`.
3. Leave Vercel’s system environment variables exposed (the default) for automatic production-domain metadata. Optional `NEXT_PUBLIC_SITE_URL` overrides the domain when needed.
4. Deploy after setting the variables. Redeploy when environment values change; Next.js public variables and the initial legal links are evaluated during the build.
5. Verify the Supabase row’s legal URLs, reservations and the future menu PDF before public launch. Changes to legal URL values refresh through the five-minute cache, without changing application code.

No database schema or policies are created automatically. The existing `restaurants` table contract above is the only query. The page still builds without Supabase configuration, showing legal placeholders. `.gitignore` excludes local environment files and temporary artifacts. `.vercelignore` excludes original photography and generated local artifacts from CLI uploads; optimized public assets are already included and do not need regeneration during deployment.

Official references: [Vercel Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables), [Supabase publishable keys](https://supabase.com/docs/guides/getting-started/api-keys).

The updated Google Maps embed URL is stored in `restaurant.mapEmbed`. The original URL omitted `!2f0` from its `pb` parameter and Google rejected it. The replacement URL was verified to display the restaurant map. The iframe remains responsive, with a separate directions link in the contact details.

The supplied Intelis reservation URL now loads the Han Tong booking form correctly (verified on 27 October 2026). All reservation CTAs use the shared `restaurant.reservationWidgetUrl` configuration. The dedicated `/reservation` page keeps the navbar visible on portrait and landscape screens while the widget scrolls within its own frame. No test reservation was submitted.

## Verification

Verified on 27 October 2026: `npm run lint`, `npm run typecheck`, `npm run build` and a local production preview pass on Node 22. Browser checks at 320×568, 375×812, 390×844, 768×1024, 844×390 (landscape) and 1440×1000 found no horizontal overflow or navbar overlap. Mobile controls have touch targets at least 44px high. The reservation route fills the viewport below the navbar on portrait and landscape screens, and the real Intelis form renders correctly. No reservation was submitted. The production preview produced no console errors.

The Supabase provider was tested against a local mock HTTP API: exact table/filter/column selection, terms/privacy URL mapping, unsafe/null URLs, missing rows, denied reads and missing environment variables. Deployment metadata tests covered local, Vercel Production, Vercel Preview and custom-domain overrides. Live Supabase access still needs your environment values and existing RLS read permission for the `hantong` row. Current legal placeholders remain functional when no values are configured locally.
