# LaundryKu — DESIGN.md (v3, 2026-11-22)

Dunia visual: **Porthole & Foam**. Halaman direndam deep teal (air di dalam mesin),
foam putih, satu aksen kuning matahari. Motif: lingkaran jendela drum mesin cuci.
Tipografi: Bricolage Grotesque (display 800 uppercase + body).

## Tokens
- `--deep: #0a3542` (ground) / `--deep-2: #0d4254`
- `--foam: #f2faf8` (teks utama) / `--aqua: #bfe3de` (teks sekunder)
- `--sun: #ffc700` (satu-satunya aksen: harga, CTA, nomor langkah, marquee)
- `--paper: #fffdf5` (struk order + tabel harga) / `--ink: #0a3542`
- `--teal: #007a7a` (teks aman di atas krem/putih, kontras 4.84/5.17)

Kontras terverifikasi (WCAG): foam/teal 12.4, aqua/teal 9.5, kuning/teal 8.4,
tinta/kuning 8.4, tinta/krem 12.9.

## Struktur (v3)
- Header: pil melayang putih, logo + nav + tombol kuning.
- Hero: headline raksasa "CUCI. KERING. WANGI." (kuning + outline), porthole
  lingkaran berisi mesin cuci Zdog (drag-rotate), gelembung Three.js, blob Flubber kuning.
- Strip kuning miring: daftar layanan statis (tanpa animasi jalan).
- Cara order: garis waktu 4 nomor besar (01-04).
- Layanan: papan menu baris besar + harga kuning, bukan kartu.
- Harga: tabel di atas kertas krem.
- Order: form di dalam struk kertas (tepi bergerigi) dengan total besar.
- Lacak: input pil + panel hasil foam. FAQ: divider. Footer: wordmark raksasa outline.

## Aturan
- Tanpa eyebrow di atas heading (ban Impeccable).
- Tanpa kartu ikon-heading-teks seragam; layanan = papan menu.
- Kuning hanya untuk aksen/teks besar, jangan teks kecil di atas krem (1.5:1).
- Putih di atas teal mid (#128a7a) dilarang (4.25:1); pakai #007a7a.
