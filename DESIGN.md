# LaundryKu — DESIGN.md (v4, 2026-11-23)

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

## Struktur (v4)
- Navigasi: bar tipis fixed, blur (rgba(22,22,23,0.8) + backdrop blur 20px), link 12px.
- Hero hitam: headline kalimat 80px semibold ("Cucian bersih, wangi, selesai tepat waktu."),
  subhead abu, link teks "Hitung & order ›" / "Lacak cucian ›", harga "Mulai dari Rp7.000/kg.",
  mesin cuci Zdog besar di tengah di atas cahaya radial (product hero, drag-rotate),
  gelembung Three.js putih tipis (opacity 0.18).
- Cara order: 4 kolom minimal (label kecil "Langkah 1" + judul + teks abu).
- Layanan: baris hairline di #f5f5f7, nama 32px semibold, harga kanan.
- Harga: tabel minimal, header kecil uppercase abu, tanpa blok warna.
- Order: kartu putih di #f5f5f7, input abu tanpa border, tombol pil hitam.
- Lacak: input pil abu + tombol hitam, hasil di panel abu.
- FAQ: divider hairline, summary 21px semibold.
- Footer: small print 12px abu ala Apple, tanpa wordmark raksasa.

## Aturan
- Tanpa eyebrow di atas heading (ban Impeccable). Tanpa marquee. Tanpa blob.
- Link memakai warna teks + "›", bukan biru (dunia ini hitam-putih ketat).
- 3D monokrom: washer abu-putih (#f5f5f7, panel #1d1d1f, tombol #6e6e73),
  gelembung putih. Flubber tidak dipakai lagi (file dihapus dari repo).
- Riwayat: v3 "Porthole & Foam" (teal + kuning, Bricolage) diganti total oleh v4.
