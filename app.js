/* DETIK17 — stopwatch lomba 17-an RT
   Satu file, tanpa build. Data tersimpan di localStorage (detik17-v1).
   Semua teks contoh berlabel CONTOH. Poin podium = aturan panitia (bisa diubah). */
'use strict';

/* ================= DATA ================= */
const RT_LIST = ['RT 01','RT 02','RT 03','RT 04','RT 05','RT 06','RT 07','RT 08'];

const LOMBA = [
  { id:'panjat-pinang',  nama:'Panjat Pinang',   kat:'Beregu',   ukur:'tercepat', ikon:'pinang',
    aturan:'Batang pinang 7–10 m dilumuri minyak sampai licin. Beregu 4–11 orang, yang sampai puncak mengambil hadiah.' },
  { id:'balap-karung',   nama:'Balap Karung',    kat:'Anak · Dewasa', ukur:'tercepat', ikon:'karung',
    aturan:'Masuk karung goni, lompat sampai garis finish. Jatuh boleh bangkit lagi — yang tercepat menang.' },
  { id:'makan-kerupuk',  nama:'Makan Kerupuk',  kat:'Anak',     ukur:'tercepat', ikon:'kerupuk',
    aturan:'Kerupuk digantung setinggi mulut. Tangan tidak boleh memegang — paling cepat habis menang.' },
  { id:'tarik-tambang',  nama:'Tarik Tambang',   kat:'Beregu',   ukur:'skor',     ikon:'tambang',
    aturan:'Dua regu tarik tali. Tanda tengah melewati garis lawan = menang satu ronde. Best of 3, skor = ronde menang.' },
  { id:'balap-kelereng', nama:'Balap Kelereng',  kat:'Anak',     ukur:'tercepat', ikon:'kelereng',
    aturan:'Kelereng di atas sendok, jalan sampai finish tanpa jatuh. Jatuh = ulang dari garis start.' },
  { id:'balap-bakiak',   nama:'Balap Bakiak',    kat:'Beregu',   ukur:'tercepat', ikon:'bakiak',
    aturan:'Satu bakiak panjang dipakai 3–5 orang. Langkah harus kompak — yang kompak sampai duluan.' },
  { id:'balap-egrang',   nama:'Balap Egrang',    kat:'Dewasa',   ukur:'tercepat', ikon:'egrang',
    aturan:'Jalan pakai egrang bambu sampai finish tanpa turun. Turun = kembali ke garis start.' },
  { id:'sepeda-lambat',  nama:'Sepeda Lambat',   kat:'Dewasa',   ukur:'terlama',  ikon:'sepeda',
    aturan:'Siapa paling lambat sampai finish tanpa turun dari sepeda, dia yang menang. Kaki menyentuh tanah = gugur.' },
  { id:'gebuk-bantal',   nama:'Gebuk Bantal',    kat:'Dewasa',   ukur:'skor',     ikon:'bantal',
    aturan:'Duduk di atas bambu, pukul lawan pakai bantal sampai jatuh. Poin = jumlah lawan yang dijatuhkan.' },
  { id:'gigit-koin',     nama:'Gigit Koin',      kat:'Anak',     ukur:'tercepat', ikon:'koin',
    aturan:'Koin di dalam pepaya berlumur oli. Gigit dan keluarkan tanpa tangan — paling cepat menang.' },
  { id:'paku-botol',     nama:'Paku dalam Botol',kat:'Anak',     ukur:'tercepat', ikon:'paku',
    aturan:'Paku diikat di pinggang, masukkan ke mulut botol tanpa tangan. Paling cepat masuk menang.' },
  { id:'estafet-air',    nama:'Estafet Air',     kat:'Beregu',   ukur:'tercepat', ikon:'air',
    aturan:'Estafet bawa air pakai spons. Tim tercepat memenuhi 1 liter di ember finish menang.' },
  { id:'joget-balon',    nama:'Joget Balon',     kat:'Campuran', ukur:'terlama',  ikon:'balon',
    aturan:'Balon dijepit berdua, joget sampai lagu berhenti. Balon jatuh = gugur. Pasangan paling lama bertahan menang.' },
  { id:'pindah-karet',   nama:'Pindah Karet',    kat:'Anak',     ukur:'tercepat', ikon:'sedotan',
    aturan:'Pindahkan karet pakai sedotan dari satu wadah ke wadah lain. Paling cepat pindah semua menang.' },
  { id:'makan-cabai',    nama:'Makan Cabai',     kat:'Dewasa',   ukur:'skor',     ikon:'cabai',
    aturan:'Makan cabai rawit sebanyak-banyaknya dalam 1 menit. Poin = jumlah cabai yang habis dimakan.' },
  { id:'futsal-sarung',  nama:'Futsal Sarung',   kat:'Beregu',   ukur:'skor',     ikon:'sarung',
    aturan:'Main futsal pakai sarung. Gol dihitung biasa. Menang = 2 poin, seri = 1, kalah = 0 (aturan panitia).' },
  { id:'cerdas-cermat',  nama:'Cerdas Cermat',   kat:'Campuran', ukur:'skor',     ikon:'buku',
    aturan:'Tanya jawab sejarah dan pengetahuan umum. Poin = jumlah jawaban benar. Salah tidak mengurangi.' },
];

