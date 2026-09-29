import Image from "next/image";
import type { Dict } from "@/lib/i18n";
import { Reveal, RevealGroup } from "@/lib/reveal";

/*
 * AI tools, bagian dari section Bahasa.
 *
 * Kelima alat ini sudah punya logo asli di public/img, jadi tidak ada lagi
 * alasan bentuknya berbeda antara "umum" dan "coding": keduanya alat yang
 * dipakai untuk bekerja. Bentuk yang sama untuk semua ini bukan ke uniformity
 * yang asal, melainkan karena tidak ada hierarki yang jujur bisa dibuat di
 * antara lima logo ini (R-14).
 *
 * Dua kolom kartu yang isinya sama persis dihapus. Yang dipakai sekarang satu
 * lembar spesifikasi: label di kiri, isinya di kanan, dipisah garis rambut.
 * Motif yang sama dipakai ulang oleh ToolsLedger di bawahnya, dan itu memang
 * disengaja: satu motif, bukan dua template.
 *
 * Logo dinormalkan di atas satu piring putih yang sama. Claude dan Gemini
 * masuk sebagai JPG tanpa alpha, sedangkan OpenCode dan Freebuff PNG transparan.
 * Tanpa piring yang sama, JPG akan muncul sebagai kotak putih di atas krem dan
 * kelihatan seperti aset yang belum dirapikan (R-04).
 *
 * Server Component, jadi tidak menambah bundle browser.
 */
type AiToolsProps = {
  text: Dict["languages"]["ai"];
};

export function AiTools({ text }: AiToolsProps) {
  const groups = [text.general, text.coding];

  return (
    <Reveal className="rule-t mt-14 pt-10">
      <p className="label text-primary">{text.label}</p>

      <dl className="mt-6">
        {groups.map((group) => (
          <div
            key={group.label}
            className="rule-b grid gap-x-6 gap-y-4 py-5 first:border-t-0 first:pt-0 sm:grid-cols-12"
          >
            <dt className="sm:col-span-4">
              <p className="label text-ink-soft">{group.label}</p>
              <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-ink-soft">
                {group.note}
              </p>
            </dt>
            <dd className="sm:col-span-8">
              <RevealGroup as="ul" className="flex flex-wrap gap-4">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="frame flex w-24 flex-col items-center gap-2 bg-paper p-2"
                  >
                    <span className="flex h-12 w-12 items-center justify-center bg-white p-1">
                      {item.logo ? (
                        <Image
                          src={item.logo}
                          alt=""
                          width={48}
                          height={48}
                          className="h-full w-full object-contain"
                        />
                      ) : null}
                    </span>
                    <span className="label text-center text-ink">
                      {item.name}
                    </span>
                  </li>
                ))}
              </RevealGroup>
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
