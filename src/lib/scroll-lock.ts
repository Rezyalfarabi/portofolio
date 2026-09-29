/*
 * Kunci scroll dengan penghitung.
 *
 * Alasannya ada di sini dan bukan di masing-masing komponen: lebih dari satu
 * elemen bisa mengunci scroll pada saat yang sama, dan pola "simpan nilai lalu
 * kembalikan" milik masing-masing tidak akan benar saat mereka tumpang tindih.
 *
 * Yang terjadi kalau begitu sudah pernah terjadi: layar pembuka menyimpan "",
 * lalu menu mobile menyimpan "hidden" milik layar pembuka. Layar pembuka
 * selesai lebih dulu dan mengembalikan "", jadi halamannya kembali bisa
 * digeser padahal menu masih terbuka. Sebaliknya, kalau yang selesai terakhir
 * justru mengembalikan "hidden", halamannya terkunci permanen dan tidak ada
 * satu pun tombol yang bisa melepasnya lagi.
 *
 * Dengan penghitung, hanya kunci pertama yang benar-benar menyimpan dan
 * memasang nilai, dan hanya pelepas terakhir yang memulihkannya. Berapa pun
 * urutannya, hasil akhirnya sama dengan keadaan sebelum ada yang mengunci.
 */
let depth = 0;
let previous: string | null = null;

/*
 * Dipakai sebagai cleanup useEffect, jadi dipanggil sekali untuk setiap
 * pemasangan. Mengembalikan closure, bukan langsung memasang, supaya siapa pun
 * yang memasang bisa melepas dengan tepat.
 */
export function lockScroll(): () => void {
  if (typeof document === "undefined") return () => {};

  if (depth === 0) {
    previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  depth += 1;

  return () => {
    depth = Math.max(0, depth - 1);
    if (depth > 0 || previous === null) return;
    document.body.style.overflow = previous;
    previous = null;
  };
}
