# DESIGN.md

Arah desain untuk portofolio Rezy Alfarabi. File ini adalah kontrak, bukan saran.
Setiap keputusan visual di bawah harus bisa ditulis alasannya dalam satu baris (R-31).
Kalau ada keputusan baru yang tidak ada di sini, alasannya ditulis dulu di sini.

## Design Read

> Portofolio siswa RPL untuk pembaca guru, pembimbing, dan perekrut, dalam bahasa visual
> manual komputer 1981 dan panel sisi mesin arked, dial ENERGY 3 / RHYTHM 3 / MOTION 2.

## Dials

| Dial | Nilai | Yang dijanji | Yang nyata di halaman ini |
|---|---|---|---|
| ENERGY | 3 | Hero berani, situs bicara di depan | Nama dicetak sebesar mungkin di kiri atas, bukan kartu tertutup di tengah |
| RHYTHM | 3 | Section berubah-ubah bentuk | Sembilan section, sembilan komposisi berbeda (lihat Peta Section) |
| MOTION | 2 | Reveal saat scroll dan transisi saat interaksi | Reveal satu arah saat elemen masuk viewport, transisi 120 ms, tidak ada loop tanpa akhir |

R-504 mengikat RHYTHM 3: section wajib terlihat berbeda satu sama lain.
Peta di bagian "Peta Section" adalah bukti bahwa itu terpenuhi, bukan klaim.

## Palet

Tiga warna inti yang diminta pemilik, ditambah dua netral. Netral tidak masuk hitungan palet (R-29).

| Token | Hex | Peran |
|---|---|---|
| `--color-paper` | `#F2EDE0` | Krem kertas, latar seluruh halaman |
| `--color-paper-deep` | `#E8E1CF` | Krem satu langkah lebih gelap, untuk pita dan panel |
| `--color-ink` | `#141210` | Hitam hangat, teks dan garis |
| `--color-ink-soft` | `#4F4A44` | Abu hangat, teks sekunder |
| `--color-primary` | `#D8352A` | Merah, warna inti 1 |
| `--color-secondary` | `#1B4FA0` | Biru, warna inti 2 |
| `--color-accent` | `#F0C020` | Kuning, satu-satunya aksen |

**Alasan krem, bukan hitam:** nostalgia yang dimaksud adalah buku manual dan majalah
komputer tahun 1980, bukan cyberpunk. Krem membuat tinta hitam terbaca seperti tinta
dicetak, dan menjauh dari palet neon yang paling sering dipakai untuk "retro" (R-01).

**Alasan dua inti dan satu aksen:** merah dan biru adalah warna RGB primer, jadi keduanya
sudah membawa bobot yang sama dan bisa dipakai bergantian tanpa satu jadi "lebih penting".
Kuning disimpan jadi aksen tunggal karena kuning adalah warna paling terang di atas
krem, dan warna terang yang dipakai di banyak tempat langsung kehilangan tenaga (R-29).
Aturan mainnya: **aksen kuning maksimal ada di satu layar pada satu waktu.**

### Aturan kombinasi (wajib, hasil pengukuran)

Semua angka di bawah diukur dengan `antislop-human/contrast-check.py`, bukan dikira-kira.

| Pasangan | Rasio | Boleh |
|---|---|---|
| ink di paper | 15.99:1 | Ya, semua ukuran |
| ink-soft di paper | 7.50:1 | Ya, semua ukuran |
| secondary di paper | 6.72:1 | Ya, semua ukuran |
| ink di accent (kuning) | 10.92:1 | Ya, semua ukuran |
| putih di primary (merah) | 4.71:1 | Ya, semua ukuran |
| putih di secondary (biru) | 7.86:1 | Ya, semua ukuran |
| paper di secondary | 6.72:1 | Ya, semua ukuran |
| paper di ink | 19.42:1 | Ya, semua ukuran |
| **primary di paper (merah di krem)** | **4.03:1** | **Hanya "large text" WCAG, yaitu 24px ke atas** |
| **ink di primary** | **3.97:1** | **Hanya "large text" WCAG, yaitu 24px ke atas** |
| **accent di primary (kuning di merah)** | **2.75:1** | **Dilarang total** |
| **secondary di primary (biru di merah)** | **1.67:1** | **Dilarang total** |