const UKUR_LABEL = {
  tercepat: 'Dinilai: paling CEPAT menang — waktu dicatat dari stopwatch.',
  terlama: 'Dinilai: paling LAMA bertahan menang — waktu dicatat dari stopwatch.',
  skor: 'Dinilai: SKOR tertinggi menang — isi kolom skor, waktu dikosongkan.',
};

/* ================= IKON SVG (solid blocky, digambar sendiri) ================= */
const ICONS = {
  pinang: '<path d="M11 21V9h2v12zM6 8c2-3 4-4 6-4s4 1 6 4c-2 1-4 1.5-6 1.5S8 9 6 8z"/><circle cx="8" cy="5" r="2"/><circle cx="16" cy="5" r="2"/>',
  karung: '<path d="M8 3h8l1 4c2 1 3 3 3 6v7H4v-7c0-3 1-5 3-6z"/><path d="M9 7h6" stroke="var(--bg)" stroke-width="2"/>',
  kerupuk: '<circle cx="12" cy="13" r="8"/><circle cx="12" cy="13" r="3.5" fill="var(--bg)"/><path d="M12 2v3" stroke="currentColor" stroke-width="2.5"/>',
  tambang: '<path d="M4 5l14 14M20 5L6 19" stroke="currentColor" stroke-width="3.5" fill="none"/><circle cx="12" cy="12" r="3.5"/>',
  kelereng: '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="9" r="3" fill="var(--bg)"/>',
  bakiak: '<path d="M3 15h18v4H3zM5 11h14v3H5z"/><path d="M8 8h2v3H8zM14 8h2v3h-2z"/>',
  egrang: '<path d="M7 3h3v18H7zM14 3h3v18h-3zM4 12h9M14 15h7"/>',
  sepeda: '<circle cx="6" cy="17" r="4" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="18" cy="17" r="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M6 17l4-8h5l3 8M10 9l2 8" fill="none" stroke="currentColor" stroke-width="2.5"/>',
  bantal: '<rect x="3" y="8" width="18" height="10" rx="3"/><path d="M7 13h10" stroke="var(--bg)" stroke-width="2"/>',
  koin: '<circle cx="12" cy="12" r="9"/><path d="M12 7l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L6.2 11.2l4-.6z" fill="var(--bg)"/>',
  paku: '<path d="M9 3h6l-1 9h-4zM11 12h2v9h-2z"/><path d="M10 6h4" stroke="var(--bg)" stroke-width="2"/>',
  air: '<path d="M12 3s7 8 7 12a7 7 0 1 1-14 0c0-4 7-12 7-12z"/>',
  balon: '<ellipse cx="12" cy="9" rx="7" ry="8"/><path d="M12 17v5M12 22l-2 2M12 22l2 2" fill="none" stroke="currentColor" stroke-width="2"/>',
  sedotan: '<path d="M5 19L19 5" stroke="currentColor" stroke-width="3.5" fill="none"/><circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="16" r="2.5"/>',
  cabai: '<path d="M6 14C6 8 11 4 18 4c1 6-2 12-8 13-2 .3-4-1-4-3z"/><path d="M18 4c2-1 4-1 5 0" fill="none" stroke="currentColor" stroke-width="2"/>',
  sarung: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M5 8h14M5 16h14" stroke="var(--bg)" stroke-width="2"/>',
  buku: '<path d="M4 4h7v16H4zM13 4h7v16h-7z"/><path d="M6 8h3M15 8h3M6 12h3M15 12h3" stroke="var(--bg)" stroke-width="1.8"/>',
  stopwatch: '<circle cx="12" cy="14" r="8" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M12 10v4l3 2M9 2h6M12 2v4" fill="none" stroke="currentColor" stroke-width="2.5"/>',
  piala: '<path d="M6 3h12v5a6 6 0 0 1-12 0zM6 5H3v2a4 4 0 0 0 4 4M18 5h3v2a4 4 0 0 1-4 4M12 14v4M8 21h8M10 18h4" fill="none" stroke="currentColor" stroke-width="2"/>',
};
function icon(name, cls) {
  return '<svg class="' + (cls || 'lc-ic') + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + (ICONS[name] || ICONS.stopwatch) + '</svg>';
}

