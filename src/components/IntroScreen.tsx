"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { Dict } from "@/lib/i18n";
import { GREETINGS, GREETING_START, type Locale } from "@/lib/locales";
import { lockScroll } from "@/lib/scroll-lock";

/*
 * Layar pembuka.
 *
 * Isinya satu sapaan yang berganti dari berbagai bahasa, nama, dan progress
 * bar. Seluruh durasi dihitung oleh CSS lewat --intro-dur, dan JavaScript hanya
 * berganti kata. Kedua sisi membaca angka yang sama, jadi tidak ada hydration
 * mismatch.
 *
 * Sengaja tidak ada satu pun pembacaan matchMedia di dalam render: kalau
 * prefers-reduced-motion dicek saat render, server dan client bisa berbeda
 * jawabannya dan itu kembali menjadi hydration mismatch.
 *
 * Keputusan tampil atau tidaknya ada di CSS, yang sudah dievaluasi browser
 * sebelum halaman dicat. Efeknya pengguna reduced-motion tidak pernah melihat
 * layar ini, dan karena kelayers juga diproses CSS, halaman tetap terbuka penuh
 * walau JavaScript mati.
 */
const GREET_EVERY = 240;

/*
 * Durasi diturunkan dari daftar sapaan, bukan ditulis sendiri. 16 sapaan dengan
 * jeda 240ms berarti 3,84 detik: di dalam rentang yang enak dibaca, dan setiap
 * sapaan tampil tepat satu kali tanpa ada sisa yang terpotong.
 *
 * Menambah atau mengurangi satu sapaan akan mengubah durasinya sendiri, jadi
 * overlay tidak mungkin lebih lama daripada jumlah kata yang ditampilkan.
 */
const DISMISS_AFTER = GREET_EVERY * GREETINGS.length;

export function IntroScreen({
  text,
  locale,
}: {
  text: Dict["intro"];
  locale: Locale;
}) {
  /*
   * Indeks awal dihitung dari locale, bukan diacak. Server dan client
   * memakai locale yang sama dari cookie, jadi kata pertama selalu sama dan
   * React tidak menemukan perbedaan saat hydration.
   */
  const [index, setIndex] = useState(GREETING_START[locale]);
  const [pct, setPct] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  /*
   * Ketiga efek di bawah bergantung pada dismissed, dan itu wajib.
   *
   * Komponen ini tidak pernah unmount: saat dismissed true, komponen hanya
   * berhenti mengembalikan markup. Cleanup sebuah useEffect dengan dependensi
   * kosong hanya berjalan saat unmount, jadi mengunci scroll dengan cara itu
   * akan membuat body terkunci selamanya begitu layar pembuka hilang. Dengan
   * dismissed jadi dependensi, cleanup ikut jalan tepat saat layarnya hilang.
   */
  useEffect(() => {
    if (dismissed) return;

    const timer = window.setTimeout(() => setDismissed(true), DISMISS_AFTER);
    return () => window.clearTimeout(timer);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    function onKey(event: KeyboardEvent) {
      // Tombol modifier saja tidak dihitung sebagai "masuk", dan tidak
      // boleh ikut menutup layar.
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      setDismissed(true);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;
    return lockScroll();
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    const word = window.setInterval(
      () => setIndex((i) => (i + 1) % GREETINGS.length),
      GREET_EVERY,
    );

    /*
     * Angka progress dihitung di JavaScript, bukan dari animasi CSS, karena
     * nilai di dalam keyframes tidak bisa dibaca sebagai teks. Bar-nya sendiri
     * tetap digerakkan CSS, jadi tetap bergerak walau JavaScript tidak jalan.
     * Kecepatannya tidak linear: dipakai smoothstep, jadi terasa seperti proses
     * yang sedang selesai, bukan timer yang habis.
     */
    const start = performance.now();
    const clock = window.setInterval(() => {
      const t = Math.min((performance.now() - start) / DISMISS_AFTER, 1);
      setPct(Math.round(t * t * (3 - 2 * t) * 100));
    }, 60);

    return () => {
      window.clearInterval(word);
      window.clearInterval(clock);
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      aria-hidden="true"
      onClick={() => setDismissed(true)}
      className="intro fixed inset-0 z-70 flex items-center justify-center bg-band text-band-fg"
      style={{ "--intro-dur": `${DISMISS_AFTER}ms` } as CSSProperties}
    >
      {/*
        Dipusatkan di kedua arah, bukan hanya vertikal.

        Lebarnya dibatasi supaya isi loading jadi satu blok utuh yang berdiri di
        tengah layar. Kalau tetap selebar halaman, angka persen mendarat di tepi
        kanan layar yang jauh dari label di sebelahnya, dan bloknya terbaca
        seperti dua elemen yang kebetulan ada di layar yang sama, bukan satu
        layar pemuatan.

        Teksnya tetap rata kiri di dalam blok itu: pemusatan berlaku pada
        blok, bukan pada setiap baris, supaya tidak kehilangan bahasavisual
        kiri-kanan yang dipakai seluruh halaman.
      */}
      <div className="mx-auto w-full max-w-xl px-5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="label text-accent">{text.loading}</p>
          <p className="label text-band-fg/60">{pct}%</p>
        </div>

        {/*
         * key dipakai supaya tiap pergantian kata memasang ulang elemen, dan
         * animasi masuknya ikut terulang. Tanpa itu, kata berikutnya hanya
         * akan muncul diam dan terasa seperti teks yang dijahit.
         */}
        <p
          key={index}
          className="intro-greet display mt-4 text-[clamp(2.25rem,9vw,5.5rem)] leading-[1.05]"
        >
          {GREETINGS[index]}
        </p>

        <p className="display mt-5 text-sm text-band-fg/80">REZY ALFARABI</p>
        <p className="mt-3 max-w-[42ch] text-base leading-relaxed text-band-fg/70">
          {text.sub}
        </p>

        {/*
         * Track-nya memakai utility bawaan Tailwind, bukan utility frame.
         * Warna garisnya bukan tinta, dan frame memakai shorthand border yang
         * akan menimpa border-band-fg/60 kalau dipakai bersamaan.
         */}
        <div className="mt-8 h-3 w-56 border-3 border-band-fg/60">
          <div className="intro-bar h-full bg-accent" />
        </div>

        <p className="label mt-4 text-band-fg/60">{text.hint}</p>
      </div>
    </div>
  );
}
