"use client";

const items = [
  "Gratis ongkir se-Indonesia",
  "100% original",
  "Garansi 7 hari tukar ukuran",
  "Sandal lokal berkualitas",
  "Pembayaran aman & mudah",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee overflow-hidden my-4 md:my-6 -rotate-1 scale-[1.02]" aria-hidden="true">
      <div className="bg-neutral-900 py-3 border-y-2 border-neutral-900">
        <div className="marquee-track flex w-max items-center whitespace-nowrap">
          {row.map((t, i) => (
            <span
              key={i}
              className="flex items-center text-[13px] font-bold uppercase tracking-[0.2em] text-amber-50"
            >
              <span className="px-6">{t}</span>
              <span className="text-emerald-400 text-base leading-none">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
