/*
 * Konstanta locale sengaja dipisah dari i18n.ts.
 *
 * i18n.ts mengimpor next/headers supaya bisa membaca cookie, dan modul itu
 * hanya boleh dipakai di server. Client Component seperti LocaleSwitcher juga
 * butuh daftar bahasa, jadi konstantanya tinggal di sini, bebas dari API
 * server, dan diimpor dua arah tanpa menarik apa pun yang tidak boleh ikut ke
 * browser.
 */
export const LOCALES = ["id", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const LOCALE_COOKIE = "locale";

export const LOCALE_LABEL: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English",
};

export const LOCALE_SHORT: Record<Locale, string> = { id: "ID", en: "EN" };

/*
 * Sapaan untuk layar pembuka.
 *
 * Sengaja bukan bagian dari dictionary locale. Kata-kata ini sama persis di
 * kedua bahasa, jadi menaruhnya di sana hanya akan menduplikasi 16 baris dua
 * kali dan percaya diri bahwa isinya tidak pernah diterjemahkan. Yang berbeda
 * menurut locale cuma label di sekitarnya.
 *
 * Urutan tetap dan tidak diacak, supaya render server dan render client
 * selalu menghasilkan kata yang sama. Sapaan pertama untuk Indonesia adalah
 * "Hai", untuk English adalah "Hi", jadi layar dimulai dari bahasa pembaca.
 */
export const GREETINGS = [
  "Hai",
  "Hi",
  "こんにちは",
  "Bonjour",
  "Hallo",
  "Привет",
  "Hola",
  "Ciao",
  "Olá",
  "안녕하세요",
  "你好",
  "Cześć",
  "Merhaba",
  "Hei",
  "สวัสดี",
  "Xin chào",
] as const;

export const GREETING_START: Record<Locale, number> = { id: 0, en: 1 };