/* ================= STATE + STORAGE ================= */
const KEY = 'detik17-v1';
const DEFAULTS = { version: 1, results: [], points: { p1: 3, p2: 2, p3: 1 } };
let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULTS);
    const d = JSON.parse(raw);
    if (!d || d.version !== 1 || !Array.isArray(d.results) || !d.points) throw new Error('skema rusak');
    d.results = d.results.filter(r => r && typeof r.id === 'string' && LOMBA.some(l => l.id === r.lombaId) && RT_LIST.includes(r.rt) && typeof r.nama === 'string');
    d.points = { p1: num(d.points.p1, 3), p2: num(d.points.p2, 2), p3: num(d.points.p3, 1) };
    return d;
  } catch (e) {
    localStorage.removeItem(KEY);
    setTimeout(() => toast('Data lama rusak, Pak Juri — sudah dibersihkan, mulai dari nol ya.'), 600);
    return structuredClone(DEFAULTS);
  }
}
function num(v, fb) { const n = parseInt(v, 10); return Number.isFinite(n) && n >= 0 && n <= 99 ? n : fb; }
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage penuh — tetap jalan di memori */ } }

let selectedLomba = null;
let uid = () => 'h' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

/* ================= UTIL ================= */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function fmt(ms) {
  ms = Math.max(0, Math.round(ms));
  const cs = Math.floor(ms / 10) % 100, s = Math.floor(ms / 1000) % 60, m = Math.floor(ms / 60000);
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0') + ',' + String(cs).padStart(2, '0');
}
function parseWaktu(str) {
  const t = String(str || '').trim().replace('.', ',');
  if (!t) return null;
  const m = t.match(/^(?:(\d{1,2}):)?(\d{1,2})(?:,(\d{1,2}))?$/);
  if (!m) return null;
  const mm = parseInt(m[1] || '0', 10), ss = parseInt(m[2], 10), cs = parseInt((m[3] || '0').padEnd(2, '0'), 10);
  if (ss > 59 || mm > 59) return null;
  const total = ((mm * 60) + ss) * 1000 + cs * 10;
  return total > 0 ? total : null;
}
function toast(msg) {
  const el = $('#copy-ok'); el.textContent = msg; el.hidden = false;
  clearTimeout(toast._t); toast._t = setTimeout(() => { el.hidden = true; }, 4200);
}

/* ================= STOPWATCH ================= */
const sw = { running: false, startAt: 0, acc: 0, raf: 0, laps: [] };
const elDigits = $('#timer-digits'), elState = $('#timer-state'), elTimer = $('#timer');

function swElapsed() { return sw.running ? sw.acc + (performance.now() - sw.startAt) : sw.acc; }
function swRender() {
  const ms = swElapsed();
  elDigits.innerHTML = fmt(ms).slice(0, 5) + '<span class="timer-cs">' + fmt(ms).slice(5) + '</span>';
}
function swTick() {
  swRender();
  if (sw.running) sw.raf = requestAnimationFrame(swTick);
}
function swStart() {
  if (sw.running) return;
  sw.running = true; sw.startAt = performance.now();
  elTimer.classList.add('running');
  elState.textContent = 'jalan… tekan Spasi / klik untuk jeda';
  $('#btn-start').textContent = 'Jeda';
  $('#btn-lap').disabled = false; $('#btn-reset').disabled = false;
  swTick();
}
function swStop() {
  if (!sw.running) return;
  sw.acc = swElapsed(); // hitung dulu SEBELUM running=false (elapsed baca flag running)
  sw.running = false; cancelAnimationFrame(sw.raf);
  elTimer.classList.remove('running');
  elState.textContent = 'jeda di ' + fmt(sw.acc) + ' — klik untuk lanjut';
  $('#btn-start').textContent = 'Lanjut';
  swRender();
}
function swToggle() { sw.running ? swStop() : swStart(); }
function swLap() {
  if (!sw.running && sw.acc === 0) return;
  const total = swElapsed();
  const prev = sw.laps.length ? sw.laps[sw.laps.length - 1].total : 0;
  sw.laps.push({ n: sw.laps.length + 1, total, split: total - prev });
  renderLaps();
}
function swReset() {
  sw.running = false; cancelAnimationFrame(sw.raf);
  sw.acc = 0; sw.laps = [];
  elTimer.classList.remove('running');
  elState.textContent = 'siap — klik untuk mulai';
  $('#btn-start').textContent = 'Mulai';
  $('#btn-lap').disabled = true; $('#btn-reset').disabled = true;
  renderLaps(); swRender();
}
function renderLaps() {
  const ol = $('#laps');
  ol.innerHTML = sw.laps.map(l =>
    '<li><span>Putaran ' + l.n + '</span><span>' + fmt(l.split) + ' <small>(total ' + fmt(l.total) + ')</small></span></li>').join('');
}

