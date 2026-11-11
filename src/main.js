/**
 * main.js — browser entry point.
 * The HTML is already rendered (see render.js); this file only wires up behaviour.
 */
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import './styles.css';

import { initSmoothScroll } from './smooth-scroll.js';
import { initNav } from './nav.js';
import { initContactForm } from './contact-form.js';
import { initAnimations } from './animations.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Smooth wheel scrolling only makes sense with a mouse/trackpad; touch keeps native scrolling.
const finePointer = window.matchMedia('(pointer: fine)').matches;

const lenis = !reducedMotion && finePointer ? initSmoothScroll() : null;
initNav({ lenis, reducedMotion });
initContactForm();
initAnimations({ reducedMotion });

// Tell the inline safety script in index.html that the app booted.
window.__appReady = true;

scheduleScene();

/**
 * Lazy-load the Three.js background. It is decorative, so it waits until the
 * visitor first interacts (mouse move, scroll, touch, key) or 5 s after load,
 * whichever comes first. This keeps WebGL setup off the critical path.
 */
function scheduleScene() {
  const canvas = document.getElementById('bg-canvas');
  const saveData = navigator.connection && navigator.connection.saveData;
  const root = document.documentElement;
  if (!canvas || saveData) {
    root.classList.add('no-webgl');
    return;
  }

  const fallback = () => root.classList.add('no-webgl');
  const load = () =>
    import('./scene.js')
      .then(({ initScene }) => {
        if (!initScene(canvas, { reducedMotion })) fallback();
      })
      .catch(fallback);

  const events = ['pointermove', 'pointerdown', 'wheel', 'touchstart', 'keydown', 'scroll'];
  let started = false;
  let timer = 0;
  const kick = () => {
    if (started) return;
    started = true;
    clearTimeout(timer);
    events.forEach((type) => window.removeEventListener(type, kick));
    if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 1000 });
    else setTimeout(load, 100);
  };

  const arm = () => {
    events.forEach((type) => window.addEventListener(type, kick, { passive: true }));
    timer = setTimeout(kick, 5000);
  };
  if (document.readyState === 'complete') arm();
  else window.addEventListener('load', arm, { once: true });
}
