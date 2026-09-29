import { cookies } from "next/headers";
import { LOCALE_COOKIE, type Locale } from "./locales";

/*
 * Isi kamus dan pembaca cookie. Modul ini memakai next/headers, jadi hanya
 * boleh diimpor dari Server Component atau Server Action. Client Component
 * yang butuh daftar bahasa mengimpor dari ./locales, dan yang butuh tipe Dict
 * mengimpor dengan `import type` supaya tidak ada yang ikut ke browser.
 */
export { LOCALE_COOKIE, LOCALE_LABEL, LOCALES } from "./locales";
export type { Locale } from "./locales";


type NavItem = { href: string; id: string; label: string };
type MetaItem = { label: string; value: string };
/*
 * Tiga lapis informasi per bahasa, bukan satu paragraf.
 *
 * detail menjelaskan apa itu, usedFor menjelaskan apa yang saya benar-benar
 * bikin dengan itu, dan note menyimpan hal yang masih terasa sulit. Dipisah
 * begini karena ketiganya menjawab pertanyaan berbeda, dan menyatukannya
 * jadi satu blok panjang justru membuat yang penting tenggelam.
 */
type LanguageItem = {
  icon: string;
  name: string;
  category: string;
  detail: string;
  usedFor: string;
  note: string;
};
type Step = { step: string; detail: string };
type Topic = { title: string; body: string[] };
type Eskul = {
  name: string;
  period: string;
  periodNote: string;
  intro: string;
  topics: Topic[];
};
/*
 * repo dan live boleh null. Tautan hanya dirender kalau isinya ada, jadi
 * tidak pernah ada baris yang mengarah ke tempat kosong (R-26).
 */
type ProjectItem = {
  title: string;
  image: string;
  summary: string | null;
  repo: string | null;
  live: string | null;
};
type StackItem = { name: string; sub: string | null; icon: string };
type StackGroup = { label: string; items: StackItem[] };
type AiItem = { name: string; logo: string | null };

export type Dict = {
  locale: Locale;
  switcherLabel: string;
  navAria: string;
  skip: string;
  /*
   * Label navigasi dan tema semuanya milik pembaca layar, bukan teks yang
   * pernah tampil. Tidak ada yang perlu diterjemahkan ulang per komponen.
   */
  menu: { open: string };
  theme: { toLight: string; toDark: string };
  intro: { loading: string; sub: string; hint: string };
  nav: NavItem[];
  profile: { name: string; role: string; tagline: string; meta: MetaItem[] };
  hero: {
    plate: string;
    cta: string;
    ctaContact: string;
  };
  marquee: { label: string };
  about: { heading: string; paragraphs: string[] };
  languages: {
    heading: string;
    note: string;
    panelLabels: { usedFor: string; note: string };
    items: LanguageItem[];
    ai: {
      label: string;
      general: { label: string; note: string; items: AiItem[] };
      coding: { label: string; note: string; items: AiItem[] };
    };
    tools: { label: string; groups: StackGroup[] };
  };
  education: {
    heading: string;
    image: {
      src: string | null;
      alt: string;
      placeholder: string;
      note: string;
    };
    school: string;
    years: string;
    major: string;
    journeyLabel: string;
    steps: Step[];
    eskul: Eskul;
  };
  projects: {
    heading: string;
    openOriginal: string;
    repoLabel: string;
    liveLabel: string;
    placeholderNote: string;
    items: ProjectItem[];
    /*
     * PKL sengaja dipisah dari daftar proyek sekolah, bukan dibuat jadi baris
     * ketujuh yang gambarnya belum ada. Baris tanpa gambar akan ikut jadi
     * tombol yang tidak melakukan apa-apa, dan itu persis kontrol yang tidak
     * berfungsi (R-26).
     *
     * Blok ini menyatakan kondisinya sendiri secara terus terang: belum ada,
     * dan kapan akan diisi. Jadi blok kosong di sini bukan kelalaian, tapi
     * jawaban yang jujur atas pertanyaan yang memang belum bisa dijawab
     * (R-27, R-38).
     */
    pkl: {
      label: string;
      status: string;
      body: string;
      dateLabel: string;
      date: string;
    };
  };
  /*
   * Band penutup yang berdiri sendiri antara Proyek dan Kontak. Isinya
   * navigasi, bukan janji: tidak ada kalimat yang mengarang apa yang akan
   * terjadi setelah pembaca menghubungi.
   */
  closing: {
    label: string;
    heading: string;
    body: string;
    toContact: string;
    toTop: string;
  };
  /*
   * Section Tanya. Isi basis pengetahuan ada di src/lib/qa-content.ts yang
   * client-safe; yang di sini hanya label dan kalimat yang muncul di
   * antarmuka.
   *
   * Batas 10 pertanyaan dengan tunggu 10 menit bukan penanganan error, tapi
   * pernyataan batas kerja: jumlah pertanyaan dibatasi supaya satu pengunjung
   * tidak bisa memakai halaman ini sendirian. Karena seluruh prosesnya jalan di
   * browser, batas ini bisa dilewati siapa pun yang mau repot, dan itu
   * memang diterima: menutupnya butuh server.
   */
  ask: {
    heading: string;
    note: string;
    engineNote: string;
    inputLabel: string;
    placeholder: string;
    submit: string;
    random: string;
    samplesLabel: string;
    answerLabel: string;
    youLabel: string;
    missTitle: string;
    missBody: string;
    emptyBody: string;
    counterLabel: string;
    remainingLabel: string;
    limitTitle: string;
    limitBody: string;
    countdownLabel: string;
  };
  contact: {
    heading: string;
    body: string;
    emptyNote: string;
    /*
     * Dipakai hanya oleh pembaca layar. Panah ↗ itu aria-hidden, jadi tanpa
     * teks ini pengguna pembaca layar tidak pernah tahu tautannya membuka
     * tab baru.
     */
    newTab: string;
    /* Dikunci ke id di src/lib/data.ts, bukan ke urutan array. */
    cardNotes: Record<string, string>;
  };
  /*
   * Penutup halaman. Semua isinya punya sumber: navigasi dari nav, kanal
   * kontak dari src/lib/data.ts, data siswa dari profile.meta. Tidak ada
   * teks karangan di sini, termasuk tahun yang ditulis statis supaya angkanya
   * sama di server dan di browser.
   */
  footer: {
    navLabel: string;
    contactLabel: string;
    detailsLabel: string;
    copyright: string;
    builtWith: string;
    backToTop: string;
  };
  meta: { title: string; description: string };
};

