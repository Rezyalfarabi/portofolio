/*
 * Penyimpanan limit untuk section Tanya.
 *
 * Kenapa tidak langsung pakai useState + useEffect:
 *
 * localStorage adalah sistem luar, dan useState + useEffect untuk membacanya
 * menghasilkan dua masalah nyata. Pertama, setState di dalam effect memaksa
 * render kedua (react-hooks/set-state-in-effect). Kedua, dan lebih penting,
 * nilai limit harus sama di server dan di browser pada render pertama,
 * sedangkan server tidak punya localStorage sama sekali.
 *
 * useSyncExternalStore menyelesaikan keduanya: server dapat snapshot kosong,
 * browser dapat nilai sebenarnya, lalu React yang menyelaraskan keduanya tanpa
 * render manual.
 *
 * Modul ini hanya menyimpan limit. Jam untuk hitung mundur sengaja tidak ada
 * di sini: angkanya tidak perlu bertahan melewati reload dan tidak punya
 * masalah hydration, karena selalu nol di server dan satu interval di
 * komponen sudah cukup.
 */

import type { Locale } from "./locales";
import { storageKey } from "./qa";

export type LimitState = { used: number; until: number };

const EMPTY: LimitState = { used: 0, until: 0 };

/*
 * Nilai yang dikembalikan getSnapshot harus stabil di antara perubahan nyata,
 * jadi hasil parse disimpan di sini dan dibandingkan dengan string mentah.
 * Tanpa cache ini, setiap panggilan getSnapshot membuat objek baru dan React
 * menganggap store terus berubah.
 */
let activeLocale: Locale = "id";
let cachedRaw: string | null = null;
let cachedState: LimitState = EMPTY;
const listeners = new Set<() => void>();

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(storageKey(activeLocale));
  } catch {
    return null;
  }
}

/**
 * Parse defensif. Isinya datang dari localStorage, yang bisa berisi apa saja:
 * hasil edit manual, atau versi lama yang tidak sama bentuk. Field yang bukan
 * number diabaikan dan dianggap belum pernah bertanya, supaya tidak ada NaN
 * yang ikut ke hitungan.
 */
function parse(raw: string | null): LimitState {
  if (raw === null) return EMPTY;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return EMPTY;
  }

  if (typeof parsed !== "object" || parsed === null) return EMPTY;

  const candidate = parsed as Partial<LimitState>;
  if (typeof candidate.used !== "number" || typeof candidate.until !== "number") {
    return EMPTY;
  }
  if (!Number.isFinite(candidate.used) || !Number.isFinite(candidate.until)) {
    return EMPTY;
  }

  /*
    Limit yang sudah lewat waktu dianggap habis, sama seperti kalau storage
    dikosongkan. Ditangani di sini, bukan lewat efek terpisah, jadi tidak ada
    render tambahan hanya untuk membersihkan angka.
  */
  if (candidate.until > 0 && candidate.until <= Date.now()) return EMPTY;

  return { used: candidate.used, until: candidate.until };
}

function getSnapshot(): LimitState {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedState = parse(raw);
  }
  return cachedState;
}

function getServerSnapshot(): LimitState {
  return EMPTY;
}

function notify(): void {
  for (const listener of listeners) listener();
}

/**
 * Ganti locale aktif. Dipanggil dari render, bukan dari effect, supaya snapshot
 * pertama di browser langsung membaca key yang benar dan tidak ada render kedua
 * hanya untuk pindah key.
 */
export function useLimitLocale(locale: Locale): void {
  if (activeLocale !== locale) {
    activeLocale = locale;
    // Paksa parse ulang supaya key baru langsung dibaca.
    cachedRaw = null;
  }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const limitSnapshot = getSnapshot;
export const serverLimitSnapshot = getServerSnapshot;

/** Tulis limit baru, lalu beritahu semua yang sedang mendengarkan. */
export function writeLimit(next: LimitState): void {
  try {
    window.localStorage.setItem(storageKey(activeLocale), JSON.stringify(next));
  } catch {
    /* Kuota tetap berlaku di halaman ini saja kalau storage tidak bisa ditulis. */
  }
  cachedRaw = null;
  notify();
}