$('#btn-start').addEventListener('click', swToggle);
$('#btn-lap').addEventListener('click', swLap);
$('#btn-reset').addEventListener('click', swReset);
elTimer.addEventListener('click', swToggle);
elTimer.addEventListener('keydown', e => { if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); swToggle(); } });
document.addEventListener('keydown', e => {
  if (e.target.matches('input, select, textarea')) return;
  // Spasi: jangan rebut dari tombol/tautan yang sedang fokus (Space = aktivasi native tombol).
  // Shortcut hanya jalan saat fokus di badan halaman / elemen non-interaktif.
  if (e.code === 'Space') {
    if (e.target.closest('button, a, summary, [role="slider"], [tabindex]')) return;
    e.preventDefault(); swToggle();
  }
  else if (e.key === 'l' || e.key === 'L') { swLap(); }
  else if (e.key === 'r' || e.key === 'R') { swReset(); }
});
swRender();

/* ================= LOMBA: pilih + render ================= */
function lombaById(id) { return LOMBA.find(l => l.id === id); }

function renderChips() {
  $('#chips').innerHTML = LOMBA.map(l =>
    '<button type="button" class="chip" data-lomba="' + l.id + '" aria-pressed="' + (selectedLomba === l.id) + '">' + esc(l.nama) + '</button>').join('');
  $$('#chips .chip').forEach(b => b.addEventListener('click', () => selectLomba(b.dataset.lomba, true)));
}
function renderGrid() {
  $('#grid-lomba').innerHTML = LOMBA.map(l =>
    '<button type="button" class="lomba-card" data-lomba="' + l.id + '" aria-pressed="' + (selectedLomba === l.id) + '">' +
    icon(l.ikon) +
    '<span class="lc-nama">' + esc(l.nama) + '</span>' +
    '<span class="lc-meta">' + esc(l.kat) + ' • ' + (l.ukur === 'skor' ? 'skor' : l.ukur) + '</span>' +
    '<span class="lc-aturan">' + esc(l.aturan) + '</span></button>').join('');
  $$('#grid-lomba .lomba-card').forEach(b => b.addEventListener('click', () => {
    selectLomba(b.dataset.lomba, true);
    document.querySelector('#arena').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
}
function renderLombaDetail() {
  const d = $('#lomba-detail');
  if (!selectedLomba) { d.hidden = true; $('#lomba-now').textContent = 'Belum pilih lomba — pilih satu di bawah.'; return; }
  const l = lombaById(selectedLomba);
  $('#lomba-now').textContent = 'Sedang jalan: ' + l.nama + ' — ' + l.kat + '.';
  $('#ld-nama').textContent = l.nama;
  $('#ld-meta').textContent = l.kat + ' • ' + (l.ukur === 'tercepat' ? 'paling cepat menang' : l.ukur === 'terlama' ? 'paling lama bertahan menang' : 'skor tertinggi menang');
  $('#ld-aturan').textContent = l.aturan;
  $('#ld-ukur').textContent = UKUR_LABEL[l.ukur];
  d.hidden = false;
  // form ikut lomba terpilih
  const sel = $('#f-lomba');
  if (sel.value !== l.id) sel.value = l.id;
  syncFormMode();
}
function selectLomba(id, scroll) {
  selectedLomba = id;
  renderChips(); renderGrid(); renderLombaDetail(); renderPodium();
  const url = new URL(location.href);
  url.searchParams.set('lomba', id);
  history.replaceState(null, '', url);
}

/* ================= HASIL: form + daftar ================= */
function renderFormOptions() {
  $('#f-lomba').innerHTML = '<option value="">— pilih lomba —</option>' +
    LOMBA.map(l => '<option value="' + l.id + '">' + esc(l.nama) + '</option>').join('');
}
function syncFormMode() {
  const l = lombaById($('#f-lomba').value);
  const isSkor = l && l.ukur === 'skor';
  $('#field-skor').hidden = !isSkor;
  $('#field-waktu').hidden = !!isSkor;
  if (isSkor) $('#f-skor').required = true; else $('#f-skor').required = false;
}
$('#f-lomba').addEventListener('change', () => {
  const v = $('#f-lomba').value;
  if (v) selectLomba(v, false); else syncFormMode();
});
$('#btn-ambil-waktu').addEventListener('click', () => {
  const ms = swElapsed();
  if (ms <= 0) { showFormError('Stopwatch masih 00:00,00, Bos — mulai dulu baru ambil waktunya.'); return; }
  $('#f-waktu').value = fmt(ms);
  hideFormError();
});
function showFormError(msg) { const e = $('#form-error'); e.textContent = msg; e.hidden = false; }
function hideFormError() { $('#form-error').hidden = true; }

$('#form-hasil').addEventListener('submit', e => {
  e.preventDefault();
  const lombaId = $('#f-lomba').value;
  const rt = $('#f-rt').value;
  const nama = $('#f-nama').value.trim();
  const l = lombaById(lombaId);
  if (!l) return showFormError('Lombanya belum dipilih, Bos — pilih dulu mau catat yang mana.');
  if (!rt) return showFormError('RT-nya kosong — peserta dari RT berapa?');
  if (nama.length < 2) return showFormError('Namanya kependekan, Bos — isi nama peserta / regu yang bener.');
  let waktuMs = null, skor = null;
  if (l.ukur === 'skor') {
    skor = parseInt($('#f-skor').value, 10);
    if (!Number.isFinite(skor) || skor < 0 || skor > 999) return showFormError('Skornya belum bener — isi angka 0 sampai 999.');
  } else {
    waktuMs = parseWaktu($('#f-waktu').value);
    if (waktuMs === null) return showFormError('Waktunya belum bener — formatnya mm:ss,cc, contoh 00:42,15. Atau tekan “Ambil dari stopwatch”.');
  }
  state.results.push({ id: uid(), lombaId, rt, nama, waktuMs, skor, ts: Date.now() });
  save(); hideFormError();
  $('#f-nama').value = ''; $('#f-waktu').value = ''; $('#f-skor').value = '';
  renderAll();
  toast('Tercatat! ' + nama + ' (' + rt + ') masuk ' + l.nama + '. Sah!');
});

function renderHasil() {
  const list = $('#hasil-list');
  const n = state.results.length;
  $('#karcis-no').textContent = 'DETIK17-' + String(n + 1).padStart(3, '0');
  $('#hasil-count').textContent = n ? '(' + n + ' hasil)' : '';
  $('#hasil-empty').hidden = n > 0;
  const sorted = [...state.results].sort((a, b) => b.ts - a.ts);
  list.innerHTML = sorted.map(r => {
    const l = lombaById(r.lombaId);
    const nilai = r.skor !== null && r.skor !== undefined ? r.skor + ' poin' : fmt(r.waktuMs);
    return '<li data-id="' + r.id + '">' +
      '<span><span class="hl-nama">' + esc(r.nama) + '</span> <span class="hl-meta">• ' + esc(r.rt) + ' • ' + esc(l.nama) + ' • CONTOH</span></span>' +
      '<span class="hl-waktu">' + nilai + '</span>' +
      '<button type="button" class="hl-hapus" data-hapus="' + r.id + '" aria-label="Hapus hasil ' + esc(r.nama) + '">Hapus</button></li>';
  }).join('');
  $$('#hasil-list [data-hapus]').forEach(b => b.addEventListener('click', () => hapusHasil(b.dataset.hapus)));
  $$('#hasil-list li').forEach(li => attachFlick(li));
}
function hapusHasil(id) {
  state.results = state.results.filter(r => r.id !== id);
  save(); renderAll();
}
function attachFlick(li) {
  let sx = 0, dx = 0, dragging = false, vx = 0, lastX = 0, lastT = 0;
  li.addEventListener('pointerdown', e => {
    if (e.target.closest('button')) return;
    dragging = true; sx = e.clientX; lastX = e.clientX; lastT = performance.now(); vx = 0;
    li.setPointerCapture(e.pointerId);
  });
  li.addEventListener('pointermove', e => {
    if (!dragging) return;
    dx = e.clientX - sx;
    const now = performance.now();
    vx = (e.clientX - lastX) / Math.max(1, now - lastT); lastX = e.clientX; lastT = now;
    if (dx > 0) li.style.transform = 'translateX(' + dx + 'px)';
  });
  li.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    if (dx > 110 || (dx > 60 && vx > 0.5)) {
      li.style.transition = 'transform .25s ease, opacity .25s ease';
      li.style.transform = 'translateX(110%)'; li.style.opacity = '0';
      setTimeout(() => hapusHasil(li.dataset.id), 260);
    } else {
      li.style.transition = 'transform .2s ease'; li.style.transform = '';
      setTimeout(() => { li.style.transition = ''; }, 200);
    }
    dx = 0;
  });
}

/* ================= PODIUM + KLASEMEN ================= */
function podiumFor(lombaId) {
  const l = lombaById(lombaId);
  const rows = state.results.filter(r => r.lombaId === lombaId);
  if (l.ukur === 'tercepat') rows.sort((a, b) => a.waktuMs - b.waktuMs || a.ts - b.ts);
  else if (l.ukur === 'terlama') rows.sort((a, b) => b.waktuMs - a.waktuMs || a.ts - b.ts);
  else rows.sort((a, b) => b.skor - a.skor || a.ts - b.ts);
  return rows.slice(0, 3);
}
function renderPodium() {
  const ol = $('#podium');
  if (!selectedLomba) { ol.innerHTML = ''; $('#podium-empty').hidden = false; return; }
  const pod = podiumFor(selectedLomba);
  const l = lombaById(selectedLomba);
  $('#podium-empty').hidden = pod.length > 0;
  const medal = ['🥇', '🥈', '🥉'];
  ol.innerHTML = pod.map((r, i) => {
    const nilai = r.skor !== null && r.skor !== undefined ? r.skor + ' poin' : fmt(r.waktuMs);
    return '<li><span class="po-medal">' + medal[i] + ' Juara ' + (i + 1) + '</span>' +
      '<span class="po-nama">' + esc(r.nama) + ' <small>(' + esc(r.rt) + ')</small></span>' +
      '<span class="po-waktu">' + nilai + '</span></li>';
  }).join('');
  if (!pod.length) $('#podium-empty').textContent = 'Belum ada hasil untuk ' + l.nama + ' — catat yang pertama di formulir.';
}
function computeKlasemen() {
  const pts = Object.fromEntries(RT_LIST.map(rt => [rt, { poin: 0, j1: 0, j2: 0, j3: 0 }]));
  for (const l of LOMBA) {
    const pod = podiumFor(l.id);
    [state.points.p1, state.points.p2, state.points.p3].forEach((p, i) => {
      if (pod[i]) { pts[pod[i].rt].poin += p; pts[pod[i].rt][['j1', 'j2', 'j3'][i]]++; }
    });
  }
  const rows = RT_LIST.map(rt => ({ rt, ...pts[rt] })).sort((a, b) => b.poin - a.poin || b.j1 - a.j1 || a.rt.localeCompare(b.rt));
  let rank = 0, prev = null;
  rows.forEach((r, i) => { if (r.poin !== prev) { rank = i + 1; prev = r.poin; } r.rank = rank; });
  return rows;
}
function renderKlasemen() {
  const rows = computeKlasemen();
  const has = state.results.length > 0;
  $('#klasemen-empty').hidden = has;
  const medal = { 1: '🥇', 2: '🥈', 3: '🥉' };
  $('#klasemen').innerHTML = rows.map(r =>
    '<li class="' + (r.rank === 1 && r.poin > 0 ? 'juara1' : '') + '">' +
    '<span class="kl-rank">' + r.rank + '</span>' +
    '<span class="kl-nama">' + esc(r.rt) + (r.rank === 1 && r.poin > 0 ? ' — juara umum sementara' : '') + '</span>' +
    '<span class="kl-medal" aria-hidden="true">' + (r.poin > 0 ? (medal[r.rank] || '') : '') + '</span>' +
    '<span class="kl-poin">' + r.poin + ' poin</span></li>').join('');
}

/* ================= EKSPOR + PENGATURAN ================= */
function buildPengumuman() {
  const rows = computeKlasemen().filter(r => r.poin > 0);
  const lines = ['PENGUMUMAN HASIL LOMBA 17-AN — RT 01–08', 'HUT RI ke-81 • 17 Agustus 2026', ''];
  if (rows.length) {
    lines.push('KLASEMEN SEMENTARA:');
    rows.slice(0, 3).forEach(r => lines.push(r.rank + '. ' + r.rt + ' — ' + r.poin + ' poin'));
    lines.push('');
  } else {
    lines.push('Belum ada hasil masuk. Lomba masih jalan!'); lines.push('');
  }
  if (selectedLomba) {
    const l = lombaById(selectedLomba);
    const pod = podiumFor(selectedLomba);
    lines.push('PODIUM ' + l.nama.toUpperCase() + ':');
    if (pod.length) pod.forEach((r, i) => {
      const nilai = r.skor !== null && r.skor !== undefined ? r.skor + ' poin' : fmt(r.waktuMs);
      lines.push((i + 1) + '. ' + r.nama + ' (' + r.rt + ') — ' + nilai);
    });
    else lines.push('Belum ada hasil.');
    lines.push('');
  }
  lines.push('Dicatat pakai DETIK17 — waktu jalan, jangan bengong.');
  return lines.join('\n');
}
async function copyText(txt) {
  try { await navigator.clipboard.writeText(txt); return true; }
  catch (e) {
    const ta = document.createElement('textarea');
    ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) { /* abaikan */ }
    ta.remove(); return ok;
  }
}
$('#btn-wa').addEventListener('click', async () => {
  const ok = await copyText(buildPengumuman());
  toast(ok ? 'Disalin! Tempel di grup WA, Bos.' : 'Gagal nyalin otomatis — blokir izin clipboard. Coba lagi atau salin manual dari arsip JSON.');
});
function download(name, content, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
$('#btn-json').addEventListener('click', () => {
  download('detik17-hasil-2026-08-17.json', JSON.stringify({ ...state, diekspor: new Date().toISOString() }, null, 2), 'application/json');
  toast('Arsip JSON diunduh, Bos.');
});
$('#btn-csv').addEventListener('click', () => {
  const head = 'lomba,rt,nama,waktu,skor,waktu_iso\n';
  const body = state.results.map(r => [lombaById(r.lombaId).nama, r.rt, '"' + r.nama.replace(/"/g, '""') + '"',
    r.waktuMs !== null && r.waktuMs !== undefined ? fmt(r.waktuMs) : '',
    r.skor !== null && r.skor !== undefined ? r.skor : '',
    new Date(r.ts).toISOString()].join(',')).join('\n');
  download('detik17-hasil-2026-08-17.csv', head + body, 'text/csv');
  toast('Arsip CSV diunduh, Bos.');
});
$('#btn-poin').addEventListener('click', () => {
  state.points = { p1: num($('#p1').value, state.points.p1), p2: num($('#p2').value, state.points.p2), p3: num($('#p3').value, state.points.p3) };
  $('#p1').value = state.points.p1; $('#p2').value = state.points.p2; $('#p3').value = state.points.p3;
  $('#poin-1').textContent = state.points.p1; $('#poin-2').textContent = state.points.p2; $('#poin-3').textContent = state.points.p3;
  save(); renderKlasemen();
  toast('Poin podium disimpan — klasemen dihitung ulang.');
});
let hapusArmed = false;
$('#btn-hapus').addEventListener('click', () => {
  if (!hapusArmed) {
    hapusArmed = true;
    $('#hapus-confirm').hidden = false;
    setTimeout(() => { hapusArmed = false; $('#hapus-confirm').hidden = true; }, 5000);
    return;
  }
  state.results = []; save(); hapusArmed = false; $('#hapus-confirm').hidden = true;
  renderAll();
  toast('Semua hasil dihapus. Lapangan bersih lagi, Bos.');
});

/* ================= DIVIDER SPLIT-SCREEN (drag inertia + snap) ================= */
const divider = $('#divider'), split = $('#split');
const mqDesktop = window.matchMedia('(min-width: 900px)');
let splitPct = 52;
function setSplit(p, announce) {
  splitPct = Math.max(30, Math.min(70, p));
  split.style.setProperty('--split', splitPct + '%');
  divider.setAttribute('aria-valuenow', String(Math.round(splitPct)));
  if (announce) divider.setAttribute('aria-valuetext', Math.round(splitPct) + ' persen untuk Arena');
}
if (mqDesktop.matches) setSplit(52);
divider.addEventListener('pointerdown', e => {
  if (!mqDesktop.matches) return;
  e.preventDefault();
  divider.setPointerCapture(e.pointerId);
  const rect = split.getBoundingClientRect();
  let lastX = e.clientX, lastT = performance.now(), vel = 0, raf = 0;
  const move = ev => {
    const now = performance.now();
    vel = (ev.clientX - lastX) / Math.max(1, now - lastT);
    lastX = ev.clientX; lastT = now;
    setSplit(((ev.clientX - rect.left) / rect.width) * 100);
  };
  const up = () => {
    divider.removeEventListener('pointermove', move);
    divider.removeEventListener('pointerup', up);
    // inertia: lanjutkan gerak dari kecepatan, lalu snap ke 30/50/70
    let v = vel * 16;
    const step = () => {
      if (Math.abs(v) < 0.4) {
        const snap = [30, 50, 70].reduce((a, b) => Math.abs(b - splitPct) < Math.abs(a - splitPct) ? b : a);
        setSplit(snap, true);
        return;
      }
      setSplit(splitPct + (v / rect.width) * 100);
      v *= 0.92;
      raf = requestAnimationFrame(step);
    };
    if (document.documentElement.classList.contains('lite')) {
      const snap = [30, 50, 70].reduce((a, b) => Math.abs(b - splitPct) < Math.abs(a - splitPct) ? b : a);
      setSplit(snap, true);
    } else {
      raf = requestAnimationFrame(step);
    }
  };
  divider.addEventListener('pointermove', move);
  divider.addEventListener('pointerup', up);
});
divider.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') { e.preventDefault(); setSplit(splitPct - 2, true); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); setSplit(splitPct + 2, true); }
  else if (e.key === 'Home') { e.preventDefault(); setSplit(30, true); }
  else if (e.key === 'End') { e.preventDefault(); setSplit(70, true); }
});