const id: Dict = {
  locale: "id",
  switcherLabel: "Bahasa",
  navAria: "Navigasi halaman",
  skip: "Lompat ke konten",
  menu: {
    open: "Buka menu",
  },
  theme: {
    toLight: "Beralih ke mode terang",
    toDark: "Beralih ke mode gelap",
  },
  intro: {
    loading: "Memuat",
    sub: "Dari tampilan sampai logika di belakangnya",
    hint: "Tekan tombol apa saja untuk masuk",
  },
  nav: [
    { href: "#tentang", id: "tentang", label: "Tentang" },
    { href: "#bahasa", id: "bahasa", label: "Bahasa" },
    { href: "#pendidikan", id: "pendidikan", label: "Pendidikan" },
    { href: "#proyek", id: "proyek", label: "Proyek" },
    { href: "#tanya", id: "tanya", label: "Tanya" },
    { href: "#kontak", id: "kontak", label: "Kontak" },
  ],
  profile: {
    name: "Rezy Alfarabi",
    role: "Siswa Rekayasa Perangkat Lunak",
    tagline:
      "Membangun website dan aplikasi dari nol, tampilan sampai logika di belakangnya.",
    meta: [
      { label: "Kelas", value: "XII RPL 2" },
      { label: "Sekolah", value: "SMK Jakarta Pusat 1" },
      { label: "Jurusan", value: "Rekayasa Perangkat Lunak" },
    ],
  },
  hero: {
    plate: "Data siswa",
    cta: "Tentang saya",
    ctaContact: "Lihat kontak saya",
  },
  marquee: {
    label: "Bahasa yang saya pakai",
  },
  about: {
    heading: "Tentang saya",
    paragraphs: [
      "Saya suka membuat website dan aplikasi dari nol, mulai dari tampilan yang dilihat pengguna sampai logika yang berjalan di belakangnya. Awalnya saya cuma penasaran kenapa sebuah halaman web bisa berubah setelah tombol diklik. Rasa penasaran itu yang bikin saya terus belajar sampai sekarang.",
      "Saya belajar frontend, backend, dan fullstack, dan masih terus mencoba proyek baru supaya makin terbiasa. Saya juga rutin memakai AI sebagai teman belajar dan teman coding. Menurut saya AI bukan pengganti berpikir, jadi hasilnya tetap saya baca, uji, dan pahami sebelum dipakai.",
      "Lewat portofolio ini saya ingin menunjukkan apa yang sudah saya pelajari dan proyek apa saja yang pernah saya buat.",
    ],
  },
  languages: {
    heading: "Bahasa pemrograman",
    note: "Ini yang sudah saya pelajari di sekolah, dari yang paling dasar sampai yang dipakai di proyek nyata. Pilih salah satu untuk membaca apa gunanya, apa yang saya bikin dengan itu, dan bagian mana yang masih saya pelajari.",
    panelLabels: {
      usedFor: "Dipakai untuk",
      note: "Yang masih saya pelajari",
    },
    items: [
      {
        icon: "html",
        name: "HTML",
        category: "Struktur halaman",
        detail:
          "Bagian pertama yang saya pelajari. HTML menentukan isi halaman: mana yang jadi judul, mana paragraf, mana gambar, mana tombol. Tanpa ini halaman tidak punya kerangka.",
        usedFor:
          "Semua halaman yang saya buat, dari halaman login sederhana sampai portofolio yang sedang Anda baca. Saya baru sadar pentingnya memilih elemen yang tepat ketika saya salah membuat tombol dari div dan tombolnya tidak bisa dipakai keyboard.",
        note:
          "Saya masih sering salah memilih elemen. Pernah membuat navigasi dengan daftar div, lalu baru sadar bahwa navigasi itu harus pakai tautan sungguhan supaya bisa difokuskan dan dibuka dengan Enter.",
      },
      {
        icon: "css",
        name: "CSS",
        category: "Tampilan",
        detail:
          "Mengatur seperti apa halaman itu terlihat: warna, jarak, ukuran huruf, dan tata letak. Yang bikin sebuah halaman enak dibaca, bukan sekadar isinya.",
        usedFor:
          "Menerapkan identitas visual portofolio ini sendiri: kertas krem, garis hitam tebal, dan huruf bergaya piksel. Saya juga belajar menata halaman supaya tetap terbaca di layar HP.",
        note:
          "Layout yang paling sering membuat saya kewalahan adalah elemen yang tadinya di samping, lalu turun ke bawah tanpa ikut bergeser ke samping, sehingga halaman melebar. Flexbox dan Grid masih harus saya ulang-ingat tiap kali.",
      },
      {
        icon: "javascript",
        name: "JavaScript",
        category: "Logika",
        detail:
          "Otak yang menggerakkan halaman. Tombol ditekan lalu apa yang berubah, data diambil lalu ditampilkan di tempat yang benar. Di sinilah logika yang saya pelajari di eskul mulai dipakai.",
        usedFor:
          "Menu bahasa yang bisa diklik di section ini, dan penyaring daftar yang saya coba di proyek sekolah. Logika yang paling sering saya pakai adalah menyimpan kondisi lalu menampilkan isi berdasarkan kondisi itu.",
        note:
          "Saya sering menulis logika terlalu panjang di dalam satu fungsi, lalu sulit mencari bagian yang salah. Sekarang saya lebih suka memecahnya jadi fungsi kecil lebih dulu.",
      },
      {
        icon: "php",
        name: "PHP",
        category: "Server",
        detail:
          "Menjalankan logika di sisi server. Dipakai untuk menerima data dari form, mengolahnya, lalu mengirim hasilnya kembali ke halaman.",
        usedFor:
          "Proyek sekolah yang datanya disimpan di server: menerima pendaftaran, lalu menampilkan daftar yang sudah tersimpan. Dari situ saya jadi paham kenapa halaman perlu dua sisi, bukan cuma satu.",
        note:
          "Kesalahan yang paling sering saya buat adalah mengambil data dari form tanpa memvalidasinya dulu. Baru belakangan saya belajar tidak percaya input dari user, sekecil apa pun isinya.",
      },
      {
        icon: "ejs",
        name: "EJS",
        category: "Template",
        detail:
          "Template engine untuk Node.js. Menulis HTML seperti biasa, lalu menyisipkan data ke dalamnya lewat tag di dalam file.",
        usedFor:
          "Menampilkan daftar data yang berasal dari database, misalnya daftar siswa atau daftar posting, jadi tidak perlu ditulis manual satu per satu.",
        note:
          "Saya masih sering mencampur kondisi di dalam template sampai markup-nya jadi sulit dibaca. Sekarang logikanya saya coba pindahkan ke file terpisah.",
      },
      {
        icon: "dart",
        name: "Dart",
        category: "Mobile",
        detail:
          "Bahasa dasar untuk membangun aplikasi Android dan iOS. Saya belajar Dart karena Flutter memakainya.",
        usedFor:
          "Mulai dari latihan kecil: aplikasi pengingat sederhana dan aplikasi daftar tugas. Tujuannya bukan selesai, tapi paham cara kerja satu layar di HP.",
        note:
          "Bagian yang paling sering membuat saya tersandung adalah menunggu asynchronous, karena await yang saya pakai tanpa disadari membuat aplikasi terasa lambat. Itu masih jadi bahan latihan.",
      },
      {
        icon: "flutter",
        name: "Flutter",
        category: "Mobile",
        detail:
          "Framework untuk membuat aplikasi mobile dari satu kode yang bisa jalan di Android dan iOS sekaligus.",
        usedFor:
          "Membangun tampilan aplikasi dengan widget, lalu menyambungkannya ke Dart. Saya mencoba membuat tampilan yang sama bisa dijalankan di dua platform tanpa ditulis dua kali.",
        note:
          "Ukuran file hasil build-nya masih besar sekali dan itu membuat saya kurang nyaman. Saya juga sering lupa bahwa Flutter punya banyak widget bawaan, lalu menulis ulang yang sebenarnya sudah ada.",
      },
      {
        icon: "react",
        name: "React",
        category: "Tampilan",
        detail:
          "Library JavaScript untuk menyusun tampilan dari komponen yang bisa dipakai ulang. Satu bagian tampilan cukup dibuat sekali, lalu dipanggil di banyak halaman.",
        usedFor:
          "Bagian-bagian yang berulang di portofolio ini, seperti baris proyek dan tombol bahasa. Yang paling saya rasakan adalah mengulang komponen yang sama lima kali sebelum sadar itu seharusnya jadi satu komponen.",
        note:
          "useEffect masih sering membuat saya bingung soal kapan harus jalan dan kapan tidak. Saya pernah membuat data diambil dua kali karena lupa membersihkan interval.",
      },
      {
        icon: "nextjs",
        name: "Next.js",
        category: "Fullstack",
        detail:
          "Framework di atas React yang sudah membawa routing dan pemrosesan di sisi server. Karena itu satu proyek bisa menangani tampilan sekaligus backend. Portofolio yang sedang Anda baca ini dibuat dengan Next.js.",
        usedFor:
          "Portofolio ini. Saya memakai Server Component untuk bagian yang isinya tetap, dan Client Component hanya untuk yang harus interaktif seperti pemilih bahasa dan daftar proyek.",
        note:
          "Saya masih sering salah menangani hal yang hanya boleh berjalan di server, lalu hasilnya bentrok saat build. Pemisahan server dan client adalah hal yang paling perlu saya pelajari ulang.",
      },
    ],
    ai: {
      label: "AI tools",
      general: {
        label: "Untuk keperluan umum",
        note: "Dipakai untuk mencari referensi, membaca dokumentasi, dan membahas hal yang belum saya pahami.",
        items: [
          { name: "Claude", logo: "/img/claude.jpg" },
          { name: "ChatGPT", logo: "/img/chatgpt.png" },
          { name: "Gemini", logo: "/img/gemini.jpg" },
        ],
      },
      coding: {
        label: "Untuk coding",
        note: "Saya pakai lewat terminal dan di dalam editor untuk menulis, membaca, dan mereview kode. Hasilnya tetap saya baca dan uji sendiri sebelum dipakai.",
        items: [
          { name: "OpenCode", logo: "/img/opencode.png" },
          { name: "Freebuff", logo: "/img/freebuff.png" },
        ],
      },
    },
    tools: {
      label: "Database dan tools",
      groups: [
        {
          label: "Database",
          items: [
            { name: "MySQL", sub: "dijalankan lewat XAMPP", icon: "mysql" },
            { name: "Supabase", sub: null, icon: "supabase" },
          ],
        },
        {
          label: "Version control",
          items: [
            { name: "Git", sub: null, icon: "git" },
            { name: "GitHub", sub: null, icon: "github" },
          ],
        },
        {
          label: "Hosting",
          items: [
            { name: "Netlify", sub: null, icon: "netlify" },
            { name: "Vercel", sub: null, icon: "vercel" },
          ],
        },
      ],
    },
  },
  education: {
    heading: "Pendidikan",
    image: {
      src: "/img/smk.jpg",
      alt: "Foto SMK Jakarta Pusat 1",
      placeholder: "FOTO SEKOLAH",
      note: "Gedung SMK Jakarta Pusat 1, tempat saya menempuh pendidikan Rekayasa Perangkat Lunak sejak 2024.",
    },
    school: "SMK Jakarta Pusat 1",
    years: "2024 - 2027",
    major: "Jurusan Rekayasa Perangkat Lunak",
    journeyLabel: "Perjalanan belajar",
    steps: [
      {
        step: "Frontend",
        detail:
          "Menyusun halaman dengan HTML dan CSS, lalu menambah interaksi dengan JavaScript supaya tombolnya benar-benar melakukan sesuatu, bukan hanya kelihatan bisa diklik.",
      },
      {
        step: "Backend",
        detail:
          "Mengolah data dan logika di sisi server. Di sinilah saya belajar menerima permintaan, memproses datanya, lalu mengirim hasilnya kembali ke halaman.",
      },
      {
        step: "Fullstack",
        detail:
          "Menggabungkan frontend dan backend dalam satu aplikasi. Bagian yang paling menantang buat saya adalah menyambungkan keduanya, supaya data yang diinput di form benar-benar tersimpan dan bisa dibaca lagi.",
      },
    ],
    eskul: {
      name: "Ekstrakurikuler IT Tech",
      period: "2024 sampai 2025",
      periodNote: "Dua tahun",
      intro:
        "Di eskul saya belajar tiga hal yang sampai sekarang masih saya pakai hampir setiap hari.",
      topics: [
        {
          title: "Belajar menulis prompt AI yang benar",
          body: [
            "Awalnya saya mengira cukup mengetik satu kalimat lalu langsung dapat jawaban yang pas.",
            "Ternyata tidak. Kalau saya cuma menulis 'buat website', hasilnya generic dan hampir tidak berguna. Jadi saya belajar memberi konteks: mau dipakai untuk apa, untuk siapa, dan seperti apa hasil yang saya inginkan.",
            "Yang paling saya ingat: hasil AI tetap harus saya baca dan uji dulu sebelum dipakai. Kalau tidak, saya cuma memakai karangan orang tanpa memahaminya.",
          ],
        },
        {
          title: "Belajar logika dan alurnya seperti di JavaScript",
          body: [
            "Di eskul saya belajar logika dengan cara menulis langkah-langkahnya dulu dalam bahasa biasa, baru diterjemahkan ke kode.",
            "Contohnya begini. 'Kalau nilai lebih dari 80, tulis Lulus. Kalau tidak, tulis Tidak Lulus.' Setelah alurnya benar, baru saya ubah ke bentuk JavaScript.",
            "Dari situ saya belajar dua hal penting: menentukan langkah mana yang harus dijalankan lebih dulu, dan memutuskan cabang mana yang benar untuk tiap kondisi. Prinsipnya sama saja dengan yang dipakai di backend, hanya bentuk kodenya yang berbeda.",
          ],
        },
        {
          title: "Belajar persoalan database",
          body: [
            "Di database saya belajar bahwa data harus disimpan dengan rapi, bukan asal masuk.",
            "Pelajarannya begini: satu data yang sama tidak boleh disimpan di banyak tempat, karena nanti bisa tidak sinkron. Jadi saya belajar memecah data ke tabel yang terpisah, lalu menggabungkannya lagi saat dibutuhkan dengan relasi.",
            "Saya juga belajar cara menulis pencarian yang benar supaya tidak mengambil terlalu banyak data atau mengambil data yang salah, dan kenapa setiap kolom butuh tipe data yang jelas.",
          ],
        },
      ],
    },
  },
  closing: {
    label: "Sudah sampai sini",
    heading: "Ke mana dari sini?",
    body: "Dua tujuan yang masih tersisa di halaman ini. Kalau Anda hanya mau melihat-lihat, kembali ke atas tidak merugikan.",
    toContact: "Ke kontak",
    toTop: "Kembali ke atas",
  },
  projects: {
    heading: "Proyek sekolah",
    openOriginal: "Buka gambar asli",
    repoLabel: "Kode sumber",
    liveLabel: "Situs langsung",
    placeholderNote:
      "Ringkasan proyek belum diisi. Isi di src/lib/i18n.ts.",
    pkl: {
      label: "Praktik Kerja Lapangan",
      status: "Akan datang",
      body: "Bagian ini untuk proyek kegiatan PKL. Dokumentasinya belum saya masukkan, karena memang belum ada yang bisa ditulis. Nanti saya isi apa yang saya kerjakan di sana, lengkap dengan foto dan catatan belajar saya.",
      dateLabel: "Diperbarui",
      date: "1 Oktober 2026",
    },
    items: [
      {
        title: "Kapan Beli",
        image: "/img/proyek-01.png",
        summary:
          "Catatan bahan dapur yang bisa menghitung stok. Setiap bahan punya jumlah, stok minimum, dan tanggal kadaluarsa, lalu sistem menandai statusnya sendiri: hijau aman, kuning stok menipis, merah habis atau kadaluarsa, lengkap dengan peringatan tujuh hari sebelum kedaluwarsa. Di dalamnya ada catatan dan daftar belanja serta saran belanja otomatis dari bahan yang menipis, dan di sisi admin ada panel untuk mengelola pengguna, produk, pengumuman, dan analitik. Dibangun dengan Express, template EJS, dan MySQL.",
        repo: "https://github.com/Rezyalfarabi/kapanbeli",
        live: null,
      },
      {
        title: "REEDSFEED",
        image: "/img/proyek-02.png",
        summary:
          "Platform berita multi-platform yang dibangun dengan Flutter. Tujuh kategori berita (olahraga, teknologi, bisnis, hiburan, kesehatan, politik, dan semua) dengan preview artikel sebelum dibuka, pencarian berbasis debounce, dan bookmark yang tersimpan di database lokal. Berita di-refresh otomatis tiap enam jam dan disimpan sebagai cache offline, jadi tetap terbaca saat koneksi hilang. Satu basis kode berjalan di Android, iOS, web, dan desktop, dengan tampilan gelap khas ESPN, hero card parallax, dan WebView untuk membaca artikel lengkap.",
        repo: "https://github.com/Rezyalfarabi/berita--headline-olahraga-politik-teknologi-dan-dll-",
        live: null,
      },
      {
        title: "RevORz",
        image: "/img/proyek-03.png",
        summary:
          "Website e-commerce untuk smart watch RevORz: satu halaman yang menggabungkan cerita produk dan jalur belinya, dari hero video sinematik, highlight produk yang melayang, grid fitur, sampai section harga dan tombol pesan. Dibuat dengan HTML5, Tailwind CSS, dan JavaScript vanilla tanpa build step: navbar glassmorphism yang berubah saat di-scroll, animasi fade-in lewat Intersection Observer, dan tema gelap pekat (#050505). Situsnya sudah online di Netlify.",
        repo: "https://github.com/Evan-ss/Revorz",
        live: "https://revoz-id.netlify.app/",
      },
      {
        title: "Zeta E-Commerce",
        image: "/img/proyek-04.png",
        summary:
          "Website toko online berbasis PHP native dengan panel admin lengkap. Sisi toko memuat katalog, detail produk, keranjang, checkout, pembayaran (Zeta Pay atau QRIS), konfirmasi pesanan, dan riwayatnya; sisi admin punya dashboard analitik (tren pendapatan 7 dan 30 hari, produk terlaris), CRUD produk, serta manajemen pesanan dan pelanggan. Autentikasinya memakai session yang diamankan dan proteksi CSRF, datanya di MySQL lewat PDO, tampilannya Tailwind CSS.",
        repo: "https://github.com/Rezyalfarabi/e-commerce-php",
        live: null,
      },
      {
        title: "AbsenKu",
        image: "/img/proyek-05.png",
        summary:
          "Website absensi berbasis face recognition: wajah siswa direkam lewat webcam saat pendaftaran, lalu sistem mengenalinya dan mencatat kehadiran otomatis. Dibangun dengan Next.js, TypeScript, Prisma, MySQL, dan face-api.js di sisi klien. Sisi admin mengelola siswa, kelas, jadwal masuk dan pulang, serta data absensi termasuk koreksi manual; sisi siswa berisi riwayat dan statistik kehadiran. Autentikasinya memakai NextAuth dengan dua peran, admin dan siswa.",
        repo: "https://github.com/Evan-ss/AbsenKu",
        live: null,
      },
      {
        title: "Kasir Pintar",
        image: "/img/proyek-06.png",
        summary:
          "Platform kasir (point of sale) untuk toko retail kecil-menengah, dibuat dengan Flutter dan berjalan di web, Android, serta iOS dari satu basis kode. Semua data disimpan lokal di perangkat lewat Drift dan SQLite, tanpa server maupun akun: kasir dengan scan barcode dan hitung kembalian, CRUD produk, impor dan ekspor Excel, riwayat stok yang tercatat seperti jejak audit, struk PDF, dan rekap penjualan. State dikelola Riverpod, navigasi pakai go_router, dan 93 test sudah berjalan.",
        repo: "https://github.com/Rezyalfarabi/kasirpintar",
        live: null,
      },
    ],
  },
  ask: {
    heading: "Tanya saja",
    note:
      "Tanya apa saja tentang isi halaman ini. Jawabannya diambil dari isi halaman, jadi kalau jawabannya tidak ada di sini, jawabannya akan bilang tidak tahu.",
    engineNote:
      "Mesin ini berjalan di browser Anda, bukan di server. Tidak ada data yang dikirim ke mana pun.",
    inputLabel: "Pertanyaan Anda",
    placeholder: "Contoh: apa saja skill kamu?",
    submit: "Tanya",
    random: "Acak",
    samplesLabel: "Coba salah satu ini",
    answerLabel: "Jawaban",
    youLabel: "Anda bertanya",
    missTitle: "Tidak tahu",
    missBody:
      "Pertanyaan itu tidak bisa saya jawab dari isi halaman ini. Coba tanya tentang sekolah, skill, proyek, PKL, atau kontak. Kalau memang tidak ada di sini, lebih baik saya bilang tidak tahu daripada menebak.",
    emptyBody: "Belum ada pertanyaan. Tulis di atas, atau pakai tombol Acak.",
    counterLabel: "Pertanyaan terpakai",
    remainingLabel: "sisa",
    limitTitle: "Batas 10 pertanyaan tercapai",
    limitBody:
      "Mesin ini dipanggil dari browser Anda, jadi batsinya bisa dilewati dengan mudah. Saya tetap memasang batasnya supaya tidak kelihatan seperti layanan yang bisa dipakai tanpa batas.",
    countdownLabel: "Tersedia lagi dalam",
  },
  contact: {
    heading: "Kontak",
    body: "Ini akun yang saya pakai. Kalau ada yang perlu dibicarakan, boleh lewat salah satunya.",
    emptyNote:
      "Belum ada tautan kontak yang bisa dipakai. Bagian ini hilang sendiri begitu src/lib/data.ts diisi.",
    newTab: "membuka di tab baru",
    cardNotes: {
      github:
        "Kode yang saya tulis dan proyek yang saya unggah di sana. Tempat paling jujur untuk menilai cara saya bekerja.",
      instagram:
        "Akun pribadi, untuk hal yang tidak selalu soal kode.",
      linkedin:
        "Profil profesional saya, dan tempat saya mencari lowongan atau magang.",
    },
  },
  footer: {
    navLabel: "Navigasi",
    contactLabel: "Hubungi saya",
    detailsLabel: "Data siswa",
    copyright: "© 2026 Rezy Alfarabi",
    builtWith: "Dibuat dengan Next.js",
    backToTop: "Kembali ke atas",
  },
  meta: {
    title: "Rezy Alfarabi | Siswa Rekayasa Perangkat Lunak",
    description:
      "Membangun website dan aplikasi dari nol, tampilan sampai logika di belakangnya.",
  },
};

