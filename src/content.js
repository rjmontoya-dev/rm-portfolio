/**
 * content.js — every piece of text on the site lives here.
 *
 * The page is rendered from this file at build time (vite.config.js → src/render.js),
 * so you never need to touch HTML to update the portfolio. In `npm run dev`,
 * saving this file reloads the page.
 *
 * Rule of thumb: only put facts here that you can back up in an interview.
 */

export const site = {
  url: 'https://rm-portfolio-delta.vercel.app',
  title: 'Roger A. Montoya Jr. — Laravel & Vue Developer',
  description:
    'Laravel & Vue full-stack developer with 3+ years building APIs, integrations and real-time dashboards',
  /** Shared-link preview image (served from /public). */
  ogImage: '/images/profile-photo.png',
  ogImageAlt: 'Portrait of Roger A. Montoya Jr.',
  /**
   * Put your PDF at public/Roger-Montoya-Jr-Resume.pdf (or change this path).
   * The Resume buttons are only rendered when this file exists at build time.
   */
  resumeUrl: '/Roger-Montoya-Jr-Resume.pdf',
  locale: 'en_US',
};

export const profile = {
  name: 'Roger A. Montoya Jr.',
  headline: 'Laravel & Vue Developer | API Integrations | Admin Systems & Real-time Dashboards',
  /** The hero role line cycles through these. */
  roles: ['Laravel Developer', 'Vue Developer', 'API Integration Engineer', 'Real-time Systems Builder'],
  valueStatement:
    'I build production web services in Laravel and Vue — APIs, third-party integrations, admin systems and real-time dashboards — end to end, from database design to deployment.',
  location: 'Oriental Mindoro, Philippines',
  availability: 'Open to part-time & contract work',
  availabilityDetail: 'Part-time & contract · flexible schedule',
  email: 'rjmontoya.025@gmail.com',
  phone: '+63 956 478 3553',
  phoneHref: '+639564783553',
  photo: '/images/profile-photo.png',
  links: {
    github: 'https://github.com/rjmontoya-dev',
    githubLabel: 'github.com/rjmontoya-dev',
    linkedin: 'https://www.linkedin.com/in/roger-montoya-jr-44150b2a9',
    linkedinLabel: 'linkedin.com/in/roger-montoya-jr-44150b2a9',
    portfolio: 'https://rm-portfolio-delta.vercel.app',
  },
  summary:
    'Web developer with 3+ years of experience building production web applications in Laravel and Vue.js: admin systems, third-party API integrations (Xero, SAP, Manatal, Sprout), CMS platforms and real-time dashboards. I handle features end to end, from database design and APIs to deployment. Open to part-time and contract work with a flexible schedule.',
};

/** Terminal card in the hero. `cmd` lines get a `$` prompt, `out` lines a `>`. */
export const terminal = [
  { cmd: 'whoami' },
  { out: 'roger-montoya-jr' },
  { cmd: 'stack --primary' },
  { out: 'Laravel · Vue 3 · Nuxt 3 · TypeScript · MySQL' },
  { cmd: 'status' },
  { out: 'shipping production web services' },
];

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

/** Stats strip. `value` is animated with a count-up. */
export const stats = [
  { value: 3, suffix: '+', label: 'years experience' },
  { value: 3, suffix: '+', label: 'production apps shipped' },
  { value: 4, label: 'third-party API integrations', note: 'Xero · SAP · Manatal · Sprout' },
  { value: 40, prefix: '~', suffix: '%', label: 'less duplicate data entry', note: 'HR & accounting integration' },
];

/** "What I can build for you" — each proof line is taken from the experience below. */
export const services = [
  {
    icon: 'server',
    title: 'REST API & Backend Services',
    proof: 'Developed and deployed 3+ web and mobile applications in production on Laravel 8–12 at PRAXXYS Solutions.',
  },
  {
    icon: 'plug',
    title: 'Third-party Integrations (ERP, accounting, HR)',
    proof: 'Integrated Xero, Manatal and Sprout into one system, with about 40% less duplicate data entry; connected SAP ERP to a facilities platform.',
  },
  {
    icon: 'activity',
    title: 'Real-time Dashboards (WebSocket/Firebase)',
    proof: 'Designed a WebSocket server that streams live data from multiple weather stations to the dashboard.',
  },
  {
    icon: 'layout',
    title: 'Admin Panels, CMS & PWAs',
    proof: 'Built a CMS-driven website so non-technical staff publish without developer help, and a PWA for maintenance requests and facility bookings.',
  },
];

