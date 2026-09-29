import {
  siCss,
  siDart,
  siEjs,
  siFlutter,
  siGit,
  siGithub,
  siHtml5,
  siInstagram,
  siJavascript,
  siMysql,
  siNetlify,
  siNextdotjs,
  siPhp,
  siReact,
  siSupabase,
  siVercel,
} from "simple-icons";

/*
 * Simple Icons (CC0) dipakai karena isinya cap mark resmi dari produk yang
 * namanya disebut di halaman ini, bukan set ikon UI generik. Kalau nama tidak
 * ada di sini, komponen mengembalikan null dan tidak menggambar apa pun,
 * karena lebih baik tanpa icon daripada icon yang tidak relevan (R-04).
 *
 * Semua icon memakai currentColor supaya tidak menambah warna baru di luar
 * palet merah, biru, kuning (R-29).
 */

const LINKEDIN =
  "M416 32L31.9 32C14.3 32 0 46.5 0 64.3L0 447.7C0 465.5 14.3 480 31.9 480L416 480c17.6 0 32-14.5 32-32.3l0-383.4C448 46.5 433.6 32 416 32zM135.4 416l-66.4 0 0-213.8 66.5 0 0 213.8-.1 0zM102.2 96a38.5 38.5 0 1 1 0 77 38.5 38.5 0 1 1 0-77zM384.3 416l-66.4 0 0-104c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9l0 105.8-66.4 0 0-213.8 63.7 0 0 29.2 .9 0c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9l0 117.2z";

/*
 * LinkedIn tidak ada di Simple Icons v16 karena cap mark-nya tidak
 * direlease sebagai ikon bebas. Path di atas diambil dari Font Awesome Free
 * Brands (CC BY 4.0), di-inline supaya tidak menambah dependency runtime.
 * ViewBox-nya 448x512, bukan 24x24 seperti Simple Icons, jadi setiap entri
 * boleh punya viewBox sendiri.
 */const ICONS: Record<string, { path: string; viewBox: string }> = {
  html: { path: siHtml5.path, viewBox: "0 0 24 24" },
  css: { path: siCss.path, viewBox: "0 0 24 24" },
  javascript: { path: siJavascript.path, viewBox: "0 0 24 24" },
  php: { path: siPhp.path, viewBox: "0 0 24 24" },
  ejs: { path: siEjs.path, viewBox: "0 0 24 24" },
  dart: { path: siDart.path, viewBox: "0 0 24 24" },
  flutter: { path: siFlutter.path, viewBox: "0 0 24 24" },
  react: { path: siReact.path, viewBox: "0 0 24 24" },
  nextjs: { path: siNextdotjs.path, viewBox: "0 0 24 24" },
  mysql: { path: siMysql.path, viewBox: "0 0 24 24" },
  supabase: { path: siSupabase.path, viewBox: "0 0 24 24" },
  git: { path: siGit.path, viewBox: "0 0 24 24" },
  github: { path: siGithub.path, viewBox: "0 0 24 24" },
  instagram: { path: siInstagram.path, viewBox: "0 0 24 24" },
  linkedin: { path: LINKEDIN, viewBox: "0 0 448 512" },
  netlify: { path: siNetlify.path, viewBox: "0 0 24 24" },
  vercel: { path: siVercel.path, viewBox: "0 0 24 24" },
};

type TechIconProps = {
  name: string;
  className?: string;
};

export function TechIcon({ name, className = "h-5 w-5" }: TechIconProps) {
  const icon = ICONS[name.toLowerCase()];
  if (!icon) return null;

  return (
    <svg
      aria-hidden="true"
      viewBox={icon.viewBox}
      className={className}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}
