"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n";
import { Reveal, RevealGroup } from "@/lib/reveal";
import { TechIcon } from "./TechIcon";

/**
 * Daftar bahasa sebagai kontrol tab-ish, panel detail di sebelahnya.
 *
 * Keduanya dikembalikan sebagai dua anak langsung dari grid LanguagesSection,
 * jadi posisi kolomnya diatur dari sana, bukan di sini.
 *
 * Keadaan terpilih dinyatakan tiga kali supaya tidak cuma warna: isi tombol
 * dibalik jadi hitam di atas krem, ada aria-pressed, dan panel detail punya
 * aria-live supaya perubahan terbaca pembaca layar.
 */
export function Languages({ text }: { text: Dict["languages"] }) {
  const [activeSlug, setActiveSlug] = useState<string>(text.items[0].icon);
  const active =
    text.items.find((item) => item.icon === activeSlug) ?? text.items[0];

  return (
    <>
      <RevealGroup as="ul" className="self-start rule-t lg:col-span-5">
        {text.items.map((item) => {
          const isActive = item.icon === activeSlug;
          return (
            <li key={item.icon} className="rule-b">

              <button
                type="button"
                aria-pressed={isActive}
                aria-controls="detail-bahasa"
                onClick={() => setActiveSlug(item.icon)}
                className={`flex min-h-14 w-full items-center gap-3 px-3 py-3 text-left transition-colors duration-120 ${
                  isActive
                    ? "bg-ink text-paper"
                    : "hover:bg-paper-deep active:bg-paper-deep"
                }`}
              >
                <TechIcon name={item.icon} className="h-6 w-6 shrink-0" />
                <span className="display flex-1 text-sm">{item.name}</span>
                <span
                  className={`label shrink-0 ${isActive ? "text-paper" : "text-ink-soft"}`}
                >
                  {item.category}
                </span>
              </button>
            </li>
          );
        })}
      </RevealGroup>

      {/*
        Panel detail. Tiga lapis dijawab sebagai tiga baris berlabel, bukan
        satu paragraf panjang, karena isinya menjawab tiga pertanyaan berbeda:
        apa itu, untuk apa, dan bagian mana yang belum paham (R-14).

        Barisnya memakai ritme label-kiri/nilai-kanan yang sama dengan AiTools
        dan ToolsLedger di bawahnya, jadi panel ini terasa bagian dari satu
        sistem dan bukan komponen yang menempel.
      */}
      <Reveal className="reveal-pop lg:col-span-6 lg:col-start-7">
        <div id="detail-bahasa" aria-live="polite" className="frame bg-paper-deep">
          <div className="flex items-center gap-3 p-6 pb-5">
            <TechIcon name={active.icon} className="h-9 w-9" />
            <div>
              <p className="display text-lg leading-tight">{active.name}</p>
              <p className="label mt-1 text-ink-soft">{active.category}</p>
            </div>
          </div>

          <p className="px-6 pb-6 leading-relaxed">{active.detail}</p>

          <dl>
            <div className="rule-t grid gap-x-6 gap-y-1 px-6 py-5 sm:grid-cols-12">
              <dt className="label text-primary sm:col-span-3">
                {text.panelLabels.usedFor}
              </dt>
              <dd className="leading-relaxed text-ink-soft sm:col-span-9">
                {active.usedFor}
              </dd>
            </div>
            <div className="rule-t grid gap-x-6 gap-y-1 px-6 py-5 sm:grid-cols-12">
              <dt className="label text-primary sm:col-span-3">
                {text.panelLabels.note}
              </dt>
              <dd className="leading-relaxed text-ink-soft sm:col-span-9">
                {active.note}
              </dd>
            </div>
          </dl>
        </div>
      </Reveal>
    </>
  );
}