/* ================= MARQUEE: skew ikut kecepatan scroll + jeda ================= */
let mqPaused = false, lastY = window.scrollY, lastT2 = performance.now();
window.addEventListener('scroll', () => {
  if (mqPaused) return;
  const now = performance.now();
  const v = (window.scrollY - lastY) / Math.max(1, now - lastT2);
  lastY = window.scrollY; lastT2 = now;
  const skew = Math.max(-8, Math.min(8, v * 4));
  $$('.mq-track').forEach(t => { t.style.transform = 'skewX(' + (-skew) + 'deg)'; });
}, { passive: true });
$('#btn-marquee').addEventListener('click', () => {
  mqPaused = !mqPaused;
  document.body.classList.toggle('marquee-paused', mqPaused);
  $('#btn-marquee').setAttribute('aria-pressed', String(!mqPaused));
  $('#btn-marquee').textContent = mqPaused ? 'Marquee: jeda' : 'Marquee: jalan';
});

/* ================= GERAK: toggle + reduced-motion + mode ringan ================= */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
function applyMotionPref() {
  const off = document.documentElement.classList.contains('reduced-motion');
  $('#btn-gerak').setAttribute('aria-pressed', String(!off));
  $('#btn-gerak').textContent = off ? 'Gerak: mati' : 'Gerak: nyala';
}
if (prefersReduced.matches) document.documentElement.classList.add('reduced-motion');
$('#btn-gerak').addEventListener('click', () => {
  document.documentElement.classList.toggle('reduced-motion');
  applyMotionPref();
});
applyMotionPref();
function liteCheck() {
  const lite = (navigator.hardwareConcurrency || 99) <= 4 ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    (navigator.connection && navigator.connection.saveData);
  if (lite) document.documentElement.classList.add('lite');
}
liteCheck();
// FPS < 40 selama 2 detik pertama → mode ringan
(function fpsGuard() {
  let frames = 0; const t0 = performance.now();
  const loop = () => {
    frames++;
    if (performance.now() - t0 < 2000) requestAnimationFrame(loop);
    else if (frames / 2 < 40) document.documentElement.classList.add('lite');
  };
  requestAnimationFrame(loop);
})();

