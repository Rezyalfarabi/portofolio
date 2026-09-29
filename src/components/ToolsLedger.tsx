import type { Dict } from "@/lib/i18n";
import { Reveal, RevealGroup } from "@/lib/reveal";
import { TechIcon } from "./TechIcon";

/*
 * Database dan tools, sekarang bagian dari section Bahasa.
 *
 * Isinya daftar, jadi tampilannya juga daftar, bukan kartu: label mono di kiri,
 * nilai di kanan, dipisah garis keras. Cap mark-nya cap mark resmi produknya,
 * monokrom, jadi tidak menambah warna baru di luar palet.
 */
export function ToolsLedger({ text }: { text: Dict["languages"]["tools"] }) {
  return (
    <Reveal className="rule-t mt-14 pt-10">
      <p className="label text-primary">{text.label}</p>

      <dl className="mt-6">
        {text.groups.map((group) => (
          <div
            key={group.label}
            className="rule-b grid gap-x-6 gap-y-4 py-5 first:border-t-0 first:pt-0 sm:grid-cols-12"
          >
            <dt className="label text-ink-soft sm:col-span-3">{group.label}</dt>
            <dd className="sm:col-span-9">
              <RevealGroup as="ul" className="flex flex-wrap gap-x-6 gap-y-4">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-center gap-2.5">
                    <TechIcon name={item.icon} className="h-6 w-6 shrink-0" />
                    <span className="leading-tight">
                      <span className="font-mono text-sm">{item.name}</span>
                      {item.sub ? (
                        <span className="block text-xs text-ink-soft">
                          {item.sub}
                        </span>
                      ) : null}
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
