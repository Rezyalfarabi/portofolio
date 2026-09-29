"use client";

import { useEffect } from "react";
import { scrollToElement } from "@/lib/smooth-scroll";

/*
 * Satu listener untuk semua anchor di halaman, dipasang di document.
 *
 * Delegate, bukan satu onClick per link: nav, tombol hero, dan brand di header
 * lalu ikut tanpa ada yang tahu soal komponen ini. Nav tetap server-safe
 * seperti sebelumnya.
 */
export function SmoothScroll() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      // Hanya klik kiri biasa. Tombol tengah membuka tab baru, dan klik dengan
      // modifier bukan navigasi, jadi keduanya milik browser.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;

      const id = url.hash.slice(1);
      // Hash kosong berarti kembali ke atas; biar browser yang menanganinya.
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      scrollToElement(target);

      /*
       * URL ditulis setelah preventDefault supaya browser tidak melakukan
       * lompatan sendiri. pushState, bukan replaceState, supaya tombol
       * back menelusuri section yang sudah dilewati, sama seperti anchor
       * bawaan.
       */
      window.history.pushState(null, "", url.hash);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
