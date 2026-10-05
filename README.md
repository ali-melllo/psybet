# PSYBET – NFT marketplace landing page

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui (Radix) ·
Framer Motion (LazyMotion) · Redux Toolkit + RTK Query · next-themes · Oxanium via `next/font`.

## Run
```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
npm run check        # typecheck + lint + build
```

## Architecture
- Server Components by default; client code is limited to the header, theme toggle, reveal wrappers,
  accordion, buy button and the two RTK Query grids (`live-stats`, `live-packs-grid`).
- All landing content is server-rendered from typed data in `lib/data/landing-page.ts`.
- RTK Query (`lib/features/**`) is **skipped** unless `NEXT_PUBLIC_API_URL` is set, so the page never
  depends on a backend. API shape: `GET /packs`, `/stats`, `/roadmap`.
- Purchases/wallets are isolated in `lib/web3/purchase.ts` (returns a demo notice; no transactions).
- Dark/light via `.dark` class + CSS variables in `app/globals.css`; reveal animations respect
  `prefers-reduced-motion` and are forced visible with JS disabled.

## Artwork
`components/ui/mascot.tsx` is a vector stand-in. Drop real assets into `public/images/*` and render them
with `next/image` inside that component (and `nft-pack-card.tsx`) to match the reference exactly.
Demo stats, packs, and testimonials are placeholders, not live data.
