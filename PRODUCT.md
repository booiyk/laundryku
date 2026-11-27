# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML + CSS + vanilla JS, tanpa build step, tanpa backend. Three.js (vendor, lokal) untuk objek 3D hero, Zdog juga masih di-vendor. Deploy: GitHub Pages (https://booiyk.github.io/laundryku/), riwayat juga pernah dipertimbangkan Vercel.

## Users

Pemilik/operator laundry kiloan kecil di kota tier-2 (demo: Cirebon) dan calon pelanggannya — pekerja kantoran dan rumah tangga yang butuh cucian selesai cepat dan bisa dipantau tanpa menelepon. Situs dipakai sebagai portofolio/demo, jadi penonton kedua adalah calon klien yang menilai kualitas pengerjaan web.

## Product Purpose

Landing page satu halaman untuk laundry kiloan: menjelaskan layanan dan harga, menghitung estimasi total, mengirim order lewat WhatsApp, dan melacak status cucian dengan kode order. Sukses = pengunjung paham harga dalam <10 detik lalu menekan "Order via WhatsApp" atau mengecek kode lacak tanpa bantuan.

## Positioning

Bukan SaaS, bukan agregator: satu outlet laundry yang tampil seperti merek yang bisa dipercaya, dengan harga terbuka, minimal order jelas, dan status cucian transparan — hal yang biasanya hanya dijawab lewat chat.

## Operating Context

Dipakai di ponsel, sering sambil berdiri/ di jalan, koneksi tidak selalu cepat. Order sungguhan berlanjut di WhatsApp. Halaman dibuka langsung dari link (file statis), tanpa login.

## Capabilities and Constraints

Fitur yang harus tetap ada: daftar layanan + harga, tabel harga, kalkulator (kiloan minimal 3 kg + tambahan satuan dengan stepper), form order → pesan WhatsApp, lacak order (kode demo LDR-1001/1002/1003), FAQ, CTA WhatsApp mengambang, galeri hasil cucian.
Batasan: tidak ada backend, nomor WA masih contoh (`WA_NUMBER` di script.js), alamat & harga contoh, semua data demo. Cache-busting `?v=` wajib dinaikkan setiap aset berubah (GitHub Pages + cache browser pernah bikin tampilan campur).

## Brand Commitments

Nama: LaundryKu. Bahasa Indonesia, nada santai tapi tidak norak, kalimat pendek. Pin visual lama dari user: "seperti website Apple, warna hitam putih" — sedang diganti atas permintaan user (redesign).

## Evidence on Hand

`assets/gallery/{towels,shirts,sneakers}.jpg` (foto hasil generate, 1920x1280). Testimoni (Rina, Dimas, Sinta), harga, estimasi, alamat, nomor WA: semua fiktif/demo — jangan dianggap klaim nyata, dan jangan menambah klaim baru (pelanggan, angka, sertifikasi).

## Product Principles

- Harga dan estimasi terlihat sebelum orang harus bertanya.
- Satu aksi utama per layar: order lewat WhatsApp.
- Tampilan meyakinkan tanpa mengarang bukti.
- Cepat di ponsel, ringan, tanpa framework.

## Accessibility & Inclusion

Target WCAG AA untuk teks; navigasi keyboard untuk form, stepper, dan lacak order; hormati `prefers-reduced-motion` (animasi & 3D).