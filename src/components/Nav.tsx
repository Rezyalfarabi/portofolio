"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { lockScroll } from "@/lib/scroll-lock";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ScrollProgress } from "./ScrollProgress";
import { ThemeToggle } from "./ThemeToggle";

type NavItem = Dict["nav"][number];

type NavProps = {
  items: NavItem[];
  locale: Locale;
  switcherLabel: string;
  navAria: string;
  brand: string;
  menuLabel: string;
  themeLightLabel: string;
  themeDarkLabel: string;
};

export function Nav({
  items,
  locale,
  switcherLabel,
  navAria,
  brand,
  menuLabel,
  themeLightLabel,
  themeDarkLabel,
}: NavProps) {
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDetailsElement>(null);

  /*
   * Tinggi nav dikirim ke CSS sebagai --nav-h, lalu dipakai untuk
   * scroll-padding-top dan untuk posisi drawer.
   *
   * Digestinya hampir tidak berubah sejak nav jadi satu baris, tapi tetap diukur
   * karena angka tetap di stylesheet akan salah begitu font, zoom, atau ukuran
   * teks browser berubah. Yang benar bukan tebakannya, tapi mengukurnya.
   */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const root = document.documentElement;
    const publish = () => {
      root.style.setProperty("--nav-h", `${header.offsetHeight}px`);
    };

    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(header);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--nav-h");
    };
  }, []);

  useEffect(() => {
    const sections = items
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      // Area tengah layar, supaya yang ditandai adalah section yang sedang dibaca.
      { rootMargin: "-45% 0px -45% 0px" },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [items]);

  /*
   * Menutup menu.
   *
   * Keadaan open dilacak sendiri di React, bukan dibaca dari atribut open.
   * Membacanya lewat event toggle.details akan berarti satu handler lagi, dan
   * satu tempat di mana atribut dan state bisa tidak cocok.
   */
  useEffect(() => {
    if (!menuOpen) return;

    const details = menuRef.current;

    const close = () => {
      setMenuOpen(false);
      if (details) details.open = false;
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        /*
         * Fokus dikembalikan ke tombol yang membuka menu, supaya keyboard
         * tidak langsung hilang ke body. Tanpa ini, menekan Escape dari menu
         * akan menjatuhkan fokus di awal dokumen dan pembaca harus menelusuri
         * ulang seluruh header.
         */
        details?.querySelector("summary")?.focus();
      }
    };

    const onPointer = (event: PointerEvent) => {
      if (!details) return;
      if (details.contains(event.target as Node)) return;
      close();
    };

    /*
     * Memakai media query, bukan sekadar ukuran window, supaya tetap benar
     * kalau drawing area browser dipersempit tanpa jendela ikut mengecil.
     * Pendengarannya memakai addEventListener, sesuai MediaQueryList sekarang.
     */
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (desktop.matches) close();
    };

    /*
     * Kunci scroll dipakai lewat penghitung bersama, bukan dengan menyimpan
     * nilai body.style.overflow di sini. Layar pembuka juga mengunci scroll,
     * dan kalau keduanya melakukan hal yang sama sendiri-sendiri, keduanya bisa
     * saling menimpa nilai yang disimpan lalu meninggalkan halaman terkunci
     * tanpa ada yang bisa melepasnya. Alasannya ditulis di lib/scroll-lock.ts.
     */
    const release = lockScroll();

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      release();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen]);

  return (
    /*
      Sticky, bukan fixed, supaya dokumen yang bergeser, bukan header-nya. Kalau
      header-nya yang fixed, ia keluar dari alur dokumen dan --nav-h yang
      diukur ikut menghitung ruang yang tidak pernah ada.
    */
    <header className="sticky top-0 z-50 bg-paper rule-b" ref={headerRef}>
      <nav
        aria-label={navAria}
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-x-4 px-5 py-2.5 sm:px-8"
      >
        <a
          href="#atas"
          /*
            min-h-11 bukan gaya, tapi ukuran target sentuh. Tanpa itu brand ini
            hanya setinggi teks dan sulit ditap dengan jari, padahal tetap
            jadi tombol "kembali ke atas" yang dipakai orang di layar kecil.
          */
          className="display sweep inline-flex min-h-11 shrink-0 items-center py-2 text-sm transition-colors duration-120 hover:text-secondary"
        >
          {brand.toUpperCase()}
        </a>

        {/*
          Nav desktop disembunyikan, bukan dipindah ke dalam drawer. Di layar
          lebar keduanya akan tampil, dan menyalin enam tautan berarti ada dua
          salinan yang harus dijaga agar tetap sama.
        */}
        <ul className="hidden items-center gap-x-1 lg:flex">
          {items.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`label inline-flex min-h-11 items-center px-3 transition-colors duration-120 ${
                    isActive ? "bg-ink text-paper" : "text-ink hover:bg-paper-deep"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden lg:block">
            <LocaleSwitcher locale={locale} label={switcherLabel} />
          </div>

          <ThemeToggle
            lightLabel={themeLightLabel}
            darkLabel={themeDarkLabel}
          />

          {/*
            Bentuknya details, bukan tombol dengan state, supaya daftar ini tetap
            bisa dibuka tanpa JavaScript. Yang bawa JavaScript cuma penutupan
            otomatis, kunci scroll, dan pengembalian fokus.
          */}
          <details
            ref={menuRef}
            className="relative lg:hidden"
            onToggle={(event) => setMenuOpen(event.currentTarget.open)}
          >
            <summary
              aria-label={menuLabel}
              className="burger frame flex h-11 w-11 cursor-pointer list-none flex-col items-center justify-center gap-1.5 transition-colors duration-120 hover:bg-paper-deep [&::-webkit-details-marker]:hidden"
            >
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
            </summary>

            {/*
              fixed, bukan absolute. Drawer harus menutupi seluruh sisa layar,
              dan posisinya harus tetap menempel di bawah header meski halaman
              panjang. absolute akan ikut ter-scroll bersama header.
            */}
            <div className="drawer-panel fixed inset-x-0 top-[var(--nav-h,4.75rem)] bottom-0 z-40 overflow-y-auto overscroll-contain border-t-3 border-ink bg-paper">
              {/*
                data-shown diikat ke menuOpen, bukan ke IntersectionObserver.
                Drawer tidak pernah masuk viewport secara normal, jadi observer
                akan menyebutnya "tidak terlihat" selamanya danUtility
                .js .stagger > * akan meninggalkan semua tautan di opacity 0:
                menu terbuka tapi isinya tidak kelihatan sama sekali.
                Diikat ke state, efek masuknya justru jadi tepat waktu.
              */}
              <ul className="stagger" data-shown={menuOpen ? "true" : undefined}>
                {items.map((link) => {
                  const isActive = active === link.id;
                  return (
                    <li key={link.id} className="rule-b">
                      <a
                        href={link.href}
                        aria-current={isActive ? "true" : undefined}
                        onClick={() => {
                          const details = menuRef.current;
                          setMenuOpen(false);
                          if (details) details.open = false;
                        }}
                        className="display flex min-h-16 items-center justify-between gap-4 px-5 py-4 text-2xl transition-colors duration-120"
                      >
                        {link.label}
                        <span aria-hidden="true" className="text-sm">
                          {isActive ? "●" : "→"}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/*
                Di dalam drawer, karena pemilih bahasa disembunyikan dari header
                mobile. Kalau ini lupa, layar kecil jadi tidak punya cara berganti
                bahasa sama sekali, dan tombol di desktop tidak akan pernah
                terlihat di sana.
              */}
              <div className="px-5 py-5">
                <LocaleSwitcher locale={locale} label={switcherLabel} />
              </div>
            </div>
          </details>
        </div>
      </nav>

      <ScrollProgress />
    </header>
  );
}
