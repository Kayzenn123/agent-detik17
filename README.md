# DETIK17 — Stopwatch Lomba 17-an RT

Satu lapangan risograph dua dunia untuk panitia lomba 17 Agustus: kiri **ARENA** (stopwatch presisi centisecond + pilih lomba), kanan **PAPAN SKOR** (klasemen RT + podium), dipisah garis miring yang bisa diseret. Suara Pak Juri: *"Waktu jalan, jangan bengong."*

**Live:** https://kayzenn123.github.io/agent-detik17/

## Fitur (semua beneran jalan, bukan mockup)
- **Stopwatch presisi** — centisecond (00:00,00), klik angka atau tekan Spasi untuk mulai/jeda, tombol Putaran + Ulang, shortcut L/R.
- **17 lomba 17-an** — panjat pinang, balap karung, makan kerupuk, tarik tambang, balap kelereng, balap bakiak, balap egrang, sepeda lambat, gebuk bantal, gigit koin, paku dalam botol, estafet air, joget balon, pindah karet, makan cabai, futsal sarung, cerdas cermat. Tiap lomba punya jenis ukur (tercepat / terlama / skor) + aturan singkat.
- **Catat hasil** — formulir karcis (lomba, RT 01–08, nama, waktu dari stopwatch atau skor), validasi dengan pesan Pak Juri, kartu hasil bisa di-flick untuk hapus.
- **Podium + klasemen otomatis** — juara 1/2/3 per lomba → poin klasemen RT (default 3-2-1, bisa diubah panitia di Pengaturan).
- **Persistence** — localStorage berversi (`detik17-v1`) + validasi skema, data bertahan setelah refresh.
- **Deep-link** — `?lomba=balap-karung` langsung memilih lomba.
- **Ekspor** — salin pengumuman WA, unduh JSON/CSV, hapus semua data (konfirmasi 2 langkah).
- **Easter egg** — ketik `dirgahayu` → stempel DIRGAHAYU RI KE-81.
- **Aksesibilitas** — skip link, divider split-screen bisa keyboard (←/→, Home/End, role=slider), tombol jeda marquee, toggle Gerak, mode ringan otomatis, prefers-reduced-motion dihormati.

## Identitas desain
- **Seed:** domain stopwatch lomba 17-an · layout split screen dua dunia · referensi risograph 2-3 warna · constraint layout miring 3-8° · font Charmonman / Noto Sans Lisu (variable) / Playwrite CO Guides · palet dark split-complementary hue 312 (magenta + limau + hijau).
- **Gerak:** A fly-through scroll (zoom+rotate) · B 3 marquee beda kecepatan + skew velocity · C kata jatuh-menumpuk + variable font weight scrub · D divider drag inertia + flick hapus · E curtain wipe · F dipangkas.
- **Ikon:** 14+ SVG solid blocky digambar sendiri (3+ custom: stopwatch, karung, kerupuk).

## Skor terukur (lokal, 2026-10-28)
- **Lighthouse mobile:** Performance 94, Accessibility 100, Best Practices 100, SEO 100 — LCP 2,2 dtk, CLS 0,032.
- **Lighthouse desktop:** 100 / 100 / 100 / 100 — LCP 0,6 dtk, CLS 0,044.
- **FPS CPU throttle 4x:** 60,4 (qa.js). **Tes fungsi Playwright:** 40/40 lulus (`test-fungsi.js`).
- **Kontras WCAG AA:** 10/10 pasangan token lolos (skrip oklch→sRGB mandiri; teks di bg 16,47:1, muted 7,88:1, tombol aksen 7,72:1).
- **Budget:** JS vendor 115 KB (GSAP + ScrollTrigger, self-host) + app ~32 KB; CSS 21 KB; font woff2 latin ~110 KB.

## Cara jalanin
Buka `index.html` lewat server statis apa saja, contoh: `python3 -m http.server` lalu buka `http://localhost:8000`. Tanpa build step, tanpa API key, tanpa tracker.

## Kredit & lisensi
- Font: Charmonman, Noto Sans Lisu, Playwrite CO Guides — SIL OFL, self-host dari Fontsource (jsDelivr).
- GSAP + ScrollTrigger — lisensi standar GSAP (gratis), self-host di `vendor/`.
- Ikon: SVG digambar sendiri, gaya solid blocky (inspirasi Bootstrap Icons, MIT).
- Data lomba: ringkasan umum dari sumber publik (dailytips.id, eraspace.com, Wikipedia "Panjat pinang"); aturan rinci tetap di tangan panitia. Sistem poin 3-2-1 = aturan panitia yang bisa diubah — tidak ada standar nasional baku untuk poin juara per lomba.
- Semua data hasil di situs berlabel CONTOH dan bisa dihapus sekali klik. Nama "DETIK17" tidak bertabrakan dengan produk yang sudah ada (cek 2026-10-28); tidak memakai logo/warna detikcom.
