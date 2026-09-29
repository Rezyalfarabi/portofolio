"use client";

import { createElement, useEffect, useRef, useState } from "react";

/**
 * Reveal sekali jalan saat elemen masuk viewport.
 *
 * Semua gerak pemicu scroll di halaman berhenti setelah satu kali. Yang
 * berjalan tanpa henti hanyalah dua hal yang diminta: pita bahasa dan nama
 * yang mengetik, dan keduanya punya alasan isi. Reveal tidak boleh ikut
 * dijadikan loop (R-19).
 *
 * `prefers-reduced-motion` dihormati di CSS juga, tapi di sini dicegah supaya
 * elemen tidak pernah tertinggal di opacity 0 kalau JS jalan dan CSS tidak.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

/** Pembungkus yang invisible sampai masuk layar. */
export function Reveal({ children, className = "" }: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`reveal ${className}`} data-shown={shown}>
      {children}
    </div>
  );
}

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  /*
   * Tag dibiarkan terbuka supaya pemanggil bisa tetap memakai ul atau ol kalau
   * yang dianimasikan memang daftar. Membungkus daftar dengan div hanya demi
   * tampilan menghapus dari pembaca layar informasi bahwa itu sebuah daftar.
   */
  as?: "div" | "ul" | "ol";
  /*
   * Label untuk sekelompok daftar. Diteruskan apa adanya ke tag yang
   * dirender, karena penamaannya milik isi daftarnya, bukan milik animasinya.
   */
  "aria-label"?: string;
};

/*
 * Sekumpulan elemen yang muncul bergantian saat wadahnya masuk layar.
 *
 * Satu observer untuk seluruh kelompok, bukan satu per anak. Enam kartu berarti
 * satu observer, bukan enam, dan yang lebih penting: semua anak memakai pemicu
 * yang sama, jadi tidak akan pernah ada anak yang terlihat muncul sendiri
 * sebelum saudaranya.
 *
 * Anaknya tidak perlu kelas apa pun. State tersembunyi ditulis di .stagger > *,
 * sementara utility .stagger hanya memberi jeda ke masing-masing anak.
 */
export function RevealGroup({
  children,
  className = "",
  as = "div",
  "aria-label": ariaLabel,
}: RevealGroupProps) {
  const { ref, shown } = useReveal<HTMLElement>();

  /*
   * createElement, bukan JSX langsung.
   *
   * Tag di sini benar-benar berubah antara div, ul, dan ol, dan ref-nya tetap
   * satu. Menulis <Tag ref={ref}> membuat TypeScript menuntut satu ref yang
   * cocok dengan ketiga elemen sekaligus, dan tipe seperti itu tidak ada.
   * createElement menerima props longgar, jadi satu-satunya yang hilang di sini
   * adalah pemeriksaan tipe pada tag, sementara isi dan atributnya tetap
   * diperiksa.
   */
  const props = {
    ref,
    className: `stagger ${className}`,
    "data-shown": shown,
    "aria-label": ariaLabel,
  };

  return createElement(as, props, children);
}
