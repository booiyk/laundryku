// LaundryKu — kalkulator harga, order WA, lacak order (demo, tanpa backend)
// GANTI nomor ini dengan nomor WhatsApp laundry yang sebenarnya:
const WA_NUMBER = "6281234567890";

const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");

const serviceSelect = document.getElementById("f-service");
const weightInput = document.getElementById("f-weight");
const totalEl = document.getElementById("total");
const detailEl = document.getElementById("total-detail");

function calcTotal() {
  const pricePerKg = Number(serviceSelect.value);
  const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text.split(": ")[0];
  const weight = Math.max(3, Number(weightInput.value) || 3);
  let total = pricePerKg * weight;
  const addons = [];
  document.querySelectorAll(".addon-row").forEach((row) => {
    const qty = Number(row.dataset.qty || 0);
    if (qty > 0) {
      total += Number(row.dataset.price) * qty;
      addons.push(row.dataset.label + " \u00d7" + qty);
    }
  });
  totalEl.textContent = rupiah(total);
  detailEl.textContent =
    serviceName + " × " + weight + " kg" + (addons.length ? " + " + addons.join(", ") : "");
  return { total, serviceName, weight, addons };
}

[serviceSelect, weightInput].forEach((el) => el.addEventListener("input", calcTotal));
document.querySelectorAll(".step-btn").forEach((btn) => btn.addEventListener("click", () => {
  const row = btn.closest(".addon-row");
  let qty = Number(row.dataset.qty || 0) + Number(btn.dataset.step);
  qty = Math.max(0, Math.min(9, qty));
  row.dataset.qty = qty;
  row.querySelector(".step-qty").textContent = qty;
  row.querySelector('[data-step="-1"]').disabled = qty === 0;
  row.classList.toggle("active", qty > 0);
  calcTotal();
}));
calcTotal();

document.getElementById("order-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const { total, serviceName, weight, addons } = calcTotal();
  const name = document.getElementById("f-name").value.trim();
  const pickup = document.getElementById("f-pickup").value;
  const address = document.getElementById("f-address").value.trim();
  if (!name) {
    alert("Isi nama dulu ya.");
    return;
  }
  const lines = [
    "Halo LaundryKu, saya mau order:",
    "Nama: " + name,
    "Layanan: " + serviceName + " × " + weight + " kg",
  ];
  if (addons.length) lines.push("Tambahan: " + addons.join(", "));
  lines.push("Total estimasi: " + rupiah(total));
  lines.push(pickup === "jemput" ? "Antar-jemput: Dijemput kurir" : "Antar-jemput: Antar sendiri ke outlet");
  if (pickup === "jemput" && address) lines.push("Alamat jemput: " + address);
  const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
  window.open(url, "_blank");
});

// ---- Lacak order (data demo) ----
const DEMO_ORDERS = {
  "LDR-1001": { name: "Cuci + Setrika, 4 kg", total: 40000, status: "Selesai, bisa diambil / diantar", step: 4, eta: "Selesai hari ini, 15.00" },
  "LDR-1002": { name: "Cuci + Setrika, 5 kg", total: 50000, status: "Disetrika", step: 3, eta: "Estimasi selesai hari ini, 17.00" },
  "LDR-1003": { name: "Cuci Kering, 3 kg", total: 21000, status: "Dicuci", step: 2, eta: "Estimasi selesai besok, 10.00" },
};
const STEP_LABELS = ["Diterima", "Dicuci", "Disetrika", "Selesai"];

function showTrack(code) {
  const result = document.getElementById("track-result");
  const order = DEMO_ORDERS[code.toUpperCase().trim()];
  result.hidden = false;
  if (!order) {
    result.innerHTML =
      "<h3>Kode " + code.toUpperCase().trim() + " tidak ditemukan</h3>" +
      '<p class="muted">Cek lagi kode di strukmu. Untuk demo, coba <strong>LDR-1001</strong>, <strong>LDR-1002</strong>, atau <strong>LDR-1003</strong>.</p>';
    return;
  }
  const steps = STEP_LABELS.map((label, i) => {
    const cls = i < order.step - 1 ? "done" : i === order.step - 1 ? "active" : "";
    return '<span class="' + cls + '">' + label + "</span>";
  }).join("");
  result.innerHTML =
    "<h3>Order " + code.toUpperCase().trim() + "</h3>" +
    "<p class='muted'>" + order.name + " &bull; " + rupiah(order.total) + "</p>" +
    '<p class="status">' + order.status + "</p>" +
    '<div class="steps">' + steps + "</div>" +
    '<p class="muted" style="margin-top:12px">' + order.eta + "</p>";
}

document.getElementById("track-form").addEventListener("submit", (e) => {
  e.preventDefault();
  showTrack(document.getElementById("track-code").value);
});
document.querySelectorAll("[data-code]").forEach((btn) =>
  btn.addEventListener("click", () => {
    document.getElementById("track-code").value = btn.dataset.code;
    showTrack(btn.dataset.code);
    document.getElementById("track-result").scrollIntoView({ behavior: "smooth", block: "nearest" });
  })
);

// Reveal saat scroll (v5): konten muncul halus saat masuk viewport
(function () {
  document.documentElement.classList.add('js');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();

// Header v5.1: transparan di atas, gelap saat scroll, sembunyi saat scroll ke bawah,
// muncul lagi saat scroll ke atas
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var lastY = window.scrollY || 0;
  var ticking = false;
  function update() {
    var y = window.scrollY || 0;
    if (y > 10) { header.classList.add('scrolled'); } else { header.classList.remove('scrolled'); }
    if (y > lastY && y > 120) { header.classList.add('hidden'); }
    else if (y < lastY) { header.classList.remove('hidden'); }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
})();

// Scroll progress bar
(function () {
  var bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  function update() {
    var max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
  }
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
})();
