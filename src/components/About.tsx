import type { Dict } from "@/lib/i18n";
import { Reveal } from "@/lib/reveal";
import { SectionHead } from "./SectionHead";

/*
 * Judul di kolom kiri, paragraf di kolom kanan.
 * Ruang kosong yang lebar di kiri itu struktural, bukan sisa ruang.
 */
export function About({ text }: { text: Dict["about"] }) {
  return (
    <section
      id="tentang"
      aria-label={text.heading}
      className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHead index="01" title={text.heading} />
        </div>

        <Reveal className="reveal-slide lg:col-span-7 lg:col-start-6">
          <div className="space-y-6 text-lg leading-relaxed">
            {text.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
