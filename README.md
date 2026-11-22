# LaundryKu

Web laundry kiloan — project demo / portfolio. Tanpa framework, tanpa backend, tanpa build step: buka `index.html` langsung jalan.

## Fitur

- **Landing page** — hero, cara order, layanan, daftar harga
- **Kalkulator harga** — pilih layanan kiloan + tambahan satuan, total dihitung otomatis (minimal 3 kg)
- **Order via WhatsApp** — form order diubah jadi pesan WhatsApp siap kirim
- **Lacak cucian** — masukkan kode order, tampil status + timeline. Kode demo: `LDR-1001` (selesai), `LDR-1002` (disetrika), `LDR-1003` (dicuci)
- **FAQ + kontak** — jam buka, alamat, WhatsApp
- Responsif, mobile-first

## Harga (contoh)

| Layanan | Harga |
| --- | --- |
| Cuci Kering | Rp7.000/kg |
| Cuci + Setrika | Rp10.000/kg |
| Setrika Saja | Rp6.000/kg |
| Express 6 Jam | Rp15.000/kg |
| Bed Cover / Selimut / Sepatu / Boneka | Rp15.000–30.000 |

## Cara pakai

1. Buka `index.html` di browser, atau deploy folder ini ke Vercel / Netlify / GitHub Pages.
2. **Penting sebelum dipakai beneran:** ganti nomor WhatsApp contoh di `script.js` (`WA_NUMBER`), alamat, dan harga di `index.html` + `script.js`.

## File

- `index.html` — struktur + konten
- `style.css` — semua styling
- `script.js` — kalkulator, order WA, lacak order (data demo di `DEMO_ORDERS`)
