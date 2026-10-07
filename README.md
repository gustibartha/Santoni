# Petualangan Santoni

Game petualangan idle tentang Santoni si panda merah, dibangun dari desain Claude Design (`design/Petualangan Santoni.dc.html`) dengan React + Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil di dist/
```

## Simpan progress

Progress (koin, permata, item, rekor, jurnal, dan run/battle yang sedang berjalan) otomatis tersimpan di browser setiap 2 detik dan saat tab ditutup. Buka `?reset=1` untuk mulai dari awal. Progress tidak berpindah antar-perangkat atau antar-browser.

## Deploy

Hasil `npm run build` (folder `dist/`) adalah situs statis biasa:

- **Netlify Drop** (tanpa akun Git): `npm run build`, lalu seret folder `dist` ke https://app.netlify.com/drop.
- **Vercel / Netlify via GitHub**: push repo ke GitHub, import di dashboard. Build command `npm run build`, output directory `dist`.

## Struktur

- `src/game/data.js` — konten: skill, musuh, event, item, bab, toko.
- `src/game/Game.jsx` — state dan aturan game (tick 100 ms, run harian, battle otomatis, gacha, equipment). `buildView()` menghasilkan view model untuk layar.
- `src/game/effects.jsx` — efek animasi (parallax, angka damage, banner, kartu undian).
- `src/screens/` — satu komponen per layar/lapisan (Lobby, Run, SkillOffer, Battle, Hero, MapScreen, Shop, PullReveal, Result, Journal, Hud, NavBar, Toast).
- `src/characters/` — Santoni (6 pose) dan Musuh (7 jenis) sebagai SVG.
- `src/game/save.js` — simpan/muat progress (localStorage).
- `src/components/ImageSlot.jsx` — slot ilustrasi; klik atau seret gambar ke slot (tersimpan di browser).
- `design/` — file desain asli sebagai referensi.

## Parameter URL (untuk pengujian)

`?screen=lobby|run|skill|battle|hero|map|shop|result|gertak` · `?days=10|20|30` · `?gertak=0` · `?still=1` · `?reset=1`

`?screen=` dan `?still=1` adalah mode pratinjau dan tidak menyimpan progress.
