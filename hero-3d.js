// LaundryKu v8 — objek hero: mesin cuci Zdog monokrom (drag untuk memutar)
// Zdog di-vendor lokal (assets/vendor/zdog.dist.min.js). Kalau gagal, halaman tetap jalan.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

try {
  if (window.Zdog) {
    const isMobile = window.innerWidth < 640;
    const illo = new Zdog.Illustration({
      element: "#washer", dragRotate: true,
      rotate: { x: -0.06, y: 0.3 }, zoom: isMobile ? 1.5 : 1.8,
    });
    const BODY = "#f2f1ed", BODY_D = "#dedcd6", WHITE = "#ffffff", DARK = "#0a0a0a", MID = "#6b6b6b";

    // Badan mesin
    new Zdog.Box({ addTo: illo, width: 150, height: 170, depth: 96, stroke: false, color: BODY, leftFace: BODY_D, rightFace: BODY_D, topFace: BODY_D, bottomFace: BODY_D });
    // Panel atas
    new Zdog.Box({ addTo: illo, width: 150, height: 26, depth: 96, stroke: false, color: DARK, translate: { y: -72 } });
    // Tombol panel
    [-48, -28, -8].forEach((x) => {
      new Zdog.Cylinder({ addTo: illo, diameter: 13, length: 6, stroke: false, color: MID, rotate: { x: Math.PI / 2 }, translate: { x, y: -72, z: 50 } });
    });
    new Zdog.Box({ addTo: illo, width: 34, height: 12, depth: 4, stroke: false, color: WHITE, translate: { x: 44, y: -72, z: 50 } });
    // Pintu bundar
    new Zdog.Cylinder({ addTo: illo, diameter: 96, length: 10, stroke: false, color: WHITE, rotate: { x: Math.PI / 2 }, translate: { y: 8, z: 50 } });
    new Zdog.Ellipse({ addTo: illo, diameter: 66, stroke: 3, color: DARK, translate: { y: 8, z: 56 } });
    new Zdog.Ellipse({ addTo: illo, diameter: 26, stroke: false, color: "#f2f1ed", translate: { x: -14, y: -8, z: 57 } });
    // Kaki
    [-62, 62].forEach((x) => {
      new Zdog.Box({ addTo: illo, width: 16, height: 12, depth: 80, stroke: false, color: DARK, translate: { x, y: 90 } });
    });

    if (reducedMotion) {
      illo.updateRenderGraph();
    } else {
      let t = 0;
      (function animate() {
        t += 0.006;
        illo.rotate.y = 0.3 + Math.sin(t) * 0.09;
        illo.updateRenderGraph();
        requestAnimationFrame(animate);
      })();
    }
  }
} catch (err) {
  console.warn("Zdog dimatikan:", err);
}