Tiga aturan yang berasal dari tabel di atas:

1. **Blok kuning tidak pernah berisi teks putih.** Hanya tinta hitam.
2. **Blok merah tidak pernah berisi teks biru atau kuning.** Hanya putih.
3. **Merah sebagai teks di atas krem hanya untuk "large text" versi WCAG, yaitu 24px
   ke atas.** Nomor section memang dicetak 24px karena tugasnya sebagai elemen
   desain, bukan kalimat. Untuk label kecil pakai tinta.

## Tipografi

| Peran | Font | Alasan |
|---|---|---|
| Display | **Silkscreen** | Font bitmap asli era 8-bit. Ia bukan pilihan default model AI, dan bentuk hurufnya yang membuat halaman terasa seperti perangkat, bukan seperti template. Dipakai hanya untuk nama, judul section, dan logo, tidak pernah untuk paragraf. |
| Body | **IBM Plex Sans** | Berasal dari warisan mesin tulis IBM 1981, yang persis era yang dituju. humain, masih terbaca panjang, dan bukan Inter/Geist/Space Grotesk yang selalu muncul sebagai pilihan default. |
| Meta | **IBM Plex Mono** | Untuk label teknis, nama bahasa, dan metadata. Dipakai pada ukuran kecil dan pendek saja, bukan untuk heading besar (R-06). |

**Alasan tidak pakai monospace untuk seluruh halaman:** tampilan "terminal" untuk
keseluruhan adalah alasan yang tidak bisa ditulis dalam satu baris. Mono dipakai sebagai
catatan kaki teknis, bukan sebagai suara utama halaman.

**Alasan tidak pakai huruf kapital dengan spasi lebar di atas 0.2em:** kapital lebar
di sini hanya untuk label 11px seperti `B AHASA` dan `PROYEK SEKOLAH`. Di atas 14px
huruf tetap kapital-natural supaya kalimatnya tidak jadi teriak-teriak.

## Motif identitas

Satu motif, diulang: **bingkai keras 3px dengan bayangan offset tanpa blur.**

- Bingkai 3px hitam tanpa radius, di semua panel, kartu, dan tombol.
- `border-radius: 0` di seluruh halaman. Tidak ada pil, tidak ada kartu membulat (R-11).
- Bayangan keras `6px 6px 0 var(--color-ink)` hanya di dua elemen: plat identitas di hero
  dan panel preview proyek. Dipakai di situ karena keduanya adalah "kartu fisik" yang
  harus terlihat menumpuk di atas kertas, bukan melayang (R-12).
- Pita full-bleed selalu polos: tidak ada tekstur, titik, atau gradien di atasnya.
  Motif dither (titik 1px dengan grid 6px) pernah dipakai di sini dan sudah
  dihapus. Di layar besar, terutama di panel gelap penuh seperti layar pembuka,
  grid sekecil itu terbaca sebagai pixel yang tidak disengaja, bukan tekstur.
  Kontras teks juga tidak butuh bantuan motif: pita gelap memakai krem di atas
  hitam dengan rasio 19.42:1, jadi permukaannya bisa dibiarkan polos (R-25).

**Glow: nol.** R-13 mengizinkan glow di maksimal satu sampai dua elemen, dan efek itu
justru yang membuat "retro" terasa seperti template. Tanpa glow, identitasnya pindah
ke ketebalan garis dan kontras blok warna, dan itu lebih sulit dipakai sembarangan.

**Garis dekoratif tanpa arti: nol.** Tidak ada titik status, tidak ada stripe kiri
berwarna, tidak ada badge "AI Powered" (R-09, R-19, R-31).

## Gerak

MOTION 2. Tiga jenis gerak saja, semuanya punya pemicu.

| Gerak | Pemicu | Durasi | Alasan |
|---|---|---|---|
| Layar pembuka | Sekali saat halaman dimuat | 1500 ms | Menandai halaman sebagai perangkat yang dinyalakan, lalu melepas layar. Tidak diminta pengguna, jadi harus benar-benar pendek dan sekali jalan. |
| Reveal dari bawah 12px | Elemen masuk viewport | 420 ms | Membantu mata mengikuti urutan baca saat halaman panjang |
| Perpindahan warna dan garis | Hover, focus, pilihan | 120 ms | Membuat elemen terasa bisa ditekan |
| Kursor blok di hero | Sekali saat halaman dimuat, 6 kali kedip lalu berhenti | 900 ms | Menandai bahwa nama di layar ini "diketik", lalu diam. Tidak pernah loop. |
| Marquee bar teknologi | Loop kontinu, berhenti saat hover | 28 s | Satu-satunya gerak berulang di halaman. Batas-batasnya keras: hitam, mono, 9 nama, dan berhenti total kalau `prefers-reduced-motion`. Tidak ada tombol jeda, karena tombol jeda di dalam bar setinggi 51px cuma menambah noise. |

