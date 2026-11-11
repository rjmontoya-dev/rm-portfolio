/**
 * render.js — turns content.js into static HTML at build time.
 *
 * vite.config.js calls renderPage() from transformIndexHtml, so the shipped
 * index.html already contains every section (fast first paint, crawlable, works
 * without JavaScript). The browser JS only adds motion on top.
 *
 * Pure string functions — no DOM — so it runs in Node during the build.
 */
import {
  site,
  profile,
  terminal,
  nav,
  stats,
  services,
  architecture,
  experience,
  projects,
  skills,
  education,
  techColors,
} from './content.js';
import { HEATMAP } from './config.js';
import { mulberry32 } from './utils/random.js';
import { icon } from './icons.js';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

/* ---------------------------------------------------------------- helpers */

/** Resume buttons only render when the PDF is actually in public/ (no 404 links). */
const hasResume =
  Boolean(site.resumeUrl) && existsSync(resolve(process.cwd(), 'public', site.resumeUrl.replace(/^\//, '')));

/** Escape text for safe use inside HTML text and attributes. */
const esc = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Longest techColors key that the label starts with ("Laravel 12" → Laravel). */
const techColorKeys = Object.keys(techColors).sort((a, b) => b.length - a.length);
const colorFor = (label) => {
  const key = techColorKeys.find((k) => label === k || label.startsWith(k));
  return key ? techColors[key] : '#8b949e';
};

const dot = (label) => `<span class="lang-dot" style="--dot:${colorFor(label)}" aria-hidden="true"></span>`;
const chip = (label) => `<li class="chip">${dot(label)}${esc(label)}</li>`;
const chips = (labels, extra = '') => `<ul class="chips ${extra}" role="list">${labels.map(chip).join('')}</ul>`;

const external = 'target="_blank" rel="noopener noreferrer"';

/** Shared section wrapper with a monospace code-style label and an animated h2. */
const section = ({ id, label, title, intro = '', body, className = '' }) => `
<section id="${id}" class="section ${className}" aria-labelledby="${id}-title">
  <div class="wrap">
    <header class="section-head">
      <p class="section-label">${esc(label)}</p>
      <h2 id="${id}-title" class="section-title" data-heading>${esc(title)}</h2>
      ${intro ? `<p class="section-intro" data-lines>${esc(intro)}</p>` : ''}
    </header>
    ${body}
  </div>
</section>`;

/* ------------------------------------------------------------------- head */

function head() {
  const ogImage = site.url + site.ogImage;
  const allSkills = skills.flatMap((g) => g.items);
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
    knowsAbout: allSkills,
    sameAs: [profile.links.github, profile.links.linkedin],
  };
  // Escape "<" so the JSON can never close the <script> tag early.
  const jsonLd = JSON.stringify(person).replace(/</g, '\\u003c');

  return `
  <title>${esc(site.title)}</title>
  <meta name="description" content="${esc(site.description)}" />
  <meta name="author" content="${esc(profile.name)}" />
  <link rel="canonical" href="${site.url}/" />
  <meta name="theme-color" content="#0d1117" />
  <meta name="color-scheme" content="dark" />
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

/* ------------------------------------------------------------- background */

const background = () => `
<div class="bg-layer" aria-hidden="true">
  <div class="bg-fallback"></div>
  <canvas id="bg-canvas"></canvas>
  <div class="bg-vignette"></div>
</div>`;

/* -------------------------------------------------------------------- nav */

function navBar() {
  const links = nav
    .map(
      (l) =>
        `<li><a class="nav-link" href="${l.href}" aria-label="${esc(l.label)}"><span data-scramble>${esc(l.label)}</span></a></li>`
    )
    .join('');
  const mobileLinks = nav.map((l) => `<li><a class="mobile-link" href="${l.href}">${esc(l.label)}</a></li>`).join('');

  return `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-nav" data-nav>
  <nav class="wrap nav-inner" aria-label="Primary">
    <a href="#top" class="logo"><span class="logo-prompt" aria-hidden="true">~/</span>rm.dev</a>
    <ul class="nav-links" role="list">${links}</ul>
    <div class="nav-actions">
      ${hasResume ? `<a class="btn btn-ghost btn-sm nav-resume" href="${site.resumeUrl}" download>${icon('download')}<span>Resume</span></a>` : ''}
      <a class="icon-btn" href="${profile.links.github}" ${external} aria-label="GitHub profile (opens in a new tab)">${icon('github')}</a>
      <button type="button" class="icon-btn nav-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">${icon('menu')}${icon('close')}</button>
    </div>
  </nav>
  <div id="mobile-menu" class="mobile-menu" hidden>
    <ul class="wrap mobile-links" role="list">
      ${mobileLinks}
      ${hasResume ? `<li><a class="btn btn-ghost btn-sm" href="${site.resumeUrl}" download>${icon('download')}<span>Download Resume</span></a></li>` : ''}
    </ul>
  </div>
</header>`;
}

/* ------------------------------------------------------------------- hero */

function hero() {
  const termLines = terminal
    .map((line) =>
      line.cmd
        ? `<p class="t-line" data-terminal-line><span class="t-prompt" aria-hidden="true">$</span> ${esc(line.cmd)}</p>`
        : `<p class="t-line t-out" data-terminal-line><span class="t-arrow" aria-hidden="true">&gt;</span> ${esc(line.out)}</p>`
    )
    .join('');

  return `
<section id="top" class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="status-badge" data-hero="badge"><span class="pulse-dot" aria-hidden="true"></span>${esc(profile.availability)}</p>
      <h1 id="hero-title" class="hero-name" data-hero="name">${esc(profile.name)}</h1>
      <p class="hero-role" data-hero="role">
        <span class="sr-only">${esc(profile.headline)}</span>
        <span aria-hidden="true"><span class="role-prefix">&gt;_</span> <span class="role-text" data-roles="${esc(JSON.stringify(profile.roles))}">${esc(profile.roles[0])}</span><span class="caret"></span></span>
      </p>
      <p class="hero-value" data-hero="value">${esc(profile.valueStatement)}</p>
      <div class="hero-ctas" data-hero="ctas">
        <a class="btn btn-primary" href="#projects">View Projects ${icon('arrowRight')}</a>
        <a class="btn btn-ghost" href="#contact">Contact Me</a>
      </div>
      <ul class="hero-meta" role="list" data-hero="meta">
        <li>${icon('pin')}<span>${esc(profile.location)}</span></li>
        <li>${icon('mail')}<a href="mailto:${profile.email}">${esc(profile.email)}</a></li>
      </ul>
    </div>
    <div class="hero-side" data-hero="terminal">
      <figure class="terminal" aria-label="Terminal-style summary">
        <div class="terminal-bar" aria-hidden="true">
          <span class="tl tl-r"></span><span class="tl tl-y"></span><span class="tl tl-g"></span>
          <span class="terminal-title">roger@portfolio: ~</span>
        </div>
        <div class="terminal-body">
          ${termLines}
          <p class="t-line" data-terminal-line><span class="t-prompt" aria-hidden="true">$</span> <span class="caret caret-sm" aria-hidden="true"></span></p>
        </div>
      </figure>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ stats */

function statsStrip() {
  const items = stats
    .map((s) => {
      const text = `${s.prefix ?? ''}${s.value}${s.suffix ?? ''}`;
      return `
      <div class="stat">
        <dt class="stat-label">${esc(s.label)}</dt>
        <dd class="stat-value"><span data-count="${s.value}" data-prefix="${esc(s.prefix ?? '')}" data-suffix="${esc(s.suffix ?? '')}">${esc(text)}</span></dd>
        ${s.note ? `<dd class="stat-note">${esc(s.note)}</dd>` : ''}
      </div>`;
    })
    .join('');
  return `
<section class="stats" aria-label="Highlights">
  <div class="wrap">
    <dl class="stats-grid card" data-reveal>${items}</dl>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ about */

function about() {
  const body = `
  <div class="about-grid">
    <div class="about-copy">
      <p class="about-summary" data-lines>${esc(profile.summary)}</p>
      <p class="about-headline" data-reveal><span class="mono-key">headline:</span> ${esc(profile.headline)}</p>
    </div>
    <aside class="card about-card" data-reveal aria-label="Profile details">
      <img class="about-photo" src="${profile.photo}" alt="Portrait of ${esc(profile.name)}" width="400" height="400" loading="lazy" decoding="async" />
      <dl class="about-meta">
        <div><dt>${icon('pin')}<span>Location</span></dt><dd>${esc(profile.location)}</dd></div>
        <div><dt>${icon('clock')}<span>Availability</span></dt><dd><span class="pulse-dot pulse-dot-sm" aria-hidden="true"></span>${esc(profile.availabilityDetail)}</dd></div>
        <div><dt>${icon('mail')}<span>Email</span></dt><dd><a href="mailto:${profile.email}">${esc(profile.email)}</a></dd></div>
      </dl>
    </aside>
  </div>`;
  return section({ id: 'about', label: '// about', title: 'About', body });
}

/* --------------------------------------------------------------- services */

/** Architecture diagram as inline SVG. Two layouts share one definition. */
function archSvg(layout) {
  const wide = layout === 'wide';
  const n = architecture.nodes;
  // Node boxes: [x, y] top-left; width/height per layout.
  const W = wide ? 190 : 220;
  const H = wide ? 64 : 60;
  const pos = wide
    ? { client: [20, 30], api: [305, 30], queue: [590, 30], db: [590, 160], third: [305, 160] }
    : { client: [60, 20], api: [60, 130], queue: [60, 240], db: [60, 350], third: [60, 460] };
  // Edges: path data + label (+ x/y/anchor) + modifier class.
  const edges = wide
    ? [
        { d: 'M210 52 H305', label: 'REST', x: 257, y: 44 },
        { d: 'M305 78 H210', label: 'WebSocket', x: 257, y: 96, cls: 'is-ws' },
        { d: 'M495 62 H590', label: 'dispatch', x: 542, y: 54 },
        { d: 'M685 94 V160', label: 'persist', x: 693, y: 131, anchor: 'start' },
        { d: 'M590 192 H495', label: 'sync', x: 542, y: 184 },
      ]
    : [
        { d: 'M150 80 V130', label: 'REST', x: 142, y: 109, anchor: 'end' },
        { d: 'M190 130 V80', label: 'WebSocket', x: 198, y: 109, anchor: 'start', cls: 'is-ws' },
        { d: 'M170 190 V240', label: 'dispatch', x: 178, y: 219, anchor: 'start' },
        { d: 'M170 300 V350', label: 'persist', x: 178, y: 329, anchor: 'start' },
        { d: 'M170 410 V460', label: 'sync', x: 178, y: 439, anchor: 'start' },
      ];
  const viewBox = wide ? '0 0 800 250' : '0 0 340 540';
  const id = `arch-${layout}`;

  const nodeSvg = Object.entries(pos)
    .map(([key, [x, y]]) => {
      const accent = key === 'api' ? 'is-api' : key === 'third' ? 'is-third' : '';
      return `
      <g class="arch-node ${accent}">
        <rect x="${x}" y="${y}" width="${W}" height="${H}" rx="8" />
        <circle class="arch-led" cx="${x + W - 16}" cy="${y + 16}" r="3.5" />
        <text class="arch-title" x="${x + 14}" y="${y + 26}">${esc(n[key].title)}</text>
        <text class="arch-sub" x="${x + 14}" y="${y + (wide ? 46 : 44)}">${esc(n[key].sub)}</text>
      </g>`;
    })
    .join('');

  const edgeSvg = edges
    .map(
      (e, i) => `
      <g class="arch-link ${e.cls ?? ''}" style="--i:${i}">
        <path class="arch-edge" d="${e.d}" pathLength="1" />
        <path class="arch-flow" d="${e.d}" pathLength="1" />
        <text class="arch-label" x="${e.x}" y="${e.y}" text-anchor="${e.anchor ?? 'middle'}">${esc(e.label)}</text>
      </g>`
    )
    .join('');

  return `
  <svg class="arch-svg arch-${layout}" viewBox="${viewBox}" role="img" aria-labelledby="${id}-t ${id}-d">
    <title id="${id}-t">${esc(architecture.title)}</title>
    <desc id="${id}-d">Client to Laravel API over REST, API to queue, queue to database, database synced with third-party APIs; live updates return to the client over WebSocket.</desc>
    ${edgeSvg}
    ${nodeSvg}
  </svg>`;
}

function servicesSection() {
  const cards = services
    .map(
      (s) => `
      <li class="card card-hover service-card" data-reveal>
        <span class="service-icon">${icon(s.icon)}</span>
        <h3 class="card-title">${esc(s.title)}</h3>
        <p class="service-proof"><span class="mono-key">// proof</span> ${esc(s.proof)}</p>
      </li>`
    )
    .join('');

  const body = `
  <ul class="services-grid" role="list">${cards}</ul>
  <figure class="card arch" data-arch data-reveal>
    <div class="arch-head">
      <p class="mono-key">${esc(architecture.title.toLowerCase().replace(/ /g, '-'))}.svg</p>
    </div>
    ${archSvg('wide')}
    ${archSvg('tall')}
    <figcaption class="arch-caption">${esc(architecture.caption)}</figcaption>
  </figure>`;

  return section({
    id: 'services',
    label: '// what-i-build',
    title: 'What I can build for you',
    intro: 'Backend-heavy web services, from the API and database to the dashboard your team uses every day.',
    body,
  });
}

/* ------------------------------------------------------------- experience */

function experienceSection() {
  const items = experience
    .map((job) => {
      const bullets = job.bullets
        .map((b) => `<li>${b.title ? `<strong>${esc(b.title)}:</strong> ` : ''}${esc(b.text)}</li>`)
        .join('');
      return `
      <li class="timeline-item" data-timeline-item>
        <span class="timeline-dot${job.current ? ' is-current' : ''}" aria-hidden="true"></span>
        <article class="card card-hover exp-card">
          <header class="exp-head">
            <p class="exp-period">${esc(job.period)}${job.current ? ' <span class="badge badge-green">Current</span>' : ''}</p>
            <h3 class="exp-role">${esc(job.role)}</h3>
            <p class="exp-org">${esc(job.org)}${job.unit ? ` <span class="exp-unit">· ${esc(job.unit)}</span>` : ''}</p>
            <p class="exp-loc">${icon('pin')}<span>${esc(job.location)}</span></p>
          </header>
          ${job.intro ? `<p class="exp-intro">${esc(job.intro)}</p>` : ''}
          <ul class="exp-bullets">${bullets}</ul>
          ${chips(job.tech, 'exp-tech')}
        </article>
      </li>`;
    })
    .join('');

  const body = `
  <div class="timeline-wrap" data-timeline>
    <div class="timeline-line" aria-hidden="true"><span class="timeline-line-progress"></span></div>
    <ol class="timeline" role="list">${items}</ol>
  </div>`;

  return section({ id: 'experience', label: '~/experience', title: 'Experience', body });
}

/* --------------------------------------------------------------- projects */

/** Decorative contribution-style heatmap from seeded random data. */
function heatmap() {
  const rand = mulberry32(HEATMAP.seed);
  let weeks = '';
  for (let w = 0; w < HEATMAP.weeks; w++) {
    let days = '';
    for (let d = 0; d < 7; d++) {
      const weekend = d === 0 || d === 6;
      const v = rand() * (weekend ? 0.55 : 1);
      const level = v > 0.88 ? 4 : v > 0.72 ? 3 : v > 0.52 ? 2 : v > 0.3 ? 1 : 0;
      days += `<i data-l="${level}"></i>`;
    }
    weeks += `<div class="hm-week">${days}</div>`;
  }
  const legend = [0, 1, 2, 3, 4].map((l) => `<i data-l="${l}"></i>`).join('');
  return `
  <figure class="card heatmap-card" data-reveal>
    <div class="heatmap-head">
      <p class="mono-key">$ git log --graph --decorative</p>
      <span class="badge badge-muted">illustrative</span>
    </div>
    <div class="heatmap" aria-hidden="true">${weeks}</div>
    <figcaption class="heatmap-foot">
      <span>Decorative pattern from seeded random data — not real contribution stats.</span>
      <span class="heatmap-legend" aria-hidden="true">Less ${legend} More</span>
    </figcaption>
  </figure>`;
}

function projectsSection() {
  const cards = projects
    .map((p) => {
      const badge = p.badge
        ? `<span class="badge ${p.link ? 'badge-green' : 'badge-muted'}">${esc(p.badge)}</span>`
        : '';
      const link = p.link
        ? `<a class="repo-link" href="${p.link.href}" ${external} aria-label="${esc(p.link.label)}: ${esc(p.name)} (opens in a new tab)">${esc(p.link.label)} ${icon('arrowUpRight')}</a>`
        : '';
      const langs = p.tags
        .map((t) => `<li class="repo-lang">${dot(t)}${esc(t)}</li>`)
        .join('');
      return `
      <li class="card card-hover repo-card" data-reveal>
        <div class="repo-head">
          <span class="repo-icon">${icon('repo')}</span>
          <h3 class="repo-title">${esc(p.name)}</h3>
          ${badge}
        </div>
        ${p.subtitle ? `<p class="repo-sub">${esc(p.subtitle)}</p>` : ''}
        <p class="repo-desc">${esc(p.description)}</p>
        <div class="repo-foot">
          <ul class="repo-langs" role="list">${langs}</ul>
          ${link}
        </div>
      </li>`;
    })
    .join('');

  const body = `
  <ul class="pinned-grid" role="list">${cards}</ul>
  ${heatmap()}`;

  return section({
    id: 'projects',
    label: '$ ls ~/projects --pinned',
    title: 'Pinned projects',
    intro: 'Several of these are private client systems, so the cards describe what was built rather than link to code.',
    body,
  });
}

/* ----------------------------------------------------------------- skills */

function skillsSection() {
  const groups = skills
    .map(
      (g, i) => `
      <section class="card card-hover skill-group" data-skill-group data-reveal aria-labelledby="skill-${g.key}">
        <h3 id="skill-${g.key}" class="skill-key"><span class="json-punct" aria-hidden="true">"</span>${esc(g.key)}<span class="json-punct" aria-hidden="true">": [</span></h3>
        ${chips(g.items)}
        <p class="json-punct json-close" aria-hidden="true">]${i < skills.length - 1 ? ',' : ''}</p>
      </section>`
    )
    .join('');

  const body = `
  <div class="manifest">
    <p class="manifest-file mono-key" aria-hidden="true">skills.json — { "name": "roger-montoya-jr", "skills": {</p>
    <div class="skills-grid">${groups}</div>
    <p class="manifest-file mono-key" aria-hidden="true">} }</p>
  </div>`;

  return section({ id: 'skills', label: '$ cat skills.json', title: 'Skills', body });
}

/* -------------------------------------------------------------- education */

function educationSection() {
  const cards = education
    .map(
      (e) => `
      <li class="card card-hover edu-card" data-reveal>
        <span class="service-icon">${icon(e.icon)}</span>
        <div>
          <h3 class="card-title">${esc(e.title)}</h3>
          <p class="edu-org">${esc(e.org)}</p>
          ${e.period ? `<p class="edu-period">${esc(e.period)}</p>` : ''}
        </div>
      </li>`
    )
    .join('');
  return section({
    id: 'education',
    label: '// education',
    title: 'Education & Certifications',
    body: `<ul class="edu-grid" role="list">${cards}</ul>`,
  });
}

/* ---------------------------------------------------------------- contact */

function contactSection() {
  const rows = [
    { icon: 'mail', key: 'email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: 'linkedin', key: 'linkedin', value: profile.links.linkedinLabel, href: profile.links.linkedin, ext: true },
    { icon: 'github', key: 'github', value: profile.links.githubLabel, href: profile.links.github, ext: true },
    { icon: 'phone', key: 'phone', value: profile.phone, href: `tel:${profile.phoneHref}` },
  ]
    .map(
      (r) => `
      <li>
        <a class="contact-row" href="${r.href}" ${r.ext ? external : ''}>
          <span class="contact-icon">${icon(r.icon)}</span>
          <span class="contact-text"><span class="contact-key">${r.key}</span><span class="contact-value">${esc(r.value)}</span></span>
          ${r.ext ? '<span class="sr-only">(opens in a new tab)</span>' : ''}
        </a>
      </li>`
    )
    .join('');

  const body = `
  <div class="contact-grid">
    <div class="contact-info" data-reveal>
      <p class="status-badge"><span class="pulse-dot" aria-hidden="true"></span>${esc(profile.availability)}</p>
      <ul class="contact-list" role="list">${rows}</ul>
      ${hasResume ? `<a class="btn btn-ghost" href="${site.resumeUrl}" download>${icon('download')} Download Resume (PDF)</a>` : ''}
    </div>
    <form class="card contact-form" data-contact-form data-to="${profile.email}" data-reveal>
      <p class="mono-key form-title">$ ./send-message.sh</p>
      <div class="field">
        <label for="cf-name">Name</label>
        <input id="cf-name" name="name" type="text" autocomplete="name" required />
      </div>
      <div class="field">
        <label for="cf-email">Your email <span class="field-hint">(optional)</span></label>
        <input id="cf-email" name="email" type="email" autocomplete="email" />
      </div>
      <div class="field">
        <label for="cf-message">Message</label>
        <textarea id="cf-message" name="message" rows="5" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">${icon('send')} Open in email app</button>
      <p class="form-note">This opens your email app with the message filled in. Nothing is sent or stored by this site.</p>
      <p class="form-status" role="status" data-form-status></p>
    </form>
  </div>`;

  return section({
    id: 'contact',
    label: '$ ./contact.sh',
    title: "Let's work together",
    intro: 'Need an API, an integration, an admin panel or a live dashboard? Send me a message.',
    body,
    className: 'section-contact',
  });
}

/* ----------------------------------------------------------------- footer */

const footer = () => `
<footer class="site-footer">
  <div class="wrap footer-inner">
    <p>© ${new Date().getFullYear()} ${esc(profile.name)}</p>
    <p class="footer-built">Built with Three.js + GSAP</p>
    <a class="footer-top" href="#top">Back to top ${icon('arrowUp')}</a>
  </div>
</footer>`;

/* ------------------------------------------------------------------- page */

function body() {
  return `
${background()}
${navBar()}
<main id="main" tabindex="-1">
  ${hero()}
  ${statsStrip()}
  ${about()}
  ${servicesSection()}
  ${experienceSection()}
  ${projectsSection()}
  ${skillsSection()}
  ${educationSection()}
  ${contactSection()}
</main>
${footer()}`;
}

/**
 * Fill the index.html template.
 * @param {string} template contents of index.html
 */
export function renderPage(template) {
  return template.replace('<!--app-head-->', head()).replace('<!--app-body-->', body());
}
