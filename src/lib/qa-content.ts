/*
 * Isi basis pengetahuan untuk section Tanya.
 *
 * Sengaja dipisah dari i18n.ts dan tidak memakai bentuk dictionary di sana.
 * Alasannya teknis: i18n.ts mengimpor next/headers supaya bisa membaca cookie,
 * jadi modul itu hanya boleh dipakai di server. Section Tanya adalah Client
 * Component, dan isinya masuk ke browser sebagai Client Component. Bentuk
 * Record<Locale, ...> di sini mengikuti pola yang sama dengan locales.ts, yang
 * juga konstanta per-locale yang aman diimpor dua arah.
 *
 * Jawabannya ditulis tangan, bukan disusun dari string lain, karena ini jawaban
 * yang datar: satu topik, satu paragraf. Menyusunnya dari data section lain
 * berarti setiap perubahan copy di section lain diam-diam ikut mengubah
 * jawaban, dan itu membuat teks yang sudah terkoreksi jadi sulit dilacak.
 *
 * Kata kuncinya campur ID dan EN. Itu disengaja: orang mengetik dalam bahasa
 * yang sedang dipakai di kepalanya, bukan bahasa yang tertulis di halaman.
 *
 * Setiap entri wajib punya minimal satu kata kunci yang cocok dengan pertanyaan
 * contohnya sendiri, karena pertanyaan itu dipakai sebagai chip yang diklik.
 * Kalau tidak, chip yang diklik justru menjawab "tidak tahu".
 */

import type { Locale } from "./locales";
import type { QaEntry } from "./qa";

