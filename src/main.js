/**
 * main.js — browser entry point.
 * The HTML is already rendered (see render.js); this file only adds the theme
 * toggle and highlights the sidebar link of the section in view.
 */
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import './styles.css';

/* ---- theme toggle (the saved choice is applied early by index.html) ---- */
const root = document.documentElement;
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = () => root.dataset.theme || (systemDark.matches ? 'dark' : 'light');

document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {
    // Private mode: the choice just lasts for this visit.
  }
});

/* ---- highlight the section currently in view ---- */
const links = [...document.querySelectorAll('.side-link')];
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      links.forEach((link) => {
        if (link.getAttribute('href') === id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));

// The last section is too short to reach the middle of the screen, so mark it at the page bottom.
window.addEventListener(
  'scroll',
  () => {
    if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 2) return;
    links.forEach((link, i) => {
      if (i === links.length - 1) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  },
  { passive: true }
);

/* ---- projects deck: fanned cards that rotate on their own ---- */
const deck = document.querySelector('[data-deck]');
if (deck) {
  const cards = [...deck.querySelectorAll('[data-card]')];
  const count = deck.querySelector('[data-deck-count]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const total = cards.length;
  let active = 0;
  let timer = 0;

  const show = (index) => {
    active = (index + total) % total;
    cards.forEach((card, i) => {
      // Shortest way round the circle: 0 is the front card, -1 and 1 sit beside it.
      let pos = i - active;
      if (pos > total / 2) pos -= total;
      if (pos < -total / 2) pos += total;
      const front = pos === 0;
      card.dataset.pos = Math.abs(pos) <= 1 ? String(pos) : 'off';
      card.setAttribute('aria-hidden', String(!front));
      card.querySelectorAll('a').forEach((a) => (a.tabIndex = front ? 0 : -1));
    });
    count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  };

  const stop = () => clearInterval(timer);
  const play = () => {
    stop();
    if (!reducedMotion) timer = setInterval(() => !document.hidden && show(active + 1), 4000);
  };

  deck.classList.add('is-deck');
  deck.querySelector('[data-deck-controls]').hidden = false;
  show(0);
  play();

  deck.querySelector('[data-deck-prev]').addEventListener('click', () => (show(active - 1), play()));
  deck.querySelector('[data-deck-next]').addEventListener('click', () => (show(active + 1), play()));
  // A side card comes to the front when clicked instead of following its link.
  deck.addEventListener('click', (e) => {
    const card = e.target.closest('[data-card]');
    if (!card || card.dataset.pos === '0') return;
    e.preventDefault();
    show(cards.indexOf(card));
    play();
  });
  deck.addEventListener('pointerenter', stop);
  deck.addEventListener('pointerleave', play);
  deck.addEventListener('focusin', stop);
  deck.addEventListener('focusout', play);
}
