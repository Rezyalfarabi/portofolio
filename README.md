# Portofolio Rezy Alfarabi

Situs portofolio siswa SMK Jakarta Pusat 1, jurusan Rekayasa Perangkat Lunak.

**Live:** <https://portofolio-rezy-alfarabi.vercel.app>

## Isi halaman

Sembilan section dalam satu halaman: hero, bar teknologi, tentang, bahasa, pendidikan,
proyek sekolah, tanya, closing band, lalu kontak dan footer. Urutan dan bentuk tiap
section adalah kontrak di [`DESIGN.md`](DESIGN.md), bukan pilihan bebas saat mengedit.

## Teknologi

| Bagian | Dipakai |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Styling | Tailwind CSS 4 |
| Bahasa | Indonesian dan English, dipilih lewat dropdown di nav |
| Font | Silkscreen, IBM Plex Sans, IBM Plex Mono (self-hosted lewat `next/font`) |
| Ikon | `simple-icons` |

Bahasa disimpan di cookie, bukan localStorage, supaya halaman tidak berkedip saat
request pertama. Karena itu halaman ini dirender di server per request, bukan static.

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3004
```

```bash
npm run build   # build produksi
npm run start   # jalankan hasil build di port 3004
npm run lint    # eslint
```

## Struktur

| Path | Isi |
|---|---|
| `src/app/` | layout, halaman utama, dan `globals.css` |
| `src/components/` | satu file per section, plus nav dan footer |
| `src/lib/i18n.ts` | seluruh teks dua bahasa |
| `src/lib/qa-content.ts` | basis pengetahuan section "Tanya" |
| `public/img/` | foto sekolah dan screenshot proyek |

Foto sekolah ada di `public/img/smk.jpg` dan dipakai section Pendidikan lewat
`image.src` di `src/lib/i18n.ts`. Ukuran aslinya 638x480, dan angka `width`/`height`
di `src/components/Education.tsx` mengikuti angka itu supaya tidak ada layout shift.

## Dokumen

- [`DESIGN.md`](DESIGN.md) — arah desain, palet, tipografi, dan aturan kontras hasil ukur.
- [`dokumen.md`](dokumen.md) — sumber data diri yang dipakai isi halaman.
