# Humza Khaliq — Portfolio

Next.js 15 (App Router) + Tailwind v4. Liquid-glass UI over a looping video background.

- **Glass:** [`@samasante/liquid-glass`](https://www.npmjs.com/package/@samasante/liquid-glass) for pills, dock and nav; `.glass` CSS for cards.
- **Dock:** `components/glass-dock.tsx`, a web port of the SwiftUI `LiquidGlassLinkPicker` (hover to preview, scrub on touch, arrow keys).
- **Page transitions:** [`@ssgoi/react`](https://ssgoi.dev) `drill()` between `/` and `/projects/[slug]`.
- **ElectroBuddy:** `lib/roboeyes.ts` is a browser port of FluxGarage RoboEyes on a 128×64 canvas; `components/desk-buddy.tsx` is the CSS model of the enclosure.
- **Content:** everything lives in `lib/data.ts`.

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build
```

Deploys to Vercel from `main`.
