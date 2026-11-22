// LaundryKu v4 — hero 3D (monokrom, gaya Apple)
// Three.js: gelembung sabun melayang | Zdog: mesin cuci 3D
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
  const fill = new THREE.PointLight(0xffffff, 18, 40);
  fill.position.set(-6, -2, 4);
  scene.add(fill);

  const isMobile = window.innerWidth < 640;
  const COUNT = isMobile ? 18 : 34;
  const geo = new THREE.SphereGeometry(1, 24, 24);
  const bubbles = [];
  for (let i = 0; i < COUNT; i++) {
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, metalness: 0, roughness: 0.08,
      transparent: true, opacity: 0.22, clearcoat: 1, clearcoatRoughness: 0.15,
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
    const isMobileW = window.innerWidth < 640;
    const illo = new Zdog.Illustration({
      element: '#washer', dragRotate: true,
      rotate: { x: -0.06, y: 0.12 }, zoom: isMobileW ? 1.7 : 1.9,
    });
    const BLUE = '#f5f5f7', BLUE_D = '#d2d2d7', WHITE = '#ffffff', DARK = '#1d1d1f', TEAL = '#6e6e73';

    // Badan mesin
    new Zdog.Box({ addTo: illo, width: 150, height: 170, depth: 96, stroke: false, color: BLUE, leftFace: BLUE_D, rightFace: BLUE_D, topFace: '#2f7fe8', bottomFace: BLUE_D });
    // Panel atas
    new Zdog.Box({ addTo: illo, width: 150, height: 26, depth: 96, stroke: false, color: '#1d1d1f', translate: { y: -72 } });
    // Tombol-tombol panel
    [-48, -28, -8].forEach((x) => {
      new Zdog.Cylinder({ addTo: illo, diameter: 13, length: 6, stroke: false, color: TEAL, rotate: { x: Math.PI / 2 }, translate: { x, y: -72, z: 50 } });
    });
    new Zdog.Box({ addTo: illo, width: 34, height: 12, depth: 4, stroke: false, color: DARK, translate: { x: 44, y: -72, z: 50 } });
    // Pintu bundar
    new Zdog.Cylinder({ addTo: illo, diameter: 96, length: 10, stroke: false, color: WHITE, rotate: { x: Math.PI / 2 }, translate: { y: 8, z: 50 } });
    new Zdog.Ellipse({ addTo: illo, diameter: 66, stroke: false, color: '#d2d2d7', translate: { y: 8, z: 56 } });
    new Zdog.Ellipse({ addTo: illo, diameter: 26, stroke: false, color: '#ffffff', translate: { x: -14, y: -8, z: 57 } });
    // Kaki
    [-62, 62].forEach((x) => {
      new Zdog.Box({ addTo: illo, width: 16, height: 12, depth: 80, stroke: false, color: DARK, translate: { x, y: 90 } });
    });
    // Gelembung kecil di atas mesin
    [[-70, -108, 0, 10], [60, -116, 10, 13], [20, -128, -6, 8]].forEach(([x, y, z, d]) => {
      new Zdog.Ellipse({ addTo: illo, diameter: d, stroke: false, color: '#e8e8ed', translate: { x, y, z } });
    });

    if (reducedMotion) {
      illo.updateRenderGraph();
    } else {
      let t = 0;
      (function animate() {
        t += 0.008;
        illo.rotate.y = 0.12 + Math.sin(t) * 0.08;
        illo.updateRenderGraph();
        requestAnimationFrame(animate);
      })();
    }
  }
} catch (err) {
  console.warn('Zdog dimatikan:', err);
}
