/**
 * animations.js — all GSAP text and scroll animations.
 *
 * Markup hooks (set in render.js):
 *   [data-hero="…"]        hero intro timeline
 *   .role-text[data-roles] typewriter role cycler
 *   [data-scramble]        nav link decode effect on hover/focus
 *   [data-heading]         section headings: masked line reveal
 *   [data-lines]           body text: fade + rise per line
 *   [data-reveal]          cards: fade + rise, batched
 *   [data-count]           numbers: count-up
 *   [data-skill-group]     skill chips: staggered pop-in
 *   [data-timeline]        experience: line draw + alternating cards
 *   [data-arch]            architecture SVG: draw edges, then animate flow
 *
 * Accessibility: reveals only animate `opacity` (never visibility), so content
 * that hasn't scrolled into view yet stays focusable and readable by screen
 * readers. Focusing something still hidden reveals it instantly.
 * With prefers-reduced-motion everything is shown immediately, unanimated.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ANIM } from './config.js';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** ScrollTrigger config for "play once when it scrolls into view". */
const onEnter = (trigger, start = 'top 88%') => ({ trigger, start, once: true });

/** Elements that start transparent and are revealed on scroll. */
const REVEAL_SELECTOR = '[data-reveal], [data-heading], [data-lines], .exp-card, [data-skill-group] .chip';

export function initAnimations({ reducedMotion }) {
  if (reducedMotion) {
    // Static page: make sure the hero (hidden by CSS for its intro) is visible.
    gsap.set('[data-hero]', { visibility: 'visible' });
    return;
  }

  gsap.defaults({ ease: ANIM.ease, duration: ANIM.duration });

  // Hide split targets right away so they don't flash before their reveal.
  gsap.set('[data-heading], [data-lines]', { opacity: 0 });

  heroIntro();
  navScramble();
  counters();
  reveals();
  skillChips();
  timeline();
  architecture();
  revealOnFocus();

  // Line splitting needs final font metrics, so wait for web fonts.
  document.fonts.ready.then(() => {
    splitOnEnter('[data-heading]', true);
    splitOnEnter('[data-lines]', false);
    ScrollTrigger.refresh();
  });
}

/* ------------------------------------------------------------------ hero */

function heroIntro() {
  const name = $('[data-hero="name"]');
  const roleEl = $('.role-text[data-roles]');
  if (!name) return;

  // If the inline safety net in index.html already revealed the hero (slow
  // network), don't hide it again and replay: just start the role cycler.
  if (!document.documentElement.classList.contains('js')) {
    gsap.set('[data-hero]', { visibility: 'visible' });
    roleCycler(roleEl);
    return;
  }

  const split = SplitText.create(name, { type: 'words,chars', mask: 'chars', charsClass: 'char' });

  const tl = gsap.timeline({ delay: 0.1 });
  tl.from('[data-hero="badge"]', { opacity: 0, y: 12, duration: 0.6 })
    .from(
      split.chars,
      {
        yPercent: 115,
        duration: 0.9,
        ease: ANIM.headingEase,
        stagger: ANIM.charStagger,
        onComplete: () => split.revert(),
      },
      '-=0.35'
    )
    .from('[data-hero="role"]', { opacity: 0, y: 12, duration: 0.6 }, '-=0.55')
    .from('[data-hero="value"]', { opacity: 0, y: 16 }, '-=0.45')
    .from('[data-hero="ctas"] > *', { opacity: 0, y: 14, stagger: 0.08, duration: 0.6 }, '-=0.55')
    .from('[data-hero="meta"]', { opacity: 0, duration: 0.6 }, '-=0.4')
    .from('[data-hero="terminal"]', { opacity: 0, y: 24, duration: 1 }, 0.35)
    .from('[data-terminal-line]', { opacity: 0, x: -8, stagger: 0.12, duration: 0.6 }, 0.7)
    .add(() => roleCycler(roleEl), '-=0.2');

  // The from() tweens above already applied their start states (opacity 0),
  // so it is now safe to lift the CSS visibility guard.
  gsap.set('[data-hero]', { visibility: 'visible' });
}

/** Typewriter: erase the current role, type the next one, hold, repeat. */
function roleCycler(el) {
  if (!el) return;
  const roles = JSON.parse(el.dataset.roles || '[]');
  if (roles.length < 2) return;

  const proxy = { n: roles[0].length };
  const tl = gsap.timeline({ repeat: -1 });

  roles.forEach((role, i) => {
    const next = roles[(i + 1) % roles.length];
    tl.to(proxy, {
      n: 0,
      duration: role.length * ANIM.typeSpeed * 0.5,
      ease: 'none',
      delay: ANIM.roleHold,
      onUpdate: () => (el.textContent = role.slice(0, Math.round(proxy.n))),
    }).to(proxy, {
      n: next.length,
      duration: next.length * ANIM.typeSpeed,
      ease: 'none',
      delay: 0.25,
      onUpdate: () => (el.textContent = next.slice(0, Math.round(proxy.n))),
    });
  });
}

/* ------------------------------------------------------------------- nav */

function navScramble() {
  $$('[data-scramble]').forEach((el) => {
    const text = el.textContent;
    const link = el.closest('a');
    // No "<" or ">" in the charset: ScrambleText writes via innerHTML.
    const run = () =>
      gsap.to(el, {
        duration: 0.6,
        ease: 'none',
        overwrite: true,
        scrambleText: { text, chars: '01/{}[]_=+*#$%', speed: 0.8, revealDelay: 0.1 },
      });
    link.addEventListener('mouseenter', run);
    link.addEventListener('focus', run);
  });
}