export const QA_ENTRIES: Record<Locale, QaEntry[]> = {
  id: [
    {
      id: "siapa",
      keywords: ["nama", "siapa", "identitas", "perkenalan", "rezy", "alfarabi", "name", "who", "introduce"],
      question: "Siapa kamu?",
      answer:
        "Saya Rezy Alfarabi, siswa kelas XII RPL 2 di SMK Jakarta Pusat 1, jurusan Rekayasa Perangkat Lunak. Halaman ini saya bangun sendiri, dari tampilan sampai logika di belakangnya.",
    },
    {
      id: "kerja",
      keywords: ["kerja", "mengerjakan", "profesi", "peran", "jabatan", "pekerjaan", "occupation", "role", "job", "work"],
      question: "Kamu mengerjakan apa?",
      answer:
        "Saya membangun website dan aplikasi, dari tampilan sampai logika di belakangnya. Sekarang saya sedang memperdalam React dan Next.js supaya tidak berhenti di bagian depan saja.",
    },
    {
      id: "sekolah",
      keywords: ["sekolah", "smk", "kelas", "jurusan", "rpl", "school", "class", "major", "study"],
      question: "Sekolahnya di mana?",
      answer:
        "SMK Jakarta Pusat 1, kelas XII RPL 2, jurusan Rekayasa Perangkat Lunak. Kelas saya fokus ke pengembangan web, dari HTML dan CSS sampai database.",
    },
    {
      id: "skill",
      keywords: ["skill", "keahlian", "bahasa", "teknologi", "tech", "stack", "kompetensi", "programming", "languages"],
      question: "Skill saya apa saja?",
      answer:
        "Bahasa: HTML, CSS, JavaScript, PHP, EJS, Dart, dan Flutter. Framework: React dan Next.js. Database: MySQL dan Supabase. Kalau ada yang belum saya kuasai, saya tulis sendiri di halaman ini, bukan disembunyikan.",
    },
    {
      id: "ai",
      keywords: ["ai", "gpt", "chatgpt", "claude", "opencode", "gemini", "llm", "kecerdasan", "artificial", "intelligence"],
      question: "AI apa yang saya pakai?",
      answer:
        "Untuk pekerjaan umum saya pakai ChatGPT, Claude, dan Gemini. Untuk membantu ngoding dan cari jalan keluar dari error, OpenCode dan Freebuff. Semuanya saya pakai sebagai alat bantu, bukan untuk mengarang hasil.",
    },
    {
      id: "tools",
      keywords: ["tool", "alat", "database", "mysql", "supabase", "git", "vercel", "netlify", "tools", "deploy"],
      question: "Tools apa yang saya pakai?",
      answer:
        "Database pakai MySQL dan Supabase, version control Git, deploy Netlify dan Vercel. Tool lain sesuai kebutuhan, tapi yang sering saya pakai ada di daftar ini.",
    },
    {
      id: "proyek",
      keywords: ["proyek", "project", "portofolio", "portfolio", "karya", "hasil", "aplikasi", "app"],
      question: "Proyek saya apa saja?",
      answer:
        "Ada enam proyek sekolah di bagian Proyek. Nama dan ringkasannya masih placeholder, dan saya tulis itu terbuka di halaman, bukan disembunyikan. Dokumentasi lengkapnya menyusul.",
    },
    {
      id: "pkl",
      keywords: ["pkl", "magang", "mulai", "praktik", "praktik kerja", "internship"],
      question: "Sudah mulai magang?",
      answer:
        "Belum ada. Bagian PKL sengaja saya buat terpisah dan ditulis akan datang, lalu diperbarui 1 Oktober 2026. Saya tidak mau mengisi dengan proyek yang belum ada hanya supaya halamannya terlihat penuh.",
    },
    {
      id: "kontak",
      keywords: ["kontak", "contact", "email", "hubungi", "menghubungi", "hubung", "reach", "surel", "whatsapp", "nomor", "wa"],
      question: "Bagaimana cara menghubungi saya?",
      answer:
        "Lewat GitHub, Instagram, atau LinkedIn. Ketiganya tercantum di bagian Kontak, masing-masing dengan keterangan singkat soal isinya. Saya lebih cepat membalas pesan yang menyebut konteksnya.",
    },
    {
      id: "github",
      keywords: ["github", "repo", "repository", "kode", "source", "code"],
      question: "Kode saya ada di mana?",
      answer:
        "Di GitHub, di bawah github.com/RezyAlfarabi. Kode yang saya tulis dan proyek yang saya unggah ada di sana, dan LinkedIn saya pakai untuk hal yang menyangkut pekerjaan.",
    },
    {
      id: "instagram",
      keywords: ["instagram", "ig", "sosmed", "media sosial", "media", "sosial", "akun", "social", "account"],
      question: "Akun media sosial saya?",
      answer:
        "Instagram saya devick404, dipakai untuk akun pribadi, bukan khusus soal kode. Untuk yang berhubungan dengan kerja, lebih baik lewat GitHub atau LinkedIn.",
    },
    {
      id: "linkedin",
      keywords: ["linkedin", "career", "karier", "resume", "cv", "profil", "profesional", "profile", "lihat"],
      question: "LinkedIn saya bagaimana?",
      answer:
        "Di linkedin.com/in/mochammad-rezy-alfarabi. Di situ saya pakai untuk hal yang serius: lowongan kerja dan profil profesional. Alamat lengkapnya ada di bagian Kontak.",
    },
    {
      id: "eskul",
      keywords: ["eskul", "ekstrakurikuler", "klub", "kegiatan", "activity", "activities", "club", "extracurricular", "organisasi"],
      question: "Aktif di kegiatan apa?",
      answer:
        "Di ekstrakurikuler sekolah saya belajar logika dan alur program. Menulis langkah-langkah dalam bahasa biasa dulu, baru menerjemahkannya ke kode, terutama di JavaScript.",
    },
    {
      id: "perjalanan",
      keywords: ["perjalanan", "journey", "belajar", "alur", "learn", "learning", "progress", "kembang", "progres"],
      question: "Perjalanan belajar saya bagaimana?",
      answer:
        "Berurutan dari frontend, backend, lalu fullstack. HTML dan CSS dulu supaya tampilan benar, baru JavaScript untuk logikanya, lalu PHP dan MySQL supaya saya paham sisi server. Fullstack itu menggabungkan ketiganya.",
    },
    {
      id: "ketersediaan",
      keywords: ["tersedia", "available", "lowongan", "melamar", "dilamar", "rekrut", "hire", "hiring", "karier"],
      question: "Apakah saya bisa dilamar?",
      answer:
        "Saya siswa kelas XII, jadi untuk magang atau peluang kerja yang bisa diambil sekarang, saya terbuka. Tulis lewat LinkedIn supaya saya tahu konteksnya.",
    },
    {
      id: "web",
      keywords: ["website", "web", "situs", "halaman", "dibuat", "dibangun", "framework", "nextjs", "tailwind", "typescript", "build", "built"],
      question: "Website ini dibuat pakai apa?",
      answer:
        "Next.js dengan TypeScript, Tailwind CSS untuk gayanya, dan font sans-serif untuk teksnya. Halamannya bisa dibuka di dua bahasa, dan pilihan bahasanya diingat.",
    },
    {
      id: "lokasi",
      keywords: ["lokasi", "alamat", "tinggal", "kota", "address", "city", "based", "located", "location", "berada"],
      question: "Anda tinggal di mana?",
      answer:
        "Sekolah saya di Jakarta Pusat. Alamat lengkap tidak saya tampilkan di halaman publik, tapi kalau memang perlu, tanya saja lewat LinkedIn.",
    },
    {
      id: "umur",
      keywords: ["umur", "usia", "age", "lahir", "birth", "old", "tahun", "birthday"],
      question: "Berapa umur saya?",
      answer:
        "Umur saya tidak saya cantumkan di halaman ini. Yang bisa dibaca di sini: saya siswa kelas XII RPL 2.",
    },
  ],
  en: [
    {
      id: "siapa",
      keywords: ["nama", "siapa", "identitas", "perkenalan", "rezy", "alfarabi", "name", "who", "introduce"],
      question: "Who are you?",
      answer:
        "I am Rezy Alfarabi, a twelfth-grade student at SMK Jakarta Pusat 1, majoring in Software Engineering (Rekayasa Perangkat Lunak). I built this site myself, from the layout to the logic behind it.",
    },
    {
      id: "kerja",
      keywords: ["kerja", "mengerjakan", "profesi", "peran", "jabatan", "pekerjaan", "occupation", "role", "job", "work"],
      question: "What do you work on?",
      answer:
        "I build websites and applications, from the layout to the logic behind it. Right now I am going deeper into React and Next.js so I do not stay on the frontend only.",
    },
    {
      id: "sekolah",
      keywords: ["sekolah", "smk", "kelas", "jurusan", "rpl", "school", "class", "major", "study"],
      question: "Where do you go to school?",
      answer:
        "SMK Jakarta Pusat 1, class XII RPL 2, majoring in Software Engineering. My class focuses on web development, from HTML and CSS through to databases.",
    },
    {
      id: "skill",
      keywords: ["skill", "keahlian", "bahasa", "teknologi", "tech", "stack", "kompetensi", "programming", "languages"],
      question: "What are my skills?",
      answer:
        "Languages: HTML, CSS, JavaScript, PHP, EJS, Dart, and Flutter. Frameworks: React and Next.js. Databases: MySQL and Supabase. Whatever I have not mastered yet, I write on this page myself instead of hiding it.",
    },
    {
      id: "ai",
      keywords: ["ai", "gpt", "chatgpt", "claude", "opencode", "gemini", "llm", "kecerdasan", "artificial", "intelligence"],
      question: "What AI do you use?",
      answer:
        "For general work I use ChatGPT, Claude, and Gemini. For getting unstuck while coding and reading errors, OpenCode and Freebuff. I use all of them as tools, not as a way to invent results.",
    },
    {
      id: "tools",
      keywords: ["tool", "alat", "database", "mysql", "supabase", "git", "vercel", "netlify", "tools", "deploy"],
      question: "Which tools do I use?",
      answer:
        "MySQL and Supabase for databases, Git for version control, Netlify and Vercel for deploying. I pick other tools as needed, but the ones I actually reach for are on this list.",
    },
    {
      id: "proyek",
      keywords: ["proyek", "project", "portofolio", "portfolio", "karya", "hasil", "aplikasi", "app"],
      question: "What projects have I made?",
      answer:
        "There are six school projects in the Projects section. The names and summaries are still placeholders, and I keep that visible on the page instead of hiding it. Full documentation comes later.",
    },
    {
      id: "pkl",
      keywords: ["pkl", "magang", "mulai", "praktik", "praktik kerja", "internship"],
      question: "Have you started the internship?",
      answer:
        "Not yet. The internship block is deliberately separate, and it says it is coming soon, updated on 1 October 2026. I would rather leave it empty than fill it with a project that does not exist yet.",
    },
    {
      id: "kontak",
      keywords: ["kontak", "contact", "email", "hubungi", "menghubungi", "hubung", "reach", "surel", "whatsapp", "nomor", "wa"],
      question: "How can I contact you?",
      answer:
        "Through GitHub, Instagram, or LinkedIn. All three are in the Contact section, each with a short note about what belongs there. I reply faster when a message says what it is about.",
    },
    {
      id: "github",
      keywords: ["github", "repo", "repository", "kode", "source", "code"],
      question: "Where is your code?",
      answer:
        "On GitHub, at github.com/RezyAlfarabi. The code I write and the projects I upload are there. I keep LinkedIn for anything work-related.",
    },
    {
      id: "instagram",
      keywords: ["instagram", "ig", "sosmed", "media sosial", "media", "sosial", "akun", "social", "account"],
      question: "What are your social accounts?",
      answer:
        "My Instagram is devick404, used for personal things rather than code. For anything work-related, GitHub or LinkedIn is better.",
    },
    {
      id: "linkedin",
      keywords: ["linkedin", "career", "karier", "resume", "cv", "profil", "profesional", "profile", "lihat"],
      question: "What about your LinkedIn?",
      answer:
        "It is at linkedin.com/in/mochammad-rezy-alfarabi. I use it for the serious part: openings and my professional profile. The full address is in the Contact section.",
    },
    {
      id: "eskul",
      keywords: ["eskul", "ekstrakurikuler", "klub", "kegiatan", "activity", "activities", "club", "extracurricular", "organisasi"],
      question: "What activities are you part of?",
      answer:
        "In my school extracurricular I learned logic and how a program flows. I write the steps down in plain language first, then translate them into code, mostly in JavaScript.",
    },
    {
      id: "perjalanan",
      keywords: ["perjalanan", "journey", "belajar", "alur", "learn", "learning", "progress", "kembang", "progres"],
      question: "How did I learn this?",
      answer:
        "In order: frontend, then backend, then fullstack. HTML and CSS first so the layout is right, then JavaScript for the logic, then PHP and MySQL so I understand the server side too. Fullstack combines all three.",
    },
    {
      id: "ketersediaan",
      keywords: ["tersedia", "available", "lowongan", "melamar", "dilamar", "rekrut", "hire", "hiring", "karier"],
      question: "Am I available for a job?",
      answer:
        "I am a twelfth-grade student, so I am open to internships or roles I can take right now. Write to me on LinkedIn so I know the context.",
    },
    {
      id: "web",
      keywords: ["website", "web", "situs", "halaman", "dibuat", "dibangun", "framework", "nextjs", "tailwind", "typescript", "build", "built"],
      question: "What is this website built with?",
      answer:
        "Next.js with TypeScript, Tailwind CSS for the styling, and a sans-serif for the text. The page works in two languages and it remembers which one you chose.",
    },
    {
      id: "lokasi",
      keywords: ["lokasi", "alamat", "tinggal", "kota", "address", "city", "based", "located", "location", "berada"],
      question: "Where are you located?",
      answer:
        "My school is in Central Jakarta. I do not put my full address on a public page, but if you genuinely need it, just ask on LinkedIn.",
    },
    {
      id: "umur",
      keywords: ["umur", "usia", "age", "lahir", "birth", "old", "tahun", "birthday"],
      question: "How old are you?",
      answer:
        "I do not list my age on this page. What is written here: I am a twelfth-grade Software Engineering student.",
    },
  ],
};