const en: Dict = {
  locale: "en",
  switcherLabel: "Language",
  navAria: "Page navigation",
  skip: "Skip to content",
  menu: {
    open: "Open menu",
  },
  theme: {
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
  intro: {
    loading: "Loading",
    sub: "From the interface down to the logic behind it",
    hint: "Press any key to enter",
  },
  nav: [
    { href: "#tentang", id: "tentang", label: "About" },
    { href: "#bahasa", id: "bahasa", label: "Languages" },
    { href: "#pendidikan", id: "pendidikan", label: "Education" },
    { href: "#proyek", id: "proyek", label: "Projects" },
    { href: "#tanya", id: "tanya", label: "Ask" },
    { href: "#kontak", id: "kontak", label: "Contact" },
  ],
  profile: {
    name: "Rezy Alfarabi",
    role: "Software Engineering Student",
    tagline:
      "Building websites and apps from scratch, from the interface down to the logic behind it.",
    meta: [
      { label: "Grade", value: "XII RPL 2" },
      { label: "School", value: "SMK Jakarta Pusat 1" },
      { label: "Major", value: "Software Engineering" },
    ],
  },
  hero: {
    plate: "Student details",
    cta: "About me",
    ctaContact: "See my contact",
  },
  marquee: {
    label: "Languages I work with",
  },
  about: {
    heading: "About me",
    paragraphs: [
      "I like building websites and apps from scratch, starting from what the user sees all the way down to the logic running behind it. I began as nothing more than curious about why a web page changes after you click a button. That curiosity is what kept me learning until now.",
      "I learn frontend, backend, and fullstack, and I keep taking on new projects so I get more comfortable with them. I also use AI regularly as a study partner and a coding partner. To me AI is not a replacement for thinking, so I still read, test, and understand what it gives me before I use it.",
      "Through this portfolio I want to show what I have learned and which projects I have built.",
    ],
  },
  languages: {
    heading: "Programming languages",
    note: "These are the ones I have learned at school, from the most basic to what I use in real projects. Pick one to read what it is for, what I have actually built with it, and which part I am still learning.",
    panelLabels: {
      usedFor: "What I use it for",
      note: "What I am still learning",
    },
    items: [
      {
        icon: "html",
        name: "HTML",
        category: "Page structure",
        detail:
          "The first thing I learned. HTML decides what the page contains: which part is a heading, which is a paragraph, which is an image, which is a button. Without it a page has no skeleton.",
        usedFor:
          "Every page I have built, from a simple login screen to the portfolio you are reading. I only understood how much the right element matters when I built a button out of a div and it could not be used with a keyboard.",
        note:
          "I still pick the wrong element often. I once built navigation out of a list of divs before realising it should be real links so they can be focused and opened with Enter.",
      },
      {
        icon: "css",
        name: "CSS",
        category: "Presentation",
        detail:
          "Decides how the page looks: colour, spacing, letter size, and layout. This is what makes a page comfortable to read, not just its content.",
        usedFor:
          "Applying the visual identity of this portfolio: cream paper, hard black lines, and a pixel-style typeface. I also learned to lay pages out so they stay readable on a phone.",
        note:
          "The layout that trips me up most is an element that sits beside something, then drops below without shifting sideways with it, so the page ends up too wide. I still have to relearn Flexbox and Grid every time.",
      },
      {
        icon: "javascript",
        name: "JavaScript",
        category: "Logic",
        detail:
          "The part that moves the page. A button is pressed and something changes, data is fetched and shown in the right place. This is where the logic I learned in extracurriculars started to be used.",
        usedFor:
          "The clickable language menu in this section, and a list filter I tried in a school project. The logic I reach for most is storing a small piece of state and rendering from it.",
        note:
          "I keep writing logic that is far too long inside one function, then struggling to find the broken part. I try to break it into small functions first now.",
      },
      {
        icon: "php",
        name: "PHP",
        category: "Server",
        detail:
          "Runs logic on the server side. Used to receive data from a form, process it, and send the result back to the page.",
        usedFor:
          "A school project where the data lived on the server: taking registrations, then showing the list that had been stored. That is where I understood why a page needs two sides instead of one.",
        note:
          "My most common mistake is reading a form without validating it first. I learned later never to trust input from a user, no matter how small it looks.",
      },
      {
        icon: "ejs",
        name: "EJS",
        category: "Template",
        detail:
          "A template engine for Node.js. You write HTML as usual, then insert data into it with tags inside the file.",
        usedFor:
          "Rendering lists that come from a database, such as a list of students or posts, so they do not have to be written out one by one.",
        note:
          "I still mix conditions into the template until the markup becomes hard to read. I try to move the logic into its own file when I can.",
      },
      {
        icon: "dart",
        name: "Dart",
        category: "Mobile",
        detail:
          "The base language for building Android and iOS apps. I learned Dart because Flutter uses it.",
        usedFor:
          "Starting with small exercises: a simple reminder app and a to-do list. The goal was never to finish them, it was to understand how one screen works on a phone.",
        note:
          "Asynchronous code is what trips me up most, because an await I did not notice makes an app feel slow. That is still something I am practising.",
      },
      {
        icon: "flutter",
        name: "Flutter",
        category: "Mobile",
        detail:
          "A framework for building mobile apps from one codebase that runs on both Android and iOS.",
        usedFor:
          "Building app screens out of widgets and connecting them to Dart. I tried to make the same screen run on both platforms without writing it twice.",
        note:
          "The build output is still huge and that bothers me. I also keep forgetting how much Flutter ships out of the box, and rewriting things that already exist.",
      },
      {
        icon: "react",
        name: "React",
        category: "Presentation",
        detail:
          "A JavaScript library for composing a page out of reusable components. A piece of the interface is built once, then used on many pages.",
        usedFor:
          "The repeating parts of this portfolio, such as the project rows and the language buttons. What I feel most is repeating the same component five times before realising it should have been one component.",
        note:
          "useEffect still confuses me about when it should run and when it should not. I once fetched the same data twice because I forgot to clear an interval.",
      },
      {
        icon: "nextjs",
        name: "Next.js",
        category: "Fullstack",
        detail:
          "A framework on top of React that already brings routing and server-side rendering. Because of that one project can handle both the interface and the backend. The portfolio you are reading is built with Next.js.",
        usedFor:
          "This portfolio. I use Server Components for the parts that are static, and Client Components only for what has to be interactive, such as the language switcher and the project list.",
        note:
          "I still mishandle things that are only allowed to run on the server, and the build clashes because of it. Telling server and client apart is what I most need to relearn.",
      },
    ],
    ai: {
      label: "AI tools",
      general: {
        label: "For general use",
        note: "I use these to look things up, read documentation, and talk through things I do not understand yet.",
        items: [
          { name: "Claude", logo: "/img/claude.jpg" },
          { name: "ChatGPT", logo: "/img/chatgpt.png" },
          { name: "Gemini", logo: "/img/gemini.jpg" },
        ],
      },
      coding: {
        label: "For coding",
        note: "I use these in the terminal and inside the editor to write, read, and review code. I still read and test the output myself before I use it.",
        items: [
          { name: "OpenCode", logo: "/img/opencode.png" },
          { name: "Freebuff", logo: "/img/freebuff.png" },
        ],
      },
    },
    tools: {
      label: "Databases and tools",
      groups: [
        {
          label: "Databases",
          items: [
            { name: "MySQL", sub: "run locally through XAMPP", icon: "mysql" },
            { name: "Supabase", sub: null, icon: "supabase" },
          ],
        },
        {
          label: "Version control",
          items: [
            { name: "Git", sub: null, icon: "git" },
            { name: "GitHub", sub: null, icon: "github" },
          ],
        },
        {
          label: "Hosting",
          items: [
            { name: "Netlify", sub: null, icon: "netlify" },
            { name: "Vercel", sub: null, icon: "vercel" },
          ],
        },
      ],
    },
  },
  education: {
    heading: "Education",
    image: {
      src: "/img/smk.jpg",
      alt: "Photo of SMK Jakarta Pusat 1",
      placeholder: "SCHOOL PHOTO",
      note: "The building of SMK Jakarta Pusat 1, where I have studied Software Engineering since 2024.",
    },
    school: "SMK Jakarta Pusat 1",
    years: "2024 - 2027",
    major: "Software Engineering major",
    journeyLabel: "Learning journey",
    steps: [
      {
        step: "Frontend",
        detail:
          "Putting pages together with HTML and CSS, then adding interaction with JavaScript so a button actually does something instead of only looking clickable.",
      },
      {
        step: "Backend",
        detail:
          "Processing data and logic on the server side. This is where I learned to receive a request, work on the data, and send the result back to the page.",
      },
      {
        step: "Fullstack",
        detail:
          "Combining the frontend and the backend in one application. The hardest part for me was connecting the two, so the data typed into a form really gets saved and can be read again.",
      },
    ],
    eskul: {
      name: "IT Tech Extracurricular",
      period: "2024 to 2025",
      periodNote: "Two years",
      intro:
        "In the club I learned three things I still use almost every day.",
      topics: [
        {
          title: "Learning to write AI prompts properly",
          body: [
            "At first I thought one sentence was enough and the answer would come out right.",
            "It was not. If I only typed 'build a website', the result was generic and almost useless. So I learned to give context: what it is for, who it is for, and what the result should look like.",
            "The part I remember most: I still have to read and test what the AI gives me before using it. Otherwise I am just using someone else's writing without understanding it.",
          ],
        },
        {
          title: "Learning logic and how it flows, like in JavaScript",
          body: [
            "In the club I learned logic by writing the steps down in plain language first, then translating them into code.",
            "Here is how it goes. 'If the score is above 80, write Pass. Otherwise, write Fail.' Once the flow is right, I turn it into JavaScript.",
            "From that I learned two important things: deciding which step has to run first, and deciding which branch is correct for each condition. The principle is the same on the backend, only the shape of the code is different.",
          ],
        },
        {
          title: "Learning database problems",
          body: [
            "With databases I learned that data has to be stored properly, not just thrown in.",
            "Here is the lesson: the same data must not be kept in several places, because the copies can drift apart. So I learned to split the data into separate tables and join them back together when I need it, using relations.",
            "I also learned how to write a search that pulls the right rows and not too many of them, and why every column needs a clear data type.",
          ],
        },
      ],
    },
  },
  closing: {
    label: "End of page",
    heading: "Where to from here?",
    body: "Two destinations are left on this page. If you are only browsing, going back to the top costs you nothing.",
    toContact: "Go to contact",
    toTop: "Back to top",
  },
  projects: {
    heading: "School projects",
    openOriginal: "Open the original image",
    repoLabel: "Source code",
    liveLabel: "Live site",
    placeholderNote:
      "The project summary is not filled in yet. Fill it in src/lib/i18n.ts.",
    pkl: {
      label: "Internship",
      status: "Coming soon",
      body: "This block is for my internship projects. I have not put the documentation in yet, because there is genuinely nothing to write. Later I will fill in what I worked on there, with photos and notes on what I learned.",
      dateLabel: "Updated",
      date: "1 October 2026",
    },
    items: [
      {
        title: "Kapan Beli",
        image: "/img/proyek-01.png",
        summary:
          "A kitchen pantry log that can count stock. Every ingredient carries a quantity, a minimum stock level, and an expiry date, then the system labels its own status: green for safe, yellow for low, red for empty or expired, with a warning seven days before expiry. It includes notes and a shopping list with automatic purchase suggestions for anything running low, plus an admin panel for managing users, products, announcements, and analytics. Built with Express, EJS templates, and MySQL.",
        repo: "https://github.com/Rezyalfarabi/kapanbeli",
        live: null,
      },
      {
        title: "REEDSFEED",
        image: "/img/proyek-02.png",
        summary:
          "A multi-platform news app built with Flutter. Seven news categories (sports, technology, business, entertainment, health, politics, and all) with an article preview before opening, debounce-based search, and bookmarks stored in a local database. News refreshes automatically every six hours and is kept as an offline cache, so it stays readable when the connection drops. One codebase runs on Android, iOS, web, and desktop, with an ESPN-style dark theme, parallax hero cards, and a WebView for reading the full article.",
        repo: "https://github.com/Rezyalfarabi/berita--headline-olahraga-politik-teknologi-dan-dll-",
        live: null,
      },
      {
        title: "RevORz",
        image: "/img/proyek-03.png",
        summary:
          "An e-commerce website for the RevORz smart watch: a single page that combines the product story with the path to buy, from a cinematic video hero and floating product highlight to the feature grid, pricing section, and order button. Built with HTML5, Tailwind CSS, and vanilla JavaScript with no build step: a glassmorphism navbar that changes on scroll, fade-in animations via Intersection Observer, and a deep dark theme (#050505). The site is live on Netlify.",
        repo: "https://github.com/Evan-ss/Revorz",
        live: "https://revoz-id.netlify.app/",
      },
      {
        title: "Zeta E-Commerce",
        image: "/img/proyek-04.png",
        summary:
          "A plain-PHP online store with a full admin panel. The storefront covers the catalog, product detail, cart, checkout, payment (Zeta Pay or QRIS), order confirmation, and order history; the admin side has an analytics dashboard (7- and 30-day revenue trends, best-selling products), product CRUD, and order and customer management. Authentication uses hardened sessions with CSRF protection, data lives in MySQL through PDO, and the UI is Tailwind CSS.",
        repo: "https://github.com/Rezyalfarabi/e-commerce-php",
        live: null,
      },
      {
        title: "AbsenKu",
        image: "/img/proyek-05.png",
        summary:
          "A face-recognition attendance website: a student's face is captured through the webcam at registration, then the system recognises them and records attendance automatically. Built with Next.js, TypeScript, Prisma, MySQL, and face-api.js on the client side. The admin side manages students, classes, entry and exit schedules, and attendance records including manual corrections; the student side shows history and attendance statistics. Authentication runs on NextAuth with two roles, admin and student.",
        repo: "https://github.com/Evan-ss/AbsenKu",
        live: null,
      },
      {
        title: "Kasir Pintar",
        image: "/img/proyek-06.png",
        summary:
          "A point-of-sale platform for small and medium retail stores, built with Flutter and running on web, Android, and iOS from a single codebase. All data is stored locally on the device through Drift and SQLite, with no server and no accounts: checkout with barcode scan and automatic change, product CRUD, Excel import and export, stock history recorded like an audit trail, PDF receipts, and sales summaries. State is managed with Riverpod, navigation uses go_router, and 93 tests are in place.",
        repo: "https://github.com/Rezyalfarabi/kasirpintar",
        live: null,
      },
    ],
  },
  ask: {
    heading: "Ask me",
    note:
      "Ask anything about what is on this page. The answers come from the page itself, so if it is not covered here, the answer will say it does not know.",
    engineNote:
      "This runs in your browser, not on a server. Nothing is sent anywhere.",
    inputLabel: "Your question",
    placeholder: "For example: what are your skills?",
    submit: "Ask",
    random: "Random",
    samplesLabel: "Try one of these",
    answerLabel: "Answer",
    youLabel: "You asked",
    missTitle: "I do not know",
    missBody:
      "I cannot answer that from what is on this page. Try asking about school, skills, projects, the internship, or contact. If it really is not here, I would rather say I do not know than guess.",
    emptyBody: "No question yet. Write one above, or use the Random button.",
    counterLabel: "Questions used",
    remainingLabel: "left",
    limitTitle: "That is 10 questions",
    limitBody:
      "This engine runs from your browser, so the limit is easy to get around. I still put it there so the page does not look like an unlimited service.",
    countdownLabel: "Available again in",
  },
  contact: {
    heading: "Contact",
    body: "These are the accounts I use. If something needs discussing, any of them works.",
    emptyNote:
      "No contact link is ready yet. This block disappears by itself as soon as src/lib/data.ts is filled in.",
    newTab: "opens in a new tab",
    cardNotes: {
      github:
        "The code I write and the projects I upload there. The most honest place to judge how I work.",
      instagram:
        "My personal account, for the things that are not always about code.",
      linkedin:
        "My professional profile, and where I look for internships.",
    },
  },
  footer: {
    navLabel: "Navigation",
    contactLabel: "Get in touch",
    detailsLabel: "Student details",
    copyright: "© 2026 Rezy Alfarabi",
    builtWith: "Built with Next.js",
    backToTop: "Back to top",
  },
  meta: {
    title: "Rezy Alfarabi | Software Engineering Student",
    description:
      "Building websites and apps from scratch, from the interface down to the logic behind it.",
  },
};

const DICTIONARIES: Record<Locale, Dict> = { id, en };

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return value === "en" ? "en" : "id";
}

export async function getDict(): Promise<Dict> {
  return DICTIONARIES[await getLocale()];
}
