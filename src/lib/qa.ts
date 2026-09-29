/*
 * Mesin tanya-jawab untuk section "Tanya".
 *
 * PENTING, ini bukan model bahasa. Tidak ada panggilan jaringan, tidak ada
 * API key, tidak ada data yang keluar dari browser.
 *
 * Yang terjadi di sini: pertanyaan dinormalisasi, dipecah jadi kata, lalu
 * setiap entri di basis pengetahuan dinilai dari berapa kata kunci yang cocok.
 * Entri dengan skor tertinggi menang kalau skornya melewati ambang.
 *
 * Kenapa bukan model: halaman ini statis dan tidak punya backend. Memanggil
 * model sungguhan berarti menambah key, menambah biaya, dan mengirim pertanyaan
 * pengunjung ke pihak ketiga. Kalau nanti itu diinginkan, yang perlu diganti
 * hanya fungsi answerQuestion di bawah; bentuk keluarannya sudah sama.
 *
 * Konsekuensinya harus jujur dan terlihat oleh pengguna:
 *
 * 1. Jawaban hanya bisa diambil dari isi halaman ini. Pertanyaan di luar itu
 *    dijawab "tidak tahu", bukan ditebak.
 * 2. Basis pengetahuan dibangun dari dictionary yang sama dengan section lain,
 *    jadi kalau data sekolah berubah, jawaban ikut berubah dan tidak basi.
 * 3. Tidak ada ingatan antar pertanyaan. Satu pertanyaan, satu jawaban.
 */

import type { Locale } from "./locales";

/** Satu entri = satu topik yang memang ada isinya di halaman. */
export type QaEntry = {
  id: string;
  /**
   * Kata kunci untuk pencocokan, huruf kecil semua.
   *
   * Boleh campur ID dan EN, dan memang itu yang ditulis: orang sering
   * mengetik dalam bahasa yang berbeda dari bahasa halamannya, jadi "school"
   * harusnya tetap menemukan entri sekolah.
   */
  keywords: string[];
  /** Pertanyaan contoh. Dipakai untuk chip dan tombol acak. */
  question: string;
  answer: string;
};

export type QaResult =
  | { kind: "hit"; entry: QaEntry; score: number }
  | { kind: "miss" };

/** Batas pertanyaan per jendela waktu. */
export const QA_LIMIT = 10;

/** Lama menunggu sebelum limit pulih: 10 menit. */
export const QA_COOLDOWN_MS = 10 * 60 * 1000;

/*
 * Kata umum dan kata tanya. Buang ini dulu sebelum skoring, kalau tidak kata
 * "saya" dan "kamu" akan membuat semua entri terlihat cocok dan yang terpilih
 * selalu jadi sama.
 *
 * Kata tanya ikut dibuang, tapi HANYA yang bukan sekaligus kata kunci sebuah
 * entri. "siapa" dan "where" tetap dibiarkan karena dua entri memang relies on
 * them, sedangkan "apa", "berapa", "what", dan "how" tidak pernah jadi kata
 * kunci dan hanya menambah panjang pertanyaan tanpa menambah informasi.
 *
 * Suffix "-nya" juga dibuang. Dalam bahasa Indonesia dia menempel ke kata
 * ("codenya", "sekolahnya"), dan membawanya sebagai token sendiri hanya
 * membuat cakupan kata terukur jadi lebih kecil dari kenyataan.
 */
