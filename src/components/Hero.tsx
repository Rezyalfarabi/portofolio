import type { Dict } from "@/lib/i18n";
import { TypeName } from "./TypeName";

type HeroProps = {
  profile: Dict["profile"];
  plate: string;
  cta: string;
  ctaContact: string;
};

/**
 * Fokus tunggal halaman: nama. Bentuknya split, bukan judul di tengah dengan
 * dua tombol di bawahnya.
 *
 * Dua tujuan, bukan dua tombol dekoratif: yang pertama ke Tentang, yang kedua
 * ke Kontak. Keduanya benar-benar ada tujuannya, jadi tidak ada tombol yang
 * belum diisi (R-26).
 */
export function Hero({ profile, plate, cta, ctaContact }: HeroProps) {
  return (
    <section
      id="atas"
      className="mx-auto w-full max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="label text-ink-soft">{profile.role}</p>

          <h1 className="display mt-4 text-[clamp(2.5rem,11vw,6rem)]">
            <TypeName name={profile.name} />
          </h1>

          <p className="mt-8 max-w-[46ch] text-lg leading-relaxed sm:text-xl">
            {profile.tagline}
          </p>

          {/*
            Dua tujuan, bukan dua tombol dekoratif: yang pertama ke Tentang,
            yang kedua ke Kontak. Keduanya benar-benar ada tujuannya, jadi
            tidak ada tombol yang belum diisi (R-26).

            Hanya tombol pertama yang disorot. Dua tombol dengan warna sama
            akan competition tanpa alasan, karena tidak ada hierarki di antara
            "baca profil" dan "hubungi".
          */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#tentang"
              className="frame lift inline-flex min-h-11 items-center bg-secondary px-5 py-3 text-paper transition-colors duration-120 hover:bg-ink"
            >
              {cta}
            </a>
            <a
              href="#kontak"
              className="frame lift inline-flex min-h-11 items-center px-5 py-3 transition-colors duration-120 hover:bg-primary"
            >
              {ctaContact}
            </a>
          </div>
        </div>

        {/*
          Plat identitas. Ini salah satu dari hanya dua elemen di halaman yang
          memakai bayangan keras, karena secara harfiah menumpuk di atas kertas
          (R-12). Bar merah di atasnya membawa teks putih, bukan kuning.
        */}
        <aside className="hard-shadow self-start frame lg:col-span-5">
          <p className="label bg-primary px-4 py-2.5 text-paper">{plate}</p>
          <dl>
            {profile.meta.map((item) => (
              <div key={item.label} className="rule-b px-4 py-4 last:border-b-0">
                <dt className="label text-ink-soft">{item.label}</dt>
                <dd className="mt-1.5 text-lg leading-snug">{item.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
