import type { ContactLink } from "@/lib/data";
import type { Dict } from "@/lib/i18n";
import { RevealGroup } from "@/lib/reveal";
import { SectionHead } from "./SectionHead";
import { TechIcon } from "./TechIcon";

/**
 * Section kontak.
 *
 * Ketiga kanal punya bobot yang sama bagi pembaca, jadi kartunya sengaja
 * sama besar. Tidak ada alasan jujur untuk membuat LinkedIn lebih besar dari
 * GitHub, dan memvariasikannya hanya demi variasi akan jadi hiasan (R-14).
 *
 * Yang bikin kartu ini tidak terasa seperti template: seluruh kartunya adalah
 * tautannya, bukan cuma tombol kecil di sudut. Area yang diklik jadi jauh lebih
 * besar sekaligus lebih wajar di layar HP (R-26).
 *
 * Bayangan keras hanya muncul saat kursor masuk. Alasannya tertulis: kartu ini
 * terangkat untuk memberi tahu bahwa ia bisa diklik, dan itu satu-satunya
 * penggunaan bayangan di section ini (R-12). Sekarang kartu ini naik lalu turun
 * lagi saat ditekan, jadi sentuhan di layar kecil dapat umpan balik yang sama
 * dengan hover.
 *
 * Kanal yang belum diisi tidak dirender sama sekali, dan kalau semuanya kosong
 * yang muncul adalah catatan jujur, bukan kartu yang mengarah ke mana pun.
 */
type ContactProps = {
  text: Dict["contact"];
  links: readonly ContactLink[];
};

export function Contact({ text, links }: ContactProps) {
  const filled = links.filter((link) => Boolean(link.value && link.href));

  return (
    <section id="kontak" aria-label={text.heading}>
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHead index="06" title={text.heading} note={text.body} />

        {filled.length > 0 ? (
          <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filled.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="frame lift group flex h-full flex-col gap-4 p-5"
                >
                  <span className="flex items-start justify-between gap-3">
                    <TechIcon name={link.icon} className="h-8 w-8" />
                    {link.external ? (
                      <span
                        aria-hidden="true"
                        className="label text-ink-soft transition-colors duration-120 group-hover:text-secondary"
                      >
                        ↗
                      </span>
                    ) : null}
                  </span>

                  <span className="display text-lg leading-tight">
                    {link.label}
                  </span>

                  <span className="font-mono text-sm underline decoration-2 underline-offset-4 break-all">
                    {link.value}
                  </span>

                  {/*
                    Kalimat penjelasan kanal ini ada supaya kartu tidak berhenti
                    jadi ikon dan nama. Sumbernya di dictionary supaya ikut
                    diterjemahkan.
                  */}
                  <span className="mt-auto text-sm leading-relaxed text-ink-soft">
                    {text.cardNotes[link.id]}
                  </span>

                  {link.external ? (
                    <span className="sr-only">({text.newTab})</span>
                  ) : null}
                </a>
              </li>
            ))}
          </RevealGroup>
        ) : (
          <p className="frame bg-paper-deep px-5 py-6 text-ink-soft">
            {text.emptyNote}
          </p>
        )}
      </div>
    </section>
  );
}