Tidak ada pulse, tidak ada float, tidak ada parallax.
Hanya marquee yang berulang tanpa henti, dan itu karena bar itu sendiri adalah
pita yang menunjukkan daftar, bukan dekorasi (R-19).

**Marquee berjarak nol dari section berikutnya.** Pita krem daftar teknologi yang
pernah ada setelah bar hitam sudah dihapus. Jadi urutannya `hero > bar hitam >
tentang` tanpa jarak dan tanpa garis bawah di antaranya.
Menggabungkan dua pita teknologi di tempat yang sama hanya mengulang hal yang
sudah terbaca dari bar hitam.

**Layar pembuka tidak boleh memblokir isi.** Aturan mainnya satu: halaman harus
terbuka penuh walau JavaScript mati, dan tidak boleh tampil untuk pengguna
reduced-motion. Keduanya dijamin di CSS, bukan di JavaScript, karena CSS sudah
dievaluasi browser sebelum halaman dicat. `visibility: hidden` di akhir animasi
membuat overlay berhenti bisa diklik, dan `prefers-reduced-motion` mengubahnya
jadi `display: none` sehingga tidak pernah mengunci scroll.

**`prefers-reduced-motion: reduce`:** semua reveal mati, kursor blok tidak berkedip,
layar pembuka tidak dirender, transisi dipangkas ke 0 ms. Konten tetap muncul
semuanya, tidak ada yang hilang.

## Peta Section

Sembilan blok, dan setiap blok punya bentuk sendiri. Ini bukti RHYTHM 3.
Urutannya disepakati pemilik dan tidak diubah sendiri.

| # | Section | Bentuk | Kenapa beda |
|---|---|---|---|
| â€” | Hero | Split 7/5, kiri filled, kanan plat | Fokus tunggal: nama |
| â€” | Bar teknologi | Pita hitam full-bleed, satu baris mono, marquee | Pemutus antara hero dan isi. Hitam di antara dua bidang krem, dan jaraknya nol ke section berikutnya. |
| 01 | Tentang | Judul di kolom 4, paragraf di kolom 7 | Asimetris, paragraf dibaca |
| 02 | Bahasa | Daftar tombol kiri, panel detail kanan, lalu blok AI tools dan ledger tools penuh di bawah | Interaktif, dan alat yang dipakai ikut di dalamnya |
| 03 | Pendidikan | Foto kiri, tahun dan sekolah di kanan, tiga tahap di satu rel, lalu pita kuning penuh | Perjalanan belajar, dibaca dari atas ke bawah |
| 04 | Proyek Sekolah | Indeks kiri, preview kanan, lalu blok PKL terpisah di bawahnya | Interaktif, perlu dipilih. PKL sengaja dipisah karena statusnya belum ada, bukan belum ditulis. |
| 05 | Tanya | Form kiri, panel jawaban kanan | Satu-satunya tempat halaman ini menerima input, jadi bentuknya harus berbeda dari semua section yang hanya dibaca |
| â€” | Closing band | Penutup hitam penuh dengan satu kalimat | Menutup daftar section sebelum masuk ke kontak |
| 06 | Kontak + Footer | Baris aturan keras, tiga kartu, lalu kolofon | Penutup, tidak butuh bentuk baru tapi tetap membawa data yang punya sumber |

**Bar teknologi tidak bernomor dan tidak masuk nav.** Ia pemutus, bukan
section. Yang menentukan urutan baca tetap nav, dan nav tidak pernah memakai
item yang tidak punya section.

**Tanya diletakkan sebelum Kontak, bukan sesudahnya.** Section ini adalah cara
pengunjung menyelesaikan pertanyaan yang tersisa sebelum memutuskan mau
menghubungi, jadi urutannya mengikuti urutan berpikir orang.

