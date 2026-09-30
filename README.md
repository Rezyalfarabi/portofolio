# Rezy Alfarabi — Portofolio

> Tempat ide-ide kecil dirapikan menjadi pengalaman digital yang bisa dibuka siapa saja.

Selamat datang di portofolio **Rezy Alfarabi**, siswa SMK Jakarta Pusat 1 dari jurusan **Rekayasa Perangkat Lunak**. Situs ini bukan sekadar kumpulan proyek, tetapi juga catatan perjalanan belajar: mencoba, memperbaiki, menemukan bug, lalu mencoba lagi dengan cara yang lebih baik.

🌐 **Lihat versi live:** [portofolio-rezy-alfarabi.vercel.app](https://portofolio-rezy-alfarabi.vercel.app)

## Sedikit tentang situs ini

Portofolio ini dirancang sebagai halaman tunggal dengan alur yang sederhana dan nyaman diikuti. Mulai dari perkenalan singkat, teknologi yang digunakan, cerita pendidikan, proyek sekolah, hingga ruang untuk bertanya dan menghubungi saya.

Di balik tampilannya yang santai, setiap bagian memiliki peran:

- **Hero** — sapaan pertama dan identitas singkat.
- **Technology bar** — perangkat yang membantu saya membangun proyek.
- **About** — sedikit cerita tentang diri dan minat saya.
- **Languages** — pilihan bahasa Indonesia dan English.
- **Education** — latar pendidikan.
- **School projects** — proyek-proyek yang pernah dikerjakan.
- **Q&A** — jawaban untuk pertanyaan yang sering muncul.
- **Closing & contact** — penutup dan cara untuk terhubung.

Susunan dan bentuk section mengikuti aturan desain yang terdokumentasi di [`DESIGN.md`](DESIGN.md), jadi perubahan visual sebaiknya tetap mengikuti panduan tersebut.

## Dibangun dengan apa?

| Bagian | Teknologi |
| --- | --- |
| Framework | Next.js 16 dengan App Router dan React 19 |
| Styling | Tailwind CSS 4 |
| Bahasa antarmuka | Bahasa Indonesia dan English |
| Font | Silkscreen, IBM Plex Sans, dan IBM Plex Mono |
| Ikon | `simple-icons` |

Font digunakan secara self-hosted melalui `next/font`, sedangkan pilihan bahasa disimpan di cookie. Dengan begitu, preferensi bahasa sudah tersedia sejak request pertama dan halaman tidak perlu mengalami kedipan kecil yang mengganggu.

## Menjalankan proyek secara lokal

Pastikan Node.js dan npm sudah terpasang, lalu jalankan:

```bash
npm install
npm run dev
```

Setelah itu, buka [http://localhost:3004](http://localhost:3004) di browser.

Beberapa perintah lain yang mungkin berguna:

```bash
npm run build   # membuat build untuk produksi
npm run start   # menjalankan hasil build di port 3004
npm run lint    # memeriksa kode dengan ESLint
```

## Peta kecil di dalam repositori

```text
src/
├── app/                 # layout, halaman utama, dan global styles
├── components/          # section halaman, navigasi, dan footer
└── lib/
    ├── i18n.ts          # seluruh teks dalam dua bahasa
    └── qa-content.ts    # konten tanya jawab

public/img/              # foto sekolah dan screenshot proyek
design.md                # catatan arah visual dan aturan desain
dokumen.md               # sumber data diri untuk isi halaman
```

Foto sekolah berada di `public/img/smk.jpg` dan digunakan pada section Pendidikan melalui `src/lib/i18n.ts`. Ukuran gambar aslinya adalah **638 × 480 piksel**; nilai tersebut dipertahankan di `src/components/Education.tsx` agar layout tetap stabil saat halaman dimuat.

## Catatan desain

Portofolio ini memadukan nuansa digital yang sedikit retro dengan tata letak yang bersih. Warna, tipografi, kontras, dan urutan section bukan dipilih secara acak sepenuhnya—ada alasan di baliknya, walaupun sesekali inspirasi bisa datang dari hal random seperti warna layar terminal atau playlist saat coding.

Dokumen terkait:

- [`DESIGN.md`](DESIGN.md) — arah desain, palet warna, tipografi, dan aturan kontras.
- [`dokumen.md`](dokumen.md) — sumber data diri yang digunakan di halaman.

## Terima kasih sudah mampir

Kalau kamu menemukan sesuatu yang menarik, punya saran, atau ingin berdiskusi tentang proyek dan teknologi, jangan ragu untuk menghubungi saya melalui halaman portofolio.

Satu baris kode mungkin terlihat kecil. Kalau dikumpulkan, ia bisa menjadi sesuatu yang berarti.