/**
 * Architecture diagram (services section). Purely illustrative of the kind of
 * system shape described in the experience: client → API → queue → DB → third-party.
 */
export const architecture = {
  title: 'Typical service architecture',
  caption:
    'The shape of the services I build: a Vue/Nuxt client talks to a Laravel API, slow work goes to queued jobs, data is persisted and synced with third-party systems, and live updates stream back over WebSocket.',
  nodes: {
    client: { title: 'Client', sub: 'Vue 3 · Nuxt 3' },
    api: { title: 'Laravel API', sub: 'REST · Auth · Webhooks' },
    queue: { title: 'Queue', sub: 'Jobs · Workers' },
    db: { title: 'Database', sub: 'MySQL · MongoDB' },
    third: { title: 'Third-party APIs', sub: 'Xero · SAP · Manatal · Sprout' },
  },
};

export const experience = [
  {
    role: 'Full-Stack Developer',
    org: 'Mindoro State University',
    unit: 'Research & Development Department',
    period: 'Aug 2025 – Present',
    location: 'Oriental Mindoro',
    current: true,
    bullets: [
      { text: 'Built the admin system and public website for a real-time weather monitoring project (projectmoses.minsu.edu.ph), from development through deployment.' },
      { text: 'Designed and implemented a WebSocket server that streams live data from multiple weather stations to the dashboard.' },
      { text: 'Developed an AI-powered chatbot (Gemini) that answers user questions about the project.' },
    ],
    tech: ['Laravel 12', 'Vue 3', 'React', 'TypeScript', 'MySQL', 'MongoDB', 'WebSocket', 'Gemini API'],
  },
  {
    role: 'Backend Developer',
    org: 'PRAXXYS Solutions, Inc.',
    period: 'Mar 2024 – July 2025',
    location: 'Quezon City',
    intro:
      'Developed and deployed 3+ web and mobile applications in production across e-commerce and retail, CRM and client management, and informational websites.',
    bullets: [
      { title: 'Case Management System', text: 'platform for handling sensitive abuse cases, with dashboards and reporting to track case progress and offline support for field staff in low-connectivity areas.' },
      { title: 'Maintenance & Facilities Platform', text: 'centralized maintenance requests and facility bookings, with PWA support, SAP ERP integration and NFC scanning for asset tracking.' },
      { title: 'HR & Accounting Integration', text: 'integrated the Xero, Manatal and Sprout APIs into one system covering accounting, HR and recruitment, with about 40% less duplicate data entry.' },
      { title: 'Content Management System', text: 'dynamic CMS-driven website for a leading consumer brand, so non-technical staff can publish and update content without developer help.' },
    ],
    tech: ['Laravel 8–12', 'Vue 3', 'Nuxt 3', 'TypeScript', 'MySQL'],
  },
  {
    role: 'Computer Programmer',
    org: 'Mindoro State University',
    unit: 'Research & Development',
    period: 'Nov 2022 – Sep 2023',
    location: 'Oriental Mindoro',
    bullets: [
      { text: 'Led development of a real-time weather monitoring platform deployed across multiple remote locations.' },
      { text: 'Built dashboards with analytics and connected Arduino-based weather stations to Firebase for live updates.' },
      { text: 'Supported field data collection through reliable sensor integration.' },
    ],
    tech: ['Laravel 7', 'Vue 2', 'Firebase', 'MySQL'],
  },
];

/**
 * Pinned-repo cards. These are private/client projects, so details stay generic.
 * `link` is optional — only add one when there is something public to show.
 * `badge` is the small label next to the title (e.g. Live / Private · client work).
 */