**AI tools dan ledger tools tetap di dalam Bahasa, bukan berdiri sendiri.**
Semuanya alat yang dipakai untuk bekerja, jadi memaksa satu bentuk untuk yang
umum dan yang coding akan membuat salah satunya jadi lebih lemah. Di dalam satu
section mereka tetap dibedakan: umum berupa daftar teks, coding berupa logo asli.

**Cline dihapus dari daftar AI coding.** Alatnya tidak dipakai, jadi tidak
punya tempat di halaman ini (R-17).

## Tanya sebagai alat, bukan sebagai gimmick

Section ini kelihatan seperti chatbot, jadi risikonya besar: orang mengira ini
model bahasa yang sungguhan. Yang menentukan apakah itu terjadi atau tidak bukan
tampilan, tapi kejujuran label dan kejujuran batas kemampuannya.

| Keputusan | Alasan |
|---|---|
| Disebut "Tanya saja", bukan "Tanya AI" | Yang menjawab adalah pencocokan kata kunci, bukan model. Label yang mengklaim kemampuan yang tidak ada adalah kebohongan, sekecil apa pun. |
| Ada catatan "berjalan di browser, tidak ada data yang dikirim" | Orang berhak tahu pertanyaannya tidak pernah menyentuh server. |
| Pertanyaan di luar isi dijawab "tidak tahu" | Cakupan 18 topik dijaga keras, dan lebih baikgmengatakan tidak tahu daripada menebak. |
| Batas 10 pertanyaan dan tunggu 10 menit, disertai penjelasan soal batasnya | Batas ini client-side dan memang bisa dilewati. Karena itu peringatan limitnya mengatakannya secara terbuka, bukan menyamar jadi layanan tak terbatas. |
| Countdown ditampilkan, bukan hanya "terkunci" | Orang tahu harus menunggu berapa lama, bukan cuma diberi tahu bahwa dia sedang dilarang. |
| Tombol Acak langsung bertanya, bukan mengisi kolom | Kalau cuma mengisi, orang mengira tidak terjadi apa-apa. Input dikosongkan karena pertanyaannya sudah pindah ke panel jawaban. |
| Chip contoh benar-benar mengirim | Kalau cuma mengisi kolom, itu jadi tombol mati (R-26). |
| Basis pengetahuan terpisah dari `i18n.ts` | `i18n.ts` mengimpor `next/headers`, jadi hanya aman di server. Isi Tanya masuk ke browser sebagai Client Component. |

**Kata kuncinya campur ID dan EN.** Orang mengetik dalam bahasa yang sedang
dipakai di kepalanya, bukan bahasa yang tertulis di halaman. Entri Bahasa
memang punya label dua bahasa, dan itu bukan kebetulan.

**Jawabannya ditulis tangan, bukan disusun dari data section lain.** Kalau
disusun, setiap perubahan copy di section lain diam-diam ikut mengubah jawaban
dan teks yang sudah dikoreksi jadi sulit dilacak.

**Aturan main mesinnya satu: jangan menebak.** Satu kata kunci yang cocok saja
tidak cukup kalau separuh kata pertanyaan tidak ada di kamus. Aturan inilah yang
membuat "berapa harga cryptocurrency hari ini" dijawab "tidak tahu" dan bukan
"Saya Rezy Alfarabi".

## Pendidikan sebagai perjalanan

Bagian ini dibaca orang sebagai urutan, jadi bentuknya urutan.

| Elemen | Kenapa |
|---|---|
| Slot foto di kiri, `4:5` | Foto sekolah adalah bukti, bukan hiasan. Slider kosong, dan placeholder-nya jujur menyebut file mana yang perlu diisi. |
| Tahun `2024 - 2027` di kotak hitam | Rentang waktu adalah fakta pertama soal sekolah, jadi ia diletakkan sebelum nama. |
| Rel dengan garis hitam 3px dan kotak merah 3px | Memakai motif bingkai yang sama, bukan bentuk baru. Kuning di sini dilarang karena pita eskul di bawah sudah memakai kuning. |
| Pita kuning eskul, penuh lebar | Satu-satunya momen aksen di section ini, jadi ia menutup section, bukan berdiri di tengahnya. |

