# LaundryKu — DESIGN.md (v5, 2026-11-23)

Dunia visual: **Apple, hitam-putih** (pin user: "seperti website Apple, warna hitam putih").
Tipografi sistem (SF Pro di perangkat Apple, system sans di lainnya) — tanpa webfont.
Section bergantian hitam / putih / abu #f5f5f7. Tanpa warna lain.

## Tokens
- `--black: #000` (hero + footer gelap) / `--ink: #1d1d1f` (teks + tombol)
- `--gray: #6e6e73` (teks sekunder, 5.07 di putih / 4.66 di #f5f5f7)
- `--gray-light: #a1a1a6` (teks sekunder di hitam, 8.16)
- `--bg: #fff` / `--bg-gray: #f5f5f7` (section abu + input)
- `--line: rgba(0,0,0,0.12)` hairline / `--line-light: rgba(255,255,255,0.18)`

Kontras terverifikasi (WCAG): #6e6e73/putih 5.07, #a1a1a6/hitam 8.16,
#1d1d1f/#f5f5f7 15.46. Abu #86868b (3.62) dilarang untuk teks kecil.

## Struktur (v5 — A + C, user: "terlalu polos")
- Navigasi: bar tipis fixed full-width, blur (rgba(22,22,23,0.8) + backdrop blur 20px), link 12px.
- Hero hitam DRAMATIS: gradasi radial abu gelap (#262628 → #000), headline 96px semibold
  ("Cucian bersih, wangi, selesai tepat waktu."), subhead abu, link teks "Hitung & order ›" /
  "Lacak cucian ›", harga "Mulai dari Rp7.000/kg.", mesin cuci Zdog besar di tengah di atas
  cahaya radial lebih kuat, gelembung Three.js putih 40 buah (opacity 0.22).
- Tile promo 2 kolom (Apple): "Express 6 Jam." (hitam) + "Antar-Jemput Gratis." (abu).
- Cara order: 4 kolom minimal (judul "1. Order" dst + teks abu).
- Layanan: baris hairline di #f5f5f7, nama 32px semibold, harga kanan.
- Harga: tabel minimal, header kecil uppercase abu, tanpa blok warna.
- Galeri "Hasil cucian.": 3 foto hitam-putih (assets/gallery/towels.jpg, shirts.jpg,
  sneakers.jpg — hasil generate, 1920x1280, filter grayscale(1) sebagai pengaman).
- Testimoni "Kata mereka.": 3 kutipan fiktif demo (Rina, Dimas, Sinta).
- Order: kartu putih di #f5f5f7, input abu tanpa border, tombol pil hitam.
- Lacak: input pil abu + tombol hitam, hasil di panel abu.
- FAQ: divider hairline, summary 21px semibold.
- Footer: small print 12px abu ala Apple, tanpa wordmark raksasa.
- Reveal saat scroll: .reveal (opacity 0 → 1, translateY 24px → 0, 0.7s) via
  IntersectionObserver di script.js; hanya aktif kalau JS jalan (class .js di <html>),
  nonaktif total kalau prefers-reduced-motion.

## Aturan
- Tanpa eyebrow di atas heading (ban Impeccable). Tanpa marquee. Tanpa blob.
- Link memakai warna teks + "›", bukan biru (dunia ini hitam-putih ketat).
- 3D monokrom: washer abu-putih (#f5f5f7, panel #1d1d1f, tombol #6e6e73),
  gelembung putih. Flubber tidak dipakai lagi (file dihapus dari repo).
- Aset statis pakai cache-busting ?v=X.Y — naikkan tiap rombak besar (pelajaran v4.2:
  browser sempat memuat HTML baru + CSS/JS lama yang ke-cache; DOM baru + tampilan lama
  = cache CSS/JS, bukan deploy gagal). Setelah push, Pages butuh 1-3 menit propagasi;
  verifikasi isi, bukan cuma status 200.
- Riwayat: v3 "Porthole & Foam" (teal + kuning, Bricolage) → v4 Apple hitam-putih
  (commit ce1e4e8; header full-width c789438; cache-busting 450c27c) → v5 A+C.
