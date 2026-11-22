// LaundryKu v2 — hero 3D
// Three.js: gelembung sabun melayang | Zdog: mesin cuci 3D | Flubber: blob morphing
// Semua library di-vendor lokal dari repo yang sudah di-install (assets/vendor/).
// Kalau WebGL / salah satu library gagal, halaman tetap jalan normal (try/catch + guard).
import * as THREE from 'three';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. Gelembung Three.js ---------- */
try {
  const canvas = document.getElementById('bubbles');
  const hero = canvas.closest('.hero');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 14;

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(5, 8, 6);
  scene.add(key);
  const fill = new THREE.PointLight(0x7dd3fc, 30, 40);
  fill.position.set(-6, -2, 4);
  scene.add(fill);

  const isMobile = window.innerWidth < 640;
  const COUNT = isMobile ? 18 : 34;
  const geo = new THREE.SphereGeometry(1, 24, 24);
  const bubbles = [];
  for (let i = 0; i < COUNT; i++) {
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xdff2ff, metalness: 0, roughness: 0.08,
      transparent: true, opacity: 0.32, clearcoat: 1, clearcoatRoughness: 0.15,
    });
    const b = new THREE.Mesh(geo, mat);
    const r = 0.25 + Math.random() * 0.65;
    b.scale.setScalar(r);
    b.position.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 5);
    b.userData = { r, speed: 0.15 + Math.random() * 0.35, phase: Math.random() * Math.PI * 2, x0: b.position.x };
    scene.add(b);
    bubbles.push(b);
  }

  let mx = 0, my = 0;
  window.addEventListener('pointermove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function resize() {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const clock = new THREE.Clock();
  function tick() {
    const t = clock.getElapsedTime();
    for (const b of bubbles) {
      const u = b.userData;
      b.position.y += u.speed * 0.016;
      b.position.x = u.x0 + Math.sin(t * 0.6 + u.phase) * 0.6;
      if (b.position.y > 7.5) b.position.y = -7.5;
    }
    camera.position.x += (mx * 0.8 - camera.position.x) * 0.03;
    camera.position.y += (-my * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    if (!reducedMotion) requestAnimationFrame(tick);
  }
  tick();
} catch (err) {
  console.warn('Three.js hero dimatikan:', err);
}

/* ---------- 2. Mesin cuci Zdog ---------- */
try {
  if (window.Zdog) {
    const illo = new Zdog.Illustration({
      element: '#washer', dragRotate: true,
      rotate: { x: -0.12, y: 0.25 }, zoom: 1.05,
    });
    const BLUE = '#0b57d0', BLUE_D = '#0842a0', WHITE = '#eef5ff', DARK = '#14202e', TEAL = '#00a8a8';

    // Badan mesin
    new Zdog.Box({ addTo: illo, width: 150, height: 170, depth: 96, stroke: false, color: BLUE, leftFace: BLUE_D, rightFace: BLUE_D, topFace: '#2f7fe8', bottomFace: BLUE_D });
    // Panel atas
    new Zdog.Box({ addTo: illo, width: 150, height: 26, depth: 96, stroke: false, color: WHITE, translate: { y: -72 } });
    // Tombol-tombol panel
    [-48, -28, -8].forEach((x) => {
      new Zdog.Cylinder({ addTo: illo, diameter: 13, length: 6, stroke: false, color: TEAL, rotate: { x: Math.PI / 2 }, translate: { x, y: -72, z: 50 } });
    });
    new Zdog.Box({ addTo: illo, width: 34, height: 12, depth: 4, stroke: false, color: DARK, translate: { x: 44, y: -72, z: 50 } });
    // Pintu bundar
    new Zdog.Cylinder({ addTo: illo, diameter: 96, length: 10, stroke: false, color: WHITE, rotate: { x: Math.PI / 2 }, translate: { y: 8, z: 50 } });
    new Zdog.Ellipse({ addTo: illo, diameter: 66, stroke: false, color: '#9fd8e8', translate: { y: 8, z: 56 } });
    new Zdog.Ellipse({ addTo: illo, diameter: 26, stroke: false, color: '#ffffff', translate: { x: -14, y: -8, z: 57 } });
    // Kaki
    [-62, 62].forEach((x) => {
      new Zdog.Box({ addTo: illo, width: 16, height: 12, depth: 80, stroke: false, color: DARK, translate: { x, y: 90 } });
    });
    // Gelembung kecil di atas mesin
    [[-70, -108, 0, 10], [60, -116, 10, 13], [20, -128, -6, 8]].forEach(([x, y, z, d]) => {
      new Zdog.Ellipse({ addTo: illo, diameter: d, stroke: false, color: '#bfe9ff', translate: { x, y, z } });
    });

    if (reducedMotion) {
      illo.updateRenderGraph();
    } else {
      let t = 0;
      (function animate() {
        t += 0.008;
        illo.rotate.y = 0.25 + Math.sin(t) * 0.18;
        illo.updateRenderGraph();
        requestAnimationFrame(animate);
      })();
    }
  }
} catch (err) {
  console.warn('Zdog dimatikan:', err);
}

/* ---------- 3. Blob morphing Flubber ---------- */
try {
  if (window.flubber) {
    const pathEl = document.getElementById('blob-path');
    const blobs = [
      'M200 30 C280 30 360 100 360 200 C360 300 290 370 200 370 C110 370 40 300 40 200 C40 100 120 30 200 30 Z',
      'M200 45 C300 20 375 120 355 205 C335 295 285 360 195 355 C105 350 30 290 45 195 C60 100 110 65 200 45 Z',
      'M200 25 C275 55 370 90 365 200 C360 305 300 375 200 365 C100 355 35 295 40 195 C45 95 125 0 200 25 Z',
    ];
    let i = 0;
    if (reducedMotion) {
      pathEl.setAttribute('d', blobs[0]);
    } else {
      (function morph() {
        const from = blobs[i % blobs.length];
        const to = blobs[(i + 1) % blobs.length];
        const interp = flubber.interpolate(from, to, { maxSegmentLength: 8 });
        const start = performance.now(), dur = 2600;
        (function frame(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          pathEl.setAttribute('d', interp(eased));
          if (p < 1) requestAnimationFrame(frame);
          else { i++; setTimeout(morph, 400); }
        })(start);
      })();
    }
  }
} catch (err) {
  console.warn('Flubber dimatikan:', err);
}
