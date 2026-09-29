"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { setLocale } from "@/lib/actions";
import { LOCALE_LABEL, LOCALES, type Locale } from "@/lib/locales";

/*
 * Pemilih bahasa di dalam nav.
 *
 * Bentuknya <details> supaya daftar ini tetap bisa dibuka tanpa JavaScript:
 * yang bawa JavaScript cuma penutupan otomatis dan penanda status menunggu.
 */
type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
};

function Option({
  locale,
  current,
  onPick,
}: {
  locale: Locale;
  current: boolean;
  onPick: () => void;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      name="locale"
      value={locale}
      disabled={pending}
      onClick={onPick}
      className={`flex min-h-11 w-full items-center justify-between gap-4 px-3 text-left transition-colors duration-120 disabled:opacity-60 ${
        current ? "bg-ink text-paper" : "hover:bg-paper-deep"
      }`}
    >
      <span className="label">{LOCALE_LABEL[locale]}</span>
      {current ? (
        <span aria-hidden="true" className="display text-xs">
          ●
        </span>
      ) : null}
    </button>
  );
}

export function LocaleSwitcher({ locale, label }: LocaleSwitcherProps) {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  function close() {
    if (detailsRef.current) detailsRef.current.open = false;
  }

  return (
    <details ref={detailsRef} className="group relative">
      <summary
        aria-label={label}
        className="label frame flex min-h-11 cursor-pointer list-none items-center gap-2 px-3 transition-colors duration-120 hover:bg-paper-deep [&::-webkit-details-marker]:hidden"
      >
        <span aria-hidden="true" className="display text-xs">
          {locale.toUpperCase()}
        </span>
        <span
          aria-hidden="true"
          className="transition-transform duration-120 group-open:rotate-180"
        >
          ▼
        </span>
      </summary>

      <form
        action={setLocale}
        className="frame absolute right-0 top-full z-50 mt-1 w-52 bg-paper"
      >
        {LOCALES.map((item) => (
          <Option
            key={item}
            locale={item}
            current={item === locale}
            onPick={close}
          />
        ))}
      </form>
    </details>
  );
}
