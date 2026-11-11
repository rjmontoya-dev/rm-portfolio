import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Built as a runtime URL so the config bundler does not follow it. Otherwise
// content.js would become a config dependency and every edit would restart the dev server.
const renderUrl = pathToFileURL(resolve(process.cwd(), 'src/render.js')).href;

/**
 * Renders src/content.js into index.html (see src/render.js).
 * - Build: imports render.js directly with Node.
 * - Dev: loads it through Vite's module graph so edits to content.js /
 *   render.js are picked up, then triggers a full page reload.
 */
function portfolioHtml() {
  let server;
  return {
    name: 'portfolio-html',
    configureServer(s) {
      server = s;
    },
    transformIndexHtml: {
      order: 'pre',
      async handler(html) {
        const mod = server
          ? await server.ssrLoadModule('/src/render.js')
          : await import(/* @vite-ignore */ renderUrl);
        return mod.renderPage(html);
      },
    },
    handleHotUpdate({ file, server: s }) {
      if (/src[\\/](content|render|icons|config)\.js$/.test(file)) {
        s.ws.send({ type: 'full-reload' });
      }
    },
  };
}

export default defineConfig({
  plugins: [portfolioHtml(), tailwindcss()],
  // Tailwind v4 runs through its Vite plugin; an inline (empty) PostCSS config
  // stops Vite from picking up a stray postcss.config.js from a parent folder.
  css: { postcss: {} },
  build: {
    target: 'es2020',
    // three.js is lazy-loaded into its own chunk; it is ~500 kB minified, so silence the warning.
    chunkSizeWarningLimit: 700,
  },
});