const STOPWORDS = new Set([
  // Indonesia
  "ada", "adalah", "aja", "aku", "anda", "atau", "bagai", "bagaimana", "bagian",
  "banyak", "bisa", "buat", "dalam", "dari", "dengan", "di", "dia", "gimana",
  "hari", "hampir", "href", "ingin", "ini", "itu", "jika", "juga", "kali",
  "kamu", "kapan", "karena", "ke", "kepada", "kita", "lagi", "lain", "lalu",
  "lebih", "maka", "mau", "mereka", "namanya", "nanti", "nya", "oleh",
  "pada", "para", "pun", "saja", "sampai", "saya", "sebab", "sebuah",
  "sedang", "sehingga", "sejak", "selain", "semua", "serta", "setelah",
  "seperti", "sudah", "supaya", "tahu", "tanpa", "tapi", "telah", "tentang",
  "terhadap", "tersebut", "tetap", "tidak", "untuk", "yaitu", "yang", "yg",
  "apa", "berapa", "kenapa", "mengapa", "cara", "sih", "dong", "jauh", "ga",
  "gak", "dipake", "jalan", "sering", "sekarang",
  // English
  "about", "an", "any", "are", "can", "could", "did", "do", "does", "for",
  "from", "go", "has", "have", "he", "her", "his", "in", "is", "it", "its",
  "made", "make", "many", "me", "of", "on", "or", "part", "self", "she",
  "should", "so", "some", "that", "the", "their", "them", "then", "there",
  "these", "they", "this", "to", "use", "used", "was", "we", "were", "what",
  "when", "where", "which", "why", "will", "with", "would", "you", "your",
  "yourself", "how", "whose", "whom", "here", "know",
]);

/**
 * Pecah pertanyaan jadi kata yang berguna.
 *
 * Tanda baca dibuang, tapi tanda baca di tengah kata tidak memotong kata:
 * "next.js" dan "php?" harus tetap utuh, karena itu nama teknologi, bukan
 * kalimat.
 */