/* ------------------------------------------------------ headings & copy */

/**
 * Split into lines at the moment the element scrolls into view, so the line
 * breaks always match the current width (no stale splits after a resize or
 * rotation). The split is reverted as soon as the reveal ends.
 * @param {string} selector
 * @param {boolean} masked headings slide up inside a mask; body text fades up
 */
function splitOnEnter(selector, masked) {
  $$(selector).forEach((el) => {
    ScrollTrigger.create({
      ...onEnter(el),
      onEnter: () => {
        if (el.dataset.revealed) return;
        el.dataset.revealed = 'true';
        // aria: 'none' — <p> may not carry aria-label; the split is temporary anyway.
        const split = SplitText.create(el, {
          type: 'lines',
          linesClass: 'split-line',
          ...(masked ? { mask: 'lines' } : { aria: 'none' }),
        });
        gsap.set(el, { opacity: 1 });
        const vars = masked
          ? { yPercent: 105, duration: 0.9, ease: ANIM.headingEase, stagger: 0.08 }
          : { opacity: 0, y: 14, duration: 0.7, stagger: 0.06 };
        gsap.from(split.lines, { ...vars, onComplete: () => split.revert() });
      },
    });
  });
}

/* ------------------------------------------------------------- numbers */

function counters() {
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const state = { v: 0 };
    const render = () => (el.textContent = `${prefix}${Math.round(state.v)}${suffix}`);
    render();
    gsap.to(state, { v: end, duration: 1, ease: ANIM.ease, onUpdate: render, scrollTrigger: onEnter(el, 'top 92%') });
  });
}

/* --------------------------------------------------------------- cards */

function reveals() {
  const items = $$('[data-reveal]');
  if (!items.length) return;
  gsap.set(items, { opacity: 0, y: 24 });
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, stagger: 0.08, duration: ANIM.duration, clearProps: 'transform' }),
  });
}

function skillChips() {
  $$('[data-skill-group]').forEach((group) => {
    gsap.from($$('.chip', group), {
      opacity: 0,
      scale: 0.85,
      y: 8,
      duration: 0.6,
      stagger: 0.035,
      delay: 0.15,
      scrollTrigger: onEnter(group),
    });
  });
}

/* ------------------------------------------------------------ timeline */

function timeline() {
  const wrap = $('[data-timeline]');
  if (!wrap) return;

  // Progress line draws as you scroll through the section.
  gsap.fromTo(
    $('.timeline-line-progress', wrap),
    { scaleY: 0 },
    { scaleY: 1, ease: 'none', scrollTrigger: { trigger: wrap, start: 'top 70%', end: 'bottom 65%', scrub: true } }
  );

  // Cards slide in from alternating sides on desktop, from the right on mobile.
  const mm = gsap.matchMedia();
  mm.add({ wide: '(min-width: 1024px)', narrow: '(max-width: 1023px)' }, (ctx) => {
    $$('[data-timeline-item]', wrap).forEach((item, i) => {
      const fromX = ctx.conditions.wide ? (i % 2 === 0 ? -48 : 48) : 32;
      gsap.from($('.exp-card', item), {
        opacity: 0,
        x: fromX,
        duration: 0.9,
        clearProps: 'transform',
        scrollTrigger: onEnter(item, 'top 82%'),
      });
      gsap.from($('.timeline-dot', item), { scale: 0, duration: 0.6, scrollTrigger: onEnter(item, 'top 82%') });
    });
  });
}

/* -------------------------------------------------------- architecture */

function architecture() {
  $$('[data-arch]').forEach((fig) => {
    const edges = $$('.arch-edge', fig);
    const nodes = $$('.arch-node', fig);
    const labels = $$('.arch-label', fig);
    gsap.set(edges, { strokeDasharray: '1 1', strokeDashoffset: 1 });

    gsap
      .timeline({ scrollTrigger: onEnter(fig, 'top 80%'), onComplete: () => fig.classList.add('is-live') })
      .from(nodes, { opacity: 0, scale: 0.92, transformOrigin: '50% 50%', stagger: 0.1, duration: 0.6 })
      .to(edges, { strokeDashoffset: 0, stagger: 0.15, duration: 0.6 }, 0.2)
      .from(labels, { opacity: 0, stagger: 0.1, duration: 0.6 }, 0.5)
      // Restore the dashed WebSocket edge style once drawn.
      .add(() => gsap.set(edges, { clearProps: 'strokeDasharray,strokeDashoffset' }));
  });
}

/* ---------------------------------------------------------- keyboard */

/**
 * Keyboard users can Tab into content before it has scrolled into view.
 * Reveal any still-transparent ancestor immediately so focus is never invisible.
 */
function revealOnFocus() {
  document.addEventListener('focusin', (e) => {
    let el = e.target instanceof Element ? e.target.closest(REVEAL_SELECTOR) : null;
    while (el) {
      gsap.set(el, { opacity: 1, y: 0, x: 0, clearProps: 'transform' });
      el = el.parentElement ? el.parentElement.closest(REVEAL_SELECTOR) : null;
    }
  });
}
