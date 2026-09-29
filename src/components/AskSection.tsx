"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Dict } from "@/lib/i18n";
import { Reveal } from "@/lib/reveal";
import {
  QA_COOLDOWN_MS,
  QA_LIMIT,
  answerQuestion,
  formatCountdown,
  pickRandomQuestion,
  secondsLeft,
  type QaEntry,
  type QaResult,
} from "@/lib/qa";
import {
  limitSnapshot,
  serverLimitSnapshot,
  subscribe,
  useLimitLocale,
  writeLimit,
} from "@/lib/qa-store";
import { SectionHead } from "./SectionHead";

type AskSectionProps = {
  text: Dict["ask"];
  locale: Dict["locale"];
  entries: readonly QaEntry[];
};

/**
 * Section Tanya.
 *
 * Dua kolom: kiri untuk bertanya, kanan untuk jawaban. Pertanyaannya sendiri
 * tidak pernah hilang, jadi pembaca bisa tahu apa yang sebenarnya dia tanyakan
 * kalau jawabannya terasa meleset (R-33).
 *
 * Limit 10 pertanyaan dan tunggu 10 menit dibaca lewat useSyncExternalStore,
 * bukan useState + effect. Alasannya ada di qa-store.ts: server tidak punya
 * localStorage, jadi nilai batas harus datang dari snapshot server saat render
 * pertama dan baru diganti setelah hydration selesai.
 *
 * Waktu countdown dibaca dari satu jam yang sama, jadi angka menit dan angka
 * kuota tidak pernah bisa tidak sinkron.
 */
