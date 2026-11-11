/**
 * scene.js — the Three.js "data network" background.
 *
 * A slowly rotating low-poly wireframe core, surrounded by glowing nodes that are
 * linked to their nearest neighbours. Light pulses hop along the links like API
 * requests / live data. Mouse = gentle camera parallax; scroll = rotation + drift.
 *
 * Loaded lazily from main.js. Returns null if WebGL is unavailable so the caller
 * can fall back to the static CSS gradient.
 */
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  Vector3,
  WebGLRenderer,
  WireframeGeometry,
} from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCENE, THEME } from './config.js';
import { mulberry32 } from './utils/random.js';

gsap.registerPlugin(ScrollTrigger);

/** Soft round sprite used for node halos and pulses. */
function glowTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.22, 'rgba(255,255,255,0.6)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ reducedMotion?: boolean }} options
 * @returns {{ start(): void, stop(): void } | null}
 */
export function initScene(canvas, { reducedMotion = false } = {}) {
  const mobile = window.matchMedia('(max-width: 767px)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;

  /* ---------------------------------------------------------- renderer */
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: !mobile, powerPreference: 'low-power' });
  } catch {
    return null; // No WebGL → caller shows the static gradient.
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : SCENE.maxPixelRatio));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 100);
  const baseZ = mobile ? 10.5 : 8.5;
  camera.position.set(0, 0, baseZ);

  const rand = mulberry32(SCENE.seed);
  const green = new Color(THEME.green);
  const blue = new Color(THEME.blue);
  const purple = new Color(THEME.purple);
  const sprite = glowTexture();

  const world = new Group();
  scene.add(world);

  /* -------------------------------------------------- wireframe core */
  const core = new LineSegments(
    new WireframeGeometry(new IcosahedronGeometry(1.25, 1)),
    new LineBasicMaterial({ color: green, transparent: true, opacity: 0.32, depthWrite: false })
  );
  const innerCore = new LineSegments(
    new WireframeGeometry(new IcosahedronGeometry(0.62, 0)),
    new LineBasicMaterial({ color: blue, transparent: true, opacity: 0.35, depthWrite: false })
  );
  world.add(core, innerCore);

  /* ----------------------------------------------------------- nodes */
  const count = mobile ? SCENE.nodeCount.mobile : SCENE.nodeCount.desktop;
  const nodes = [];
  const nodeColors = [];
  for (let i = 0; i < count; i++) {
    // Uniform direction on a sphere, radius inside the shell, slightly flattened.
    const u = rand() * 2 - 1;
    const phi = rand() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const r = MathUtils.lerp(SCENE.shellRadius[0], SCENE.shellRadius[1], Math.pow(rand(), 0.8));
    nodes.push(new Vector3(s * Math.cos(phi) * r, u * r * 0.8, s * Math.sin(phi) * r));
    nodeColors.push(rand() < 0.6 ? green : blue);
  }

  // Instanced spheres: one draw call for every node.
  const nodeMesh = new InstancedMesh(
    new IcosahedronGeometry(1, 1),
    new MeshBasicMaterial({ transparent: true, opacity: 0.95 }),
    count
  );
  const dummy = new Object3D();
  nodes.forEach((p, i) => {
    dummy.position.copy(p);
    dummy.scale.setScalar(0.026 + rand() * 0.028);
    dummy.updateMatrix();
    nodeMesh.setMatrixAt(i, dummy.matrix);
    nodeMesh.setColorAt(i, nodeColors[i]);
  });
  nodeMesh.instanceMatrix.needsUpdate = true;
  if (nodeMesh.instanceColor) nodeMesh.instanceColor.needsUpdate = true;
  world.add(nodeMesh);

  // Soft halo around each node.
  const haloPos = new Float32Array(count * 3);
  const haloCol = new Float32Array(count * 3);
  nodes.forEach((p, i) => {
    p.toArray(haloPos, i * 3);
    nodeColors[i].toArray(haloCol, i * 3);
  });
  const haloGeo = new BufferGeometry();
  haloGeo.setAttribute('position', new BufferAttribute(haloPos, 3));
  haloGeo.setAttribute('color', new BufferAttribute(haloCol, 3));
  const halos = new Points(
    haloGeo,
    new PointsMaterial({
      size: 0.3,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: AdditiveBlending,
    })
  );
  world.add(halos);

  /* ----------------------------------------------------------- links */
  const edges = [];
  const adjacency = nodes.map(() => []);
  const seen = new Set();
  const maxLen2 = SCENE.maxLinkLength ** 2;
  for (let i = 0; i < count; i++) {
    const nearest = [];
    for (let j = 0; j < count; j++) {
      if (j !== i) nearest.push([nodes[i].distanceToSquared(nodes[j]), j]);
    }
    nearest.sort((a, b) => a[0] - b[0]);
    for (let k = 0; k < SCENE.neighbors && k < nearest.length; k++) {
      const [d2, j] = nearest[k];
      const key = i < j ? `${i}:${j}` : `${j}:${i}`;
      if (d2 > maxLen2 || seen.has(key)) continue;
      seen.add(key);
      edges.push({ a: i, b: j, len: Math.sqrt(d2) });
      adjacency[i].push(edges.length - 1);
      adjacency[j].push(edges.length - 1);
    }
  }

  const linePos = new Float32Array(edges.length * 6);
  const lineCol = new Float32Array(edges.length * 6);
  edges.forEach((e, i) => {
    nodes[e.a].toArray(linePos, i * 6);
    nodes[e.b].toArray(linePos, i * 6 + 3);
    nodeColors[e.a].toArray(lineCol, i * 6);
    nodeColors[e.b].toArray(lineCol, i * 6 + 3);
  });
  const lineGeo = new BufferGeometry();
  lineGeo.setAttribute('position', new BufferAttribute(linePos, 3));
  lineGeo.setAttribute('color', new BufferAttribute(lineCol, 3));
  world.add(
    new LineSegments(
      lineGeo,
      new LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: SCENE.lineOpacity,
        depthWrite: false,
        blending: AdditiveBlending,
      })
    )
  );

  /* ---------------------------------------------------------- pulses */
  const pulseCount = edges.length ? (mobile ? SCENE.pulseCount.mobile : SCENE.pulseCount.desktop) : 0;
  const pulsePos = new Float32Array(pulseCount * 3);
  const pulseCol = new Float32Array(pulseCount * 3);
  const palette = [green, green, blue, purple];
  const pulses = Array.from({ length: pulseCount }, () => ({
    edge: Math.floor(rand() * edges.length),
    forward: rand() < 0.5,
    t: 0,
    delay: rand() * 3,
    color: palette[Math.floor(rand() * palette.length)],
  }));
  const pulseGeo = new BufferGeometry();
  const pulsePosAttr = new BufferAttribute(pulsePos, 3);
  const pulseColAttr = new BufferAttribute(pulseCol, 3);
  pulseGeo.setAttribute('position', pulsePosAttr);
  pulseGeo.setAttribute('color', pulseColAttr);
  world.add(
    new Points(
      pulseGeo,
      new PointsMaterial({
        size: 0.34,
        map: sprite,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
      })
    )
  );

  const tmp = new Vector3();
  /** Move every pulse along its link; on arrival hop to a neighbouring link or rest. */
  function updatePulses(dt) {
    for (let i = 0; i < pulseCount; i++) {
      const p = pulses[i];
      let intensity = 0;
      if (p.delay > 0) {
        p.delay -= dt;
      } else {
        const e = edges[p.edge];
        p.t += (dt * SCENE.pulseSpeed) / e.len;
        if (p.t >= 1) {
          const arrived = p.forward ? e.b : e.a;
          const options = adjacency[arrived].filter((idx) => idx !== p.edge);
          if (options.length && Math.random() < 0.7) {
            // Keep travelling through the network like a request being routed.
            p.edge = options[Math.floor(Math.random() * options.length)];
            p.forward = edges[p.edge].a === arrived;
          } else {
            // Rest for a moment, then start somewhere else ("occasional" pulses).
            p.edge = Math.floor(Math.random() * edges.length);
            p.forward = Math.random() < 0.5;
            p.delay = 0.4 + Math.random() * 2.6;
          }
          p.t = 0;
        } else {
          const from = nodes[p.forward ? e.a : e.b];
          const to = nodes[p.forward ? e.b : e.a];
          tmp.lerpVectors(from, to, p.t).toArray(pulsePos, i * 3);
          intensity = Math.pow(Math.sin(p.t * Math.PI), 0.6);
        }
      }
      // Additive blending: black = invisible, so intensity fades pulses in/out.
      pulseCol[i * 3] = p.color.r * intensity;
      pulseCol[i * 3 + 1] = p.color.g * intensity;
      pulseCol[i * 3 + 2] = p.color.b * intensity;
    }
    pulsePosAttr.needsUpdate = true;
    pulseColAttr.needsUpdate = true;
  }

  // Remember every material's base opacity so the scene can dim below the hero.
  const fadeable = [];
  world.traverse((obj) => {
    if (obj.material) fadeable.push([obj.material, obj.material.opacity]);
  });
  let lastDim = 1;
  function applyDim(dim) {
    if (Math.abs(dim - lastDim) < 0.005) return;
    lastDim = dim;
    fadeable.forEach(([mat, base]) => (mat.opacity = base * dim));
  }

  /* --------------------------------------------------- layout & input */
  let width = 0;
  let height = 0;
  let baseX = 0;
  function resize(force = false) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // On touch devices, ignore small height changes from the address bar
    // showing/hiding while scrolling (avoids jank). Desktop resizes always apply.
    if (!force && w === width && (h === height || (coarse && Math.abs(h - height) < 120))) return;
    width = w;
    height = h;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Sit to the right of the hero text on wide screens, centred on small ones.
    baseX = w >= 1024 ? 2.3 : w >= 768 ? 1.3 : 0;
    world.scale.setScalar(w < 768 ? 0.85 : 1);
    if (!running) renderFrame(0);
  }

  const pointer = { x: 0, y: 0 };
  if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener(
      'pointermove',
      (e) => {
        pointer.x = (e.clientX / width) * 2 - 1;
        pointer.y = (e.clientY / height) * 2 - 1;
      },
      { passive: true }
    );
  }

  // Scroll progress (0 → 1 over the whole page), smoothed by ScrollTrigger scrub.
  const scroll = { p: 0 };
  // Page progress used only for dimming; also tracked under reduced motion,
  // where the scene is a still frame but should still dim behind the content.
  const dimState = { p: 0 };
  if (!reducedMotion) {
    gsap.to(scroll, {
      p: 1,
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.2 },
    });
  }

  /* ------------------------------------------------------------ loop */
  let elapsed = 0;
  function renderFrame(dt) {
    elapsed += dt;
    const s = scroll.p;
    const spin = SCENE.rotationSpeed;

    world.rotation.y = elapsed * spin + s * Math.PI * 1.1;
    world.rotation.x = 0.2 + Math.sin(elapsed * 0.12) * 0.05 + s * 0.35;
    world.position.x = baseX * Math.cos(s * Math.PI); // drifts right → left as you scroll
    core.rotation.y = -elapsed * spin * 1.6;
    core.rotation.z = elapsed * spin * 0.5;
    innerCore.rotation.x = elapsed * spin * 2.2;

    // Camera parallax (lerp toward the pointer) and a slow dolly-out with scroll.
    camera.position.x += (pointer.x * SCENE.parallax - camera.position.x) * 0.04;
    camera.position.y += (-pointer.y * SCENE.parallax * 0.6 - camera.position.y) * 0.04;
    camera.position.z = baseZ + s * 1.6;
    camera.lookAt(0, 0, 0);

    // Full strength in the hero, dimmer behind the content further down.
    const dimP = reducedMotion ? dimState.p : s;
    applyDim(1 - SCENE.scrollDim * MathUtils.smoothstep(dimP, 0.02, 0.14));

    updatePulses(dt);
    renderer.render(scene, camera);
  }

  let raf = 0;
  let running = false;
  let lost = false;
  let last = 0;
  const minFrame = mobile ? 1000 / SCENE.mobileFps : 0;
  function tick(now) {
    raf = requestAnimationFrame(tick);
    if (now - last < minFrame) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    renderFrame(dt);
  }
  function start() {
    if (running || reducedMotion || lost) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  // Pause when the tab is hidden; resume when it comes back.
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    lost = true;
    stop();
    document.documentElement.classList.add('no-webgl');
  });

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => resize(), 150);
  });

  resize(true);

  if (reducedMotion) {
    // One static frame: place a few pulses mid-link so the still image has some light.
    pulses.forEach((p) => {
      p.delay = 0;
      p.t = 0.3 + Math.random() * 0.4;
    });
    renderFrame(0);
    // Re-render the still frame (dim only, no motion) as the page scrolls.
    let pending = false;
    window.addEventListener(
      'scroll',
      () => {
        if (pending || lost) return;
        pending = true;
        requestAnimationFrame(() => {
          pending = false;
          const max = document.documentElement.scrollHeight - window.innerHeight;
          dimState.p = max > 0 ? window.scrollY / max : 0;
          renderFrame(0);
        });
      },
      { passive: true }
    );
  } else {
    start();
  }

  canvas.classList.add('is-ready');
  return { start, stop };
}
