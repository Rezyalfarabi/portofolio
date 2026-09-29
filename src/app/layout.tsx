import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Silkscreen } from "next/font/google";
import "./globals.css";
import { PRE_PAINT_SCRIPT } from "@/lib/bootstrap";
import { getDict } from "@/lib/i18n";

/*
 * Silkscreen untuk display, IBM Plex Sans untuk body, IBM Plex Mono untuk
 * label meta. Alasan pilihannya ada di DESIGN.md, bukan karena ini default.
 */
const silkscreen = Silkscreen({
  weight: "400",
  variable: "--font-silkscreen",
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  subsets: ["latin"],
});

/*
 * Metadata bergantung pada locale, jadi harus dihitung per request. Versi
 * statis tidak bisa, karena akan selalu memakai judul bahasa Indonesia walau
 * pembaca sudah memilih English.
 */
export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDict();

  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const dict = await getDict();

  return (
    <html
      lang={dict.locale}
      data-scroll-behavior="smooth"
      /*
       * suppressHydrationWarning dipakai karena beberapa ekstensi browser
       * menyuntik atribut sendiri ke elemen html sebelum React hydrate, dan
       * atribut itu tidak akan pernah ada di sisi server. React akan melihat
       * atribut asing itu sebagai selisih dan memperingatkan tanpa perlu.
       * Opsi ini hanya meredam peringatan pada elemen ini saja, dan tidak
       * menutupi selisih yang nyata di isi halaman.
       */
      suppressHydrationWarning
      className={`${silkscreen.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
    >
      <body className="min-h-dvh bg-paper text-ink">
        {/*
          Skrip pra-paint harus jadi anak pertama body, bukan useEffect di dalam
          komponen. React baru menjalankan useEffect setelah hydrasi, dan itu
          sudah terlambat: browser sudah menggambar frame pertama dengan palet
          terang, jadi perangkat bertema gelap akan berkedip menyilaukan.

          Isinya dua hal sekaligus, .js dan tema, dan alasannya dijelaskan di
          lib/bootstrap.ts. Atribut data-theme yang diisikan di sini dibaca CSS,
          sementara <html> sudah punya suppressHydrationWarning di atas, jadi
          selisih antara atribut yang disuntik skrip dan yang tidak pernah ada di
          server tidak dianggap masalah oleh React.
        */}
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
