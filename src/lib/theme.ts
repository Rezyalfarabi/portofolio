/*
 * Modul tema.
 *
 * Sengaja tanpa directive "use client" dan tanpa impor React, supaya bisa
 * dipakai dua sisi sekaligus: RootLayout membacanya untuk menyisipkan skrip
 * pra-paint, sementara ThemeToggle membacanya lewat useSyncExternalStore.
 * Kalau modul ini jadi client boundary, konstantanya yang diambil layout akan
 * berubah jadi client reference dan gagal dipanggil di server.
 *
 * Menyimpan tema memakai atribut data-theme di <html>, bukan class. Alasannya
 * satu: CSS cukup menulis satu blok [data-theme="dark"] yang menimpa token,
 * tanpa selector terpisah per komponen. Tidak ada satu pun kelas
 * "dark:bg-..." atau kondisi ternaris di dalam markup.
 */
export const THEME_KEY = "rezy-tema";
export const THEME_EVENT = "rezy-tema:ubah";

export type Theme = "light" | "dark";

/*
 * Skrip pra-paint.
 *
 * Ini satu-satunya bagian yang boleh menyentuh localStorage, dan ia berjalan
 * sebelum browser menggambar frame pertama. Kalau waited sampai useEffect atau
 * selesai hydrasi, halaman akan berkedip terang selama satu atau dua frame
 * lebih dulu di perangkat yang memakai tema gelap.
 *
 * Preferensi perangkat hanya dibaca waktu belum ada pilihan tersimpan. Begitu
 * orang menekan tombol, pilihannya menang dan tidak lagi mengikuti sistem.
 * Dilakukan begini karena tombolnya hanya punya dua keadaan, jadi tidak ada
 * keadaan ketiga "ikut sistem" yang perlu ditampilkan.
 */
export const THEME_SCRIPT = `(function(){try{var r=document.documentElement;var s=localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)});var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;r.dataset.theme=d?"dark":"light";}catch(e){document.documentElement.dataset.theme="light";}})();`;

export function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function setTheme(next: Theme) {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    /*
     * Mode privat dan sebagian pengaturan kios memblokir localStorage. Tema
     * tetap berlaku untuk sesi ini, cuma tidak diingat setelah halaman ditutup.
     * Itu hasil yang jauh lebih baik daripada membuat seluruh tombol gagal.
     */
  }

  /*
   * Peristiwa sendiri, bukan storage. Peristiwa storage hanya sampai ke tab
   * lain, sedangkan tombol ini harus sinking dengan dirinya sendiri di tab yang
   * sama. Satu peristiwa cukup untuk keduanya, jadi storage tetap didaftarkan
   * cuma sebagai pembaca sinkronisasi antar tab.
   */
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function toggleTheme() {
  setTheme(readTheme() === "dark" ? "light" : "dark");
}

export function subscribeTheme(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
