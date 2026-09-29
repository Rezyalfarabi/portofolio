/**
 * Data yang tidak berubah antar bahasa: tautan kontak saja.
 * Semua teks yang perlu diterjemahkan ada di src/lib/i18n.ts.
 */

/**
 * id dipakai sebagai kunci ke cardNotes di dictionary, karena kalimat yang
 * menjelaskan tiap kanal itu perlu diterjemahkan dan tidak boleh tinggal di
 * sini bersama URL.
 */
export type ContactLink = {
  id: "github" | "instagram" | "linkedin";
  label: string;
  value: string;
  href: string;
  icon: string;
  external: boolean;
};

export const contactLinks: readonly ContactLink[] = [
  {
    id: "github",
    label: "GitHub",
    value: "Rezyalfarabi",
    href: "https://github.com/Rezyalfarabi",
    icon: "github",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "devick404",
    href: "https://www.instagram.com/devick404/",
    icon: "instagram",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "mochammad-rezy-alfarabi",
    href: "https://www.linkedin.com/in/mochammad-rezy-alfarabi-888915427/",
    icon: "linkedin",
    external: true,
  },
];