Section Bahasa dan ledger tools di dalamnya sengaja tidak digabung. Yang satu
daftar yang bisa diklik, yang satu data padat, dan memaksa satu bentuk untuk
keduanya berarti salah satu jadi lebih lemah.

## Bahasa

Dua bahasa penuh, Indonesian dan English, dipilih lewat dropdown di nav.

| Keputusan | Alasan |
|---|---|
| Bahasa disimpan di cookie, bukan di localStorage | Isi halaman dirender di server. Nilai di localStorage tidak ada saat request pertama, jadi halaman akan berkedip antara dua bahasa. |
| `src/lib/i18n.ts` hanya boleh dipakai di server | Modul ini mengimpor `next/headers`. Client Component yang mengimpornya akan menarik API server ke browser dan build gagal. |
| Konstanta locale dipisah ke `src/lib/locales.ts` | Client Component butuh daftar bahasa, dan konstanta itu tidak butuh server. Pemisahan ini yang membuat satu modul bisa dipakai dua arah. |
| Nav, metadata, dan seluruh teks section dari dictionary | Kalau ada teks Indonesia yang lolos ke komponen, setengah halaman tidak akan pernah bisa diganti ke English. |
| Client Component menerima slice dictionary, bukan seluruh kamus | `Languages` dan `Projects` tinggal menerima bagian yang mereka pakai. Kamus utuh tidak perlu ikut ke browser. |
| `<details>` untuk dropdown bahasa | Daftar tetap bisa dibuka tanpa JavaScript. Yang butuh JavaScript cuma penutupan otomatis dan penanda status. |

## Aturan hydration

Error hydration paling sering di situs ini berasal dari sumber yang sama: ada
yang membaca kondisi browser saat render.

- **Jangan pernah memanggil `matchMedia` atau `Date.now()` di dalam render.**
  Server tidak punya jawabannya, jadi hasilnya pasti berbeda.
- **Angka acak, tanggal lokal, dan `toLocaleString` tidak boleh dipakai untuk
  isi yang dirender server.** Kalau memang perlu, nilainya dikirim dari server
  sebagai snapshot.
- **`suppressHydrationWarning` di `<html>` diizinkan, dan hanya di situ.**
  Beberapa ekstensi browser menyuntik atribut sendiri ke elemen `html` sebelum
  React hydrate, dan atribut itu tidak akan pernah ada di sisi server. React akan
  memperingatkan tanpa perlu. Opsi ini meredam peringatan pada elemen itu saja,
  dan tidak menutupi selisih yang nyata di isi halaman.
- **Halaman yang membaca cookie harus tetap dinamis.** Jangan pernah jadikan
  rute ini static, kalau begitu cookie akan diabaikan dan satu bahasa akan
  terkunci untuk semua orang.

## Peta Interaksi

Tidak ada tombol mati (R-26). Tabel ini adalah daftar kerja, bukan hiasan.

| Elemen | Aksi | Hasil nyata |
|---|---|---|
| Layar pembuka | Menunggu 1,5 detik, klik, atau tekan tombol apa saja | Hilang, dan halaman di bawahnya tetap bisa dipakai |
| Dropdown bahasa di nav | Klik, Enter, atau Space | Server action menulis cookie, server merender ulang seluruh halaman |
| Nav 6 item | Klik / Enter | Pindah ke section yang benar-benar ada, dengan `scroll-padding-top` yang mengikuti tinggi header yang diukur |
| Nav item aktif | Scroll | IntersectionObserver menandai item yang sedang dibaca |
| 9 baris bahasa | Klik / Enter / Space | Ganti isi panel detail, dibaca pembicara layar lewat `aria-live` |
| Baris terpilih | `aria-pressed` | Dinyatakan ke pembaca layar, bukan hanya warna |
| Dua CTA di hero | Klik | Pindah ke `#tentang` dan ke `#kontak`, keduanya section yang benar-benar ada |
| Bar teknologi | Hover | Marquee berhenti, jadi daftar bisa dibaca |
| 6 baris indeks proyek | Klik / Enter / Space | Ganti screenshot di panel preview, dan ke atas layar sempit |
| Baris terpilih | `aria-pressed` | Dinyatakan ke pembaca layar, bukan hanya warna |
| "Buka gambar asli" | Klik | Buka PNG ukuran penuh di tab baru |
| Kolom pertanyaan Tanya | Enter, atau klik "Tanya" | Panel jawaban berubah, input dikosongkan, kuota bertambah satu |
| Tombol "Acak" | Klik | Memilih entri yang berbeda dari jawaban terakhir lalu langsung bertanya |
| 4 chip contoh | Klik / Enter | Benzin mengirim pertanyaan itu, bukan cuma mengisi kolom |
| Baris kontak di footer | Klik | Buka URL asli di tab baru, dengan cap mark produknya |
| Nav dan kanal di footer | Klik | Pindah ke section yang benar-benar ada, atau buka URL asli di tab baru |
| "Kembali ke atas" di footer | Klik | Kembali ke hero, bukan tombol mati |
| Semua elemen interaktif | Tab | Focus ring kuning 3px dengan garis hitam di dalam, kontras 10.92:1 |

