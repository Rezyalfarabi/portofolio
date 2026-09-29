import type { Dict } from "@/lib/i18n";
import { AiTools } from "./AiTools";
import { Languages } from "./Languages";
import { SectionHead } from "./SectionHead";
import { ToolsLedger } from "./ToolsLedger";

/*
 * Section Bahasa, sekaligus tempat semua alat kerja ditulis: bahasa yang
 * dipelajari, AI tools, lalu database dan tools. Semuanya satu keluarga, jadi
 * dikumpulkan dalam satu section, bukan disebar menjadi beberapa section.
 *
 * Server Component, jadi AiTools dan ToolsLedger yang isinya statis tidak ikut
 * ke bundle browser. Yang interaktifnya cuma Languages.
 */
export function LanguagesSection({ text }: { text: Dict["languages"] }) {
  return (
    <section id="bahasa" aria-label={text.heading}>
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHead index="02" title={text.heading} note={text.note} />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Languages text={text} />
        </div>

        <AiTools text={text.ai} />
        <ToolsLedger text={text.tools} />
      </div>
    </section>
  );
}
