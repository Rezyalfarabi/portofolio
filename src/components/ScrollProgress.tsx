"use client";

import { useEffect, useRef } from "react";

/*
 * Bar tipis yang menunjukkan sudah berapa jauh halaman dibaca.
 *
 * Hanya transform yang ditulis, lewat ref, bukan state. Kalau progress-nya
 * disimpan di state, setiap frame scroll akan memicu render ulang seluruh
 * header beserta isinya; dengan menulis langsung ke DOM, satu frame scroll
 * hanya menyentuh satu style (R-19).
 *
 * Pembaruan dijadwalkan lewat requestAnimationFrame: event scroll bisa datang
 * lebih cepat dari frame, jadi tanpa rAF beberapa panggilan dalam satu frame
 * akan sama-sama menghitung nilai yang sama.
 */
export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const scrollable = root.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      fill.style.transform = `scaleX(${ratio})`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    /*
     * Dipanggil sekali di awal, bukan cuma saat scroll pertama. Halaman yang
     * dibuka lewat anchor, atau yang dipulihkan browser dari riwayat, bisa
     * langsung berada di tengah, dan tanpa pemanggilan awal bar-nya akan
     * tertinggal di nol sampai reader menggerakkan halaman sedikit.
     */
    update();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    /*
      absolute, bukan elemen yang menambah tinggi header. Kalau bar ini
      participating dalam layout, tinggi header berubah-ubah lalu --nav-h ikut
      berubah-ubah, dan target anchor ikut bergerak setiap kali bar muncul.
    */
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-accent/25">
      <div ref={fillRef} className="progress-fill h-full bg-accent" />
    </div>
  );
}
