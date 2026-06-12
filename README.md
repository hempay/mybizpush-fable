# MyBizPush — Fable Edition

An award-style rebuild of the MyBizPush Solutions Limited site. Dark, editorial,
kinetic — built around GSAP scroll choreography and a Three.js shader hero.

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** — custom design tokens (`ink`, `bone`, `magenta`, `volt`)
- **GSAP + ScrollTrigger** — preloader, char-split reveals, pinned horizontal
  services rail, scroll-scrubbed manifesto, counters, velocity-reactive marquees
- **Lenis** — smooth scrolling (integrated with ScrollTrigger)
- **Three.js** — fragment-shader "aurora silk" hero background with cursor warp

## Pages

| Route                  | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `/`                    | New landing experience                               |
| `/services`            | All 20 services — filterable editorial index + modal |
| `/products`            | All 7 products with stats and store links            |
| `/privacy` · `/terms`  | Legal pages                                          |
| `/admin/consultations` | Consultation request dashboard (localStorage)        |
| `*`                    | 404                                                  |

## Commands

```sh
npm install
npm run dev      # http://localhost:8088
npm run build    # typecheck + production build to dist/
npm run preview
```

## Consultation webhook

Form submissions POST to the n8n webhook defined by `VITE_N8N_WEBHOOK_URL`
(`.env`), with a localStorage fallback so no request is ever lost. Manage
requests at `/admin/consultations`.

## Verification scripts

`scripts/verify.mjs` and `scripts/interact.mjs` drive headless Chromium
(playwright-core) across all routes at desktop + mobile viewports, capturing
screenshots to `/tmp/fable-shots` and asserting zero console errors.

## Notes

- Preloader plays once per browser session (`sessionStorage`).
- Custom cursor and magnetic buttons activate only on fine-pointer devices.
- `prefers-reduced-motion` disables smooth scroll, grain animation, and freezes
  the hero shader.
- Three.js renders at a capped device-pixel ratio and pauses offscreen.
