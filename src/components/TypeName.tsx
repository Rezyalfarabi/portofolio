"use client";

import { useEffect, useState } from "react";

/*
 * Nama yang mengetiknya sendiri, lalu dihapus, lalu mengetik lagi.
 *
 * Ini satu-satunya loop tanpa akhir di halaman selain pita bahasa, dan itu
 * disengaja: nama adalah satu-satunya teks yang layak bergerak tanpa diminta.
 * Pita bahasa bergerak karena isinya memang daftar, nama bergerak karena itu
 * yang ingin dilihat orang pertama kali.
 *
 * Tiga hal yang dijaga di sini, karena ketik teks hampir selalu rusak di
 * ketiganya:
 *
 * 1. Nama lengkap selalu ada di DOM sebagai sr-only, terpisah dari bagian yang
 *    beranimasi. Pembaca layar membaca "Rezy Alfarabi" utuh, bukan "R... A...".
 * 2. Tanpa JavaScript, atau dengan prefers-reduced-motion, teks yang terlihat
 *    adalah nama lengkap yang statis. Tidak ada state kosong yang perlu
 *    dihydrate, jadi tidak ada selisih server dan klien sama sekali.
 * 3. Server selalu merender nama lengkap, dan JavaScript baru mulai menghapus
 *    karakter setelah menunggu. Kalau render pertama ikut kosong, nama akan
 *    berkedip hilang tepat di detik pertama orang tiba.
 */

type TypeNameProps = {
  name: string;
  className?: string;
};

/* Kecepatan dalam milidetik per karakter, bukan durasi total, supaya tambah
 * atau kurangi kata tidak mengubah ritme mengetik. */
const TYPE_MS = 105;
const ERASE_MS = 45;
const HOLD_FULL_MS = 1800;
const GAP_MS = 450;

type Token = { line: number };

function buildTokens(name: string) {
  const lines = name.split(/\s+/).filter(Boolean);
  const tokens: Token[] = [];

  lines.forEach((line, lineIndex) => {
    for (let i = 0; i < line.length; i += 1) tokens.push({ line: lineIndex });
  });

  return { lines, tokens };
}

export function TypeName({ name, className }: TypeNameProps) {
  const { lines, tokens } = buildTokens(name);
  const total = tokens.length;

  /*
   * Awalnya sama dengan render server: nama lengkap. useState hanya perlu
   * nilai awal untuk render pertama, setelah itu effect yang memegang.
   */
  const [shown, setShown] = useState(total);

  useEffect(() => {
    /*
     * Dimatikan di sini, sebelum teks pertama dikosongkan. Kalau pemeriksaannya
     * dilakukan setelah setShown(0), pengguna ini akan sempat kehilangan
     * namanya selama satu frame.
     */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (total === 0) return;

    let alive = true;
    let timer: ReturnType<typeof setTimeout>;
    let count = total;
    let mode: "erase" | "type" = "erase";
    let delay = HOLD_FULL_MS;

    /*
     * Satu fungsi untuk dua arah, bukan dua setTimeout yang saling menunggu.
     * Dengan begitu hanya ada satu tempat yang harus dibatalkan saat komponen
     * dilepas, dan tidak mungkin ada satu arah yang berhenti jalan kalau arah
     * lainnya lebih dulu selesai.
     */
    const tick = () => {
      if (!alive) return;

      if (mode === "erase") {
        if (count === 0) {
          mode = "type";
          delay = GAP_MS;
        } else {
          count -= 1;
          delay = ERASE_MS;
        }
      } else if (count === total) {
        mode = "erase";
        delay = HOLD_FULL_MS;
      } else {
        count += 1;
        delay = TYPE_MS;
      }

      setShown(count);
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, delay);

    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [total]);

  if (total === 0) return null;

  /* Berapa karakter dari baris ini yang sudah tampil. Offset-nya dihitung ulang
   * karena baris bisa berbeda panjang, jadi tidak bisa dihitung sekali di luar
   * render. */
  const visibleIn = (lineIndex: number) => {
    let seen = 0;
    for (let i = 0; i < shown; i += 1) {
      if (tokens[i].line === lineIndex) seen += 1;
    }
    return seen;
  };

  /* Kursor menempel di baris yang terakhir masih berisi teks, supaya saat
   * baris pertama dihapus kursor tidak ikut melompat ke bawah halaman. */
  const caretLine = shown === 0 ? 0 : tokens[shown - 1].line;

  return (
    <span className={className}>
      <span className="sr-only">{name}</span>

      <span aria-hidden="true" className="uppercase">
        {lines.map((line, index) => (
          <span key={index} className="block">
            {line.slice(0, visibleIn(index))}
            {caretLine === index ? (
              <span className="caret ml-2 inline-block h-[0.72em] w-[0.32em] translate-y-[-0.06em] bg-accent align-baseline" />
            ) : null}
          </span>
        ))}
      </span>
    </span>
  );
}
