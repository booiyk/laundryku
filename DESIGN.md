# LaundryKu — DESIGN.md (v8, 2026-11-28)

Dunia visual: **Kertas & Peta** — situs laundry delivery yang dibangun seperti dokumen
kerja yang rapi: kertas putih-hangat, tinta hitam, garis rambut, dan satu peta jalan
yang menggambar rutenya sendiri.

Pin user: **monokrom ketat** (hitam/putih/abu, tanpa warna lain). Dunia v8 ini
menggantikan "Apple hitam-putih" (v5). Kategori canon (laundry delivery) dikerjakan
penuh, bukan template SaaS dan bukan dekorasi Apple.

Arah awal: shot Dribbble "Laundry Delivery Website" (Nixtio) — split hero, objek besar
di kiri, panel peta dengan pin di kanan, tombol pil hitam. Terjemahan monokrom: peta
jadi peta jalan tinta di atas kertas, bukan peta pastel.

## Tokens

| Token | Nilai | Pakai |
| --- | --- | --- |
| `--ink` | `#0a0a0a` | teks, pil, garis tebal, band gelap |
| `--ink-2` | `#2a2a2a` | teks sekunder |
| `--mute` | `#6b6b6b` | teks kecil, label, catatan (5.3:1 di `--paper`) |
| `--paper` | `#faf9f6` | latar halaman |
| `--card` | `#ffffff` | kartu order, input saat fokus |
| `--fill` | `#f0efec` | input, panel hero kanan |
| `--line` | `#e4e3df` | hairline antar baris |
| `--line-2` | `#d3d2cc` | garis kontrol (stepper, tag) |

Tipografi: **Inter Tight** self-hosted (`assets/fonts/*.woff2`, variabel 400–700).
Display 600, tracking −0.035em; label uppercase 12px; angka `tabular-nums`.

## Struktur

- **Header** — sticky, kertas 92% + blur, hairline muncul saat scroll; wordmark +
  glyph gelembung SVG, nav (Layanan/Galeri/Lacak/FAQ), pil hitam "Order sekarang".
- **Hero** — bingkai dua kolom di dalam border + radius 26px, tinggi
  `clamp(600px, 82vh, 780px)`:
  - Kiri: lede, objek mesin cuci **Zdog** monokrom (drag-rotate) sebagai fokus,
    H1 3.75rem, subteks, baris bukti "Minimal 3 kg · 6 jam · gratis < 3 km".
  - Kanan: panel `--fill`, isi **band peta** (rasio 960×340, ±235px tinggi) di atas
    **kartu order** selebar panel. Peta: blok abu, jalan diagonal, label wilayah
    (KESAMBI, KEJAKSAN, LEMAHWUNGKUK, HARJAMUKTI), pin rumah → outlet → rumah.
  - Kartu order: layanan + berat, tambahan satuan (stepper 2×2), nama / antar-jemput /
    alamat, total besar di baris sendiri, pil hitam full-width, catatan pembayaran.
- **Layanan & harga** — dua kolom daftar harga (per kilo / per satuan), hairline, baris
  pertama bergaris tinta; harga rata kanan `tabular-nums`; tag "paling laris".
- **Cara pesan** — 3 langkah, garis tinta di atas tiap kolom, nomor kecil.
- **Galeri** — 3 foto 4:5 `grayscale(1)`, caption nama + keterangan.
- **Lacak** — band tinta penuh: input kode uppercase, timeline 4 langkah, panel hasil.
- **Tentang + testimoni** — dua kolom; testimoni kutipan dengan garis kiri.
- **FAQ** — `details/summary`, hairline, tanda + berputar saat buka.
- **CTA** — band tinta, H2 + pil kertas.
- **Footer** — 3 kolom (alamat/jam, kontak, halaman) + baris legal catatan demo.

## Gerak

Satu momen yang dikarang: **rute peta menggambar dirinya** (`stroke-dashoffset` dari
`getTotalLength()`), pin muncul berurutan 0.2s / 1.4s / 2.5s. Tidak ada entrance
seragam per section. Semua mati total di `prefers-reduced-motion`.

## Aturan

- Monokrom ketat: tak ada hue di luar abu netral; foto dikunci `grayscale(1)`.
- Tanpa eyebrow di atas heading, tanpa marquee. Gelembung Three.js dihapus v8 bersama
  `three.core.js` / `three.module.js`; hanya Zdog yang tersisa (297KB).
- Ikon digambar sebagai SVG (glyph gelembung, pin, rumah, mesin cuci), bukan emoji.
- Objek 3D memakai palet tinta: bodi `#f2f1ed`, panel `#0a0a0a`, tombol `#6b6b6b`.
- Fokus keyboard `:focus-visible` ring 2px tinta offset 3px; ada skip link ke form;
  stepper punya `aria-label` dan nilai `aria-live`.
- Cache-busting `?v=X.Y` untuk CSS/JS — naikkan tiap aset berubah (pelajaran v4.2:
  HTML baru + CSS/JS lama dari cache = tampilan campur, bukan deploy gagal). Setelah
  push, Pages butuh 1–3 menit propagasi; verifikasi isi, bukan status 200.

## Catatan detektor (v8, `impeccable detect --changed`)

- `overused-font` ×3: model menghitung deklarasi `font-family`, termasuk dua blok
  `@font-face`. Satu keluarga self-hosted bukan pelanggaran; false positive.
- `cramped-padding` ×5 pada `.band`, `.track`, `.quotes`: model statis membaca CSS
  tanpa menghitung padding. Terukur di DOM: `.band` padding 112px atas/bawah,
  `.track` 104px, `.quotes` padding-left 30px dan 4px atas/bawah.
- Temuan nyata sudah diperbaiki: kontras placeholder 4.49:1 → `#605e59` (≥4.5),
  label 10.88px → 12px, tag 9.92px → 12px, placeholder lacak → `#9c988e`.

## Riwayat

v3 "Porthole & Foam" (teal, Bricolage) → v4 Apple hitam-putih → v5 A+C (hero dramatis,
Zdog besar, tile promo) → v5.1 header sembunyi → **v8 Kertas & Peta** (bingkai hero dua
kolom, peta rute, daftar harga menu, font self-hosted, three.js dibuang).