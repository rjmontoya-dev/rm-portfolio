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

/**
 * Hero intro paragraphs. Wrap a phrase in [[double brackets]] to show it as a pill.
 */
export const intro = [
  "I'm a [[full-stack]] developer. I build production web services in [[Laravel]] & [[Vue]]: APIs, third-party integrations, admin systems and [[real-time dashboards]].",
  'Right now I build the weather monitoring platform at [[Mindoro State University]], and I ship my own products at [[found3r]]. I handle features end to end, from database design to deployment.',
];

/** Sidebar links. Each href points at a section id. */
export const nav = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Stats strip under the hero.
 * `count: 'projects'` shows the number of project cards below, so it stays in sync.
 */
export const stats = [
  { value: 3, suffix: '+', label: 'years experience' },
  { count: 'projects', label: 'production apps shipped' },
  { value: 'AI', label: 'automation & AI workflows' },
];

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
 * Project cards, shown as a fanned deck in this order.
 * `kind` is the solid pill at the top of the card; `tags` (optional) are the outline pills.
 * `icon` is the site's favicon (saved in public/images/projects); cards without
 * one show the first letter of the name.
 * `href` is the live site; the card shows its domain.
 */
export const projects = [
  {
    name: 'found3r',
    subtitle: 'Ideas in. Solutions out.',
    kind: 'Company site',
    icon: '/images/projects/found3r.png',
    description: 'Websites for businesses, hosting for projects, and software for teams.',
    tags: ['Laravel', 'Vue', 'Inertia.js'],
    href: 'https://found3r.co/',
  },
  {
    name: 't4p',
    subtitle: 'One tap. Your whole story.',
    kind: 'Product',
    icon: '/images/projects/t4p.png',
    description: 'A free personal page for your contacts, socials and work, opened with one tap from an NFC card.',
    tags: ['Laravel', 'Vue', 'Inertia.js'],
    href: 'https://t4p.site/',
  },
  {
    name: 'icr8',
    subtitle: 'Business websites, built on your phone',
    kind: 'Product',
    icon: '/images/projects/icr8.png',
    description: 'Websites for small businesses in the Philippines: pick your business type, add photos and prices, and share the link. No coding.',
    tags: ['Laravel', 'Vue', 'Inertia.js'],
    href: 'https://icr8.site/',
  },
  {
    name: 'r3view',
    subtitle: 'Pick your exam.',
    kind: 'Product',
    icon: '/images/projects/r3view.png',
    description: 'A civil service exam reviewer. Practice questions come in a feed, for the Professional and Subprofessional levels.',
    href: 'https://r3view.found3r.co/',
  },
  {
    name: 'Resort Park',
    subtitle: '3D virtual tour',
    kind: '3D experience',
    icon: '/images/projects/resort-park.svg',
    description: 'A 3D tour of a seaside resort. Guests walk or fly over the grounds, open any suite, villa or cabana, and book it.',
    href: 'https://3d-experience.found3r.co/',
  },
  {
    name: 'found3r portfolio',
    subtitle: 'Our work',
    kind: 'Showcase',
    icon: '/images/projects/found3r.png',
    description: 'An animated showcase of the live projects from the found3r team: the ones we built, and the ones we were part of.',
    href: 'https://portfolio.found3r.co/',
  },
  {
    name: 'Univers',
    subtitle: 'Shop the store. From your phone.',
    kind: 'Team project',
    icon: '/images/projects/univers.ico',
    description: 'An online shop and rewards program for a designer clothing store, with its own app on iOS and Android.',
    href: 'https://www.univers.ph/',
  },
  {
    name: "Nature's Spring",
    subtitle: 'Ordered online. Delivered.',
    kind: 'Team project',
    icon: '/images/projects/natures-spring.ico',
    description: 'A brand site and online shop for a Philippine bottled water maker.',
    href: 'https://naturespring.com.ph/',
  },
  {
    name: 'Project MOSES',
    subtitle: 'Real-time Weather Monitoring',
    kind: 'University R&D',
    icon: '/images/projects/project-moses.png',
    description: 'WebSocket streaming of live weather-station data, an admin system and a Gemini chatbot.',
    tags: ['Laravel', 'Vue', 'WebSocket', 'MongoDB'],
    href: 'https://projectmoses.minsu.edu.ph/',
  },
];

/** Stack, grouped. `key` is the small label beside each group. */
export const skills = [
  { key: 'backend', items: ['Laravel (v7–12)', 'PHP', 'RESTful APIs', 'Queue Management', 'Artisan Commands', 'WebSocket', 'Webhooks'] },
  { key: 'frontend', items: ['Vue 3', 'Nuxt 3', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Inertia.js'] },
  { key: 'databases', items: ['MySQL', 'SQLite', 'MongoDB', 'Firebase Realtime Database', 'Query Optimization', 'Database Design'] },
  { key: 'integrations', items: ['Xero', 'SAP ERP', 'Manatal', 'Sprout', 'Meilisearch', 'Typesense'] },
  { key: 'tools', items: ['Git', 'GitHub', 'GitLab', 'Postman', 'PWA'] },
  { key: 'devops', items: ['Ubuntu', 'Docker', 'CI/CD', 'Deployment'] },
  { key: 'automation & ai', items: ['n8n', 'Claude Code', 'Codex'] },
];

export const education = [
  { title: 'BS in Information Technology', org: 'Mindoro State University', period: '2018 – 2022' },
  { title: 'Java Programming NC III', org: 'TESDA', period: 'Mar – Apr 2023' },
  { title: 'Civil Service Eligibility', org: 'Honor Graduate Eligibility (HGE)', period: '' },
];
