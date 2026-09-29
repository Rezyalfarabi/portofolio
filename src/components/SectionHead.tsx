type SectionHeadProps = {
  index: string;
  title: string;
  note?: string;
};

/*
 * Kepala section: nomor, judul bitmap, garis bawah keras.
 * Nomor dicetak 24px karena merah di atas krem hanya boleh untuk large text
 * versi WCAG (lihat DESIGN.md).
 *
 * Sengaja tidak dibungkus Reveal. Headalah tulang punggung halaman, dan dulu
 * semua head ikut fade-up bersama, jadi tiap section bergerak dengan cara yang
 * persis sama dan tidak ada satu pun yang jadi fokus. Gerak sekarang hanya
 * dipakai di blok sekunder, hero tetap diam dan memegang perhatian
 * (R-19, "Template Animations Stacked").
 */
export function SectionHead({ index, title, note }: SectionHeadProps) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="rule-b flex flex-wrap items-baseline gap-x-4 gap-y-1 pb-3">
        <span className="display text-2xl text-primary">{index}</span>
        <h2 className="display text-xl sm:text-2xl">{title}</h2>
      </div>
      {note ? (
        <p className="mt-4 max-w-[54ch] text-ink-soft">{note}</p>
      ) : null}
    </div>
  );
}
