/**
 * nav.js — sticky nav behaviour: mobile menu, in-page anchor scrolling
 * (via Lenis when active), "scrolled" border, and active-section highlighting.
 */
export function initNav({ lenis, reducedMotion }) {
  const header = document.querySelector('[data-nav]');
  if (!header) return;
  const toggle = header.querySelector('.nav-toggle');
  const menu = document.getElementById('mobile-menu');

  /* ---- mobile menu ---- */
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
  };
  toggle.addEventListener('click', () => setOpen(menu.hidden));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });

  /* ---- border once the page is scrolled ---- */
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- in-page anchors ---- */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (hash.length < 2) return;
    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    setOpen(false);

    if (lenis) {
      // Lenis honours the CSS scroll-margin-top on sections, so no extra offset here.
      lenis.scrollTo(hash === '#top' ? 0 : target);
    } else {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
    history.pushState(null, '', hash);

    // Move keyboard focus to the target so the next Tab continues from there.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  /* ---- highlight the section currently in view ---- */
  // Every section is observed; sections without a nav link (hero, services,
  // education) clear the highlight so a stale link is never marked current.
  const links = [...header.querySelectorAll('.nav-link')];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach((l) => {
          if (l.getAttribute('href') === id) l.setAttribute('aria-current', 'location');
          else l.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
}
