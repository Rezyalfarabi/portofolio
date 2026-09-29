"use server";

import { cookies } from "next/headers";
import { LOCALE_COOKIE, LOCALES, type Locale } from "./locales";

/*
 * Server action dipakai oleh LocaleSwitcher. Nilai locale disimpan di cookie
 * supaya pilihan bahasa bertahan saat halaman dimuat ulang, dan supaya server
 * bisa merender ulang seluruh teks di locale itu tanpa reload.
 *
 * Nilai dari form tidak dipercaya begitu saja: yang lolos hanya string yang
 * benar-benar ada di LOCALES.
 */
export async function setLocale(formData: FormData): Promise<void> {
  const requested = formData.get("locale");
  const locale: Locale = LOCALES.find((item) => item === requested) ?? "id";

  const store = await cookies();
  store.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