export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}.+#-]+/gu, " ")
    .split(" ")
    .map((token) => token.replace(/^[.\-#+]+|[.\-#+]+$/g, ""))
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

/**
 * Bobot satu kata kunci.
 *
 * Panjang kata kunci dipakai sebagai proksi informatif: "flutter" lebih
 * banyak bicara tentang topik daripada "web". Pembagian dengan jumlah kata
 * kunci total sengaja TIDAK dipakai. Entri dengan 12 kata kunci bukan penipu,
 * dia cuma punya 12 pintu masuk, dan menghukum dia karena punya pintu masuk
 * banyak membuat hampir seluruh basis pengetahuan mustahil menang.
 */
function keywordWeight(keyword: string): number {
  return Math.max(1.6, 1 + keyword.length / 6);
}

/**
 * True kalau `token` adalah bentuk turunan `keyword`, mis. "projects" dari
 * "project" atau "codenya" dari "kode".
 */
function isFormOf(token: string, keyword: string): boolean {
  return (
    token.length > keyword.length &&
    token.length - keyword.length <= 5 &&
    token.startsWith(keyword)
  );
}

/**
 * Skor satu entri.
 *
 * Tiga tingkat kecocokan, dari yang paling yakin ke yang paling nekat:
 *
 * 1. Kata kunci muncul sebagai token utuh             -> bobot penuh
 * 2. Token berawalan kata kunci ("projects", "codenya") -> bobot penuh juga
 * 3. Kata kunci cuma muncul di tengah kata lain         -> bobot separuh
 *
 * Kasus kedua dihitung penuh karena bahasa Indonesia dan Inggris sama-sama
 * menempelkan sufiks ke akar kata. Kalau "codenya" cuma dapat separuh bobot,
 * pertanyaan paling natural di situs ini justru gagal dijawab.
 */
function scoreEntry(
  entry: QaEntry,
  tokens: readonly string[],
  haystack: string,
): { score: number; hits: number } {
  const hits: number[] = [];

  for (const raw of entry.keywords) {
    const keyword = raw.trim().toLowerCase();
    if (keyword.length < 2) continue;

    const weight = keywordWeight(keyword);

    if (tokens.some((token) => token === keyword || isFormOf(token, keyword))) {
      hits.push(weight);
    } else if (haystack.includes(keyword)) {
      hits.push(weight / 2);
    }
  }

  if (hits.length === 0) return { score: 0, hits: 0 };

  const total = hits.reduce((sum, weight) => sum + weight, 0);

  // Entri yang cocok di dua tempat lebih layak daripada satu yang kebetulan
  // cocok di satu tempat, walau kata kuncinya cuma dua.
  return { score: total * (1 + 0.2 * (hits.length - 1)), hits: hits.length };
}

/** Gabungan semua kata kunci, dipakai sebagai kamus untuk mengukur cakupan. */
function buildDictionary(entries: readonly QaEntry[]): Set<string> {
  const dictionary = new Set<string>();

  for (const entry of entries) {
    for (const raw of entry.keywords) {
      const keyword = raw.trim().toLowerCase();
      if (keyword.length >= 2) dictionary.add(keyword);
    }
  }

  return dictionary;
}

/**
 * Berapa bagian dari kata-kata pertanyaan yang tertangkap kamus.
 *
 * Ini yang menahan tebakan. Satu kata kunci yang cocok tidak cukup kalau
 * pertanyaan itu banyak kata asing: "siapa ingrained_tree" memang memuat
 * "siapa", tapi "ingrained_tree" tidak ada di halaman ini, jadi pertanyaan itu
 * sengaja ditolak, bukan dijawab "Saya Rezy Alfarabi".
 */
function coverage(tokens: readonly string[], dictionary: ReadonlySet<string>): number {
  if (tokens.length === 0) return 0;

  const known = tokens.filter(
    (token) =>
      dictionary.has(token) ||
      [...dictionary].some((keyword) => isFormOf(token, keyword)),
  );

  return known.length / tokens.length;
}

/*
 * Ambang minimal. Di bawah ini pertanyaan dianggap di luar isi halaman, dan
 * jawabannya "tidak tahu".
 *
 * Satu kecocokan kata kunci memberi skor sekitar 1.6 sampai 2.7, tergantung
 * panjang kata kuncinya, jadi MIN_SCORE 1.6 artinya "minimal ada satu kata kunci
 * yang benar-benar cocok". Yang menahan tebakan justru MIN_COVERAGE: kalau
 * lebih dari separuh kata pertanyaan tidak ada di kamus, jangan dijawab.
 */
const MIN_SCORE = 1.6;
const MIN_COVERAGE = 0.5;

/**
 * Jawab satu pertanyaan dari basis pengetahuan.
 *
 * Kembalikan hit kalau ada entri yang skornya melewati ambang, miss kalau
 * tidak. Tidak ada jalur tengah yang menebak.
 */
export function answerQuestion(
  question: string,
  entries: readonly QaEntry[],
): QaResult {
  const tokens = tokenize(question);
  if (tokens.length === 0) return { kind: "miss" };

  const haystack = ` ${tokens.join(" ")} `;

  if (coverage(tokens, buildDictionary(entries)) < MIN_COVERAGE) {
    return { kind: "miss" };
  }

  let best: { entry: QaEntry; score: number } | null = null;

  for (const entry of entries) {
    const { score } = scoreEntry(entry, tokens, haystack);
    if (score >= MIN_SCORE && (best === null || score > best.score)) {
      best = { entry, score };
    }
  }

  return best === null
    ? { kind: "miss" }
    : { kind: "hit", entry: best.entry, score: best.score };
}

/**
 * Pilih pertanyaan acak dari daftar contoh.
 *
 * `except` dipakai supaya tombol acak tidak mengembalikan pertanyaan yang
 * sama dua kali berturut-turut; kalau hanya ada satu entris, kembalikan yang
 * itu saja.
 */
export function pickRandomQuestion(
  entries: readonly QaEntry[],
  except: string | null,
): QaEntry | null {
  if (entries.length === 0) return null;

  const pool = except === null ? entries : entries.filter((entry) => entry.id !== except);
  const source = pool.length > 0 ? pool : entries;

  return source[Math.floor(Math.random() * source.length)] ?? null;
}

/** Sisa waktu cooldown dalam detik, dibulatkan ke atas supaya tidak pernah 0 sebelum habis. */
export function secondsLeft(until: number, now: number): number {
  return Math.max(0, Math.ceil((until - now) / 1000));
}

/** Format mm:ss untuk hitung mundur. */
export function formatCountdown(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

/** Kunci localStorage ikut locale, supaya hitungan tidak bercampur antar bahasa. */
export function storageKey(locale: Locale): string {
  return `tanya-limit:${locale}`;
}