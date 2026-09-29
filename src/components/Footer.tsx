import type { ContactLink } from "@/lib/data";
import type { Dict } from "@/lib/i18n";
import { TechIcon } from "./TechIcon";

/*
 * Penutup halaman. Hitam pekat dengan teks krem, 19.42:1. Permukaannya
 * sengaja dibiarkan polos supaya kontras teks itu tidak perlu dipertahankan
 * lewat motif apa pun.
 *
 * Bentuknya tiga baris dengan tugas berbeda, bukan empat kolom template:
 *
 * 1. Identitas. Nama dicetak besar karena penutup ini miliknya, tagline
 *    disejajarkan di kanan supaya barisnya terbaca seperti kop, bukan judul.
 * 2. Tiga blok data yang memang dimiliki halaman ini: navigasi dari
 *    dictionary, kanal kontak dari src/lib/data.ts, dan data siswa dari
 *    profile.meta. Semuanya punya tujuan, jadi tidak ada satu pun tautan yang
 *    mengarah ke tempat kosong (R-17, R-26).
 * 3. Kolofon: tahun, pembuat, dan kembali ke atas.
 *
 * Tahun copyright ditulis statis di dictionary, bukan Date.now() di dalam
 * render, karena angka itu harus sama antara server dan browser (lihat
 * DESIGN.md, "Aturan hydration").
 *
 * Garis pemisah memakai border-band-fg/40, bukan rule-t/rule-b, karena dua
 * utilitas itu bertinta ink dan akan hilang di atas latar hitam.
 */
type FooterProps = {
  text: Dict["footer"];
  profile: Dict["profile"];
  nav: Dict["nav"];
  newTab: string;
  links: readonly ContactLink[];
};

export function Footer({ text, profile, nav, newTab, links }: FooterProps) {
  const filled = links.filter((link) => Boolean(link.value && link.href));

  return (
    <footer className="rule-t bg-band text-band-fg">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-5 border-b-[3px] border-band-fg/40 pb-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="display text-[clamp(1.75rem,6vw,3rem)] leading-none">
              {profile.name.toUpperCase()}
            </p>
            <p className="label mt-3 text-band-fg/70">{profile.role}</p>
          </div>
          <p className="max-w-[46ch] text-sm leading-relaxed text-band-fg/70 lg:col-span-5 lg:justify-self-end lg:text-right">
            {profile.tagline}
          </p>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <nav aria-label={text.navLabel}>
            <h2 className="label text-band-fg/60">{text.navLabel}</h2>
            <ul className="mt-3 grid">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="display inline-flex min-h-11 items-center text-sm text-band-fg/80 transition-colors duration-120 hover:text-band-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label text-band-fg/60">{text.contactLabel}</h2>
            <ul className="mt-3 grid">
              {filled.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="group inline-flex min-h-11 items-center gap-3 text-band-fg/80 transition-colors duration-120 hover:text-band-fg"
                  >
                    <TechIcon
                      name={link.icon}
                      className="h-5 w-5 shrink-0 text-band-fg/70 group-hover:text-band-fg"
                    />
                    <span className="font-mono text-sm underline decoration-band-fg/30 underline-offset-4 group-hover:decoration-band-fg">
                      {link.value}
                    </span>
                    {link.external ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="label text-band-fg/40 group-hover:text-band-fg"
                        >
                          ↗
                        </span>
                        <span className="sr-only">({newTab})</span>
                      </>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label text-band-fg/60">{text.detailsLabel}</h2>
            <dl className="mt-3 grid gap-3">
              {profile.meta.map((item) => (
                <div key={item.label}>
                  <dt className="label text-band-fg/60">{item.label}</dt>
                  <dd className="mt-1 font-mono text-sm">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t-[3px] border-band-fg/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-band-fg/60">{text.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <p className="label text-band-fg/60">{text.builtWith}</p>
            <a
              href="#atas"
              className="label inline-flex min-h-11 items-center gap-2 text-band-fg/80 transition-colors duration-120 hover:text-band-fg"
            >
              {text.backToTop}
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
