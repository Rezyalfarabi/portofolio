import { THEME_SCRIPT } from "./theme";

/*
 * Satu-satunya skrip yang boleh jalan sebelum frame pertama digambar.
 *
 * Ada dua hal yang harus selesai sebelum browser mulai melukis, dan keduanya
 * tidak bisa menunggu React:
 *
 * 1. Penanda bahwa JavaScript hidup. Semua state tersembunyi di stylesheet
 *    memakai .js sebagai penjaga, jadi tanpa penanda ini isi halaman tidak
 *    pernah dirahasiakan, dan tidak pernah perlu dipamerkan juga.
 * 2. Tema, supaya halaman tidak berkedip terang di perangkat bertema gelap.
 *
 * Keduanya digabung ke satu blok, bukan dua, karena dua skrip sebelum-paint
 * berarti dua chances Reader bisa sempat menggambar frame di antaranya.
 */
export const PRE_PAINT_SCRIPT = `document.documentElement.classList.add("js");${THEME_SCRIPT}`;
