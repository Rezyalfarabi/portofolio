/*
 * Smooth scroll untuk anchor.
 *
 * Kenapa tidak rely pada scroll-behavior: smooth saja: durasi browser itu
 * tetap dan tidak bisa diatur, jadi lompatan dari hero ke Proyek yang enam
 * ribu piksel terasa berhenti di tengah jalan lalu meluncur. Di sini durasi
 * ikut jarak, dan kelocolatannya dikendalikan.
 *
 * Dua hal yang dijaga supaya tidak merusak perilaku bawaan:
 *
 * 1. Jarak tempuh dibaca dari scroll-padding-top yang sudah ada di CSS, bukan
 *    ditulis ulang sebagai angka di sini. Kalau nav membungkus jadi dua baris
 *    di layar kecil, CSS yang menanggung itu, dan kode ini otomatis ikut.
 * 2. Gestur pengguna selalu menang. Begitu ada wheel, touch, atau tombol
 *    scroll yang ditekan, animasi dibatalkan dan halaman berhenti di tempat
 *    yang sama. Tanpa ini, halaman yang sedang meluncur akan merebut kendali
 *    dari orang yang sedang mau baca.
 *
 * Tidak ada pembacaan matchMedia di luar handler, jadi aman untuk SSR: fungsi
 * ini dipanggil setelah hydration, tidak pernah saat render. */

const MIN_DURATION = 380;
const MAX_DURATION = 900;

let frame = 0;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Berhenti kalau pengguna mengambil alih, lalu lepas semua listener. */
function cancel(): void {
  if (!frame) return;
  cancelAnimationFrame(frame);
  frame = 0;
  window.removeEventListener("wheel", cancel);
  window.removeEventListener("touchstart", cancel);
  window.removeEventListener("keydown", onScrollKey);
}

const SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

function onScrollKey(event: KeyboardEvent): void {
  if (SCROLL_KEYS.has(event.key)) cancel();
}

/** Padding atas dari CSS, jadi sumber kebenarannya tetap satu. */
function topPadding(): number {
  const raw = getComputedStyle(document.documentElement).scrollPaddingTop;
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function scrollToElement(target: Element): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const box = target.getBoundingClientRect();
  const goal = box.top + window.scrollY - topPadding();
  const start = window.scrollY;
  const distance = goal - start;

  // Sudah di tempat, atau reduced-motion: langsung saja tanpa animasi.
  if (reduce || Math.abs(distance) < 2) {
    cancel();
    window.scrollTo(0, goal);
    return;
  }

  cancel();

  const duration = Math.min(
    MAX_DURATION,
    Math.max(MIN_DURATION, 220 + Math.abs(distance) * 0.25),
  );
  const began = performance.now();

  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", onScrollKey);

  const step = (now: number) => {
    const t = Math.min((now - began) / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(t));
    if (t < 1) {
      frame = requestAnimationFrame(step);
    } else {
      cancel();
    }
  };

  frame = requestAnimationFrame(step);
}
