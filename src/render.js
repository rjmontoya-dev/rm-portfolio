/**
 * render.js — turns content.js into static HTML at build time.
 *
 * vite.config.js calls renderPage() from transformIndexHtml, so the shipped
 * index.html already contains every section (fast first paint, crawlable, works
 * without JavaScript). The browser JS only adds the theme toggle and the
 * active-link highlight.
 *
 * Pure string functions — no DOM — so it runs in Node during the build.
 */
import { site, profile, intro, nav, stats, experience, projects, skills, education } from './content.js';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

/* ---------------------------------------------------------------- helpers */

/** The resume link only renders when the PDF is actually in public/ (no 404 links). */
const hasResume =
  Boolean(site.resumeUrl) && existsSync(resolve(process.cwd(), 'public', site.resumeUrl.replace(/^\//, '')));

/** Escape text for safe use inside HTML text and attributes. */
const esc = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Escape text, then turn [[phrase]] into a pill. */
const withPills = (text) => esc(text).replace(/\[\[(.+?)\]\]/g, '<span class="pill">$1</span>');

const external = 'target="_blank" rel="noopener noreferrer"';
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';

/** Numbered section: "01 — projects" on the left, an optional link on the right. */
let sectionCount = 0;
const section = ({ id, label, aside = '', body }) => {
  const number = String(++sectionCount).padStart(2, '0');
  return `
<section id="${id}" class="section" aria-labelledby="${id}-title">
  <header class="section-head">
    <h2 id="${id}-title" class="section-label"><span class="section-num">${number}</span> — ${esc(label)}</h2>
    ${aside}
  </header>
  ${body}
</section>`;
};

/* ------------------------------------------------------------------- head */

function head() {
  const ogImage = site.url + site.ogImage;
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: site.url,
    image: ogImage,
    jobTitle: 'Full-Stack Web Developer (Laravel & Vue)',
    description: site.description,
    email: `mailto:${profile.email}`,
    telephone: profile.phoneHref,
    address: { '@type': 'PostalAddress', addressRegion: 'Oriental Mindoro', addressCountry: 'PH' },
    worksFor: { '@type': 'Organization', name: 'Mindoro State University' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Mindoro State University' },
    knowsAbout: skills.flatMap((g) => g.items),
    sameAs: [profile.links.github, profile.links.linkedin],
  };
  // Escape "<" so the JSON can never close the <script> tag early.
  const jsonLd = JSON.stringify(person).replace(/</g, '\\u003c');

  return `
  <title>${esc(site.title)}</title>
  <meta name="description" content="${esc(site.description)}" />
  <meta name="author" content="${esc(profile.name)}" />
  <link rel="canonical" href="${site.url}/" />
  <meta name="theme-color" content="#0a0a0a" />
  <meta name="color-scheme" content="dark light" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${esc(profile.name)}" />
  <meta property="og:locale" content="${site.locale}" />
  <meta property="og:url" content="${site.url}/" />
  <meta property="og:title" content="${esc(site.title)}" />
  <meta property="og:description" content="${esc(site.description)}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="400" />
  <meta property="og:image:height" content="400" />
  <meta property="og:image:alt" content="${esc(site.ogImageAlt)}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${esc(site.title)}" />
  <meta name="twitter:description" content="${esc(site.description)}" />
  <meta name="twitter:image" content="${ogImage}" />
  <meta name="twitter:image:alt" content="${esc(site.ogImageAlt)}" />

  <script type="application/ld+json">${jsonLd}</script>`;
}

/* ---------------------------------------------------------------- sidebar */

function sidebar() {
  const links = nav.map((l) => `<li><a class="side-link" href="${l.href}">${esc(l.label)}</a></li>`).join('');
  return `
<a class="skip-link" href="#main">Skip to content</a>
<aside class="sidebar">
  <a class="side-name" href="#top">${esc(profile.name)}</a>
  <nav class="side-nav" aria-label="Sections">
    <ul role="list">${links}</ul>
  </nav>
  <div class="side-foot">
    <p class="side-status"><span class="dot" aria-hidden="true"></span>${esc(profile.availability)}</p>
    <button type="button" class="theme-toggle" data-theme-toggle aria-label="Switch between dark and light theme">
      <span class="theme-toggle-dark">☾ dark</span><span class="theme-toggle-light">☀ light</span>
    </button>
    <p class="side-contact">For work and collabs, reach me at</p>
    <a class="side-email" href="mailto:${profile.email}">${esc(profile.email)}</a>
  </div>
</aside>`;
}

/* ------------------------------------------------------------------- hero */

function hero() {
  const links = [
    { label: 'github', href: profile.links.github, ext: true },
    { label: 'linkedin', href: profile.links.linkedin, ext: true },
    { label: 'email', href: `mailto:${profile.email}` },
    ...(hasResume ? [{ label: 'resume', href: site.resumeUrl, download: true }] : []),
  ]
    .map(
      (l) =>
        `<li><a href="${l.href}" ${l.ext ? external : ''}${l.download ? 'download' : ''}>${l.label} ${arrow}${l.ext ? '<span class="sr-only"> (opens in a new tab)</span>' : ''}</a></li>`
    )
    .join('');

  return `
<section id="top" class="hero" aria-labelledby="hero-title">
  <img class="hero-photo" src="${profile.photo}" alt="Portrait of ${esc(profile.name)}" width="400" height="400" decoding="async" />
  <div class="hero-copy">
    <h1 id="hero-title" class="hero-name">${esc(profile.name)}</h1>
    ${intro.map((p) => `<p class="hero-text">${withPills(p)}</p>`).join('')}
    <ul class="hero-links" role="list">${links}</ul>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ stats */

function statsStrip() {
  const items = stats
    .map(
      (s) => `
    <div class="stat">
      <dd class="stat-value">${esc(`${s.prefix ?? ''}${s.count === 'projects' ? projects.length : s.value}${s.suffix ?? ''}`)}</dd>
      <dt class="stat-label">${esc(s.label)}</dt>
    </div>`
    )
    .join('');
  return `<dl class="stats" aria-label="Highlights">${items}</dl>`;
}

/* --------------------------------------------------------------- projects */

function projectsSection() {
  const cards = projects
    .map((p) => {
      const icon = p.icon
        ? `<img class="card-icon" src="${p.icon}" alt="" width="44" height="44" loading="lazy" decoding="async" />`
        : `<span class="card-icon card-icon-letter" aria-hidden="true">${esc(p.name[0])}</span>`;
      const pills = [
        `<li class="card-pill card-pill-solid">${esc(p.kind)}</li>`,
        ...(p.tags ?? []).map((t) => `<li class="card-pill">${esc(t)}</li>`),
      ].join('');
      const domain = new URL(p.href).hostname.replace(/^www\./, '');
      return `
    <li class="card" data-card>
      <ul class="card-pills" role="list">${pills}</ul>
      <div class="card-head">
        ${icon}
        <h3 class="card-title">${esc(p.name)}${p.subtitle ? ` <span class="card-sub">— ${esc(p.subtitle)}</span>` : ''}</h3>
      </div>
      <p class="card-desc">${esc(p.description)}</p>
      <a class="card-btn" href="${p.href}" ${external}>${esc(domain)} ${arrow}<span class="sr-only"> (opens ${esc(p.name)} in a new tab)</span></a>
    </li>`;
    })
    .join('');

  // Without JavaScript the cards are a plain list; main.js turns them into the fanned deck.
  const body = `
  <div class="deck" data-deck>
    <ul class="deck-cards" role="list">${cards}</ul>
    <div class="deck-controls" data-deck-controls hidden>
      <button type="button" class="deck-btn" data-deck-prev aria-label="Previous project">← prev</button>
      <span class="deck-count" data-deck-count aria-live="polite"></span>
      <button type="button" class="deck-btn" data-deck-next aria-label="Next project">next →</button>
    </div>
  </div>`;

  return section({
    id: 'projects',
    label: 'projects',
    aside: `<a class="section-link" href="${profile.links.github}" ${external}>github ${arrow}</a>`,
    body,
  });
}

/* ------------------------------------------------------------- experience */

function experienceSection() {
  const rows = experience
    .map((job, i) => {
      const year = job.period.match(/\d{4}/)?.[0] ?? '';
      const bullets = job.bullets
        .map((b) => `<li>${b.title ? `<strong>${esc(b.title)}:</strong> ` : ''}${esc(b.text)}</li>`)
        .join('');
      return `
    <li class="row">
      <details class="job"${i === 0 ? ' open' : ''}>
        <summary class="job-summary">
          <span class="job-year">${esc(year)}</span>
          <span class="row-title">${esc(job.role)}</span>
          <span class="job-org">${esc(job.org)}</span>
        </summary>
        <div class="job-detail">
          <p class="row-meta">${esc(job.period)} · ${esc(job.location)}${job.unit ? ` · ${esc(job.unit)}` : ''}</p>
          ${job.intro ? `<p class="row-text">${esc(job.intro)}</p>` : ''}
          <ul class="job-bullets">${bullets}</ul>
          <p class="row-meta">${job.tech.map(esc).join(' · ')}</p>
        </div>
      </details>
    </li>`;
    })
    .join('');

  return section({
    id: 'experience',
    label: 'experience',
    aside: `<a class="section-link" href="${profile.links.linkedin}" ${external}>linkedin ${arrow}</a>`,
    body: `<ul class="rows" role="list">${rows}</ul>`,
  });
}

/* ------------------------------------------------------------------ stack */

function stackSection() {
  const groups = skills
    .map(
      (g) => `
    <div class="stack-group">
      <dt class="stack-key">${esc(g.key.replace(/-/g, ' '))}</dt>
      <dd><ul class="chips" role="list">${g.items.map((item) => `<li class="chip">${esc(item)}</li>`).join('')}</ul></dd>
    </div>`
    )
    .join('');
  return section({ id: 'stack', label: 'stack', body: `<dl class="stack">${groups}</dl>` });
}

/* -------------------------------------------------------------- education */

function educationSection() {
  const cards = education
    .map(
      (e) => `
    <li class="edu">
      <h3 class="row-title">${esc(e.title)}</h3>
      <p class="edu-org">${esc(e.org)}</p>
      ${e.period ? `<p class="row-meta">${esc(e.period)}</p>` : ''}
    </li>`
    )
    .join('');
  return section({
    id: 'education',
    label: 'education & certifications',
    body: `<ul class="edu-grid" role="list">${cards}</ul>`,
  });
}

/* ---------------------------------------------------------------- contact */

function contactSection() {
  const rows = [
    { key: 'email', value: profile.email, href: `mailto:${profile.email}` },
    { key: 'linkedin', value: profile.links.linkedinLabel, href: profile.links.linkedin, ext: true },
    { key: 'github', value: profile.links.githubLabel, href: profile.links.github, ext: true },
    { key: 'phone', value: profile.phone, href: `tel:${profile.phoneHref}` },
  ]
    .map(
      (r) => `
    <li class="row">
      <a class="contact-row" href="${r.href}" ${r.ext ? external : ''}>
        <span class="contact-key">${r.key}</span>
        <span class="contact-value">${esc(r.value)}</span>
        ${r.ext ? `${arrow}<span class="sr-only"> (opens in a new tab)</span>` : ''}
      </a>
    </li>`
    )
    .join('');

  return section({
    id: 'contact',
    label: 'contact',
    body: `
  <p class="contact-lead">${esc(profile.availabilityDetail)}. Have a project in mind? Send me a message.</p>
  <ul class="rows" role="list">${rows}</ul>`,
  });
}

/* ------------------------------------------------------------------- page */

function body() {
  sectionCount = 0;
  return `
${sidebar()}
<main id="main" class="main" tabindex="-1">
  ${hero()}
  ${statsStrip()}
  ${projectsSection()}
  ${experienceSection()}
  ${stackSection()}
  ${educationSection()}
  ${contactSection()}
  <footer class="footer">
    <p>© ${new Date().getFullYear()} ${esc(profile.name)}</p>
    <a href="#top">back to top ↑</a>
  </footer>
</main>`;
}

/**
 * Fill the index.html template.
 * @param {string} template contents of index.html
 */
export function renderPage(template) {
  return template.replace('<!--app-head-->', head()).replace('<!--app-body-->', body());
}
