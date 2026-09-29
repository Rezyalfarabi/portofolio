"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";
import { RevealGroup } from "@/lib/reveal";
import { SectionHead } from "./SectionHead";

/*
 * Indeks di kiri, preview di kanan.
 *
 * Nama, ringkasan, dan tautan repo tiap proyek ada di src/lib/i18n.ts,
 * isinya diturunkan dari README masing-masing repo supaya penjelasannya bisa
 * dipertanggungjawabkan, bukan dikarang (R-17, R-38). Kalau ringkasan satu
 * proyek dikosongkan, yang tampil adalah placeholder yang jujur menyebut
 * berkas yang perlu diisi.
 */
function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="label inline-flex min-h-11 items-center gap-2 underline decoration-2 underline-offset-4 transition-colors duration-120 hover:text-secondary"
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export function Projects({ text }: { text: Dict["projects"] }) {
  const [activeImage, setActiveImage] = useState<string | null>(
    text.items[0]?.image ?? null,
  );
  const previewRef = useRef<HTMLDivElement | null>(null);

  const active = text.items.find((item) => item.image === activeImage) ?? null;

  function select(image: string) {
    setActiveImage(image);

    /*
     * Di layar sempit preview berada di atas daftar, jadi hasil klik bisa
     * saja di luar layar. Kalau begitu, bawa ke pandangan. Di layar lebar
     * preview selalu terlihat, jadi tidak ada yang digeser.
     */
    const preview = previewRef.current;
    if (!preview) return;
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    if (preview.getBoundingClientRect().top < 0) {
      preview.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  if (text.items.length === 0) {
    return (
      <section id="proyek" aria-label={text.heading} className="rule-t">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="frame bg-paper-deep px-6 py-10">
            <p className="label text-ink-soft">{text.placeholderNote}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="proyek" aria-label={text.heading} className="rule-t">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHead index="04" title={text.heading} />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div
            ref={previewRef}
            className="order-1 scroll-mt-32 lg:order-2 lg:col-span-7"
          >
            {active ? (
              <figure id="preview-proyek" className="hard-shadow frame">
                <Image
                  key={active.image}
                  src={active.image}
                  alt={`${active.title}`}
                  width={1920}
                  height={1080}
                  className="block w-full"
                  priority={active.image === text.items[0].image}
                />
                <figcaption className="rule-t px-4 py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <span className="display text-sm">{active.title}</span>
                    <a
                      href={active.image}
                      target="_blank"
                      rel="noreferrer"
                      className="label underline decoration-2 underline-offset-4 transition-colors duration-120 hover:text-secondary"
                    >
                      {text.openOriginal}
                    </a>
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">
                    {active.summary ?? (
                      <span className="font-mono">{text.placeholderNote}</span>
                    )}
                  </p>

                  {/*
                    Tautan repo dan situs langsung hanya muncul kalau URL-nya
                    memang ada di dictionary. Tanpa itu baris ini akan jadi
                    tautan yang diklik tapi tidak ke mana-mana (R-26).
                  */}
                  {active.repo || active.live ? (
                    <div className="mt-2 flex flex-wrap items-center gap-x-6">
                      {active.repo ? (
                        <ProjectLink href={active.repo} label={text.repoLabel} />
                      ) : null}
                      {active.live ? (
                        <ProjectLink href={active.live} label={text.liveLabel} />
                      ) : null}
                    </div>
                  ) : null}
                </figcaption>
              </figure>
            ) : null}
          </div>

          <RevealGroup
            as="ul"
            className="order-2 self-start rule-t lg:order-1 lg:col-span-5"
            aria-label={text.heading}
          >
            {text.items.map((project, i) => {
              const isActive = project.image === activeImage;
              return (
                <li key={project.image} className="rule-b">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="preview-proyek"
                    onClick={() => select(project.image)}
                    className={`flex min-h-14 w-full items-center gap-4 px-4 py-3 text-left transition-colors duration-120 ${
                      isActive
                        ? "bg-primary text-paper"
                        : "hover:bg-paper-deep active:bg-paper-deep"
                    }`}
                  >
                    <span
                      className={`label shrink-0 ${isActive ? "text-paper" : "text-ink-soft"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-sm">{project.title}</span>
                  </button>
                </li>
              );
            })}
          </RevealGroup>
        </div>

        {/*
          Blok PKL. Sengaja bukan baris ketujuh di daftar atas: baris tanpa
          gambar akan jadi tombol yang diklik tapi tidak terjadi apa-apa, dan
          itu persis kontrol yang tidak berfungsi (R-26).

          Yang ditulis di sini adalah jawaban atas pertanyaan yang memang belum
          bisa dijawab, jadi blok kosong ini jujur dan bukan kelalaian: belum
          ada, dan kapan akan diisi (R-27, R-38).
        */}
        <aside
          aria-label={text.pkl.label}
          className="rule-t mt-12 grid gap-8 pt-10 lg:grid-cols-12 lg:gap-10"
        >
          <div className="lg:col-span-5">
            <p className="label text-primary">{text.pkl.label}</p>
            <h3 className="display mt-3 text-xl leading-snug sm:text-2xl">
              {text.pkl.status}
            </h3>
            <p className="label mt-4 text-ink-soft">
              {text.pkl.dateLabel} {text.pkl.date}
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {/*
              Slot kosongnya dibiarkan kosong dan diberi alasan di dalamnya.
              Mengisi kotak ini dengan gambar placeholder atau kotak abu-abu
              hanya akan menyembunyikan fakta bahwa isinya memang belum ada.
            */}
            <div className="flex aspect-[16/9] items-center justify-center bg-paper-deep frame">
              <p className="label text-ink-soft">{text.pkl.status}</p>
            </div>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-soft">
              {text.pkl.body}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
