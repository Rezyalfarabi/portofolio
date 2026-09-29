import Image from "next/image";
import type { Dict } from "@/lib/i18n";
import { Reveal } from "@/lib/reveal";
import { SectionHead } from "./SectionHead";

/**
 * Section pendidikan, dibaca sebagai perjalanan: foto di kiri, lalu tahun sekolah,
 * nama sekolah, jurusan, dan tiga tahap belajar yang dituruni di satu rel.
 *
 * Rel itu memakai garis hitam 3px dan kotak merah 3px, jadi motif identitas yang
 * sama seperti bingkai dan garis pemisah. Kuning tidak dipakai di sini karena
 * pita kuning di bawah adalah satu-satunya momen aksen di section ini (R-29).
 */
export function Education({ text }: { text: Dict["education"] }) {
  const { eskul, image } = text;

  return (
    <section id="pendidikan" aria-label={text.heading} className="rule-t">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHead index="03" title={text.heading} />

        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="hard-shadow frame">
              {image.src ? (
                /*
                 * Lebar dan tinggi mengikuti asli smk.jpg (638 x 480), bukan
                 * kotak 4:5. Angka yang salah membuat browser menggambar kotak
                 * dulu dengan rasio keliru, lalu memindahkannya setelah gambar
                 * terbaca, jadi halaman bergeser di tengah jalan.
                 */
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={638}
                  height={480}
                  className="block w-full"
                />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center bg-paper-deep">
                  <p className="label text-ink-soft">{image.placeholder}</p>
                </div>
              )}
            </div>
            <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-ink-soft">
              {image.note}
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="display frame inline-block bg-band px-4 py-2 text-band-fg">
              {text.years}
            </p>

            <h3 className="display mt-5 text-2xl leading-tight sm:text-3xl">
              {text.school}
            </h3>
            <p className="label mt-3 text-ink-soft">{text.major}</p>

            <p className="label mt-10 text-primary">{text.journeyLabel}</p>

            {/*
              Rel dan penandanya dulunya satu sistem koordinat: penandanya
              absolute relatif ke li, sedangkan relnya relatif ke div pembungkus,
              dan pl-9 di antara keduanya membuat keduanya meleset sekitar 30px.
              Akibatnya kotak 3px hitam itu menutupi awal kata "Frontend",
              "Backend", dan "Fullstack".

              Sekarang li-nya sendiri yang jadi grid dua kolom: kolom pertama
              lebar tetap untuk penanda, kolom kedua untuk teks. Rel digambar di
              ol yang sama, jadi pusat keduanya dijamin identik tanpa ada satu
              pun angka negatif yang harus dijaga manual.
            */}
            <ol className="relative mt-5">
              <span
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-[6.5px] w-[3px] bg-ink"
              />
              {text.steps.map((step) => (
                <li
                  key={step.step}
                  className="relative grid grid-cols-[1.75rem_1fr] gap-x-3 pb-6 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="frame mt-1 h-4 w-4 bg-primary"
                  />
                  <div>
                    <p className="display text-base">{step.step}</p>
                    <p className="mt-2 leading-relaxed text-ink-soft">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>

      <div className="rule-t bg-accent">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <Reveal className="reveal-wipe grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="display frame inline-block bg-band px-3 py-1.5 text-xs text-band-fg">
                {eskul.period}
              </p>
              <p className="display mt-4 text-lg leading-snug sm:text-xl">
                {eskul.name}
              </p>
              <p className="mt-2 text-ink-soft">{eskul.periodNote}</p>
              <p className="mt-4 max-w-[34ch] leading-relaxed">{eskul.intro}</p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              {eskul.topics.map((topic, i) => (
                <article key={topic.title} className="rule-b py-5 first:pt-0">
                  <h3 className="display text-base leading-snug">
                    <span className="mr-3 text-ink-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {topic.title}
                  </h3>
                  <div className="mt-3 space-y-3 leading-relaxed text-ink-soft">
                    {topic.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
