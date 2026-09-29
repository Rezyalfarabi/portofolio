"use client";

import type { Dict } from "@/lib/i18n";
import { TechIcon } from "./TechIcon";

/*
 * Pita bahasa yang berjalan sendiri, tepat di bawah hero.
 *
 * Yang bergerak hanya transform, jadi tidak ada layout yang dihitung ulang tiap
 * frame. Salinan kedua membuat lebar track tepat dua kali lebar salinan
 * pertama, jadi menggeser -50% mendarat tepat di awal lagi tanpa lompatan.
 *
 * Dua hal yang tetap dijaga meski pita ini sengaja berjalan terus:
 *
 * 1. Untuk prefers-reduced-motion, salinan kedua disembunyikan, animasi
 *    dimatikan, dan sisa pita jadi bisa digeser dengan tangan. Jadi semua
 *    bahasa tetap terbaca, tidak cuma yang kebetulan masuk layar.
 * 2. Pita berhenti saat kursor berada di atasnya, jadi orang yang sedang
 *    membaca daftar itu punya cara menghentikannya tanpa mencari kontrol.
 *
 * Daftar ditulis dua kali. Salinan kedua disembunyikan dari pembaca layar dan
 * dari Tab; kalau tidak, setiap bahasa akan dibacakan dua kali.
 */
type LanguageMarqueeProps = {
  items: Dict["languages"]["items"];
  text: Dict["marquee"];
};

export function LanguageMarquee({ items, text }: LanguageMarqueeProps) {
  function list(key: string, hidden: boolean) {
    return (
      <ul
        key={key}
        {...(hidden ? { "aria-hidden": true } : {})}
        className="flex shrink-0 items-center"
      >
        {items.map((item) => (
          <li key={item.icon} className="flex items-center">
            <span className="flex items-center gap-2.5 px-6">
              <TechIcon name={item.icon} className="h-5 w-5 shrink-0" />
              <span className="display text-sm">{item.name}</span>
            </span>
            <span aria-hidden="true" className="text-primary">
              /
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section
      aria-label={text.label}
      className="marquee rule-t bg-band py-3 text-band-fg"
    >
      <div className="marquee-viewport relative overflow-hidden">
        <div className="marquee-track flex w-max items-center">
          {list("pertama", false)}
          {list("kedua", true)}
        </div>
      </div>
    </section>
  );
}