export const projects = [
  {
    name: 'Project MOSES',
    subtitle: 'Real-time Weather Monitoring',
    description: 'WebSocket streaming of live weather-station data, an admin system and a Gemini chatbot.',
    tags: ['Laravel', 'Vue', 'WebSocket', 'MongoDB'],
    badge: 'Live',
    link: { label: 'Live', href: 'https://projectmoses.minsu.edu.ph/' },
  },
  {
    name: 'Case Management System',
    badge: 'Private · client work',
    description: 'Sensitive-case tracking with dashboards and offline support for field staff.',
    tags: ['Laravel', 'Vue', 'PWA'],
  },
  {
    name: 'Maintenance & Facilities Platform',
    badge: 'Private · client work',
    description: 'PWA with SAP ERP integration and NFC asset tracking.',
    tags: ['Laravel', 'Nuxt', 'SAP'],
  },
  {
    name: 'HR/Accounting API Hub',
    badge: 'Private · client work',
    description: 'Xero, Manatal and Sprout in one system — about 40% less duplicate entry.',
    tags: ['Laravel', 'REST', 'Queues'],
  },
  {
    name: 'CMS-driven Brand Website',
    badge: 'Private · client work',
    description: 'Non-technical staff publish and update content without developers.',
    tags: ['Laravel', 'Nuxt'],
  },
  {
    name: 'Arduino Weather Stations → Firebase',
    badge: 'University R&D',
    description: 'IoT sensors feeding a live dashboard.',
    tags: ['Laravel', 'Vue', 'Firebase'],
  },
];

/** Skills, rendered like a package manifest. `key` is the JSON-style group name. */
export const skills = [
  { key: 'backend', items: ['Laravel (v7–12)', 'PHP', 'RESTful APIs', 'Queue Management', 'Artisan Commands', 'WebSocket', 'Webhooks'] },
  { key: 'frontend', items: ['Vue 3', 'Nuxt 3', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Inertia.js'] },
  { key: 'databases', items: ['MySQL', 'SQLite', 'MongoDB', 'Firebase Realtime Database', 'Query Optimization', 'Database Design'] },
  { key: 'integrations', items: ['Xero', 'SAP ERP', 'Manatal', 'Sprout', 'Meilisearch', 'Typesense'] },
  { key: 'tools', items: ['Git', 'GitHub', 'GitLab', 'Postman', 'PWA'] },
  { key: 'ai-assisted-workflows', items: ['Claude Code', 'Codex'] },
];

export const education = [
  { icon: 'cap', title: 'BS in Information Technology', org: 'Mindoro State University', period: '2018 – 2022' },
  { icon: 'award', title: 'Java Programming NC III', org: 'TESDA', period: 'Mar – Apr 2023' },
  { icon: 'award', title: 'Civil Service Eligibility', org: 'Honor Graduate Eligibility (HGE)', period: '' },
];

/**
 * Language-style dot colors for tech chips (like GitHub's language colors).
 * Matching is by prefix, so "Laravel 12" uses the "Laravel" color.
 */
export const techColors = {
  Laravel: '#ff2d20',
  PHP: '#4f5d95',
  Vue: '#41b883',
  Nuxt: '#00dc82',
  React: '#61dafb',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  'Tailwind CSS': '#38bdf8',
  'Inertia.js': '#9553e9',
  MySQL: '#4479a1',
  SQLite: '#5aa0d6',
  MongoDB: '#47a248',
  Firebase: '#ffca28',
  WebSocket: '#a371f7',
  Webhooks: '#a371f7',
  'Gemini API': '#8e75ff',
  PWA: '#a855f7',
  SAP: '#0faaff',
  REST: '#58a6ff',
  RESTful: '#58a6ff',
  Queue: '#d29922',
  Queues: '#d29922',
  Artisan: '#ff2d20',
  Query: '#4479a1',
  Database: '#4479a1',
  Xero: '#13b5ea',
  Manatal: '#3fb950',
  Sprout: '#7ee787',
  Meilisearch: '#ff5caa',
  Typesense: '#d52f6d',
  Git: '#f05032',
  GitHub: '#e6edf3',
  GitLab: '#fc6d26',
  Postman: '#ff6c37',
  Claude: '#d97757',
  Codex: '#e6edf3',
};
