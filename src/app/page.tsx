import { About } from "@/components/About";
import { AskSection } from "@/components/AskSection";
import { ClosingBand } from "@/components/ClosingBand";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { IntroScreen } from "@/components/IntroScreen";
import { LanguageMarquee } from "@/components/LanguageMarquee";
import { LanguagesSection } from "@/components/LanguagesSection";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { SmoothScroll } from "@/components/SmoothScroll";
import { contactLinks } from "@/lib/data";
import { getDict } from "@/lib/i18n";
import { QA_ENTRIES } from "@/lib/qa-content";

/*
 * Urutan section disepakati dan tidak diubah: tentang, bahasa, pendidikan,
 * proyek, kontak. AI tools dan database/tools ikut di dalam section bahasa,
 * karena semuanya termasuk alat kerja yang sama.
 *
 * Halaman ini async karena seluruh teksnya datang dari dictionary sesuai cookie
 * locale. Client Component seperti Languages dan Projects menerima bagian
 * dictionary yang mereka pakai saja, bukan seluruh isi kamus.
 */
export default async function Home() {
  const dict = await getDict();

  return (
    <>
      <a
        href="#konten"
        className="label sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-80 focus:bg-accent focus:px-4 focus:py-3 focus:text-on-accent"
      >
        {dict.skip}
      </a>

      <IntroScreen text={dict.intro} locale={dict.locale} />

      <SmoothScroll />

      <Nav
        items={dict.nav}
        locale={dict.locale}
        switcherLabel={dict.switcherLabel}
        navAria={dict.navAria}
        brand={dict.profile.name}
        menuLabel={dict.menu.open}
        themeLightLabel={dict.theme.toLight}
        themeDarkLabel={dict.theme.toDark}
      />

      <main id="konten">
        <Hero
          profile={dict.profile}
          plate={dict.hero.plate}
          cta={dict.hero.cta}
          ctaContact={dict.hero.ctaContact}
        />
        {/*
          Pita bahasa duduk tepat setelah hero supaya daftar yang bergerak itu
          jadi transisi dari hero ke isi halaman, bukan elemen yang menggantung
          di antara dua section.

          Pita krem dengan daftar teknologi yang pernah ada di sini sudah
          dihapus. Setelah bar hitam ini, halaman langsung kembali ke krem:
          tidak ada pita kedua, tidak ada garis pemisah, dan tidak ada ruang
          kosong yang tersisa di antaranya.
        */}
        <LanguageMarquee items={dict.languages.items} text={dict.marquee} />
        <About text={dict.about} />
        <LanguagesSection text={dict.languages} />
        <Education text={dict.education} />
        <Projects text={dict.projects} />
        {/*
          Tanya sebelum Kontak, bukan sesudahnya. Section ini adalah cara
          pengunjung menyelesaikan pertanyaan yang tersisa sebelum memutuskan
          mau menghubungi, jadi urutannya mengikuti urutan berpikir orang, bukan
          urutan importance komponen.
        */}
        <AskSection
          text={dict.ask}
          locale={dict.locale}
          entries={QA_ENTRIES[dict.locale]}
        />
        <ClosingBand text={dict.closing} />
        <Contact text={dict.contact} links={contactLinks} />
      </main>

      <Footer
        text={dict.footer}
        profile={dict.profile}
        nav={dict.nav}
        newTab={dict.contact.newTab}
        links={contactLinks}
      />
    </>
  );
}
