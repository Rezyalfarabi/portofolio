import type { Dict } from "@/lib/i18n";
import { RevealGroup } from "@/lib/reveal";

/*
 * Band penutup, berdiri sendiri antara Proyek dan Kontak.
 *
 * Yang membuatnya bukan hiasan, tapi fungsinya: tanpa band ini, pembaca
 * melewati batas Proyek dan langsung masuk ke section Kontak yang tampilnya
 * sama seperti section mana pun. Band gelap ini memberi jeda, dan dua blok
 * tujuannya membuat langkah scroll ke Kontak terasa disengaja.
 *
 * Isinya murni navigasi. Tidak ada kalimat yang mengarang apa yang akan terjadi
 * setelah pembaca menghubungi, karena itu tidak diketahui (R-38).
 *
 * Hitam pekat, sama seperti pita bahasa di atas dan footer di bawah. Jadi
 * halaman punya dua momen gelap: satu di atas, satu di bawah, dan bagian
 * kontak seperti kertas yang dijepit di antaranya.
 */
type ClosingBandProps = {
  text: Dict["closing"];
};

export function ClosingBand({ text }: ClosingBandProps) {
  return (
    <section aria-label={text.label} className="rule-t bg-band text-band-fg">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {/*
          Asimetris: judul di kiri, dua tujuan di kanan. Ditengah-tengahkan akan
          terbaca seperti slide penutup yang sudah biasa kita lihat di halaman
          mana pun.
        */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="label text-accent">{text.label}</p>
            <h2 className="display mt-4 text-3xl leading-tight sm:text-4xl">
              {text.heading}
            </h2>
            <p className="mt-4 max-w-[38ch] leading-relaxed text-band-fg/70">
              {text.body}
            </p>
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {[
              { href: "#kontak", label: text.toContact, primary: true, arrow: "↓" },
              { href: "#atas", label: text.toTop, primary: false, arrow: "↑" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`frame lift flex min-h-24 items-center justify-between gap-4 px-5 py-4 ${
                    item.primary
                      ? "bg-accent text-on-accent hover:bg-band-fg"
                      : "border-band-fg/60 text-band-fg hover:bg-band-fg hover:text-on-accent"
                  }`}
                >
                  <span className="display text-base leading-tight">
                    {item.label}
                  </span>
                  <span aria-hidden="true" className="display text-sm">
                    {item.arrow}
                  </span>
                </a>
              </li>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
