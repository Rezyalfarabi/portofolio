# Rezy Alfarabi — Portofolio

Saya Rezy, siswa kelas XII RPL 2 di SMK Jakarta Pusat 1. Website ini adalah tempat saya menuliskan apa yang sudah saya pelajari selama berada di jurusan RPL, plus proyek-proyek kecil yang saya kerjakan. Awalnya saya cuma penasaran kenapa sebuah halaman web bisa berubah setelah tombol diklik. Rasa penasaran itu yang ujungnya jadi halaman yang sedang kamu lihat.

**Lihat langsung:** <https://portofolio-rezy-alfarabi.vercel.app>

## Isi halamannya

Satu halaman panjang, sembilan bagian:

1. Hero dengan nama yang diketik seperti di layar komputer lama
2. Bar teknologi yang berjalan terus, berhenti kalau di-hover
3. Tentang saya dan kenapa saya suka bikin web
4. Bahasa pemrograman dan alat yang saya pakai sehari-hari
5. Pendidikan, lengkap dengan foto sekolah
6. Enam proyek sekolah, klik namanya untuk ganti preview-nya
7. "Tanya saja", kotak tanya-jawab kecil tentang saya
8. Closing band dan kontak

Bahasa bisa diganti Indonesia / English lewat dropdown di nav, pilihannya tersimpan di cookie.

## Persoalan yang mungkin muncul

**Situsnya kelihatan seperti koran tahun 80-an. Sengaja?**

Sengaja. Referensinya manual komputer dan majalah teknologi tahun 1981, bukan cyberpunk. Jadi latarnya krem, tintanya hitam, warna intinya cuma merah, biru, dan kuning. Semua sudut kotak tajam, bayangannya keras tanpa blur. Aturan lengkapnya saya tulis di [DESIGN.md](DESIGN.md) biar tidak lupa sendiri kalau suatu saat mau edit.

**Section "Tanya" itu pakai AI?**

Bukan. Yang menjawab cuma pencocokan kata kunci, dan semuanya jalan di browser kamu sendiri. Cakupannya 18 topik, di luar itu jawabannya "tidak tahu" daripada saya mengarang. Tidak ada satu pun data yang dikirim ke server.

**Terus kenapa dibatasi 10 pertanyaan?**

Biar ada rasa jeda, tapi jujur saja: batasnya client-side dan bisa dilewati kalau storage-nya dihapus. Halamannya sendiri mengakui hal itu, jadi bukan batas yang pura-pura aman.

**Kenapa bahasa disimpan di cookie, bukan localStorage?**

Karena halaman ini dirender di server per request. localStorage baru kebaca setelah halaman tampil, jadi kalau dipakai, halaman akan tampil bahasa Indonesia dulu lalu kedip ke English. Cookie kebaca server sebelum halaman digambar, jadi tidak ada kedipan.

**Kenapa dev server-nya jalan di port 3004?**

Port 3000 di laptop saya sudah kepakai hal lain, jadi ya sudah, pindah saja. Jalankan `npm run dev` lalu buka `http://localhost:3004`. Mau port lain? Ubah di `package.json`.

**Foto-fotonya berat nggak?**

Beberapa screenshot proyek aslinya besar, salah satunya hampir 2 MB. Tapi semuanya lewat `next/image`, jadi yang dikirim ke pengunjung versi WebP yang jauh lebih kecil. Foto sekolah (`public/img/smk.jpg`) aslinya 638x480, dan angka `width`/`height` di komponennya mengikuti angka asli itu supaya halaman tidak lompat saat gambar loading.

**Blok PKL kok kosong?**

Karena PKL-nya memang belum ada. Saya sengaja tidak mengisinya dengan gambar abu-abu biar kelihatan penuh. Tempatnya sudah disiapkan, nanti tinggal diisi.

## Menjalankan di lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3004`. Untuk build produksi: `npm run build` lalu `npm run start`. Tidak perlu file `.env`, tidak ada API key, semuanya jalan tanpa layanan luar.

## Deploy

Situs ini jalan di Vercel dan terhubung ke repo ini. Setiap push ke `main` langsung dideploy ulang otomatis, jadi versi live selalu sama dengan versi terbaru di repo.

## Struktur singkat

- `src/app/` — layout, halaman utama, dan CSS global
- `src/components/` — satu file per section, plus nav dan footer
- `src/lib/i18n.ts` — semua teks dalam dua bahasa
- `src/lib/qa-content.ts` — isi jawaban section "Tanya"
- `public/img/` — foto sekolah dan screenshot proyek

Kalau mau tahu kenapa desainnya begini dan bukan begini, baca [DESIGN.md](DESIGN.md). Sumber data dirinya ada di [dokumen.md](dokumen.md).