/* ================= EASTER EGG: ketik "dirgahayu" ================= */
let keyBuf = '';
document.addEventListener('keydown', e => {
  if (e.target.matches('input, select, textarea')) return;
  keyBuf = (keyBuf + e.key.toLowerCase()).slice(-9);
  if (keyBuf === 'dirgahayu') {
    keyBuf = '';
    const ex = $('#easter');
    ex.hidden = false;
    $$('.mq-chunk').forEach(c => { c.dataset.orig = c.dataset.orig || c.textContent; c.textContent = 'DIRGAHAYU RI KE-81 ✦ MERDEKA ✦ '; });
    setTimeout(() => {
      ex.hidden = true;
      $$('.mq-chunk').forEach(c => { if (c.dataset.orig) c.textContent = c.dataset.orig; });
    }, 3500);
  }
});

/* ================= GSAP: hero jatuh-menumpuk + zoom + curtain ================= */
function initMotion() {
  const reduced = document.documentElement.classList.contains('reduced-motion');
  if (!window.gsap || reduced) return;
  gsap.registerPlugin(ScrollTrigger);
  // kata hero jatuh lalu menumpuk
  gsap.from('[data-word]', {
    y: -160, rotation: () => gsap.utils.random(-14, 14), opacity: 0,
    duration: 0.7, stagger: 0.18, ease: 'bounce.out', clearProps: 'all',
  });
  // kamera terbang: zoom hero saat scroll
  gsap.to('.hero', {
    scale: 1.06, rotation: -0.6, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  // curtain wipe antar section (clearProps: setelah reveal, clip-path dihapus — konten tidak pernah terjebak tersembunyi)
  $$('.catat, .lomba-grid, .umumkan').forEach(sec => {
    gsap.from(sec, {
      clipPath: 'inset(0 0 100% 0)', ease: 'power2.out', duration: 0.6, clearProps: 'clipPath',
      scrollTrigger: { trigger: sec, start: 'top 85%', once: true },
    });
  });
  // bobot body variable 400 -> 700 saat scroll judul section
  $$('.sec-title').forEach(t => {
    gsap.fromTo(t, { fontVariationSettings: '"wght" 400' }, {
      fontVariationSettings: '"wght" 700', ease: 'none',
      scrollTrigger: { trigger: t, start: 'top 90%', end: 'top 55%', scrub: true },
    });
  });
}
window.addEventListener('load', () => { document.fonts.ready.then(initMotion); });

/* ================= INIT ================= */
function renderAll() { renderChips(); renderGrid(); renderLombaDetail(); renderHasil(); renderPodium(); renderKlasemen(); }
renderFormOptions();
$('#p1').value = state.points.p1; $('#p2').value = state.points.p2; $('#p3').value = state.points.p3;
$('#poin-1').textContent = state.points.p1; $('#poin-2').textContent = state.points.p2; $('#poin-3').textContent = state.points.p3;
(function initDeepLink() {
  const q = new URLSearchParams(location.search).get('lomba');
  if (q && lombaById(q)) selectedLomba = q;
})();
renderAll();
