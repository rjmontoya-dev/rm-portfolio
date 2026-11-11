/**
 * config.js — tweakable knobs for the 3D scene and the animations.
 *
 * Text content lives in content.js; colors for the CSS live in styles.css (@theme).
 * The THEME values here are only used by the WebGL scene, so keep them in sync
 * with the CSS tokens if you change the palette.
 */

/** Colors used by the Three.js scene (GitHub dark palette). */
export const THEME = {
  green: '#3fb950',
  blue: '#58a6ff',
  purple: '#a371f7',
};

/** Three.js "data network" scene. */
export const SCENE = {
  /** Number of network nodes around the core. Mobile gets the lighter count. */
  nodeCount: { desktop: 140, mobile: 56 },
  /** How many "API request" light pulses travel along the lines at once. */
  pulseCount: { desktop: 22, mobile: 8 },
  /** Base rotation speed of the whole network, in radians per second. */
  rotationSpeed: 0.05,
  /** Pulse travel speed, in world units per second. */
  pulseSpeed: 1.1,
  /** Opacity of the connection lines (keep low so text stays readable). */
  lineOpacity: 0.16,
  /** How much the scene dims once you scroll past the hero (0 = never, 1 = fully). */
  scrollDim: 0.5,
  /** Strength of the mouse parallax (camera offset in world units). */
  parallax: 0.6,
  /** Device-pixel-ratio cap (desktop). Mobile is capped at 1.5. */
  maxPixelRatio: 2,
  /** Frame-rate cap on mobile to save battery. */
  mobileFps: 30,
  /** Inner and outer radius of the shell the nodes are scattered in. */
  shellRadius: [2.2, 3.6],
  /** Each node links to its N nearest neighbours. */
  neighbors: 2,
  /** Ignore links longer than this (world units). */
  maxLinkLength: 1.9,
  /** Seed for node placement, so the layout is identical on every load. */
  seed: 1117,
};

/** GSAP animation defaults. */
export const ANIM = {
  ease: 'power3.out',
  headingEase: 'expo.out',
  /** Default tween duration in seconds (keep within 0.6–1.0). */
  duration: 0.8,
  /** Delay between characters in the hero name reveal. */
  charStagger: 0.03,
  /** Seconds per character in the role typewriter. */
  typeSpeed: 0.055,
  /** How long each role stays on screen before it is erased. */
  roleHold: 1.8,
};

/** Decorative contribution-style heatmap (seeded random data, not real stats). */
export const HEATMAP = {
  seed: 20250812,
  weeks: 53,
};