export function AskSection({ text, locale, entries }: AskSectionProps) {
  // Dipanggil di render, bukan di effect: key storage yang dibaca sudah benar
  // sejak snapshot pertama.
  useLimitLocale(locale);

  const limit = useSyncExternalStore(subscribe, limitSnapshot, serverLimitSnapshot);

  /*
    Jam untuk hitung mundur. Sengaja di komponen, bukan di store: angkanya
    tidak perlu bertahan melewati reload, dan selalu nol di server sehingga
    tidak ada masalah hydration.

    Semua setState ada di dalam callback timer, tidak ada satu pun di body
    effect. Itulah yang membedakan "menyubscribe sistem luar" dari "memaksa
    render kedua" (react-hooks/set-state-in-effect).
  */
  const [now, setNow] = useState(0);

  const locked = limit.until > now;
  const remaining = Math.max(0, QA_LIMIT - limit.used);

  useEffect(() => {
    if (limit.until === 0) return;

    /*
      Tick pertama dijadwalkan dengan delay 0, bukan langsung. Dia tetap
      callback, jadi tidak melanggar aturan setState, tapi frame pertama sudah
      dapat waktu yang benar dan tidak sempat menampilkan angka placeholder.
    */
    const first = window.setTimeout(() => setNow(Date.now()), 0);

    const timer = window.setInterval(() => {
      const current = Date.now();
      setNow(current);

      // Waktu habis: kembalikan kuota sendiri, jangan tunggu halaman dimuat ulang.
      if (current >= limit.until) {
        window.clearInterval(timer);
        writeLimit({ used: 0, until: 0 });
      }
    }, 1000);

    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, [limit.until]);

  /*
    Sisa waktu dibatasi atas oleh panjang cooldown. Batas itu bukan sekadar
    penjaga tampilan: kalau now masih 0 pada frame pertama, sisa waktu yang
    dihitung akan jauh lebih besar dari kenyataan, dan angka itulah yang akan
    dibacakan orang.
  */
  const countdown = useMemo(() => {
    const left = Math.min(secondsLeft(limit.until, now), QA_COOLDOWN_MS / 1000);
    return formatCountdown(left);
  }, [limit.until, now]);

  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<QaResult | null>(null);
  const [asked, setAsked] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  /*
    Sumber untuk tombol acak: semua entri, dikecualikan entri yang barusan
    dijawab, supaya dua klik berturut-turut tidak menghasilkan pertanyaan yang
    sama. useMemo supaya daftar ini tidak dibangun ulang tiap ketikan.
  */
  const lastId = result?.kind === "hit" ? result.entry.id : null;

  const submit = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (trimmed.length === 0) return;
      if (limit.until > Date.now() || limit.used >= QA_LIMIT) return;

      setResult(answerQuestion(trimmed, entries));
      setAsked(trimmed);
      setQuestion("");

      const next = { used: limit.used + 1, until: limit.until };
      if (next.used >= QA_LIMIT) next.until = Date.now() + QA_COOLDOWN_MS;
      writeLimit(next);

      inputRef.current?.focus();
    },
    [entries, limit.until, limit.used],
  );

  const askRandom = useCallback(() => {
    const picked = pickRandomQuestion(entries, lastId);
    if (picked !== null) submit(picked.question);
  }, [entries, lastId, submit]);

  return (
    <section id="tanya" aria-label={text.heading}>
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHead index="05" title={text.heading} note={text.note} />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/*
            Kolom kiri. Form-nya nyata: Enter mengirim, dan tombolnya punya
            disabled yang benar, bukan hanya yang terlihat lumpuh (R-26).
          */}
          <Reveal className="lg:col-span-5">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                submit(question);
              }}
              className="frame bg-paper-deep p-5 sm:p-6"
            >
              <label htmlFor="tanya-input" className="label text-primary">
                {text.inputLabel}
              </label>

              <input
                id="tanya-input"
                ref={inputRef}
                type="text"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder={text.placeholder}
                disabled={locked}
                autoComplete="off"
                className="mt-3 w-full border-b-3 border-ink bg-paper px-1 py-3 leading-relaxed placeholder:text-ink-soft/70 focus:border-secondary focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              />

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={locked || question.trim().length === 0}
                  className="frame lift inline-flex min-h-11 items-center bg-secondary px-5 py-2 text-paper transition-colors duration-120 hover:bg-ink disabled:cursor-not-allowed disabled:border-ink/40 disabled:bg-ink/20 disabled:text-ink-soft"
                >
                  {text.submit}
                </button>

                <button
                  type="button"
                  onClick={askRandom}
                  disabled={locked}
                  className="frame inline-flex min-h-11 items-center px-5 py-2 transition-colors duration-120 hover:bg-paper disabled:cursor-not-allowed disabled:border-ink/40 disabled:opacity-60"
                >
                  {text.random}
                </button>
              </div>

              {/*
                Penghitung kuota. live="polite" supaya pembaca layar ikut
                mendengar sisa kuota berubah, karena perubahan itu tidak
                terlihat kalau tidak dibaca.
              */}
              <p aria-live="polite" className="label mt-5 text-ink-soft">
                {text.counterLabel}: {limit.used}/{QA_LIMIT} · {remaining}{" "}
                {text.remainingLabel}
              </p>

              {/*
                Peringatan limit. Muncul hanya saat kuota habis, dan hitung
                mundurnya ikut ditampilkan, jadi orang tahu harus berapa lama
                menunggu, bukan hanya diberi tahu bahwa dia tidak boleh bertanya
                sekarang.
              */}
              {locked ? (
                <div
                  role="status"
                  className="mt-5 border-l-3 border-primary bg-paper px-4 py-4"
                >
                  <p className="display text-sm leading-snug">
                    {text.limitTitle}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {text.limitBody}
                  </p>
                  <p className="display mt-3 text-2xl text-primary tabular-nums">
                    {countdown}
                  </p>
                  <p className="label mt-1 text-ink-soft">
                    {text.countdownLabel}
                  </p>
                </div>
              ) : null}

              <p className="mt-5 text-sm leading-relaxed text-ink-soft">
                {text.engineNote}
              </p>
            </form>
          </Reveal>

          {/*
            Kolom kanan. aria-live="polite" di panel jawaban, karena jawaban
            muncul setelah mengirim dan perubahan itu harus terdengar, bukan
            hanya terlihat.
          */}
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <div aria-live="polite" className="frame bg-paper-deep p-5 sm:p-6">
              {result === null ? (
                <p className="leading-relaxed text-ink-soft">
                  {text.emptyBody}
                </p>
              ) : (
                <>
                  <p className="label text-ink-soft">{text.youLabel}</p>
                  <p className="mt-2 leading-relaxed">{asked}</p>

                  <div className="rule-t mt-5 pt-5">
                    <p className="label text-primary">{text.answerLabel}</p>

                    {result.kind === "hit" ? (
                      <p className="mt-2 leading-relaxed">{result.entry.answer}</p>
                    ) : (
                      <div className="mt-2">
                        <p className="display text-sm text-primary">
                          {text.missTitle}
                        </p>
                        <p className="mt-2 leading-relaxed text-ink-soft">
                          {text.missBody}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/*
                Chip contoh. Dipilih dari empat entri pertama, bukan diacak,
                biar yang tampil lebih dulu memang yang paling sering
                ditanyakan. Tombolnya benar-benar mengirim, bukan cuma mengisi
                kolom.
              */}
              <div className="rule-t mt-6 pt-5">
                <p className="label text-ink-soft">{text.samplesLabel}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {entries.slice(0, 4).map((entry) => (
                    <li key={entry.id}>
                      <button
                        type="button"
                        onClick={() => submit(entry.question)}
                        disabled={locked}
                        className="label min-h-11 border-3 border-ink px-3 py-2 text-left transition-colors duration-120 hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:border-ink/40 disabled:opacity-60"
                      >
                        {entry.question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
