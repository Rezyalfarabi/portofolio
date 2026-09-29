"use client";

import { useSyncExternalStore } from "react";
import { readTheme, subscribeTheme, toggleTheme, type Theme } from "@/lib/theme";

/*
 * Tombol tema di header.
 *
 * Ikonnya sengaja tidak digambar dari state React, tapi dari utility dark:
 * yang memicunya atribut data-theme, sama seperti yang menggambar seluruh
 * halaman. Kalau ikon ikut state, layar pertama di perangkat bertema gelap akan
 * sempat menampilkan ikon mode terang sampai hydrasi selesai.
 *
 * State tetap dipakai untuk satu hal: aria-label, karena label itu menjelaskan
 * aksi berikutnya dan harus berubah mengikuti tema. Label tidak pernah terlihat,
 * jadi koreksinya secepat apa pun tidak akan terlihat melompatan.
 */
type ThemeToggleProps = {
  lightLabel: string;
  darkLabel: string;
};

function useTheme(): Theme {
  /*
   * Snapshot server selalu "light" karena di server data-theme belum pernah
   * diset. useSyncExternalStore memang membutuhkannya, dan justru itu yang
   * membuat markup server dan render pertama sama, jadi tidak ada hydration
   * mismatch. Nilai sebenarnya masuk di render berikutnya.
   */
  return useSyncExternalStore(subscribeTheme, readTheme, () => "light");
}

export function ThemeToggle({ lightLabel, darkLabel }: ThemeToggleProps) {
  const theme = useTheme();
  const label = theme === "dark" ? lightLabel : darkLabel;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="label frame flex min-h-11 w-11 shrink-0 cursor-pointer items-center justify-center transition-colors duration-120 hover:bg-paper-deep"
    >
      {/*
        Ikon menunjuk tema tujuan, bukan tema sekarang: bulan ketika masih
        terang, matahari ketika sudah gelap. Ini yang paling jarang bikin salah
        klik, karena menebak-nebak keadaan sekarang harus ingat dulu tombolnya
        untuk apa.
      */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="hidden h-5 w-5 dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
      </svg>
    </button>
  );
}
