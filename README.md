# LaundryKu

Web laundry kiloan Cirebon — project demo / portfolio. Tanpa framework, tanpa backend,
tanpa build step: buka `index.html` langsung jalan.

Live: https://booiyk.github.io/laundryku/

## Fitur

- **Landing satu halaman** — hero (objek mesin cuci 3D yang bisa diputar), peta rute
  antar-jemput, daftar layanan & harga, cara pesan, galeri hasil cucian, FAQ.
- **Kalkulator langsung di hero** — pilih layanan kiloan + tambahan satuan (stepper),
  total dihitung otomatis (minimal 3 kg).
- **Order via WhatsApp** — form order diubah jadi pesan WhatsApp siap kirim.
- **Lacak cucian** — masukkan kode order, tampil status + timeline.
  Kode demo: `LDR-1001` (selesai), `LDR-1002` (disetrika), `LDR-1003` (dicuci).
- Responsif mobile-first, keyboard-friendly, hormati `prefers-reduced-motion`.

## Harga (contoh)

| Layanan | Harga | Estimasi |
| --- | --- | --- |
| Cuci Kering | Rp7.000/kg | 1 hari |
| Cuci + Setrika | Rp10.000/kg | 1 hari |
| Setrika Saja | Rp6.000/kg | 1 hari |
| Express 6 Jam | Rp15.000/kg | 6 jam |
| Bed Cover / Selimut / Sepatu / Boneka | Rp15.000–30.000 | 1–2 hari |
| Antar-jemput < 3 km | gratis | — |

## Struktur file

```
index.html            struktur + konten (peta SVG inline di hero)
style.css             semua styling, token di :root
script.js             kalkulator, order WA, lacak order (data demo di DEMO_ORDERS)
hero-3d.js            objek mesin cuci Zdog (modul ES)
assets/fonts/         Inter Tight variable woff2 (latin + latin-ext)
assets/gallery/       3 foto hasil cucian (1920x1280)
assets/vendor/        zdog.dist.min.js (satu-satunya dependency, di-vendor lokal)
PRODUCT.md            kebenaran produk: pengguna, tujuan, batasan, data demo
DESIGN.md             dunia visual, token, aturan, catatan detektor
```

## Sebelum dipakai beneran

1. Ganti nomor WhatsApp contoh di `script.js` (`WA_NUMBER`) **dan** dua tautan
   `wa.me/6281234567890` di `index.html` (tombol kontak di bagian Tentang & footer).
2. Ganti alamat, jam buka, harga (di `index.html` + `script.js`), dan `DEMO_ORDERS`.
3. Naikkan `?v=` pada `style.css`, `script.js`, `hero-3d.js` tiap kali file itu berubah,
   supaya browser tidak memakai versi lama.

## Deploy

Folder ini statis. Push ke `main` → GitHub Pages menyegarkan sendiri (1–3 menit).
Alternatif: Vercel / Netlify, tanpa konfigurasi tambahan.