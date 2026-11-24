# rm.dev — Roger A. Montoya Jr.

Single-page developer portfolio: a simple, mostly monochrome layout with a sidebar, a short intro and numbered sections. Dark by default, with a light theme.

**Stack:** Vite · vanilla JS · plain CSS

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve dist/ at http://localhost:4173
```

Requires Node 20.19+ or 22.12+ (Vite 8).

## Editing content

All text lives in **`src/content.js`**: profile, hero intro, stats, experience, projects, stack and education. In the intro, wrap a phrase in `[[double brackets]]` to show it as a pill. The page is rendered from that file **at build time** (`vite.config.js` → `src/render.js`). The shipped HTML is fully static, so it is crawlable and fast and still works without JavaScript. In dev, saving `content.js` reloads the page.

**Resume:** put your PDF at `public/Roger-Montoya-Jr-Resume.pdf`, or change `site.resumeUrl` in `content.js`.

## Project structure

```
├── index.html              # template; <!--app-head--> / <!--app-body--> are filled from content.js
├── vite.config.js          # build-time HTML renderer
├── vercel.json             # Vercel build settings + long cache for hashed assets
├── public/
│   ├── favicon.svg
│   ├── images/profile-photo.png   # also used as the og:image
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── content.js          # ← all editable text and data
    ├── render.js           # content → HTML strings (runs in Node at build time)
    ├── styles.css          # design tokens (:root) + all styles
    └── main.js             # theme toggle + active sidebar link
```

## Notes

- **Static HTML.** No client-side templating, so content paints before any JS runs. The page works without JavaScript; only the theme toggle and sidebar highlight need it.
- **Theme.** Follows the system light/dark setting; the sidebar button overrides it and the choice is saved in the browser.
- **Colors.** Change the palette in `src/styles.css` under `:root` (dark) and the two light blocks below it.

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
