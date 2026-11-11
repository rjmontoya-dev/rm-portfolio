# rm.dev — Roger A. Montoya Jr.

Single-page developer portfolio: a GitHub-inspired dark UI with a Three.js "data network" background and GSAP text animations.

**Stack:** Vite · vanilla JS · Tailwind CSS v4 · Three.js · GSAP (ScrollTrigger, SplitText, ScrambleText) · Lenis

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve dist/ at http://localhost:4173
```

Requires Node 20.19+ or 22.12+ (Vite 8).

## Editing content

All text lives in **`src/content.js`**: profile, stats, services, experience, projects, skills, education and the tech-color map. The page is rendered from that file **at build time** (`vite.config.js` → `src/render.js`). The shipped HTML is fully static, so it is crawlable and fast and still works without JavaScript. In dev, saving `content.js` reloads the page.

**Resume:** put your PDF at `public/Roger-Montoya-Jr-Resume.pdf`, or change `site.resumeUrl` in `content.js`.

## Project structure

```
├── index.html              # template; <!--app-head--> / <!--app-body--> are filled from content.js
├── vite.config.js          # Tailwind plugin + build-time HTML renderer
├── vercel.json             # Vercel build settings + long cache for hashed assets
├── public/
│   ├── favicon.svg
│   ├── images/profile-photo.png   # also used as the og:image
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── content.js          # ← all editable text and data
    ├── config.js           # ← tweakable knobs (3D scene, animation timing, heatmap seed)
    ├── render.js           # content → HTML strings (runs in Node at build time)
    ├── icons.js            # inline SVG icons
    ├── styles.css          # Tailwind v4 + design tokens (@theme) + components
    ├── main.js             # browser entry: wires up everything below
    ├── animations.js       # GSAP: hero intro, typewriter, split-line reveals, count-ups, timeline, diagram
    ├── scene.js            # Three.js background (lazy-loaded)
    ├── smooth-scroll.js    # Lenis + ScrollTrigger sync (mouse/trackpad only)
    ├── nav.js              # mobile menu, anchor scrolling, active section
    ├── contact-form.js     # mailto-based form (no backend)
    └── utils/random.js     # seeded PRNG (3D layout + decorative heatmap)
```

## Performance and accessibility notes

- **Static HTML.** No client-side templating, so content paints before any JS runs.
- **Lazy 3D.** Three.js (~136 kB gzipped) loads in its own chunk on the first interaction (mouse, scroll, touch, key) or 5 s after load. The canvas fades in.
- **3D performance safeguards:**
  - Instanced meshes for the nodes.
  - Pixel ratio capped at 2 (1.5 on mobile).
  - 30 fps cap and fewer nodes on mobile.
  - Rendering pauses when the tab is hidden.
  - Static CSS gradient when WebGL or the `saveData` hint is unavailable.
- **Reduced motion.** With `prefers-reduced-motion`, there are no GSAP animations, no smooth scroll and no CSS animations, and the 3D scene renders a single static frame.
- **Smooth scroll.** Lenis runs only for fine pointers; touch devices keep native scrolling.
- **Heatmap.** The contribution-style heatmap is decorative: it comes from a seeded PRNG and is labelled on the page as not real data.

## Deploy to Vercel

**Option A: dashboard**
1. Push this repo to GitHub.
2. In Vercel, choose **Add New → Project**, import the repo, and keep the detected **Vite** preset (build `npm run build`, output `dist`).
3. Deploy. To keep the existing URL, set the project or domain to `rm-portfolio-delta.vercel.app`.

**Option B: CLI**
```bash
npm i -g vercel
vercel           # first run links the project (preview deploy)
vercel --prod    # production deploy
```

If the production URL changes, update `site.url` in `src/content.js` and the URL in `public/sitemap.xml` and `public/robots.txt`.

## Tweakable variables

| Where | Variable | What it does |
|---|---|---|
| `src/styles.css` → `@theme` | `--color-accent`, `--color-link`, `--color-violet`, … | UI palette (GitHub dark) |
| `src/config.js` → `THEME` | `green`, `blue`, `purple` | Colors of the 3D nodes, lines and pulses |
| `src/config.js` → `SCENE` | `nodeCount`, `pulseCount` | Density of the network on desktop and mobile |
| `src/config.js` → `SCENE` | `rotationSpeed`, `pulseSpeed`, `parallax`, `scrollDim` | Motion of the 3D scene |
| `src/config.js` → `ANIM` | `duration`, `ease`, `charStagger`, `typeSpeed`, `roleHold` | GSAP timing |