Tidak ada tombol jeda di bar teknologi. Alasannya bukan sekadar
kesederhanaan: bar itu cuma setinggi 51px, dan satu tombol di dalam pita
sekecil itu menambah noise tanpa menambah kendali yang dibutuhkan. Yang
menghentikan gerak itu hover dan `prefers-reduced-motion`.

## Cap mark pihak ketiga

Semua cap mark yang dipakai adalah cap mark resmi produknya sendiri, tidak ada
yang digambar ulang. Semuanya `currentColor` supaya tidak menambah warna baru
di luar palet (R-29, R-23).

| Sumber | Lisensi | Dipakai untuk |
|---|---|---|
| Simple Icons v16 | CC0 1.0 | HTML, CSS, JS, PHP, EJS, Dart, Flutter, React, Next.js, MySQL, Supabase, Git, GitHub, Instagram, Netlify, Vercel |
| Font Awesome Free Brands | CC BY 4.0 | LinkedIn, karena Simple Icons v16 tidak menyediakan cap mark-nya |

LinkedIn di-inline sebagai path mentah dengan `viewBox="0 0 448 512"`, bukan
`0 0 24 24`, jadi setiap entri ikon menyimpan viewBox-nya sendiri. Atribusi
lisensi ada di komentar `src/components/TechIcon.tsx`.

## Batas yang disepakati sendiri

Tidak ada di halaman ini, karena tidak ada sumbernya (R-17, R-18, R-36, R-38):

- Angka atau statistik karangan. "Dua tahun" dan "enam screenshot" muncul karena ada
  di dokumen, bukan karena terlihat bagus.
- Testimoni, nama klien, logo perusahaan, BPDB.
- FAQ. Belum ada pertanyaan yang benar-benar diajukan.
- Nama proyek. Enam proyek memakai nama aslinya (Kapan Beli, REEDSFEED, RevORz,
  Zeta E-Commerce, AbsenKu, Kasir Pintar) dengan tautan repo masing-masing, semuanya
  ditulis di `src/lib/i18n.ts` dari README tiap repo. Ringkasan yang sengaja dikosongkan
  tetap tampil sebagai placeholder yang jujur, bukan teks yang mengarang.
- Logo untuk Claude, ChatGPT, dan Gemini. Section AI umum sengaja berupa daftar
  teks, karena cap mark file-nya tidak ada di sini dan tidak akan dikarang.
- Klaim bahwa Tanya menjawab seperti orang. Tidak ada model bahasa di halaman ini.

## Batas yang harus jujur ke pengguna

Tiga hal di halaman ini mudah disalahartikan, dan masing-masing punya penjelasan
yang tercetak di layarnya sendiri:

| Yang mudah disalahartikan | Yang sebenarnya | Di mana dinyatakan |
|---|---|---|
| Section "Tanya" | Pencocokan 18 topik, bukan model bahasa | Judulnya "Tanya saja", dan ada catatan "berjalan di browser, tidak ada data yang dikirim" |
| Batas 10 pertanyaan | Client-side, dan memang bisa dilewati | Paragraf di dalam peringatan limit mengatakannya secara terbuka |
| Bar teknologi | 9 bahasa yang dipakai, bukan daftar keahlian | Bar hanya berisi nama teknologi; rinciannya ada di section Bahasa |

Menyembunyikan ketiga hal ini akan membuat halaman terasa lebih pintar, dan itu
justru alasan untuk tidak menyembunyikannya.
