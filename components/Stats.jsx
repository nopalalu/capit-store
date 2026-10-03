"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import Tilt from "./Tilt";

const stats = [
  {
    display: "15.000",
    suffix: "+",
    label: "Pasangan sandal terjual",
    back: "Setiap pasang dibuat teliti untuk kaki Indonesia.",
  },
  {
    display: "98",
    suffix: "%",
    label: "Ulasan bintang 5",
    back: "Dari ribuan ulasan pembeli terverifikasi.",
  },
  {
    display: "50",
    suffix: "+",
    label: "Model & varian warna",
    back: "Jepit santai, gunung, sampai slides premium.",
  },
  {
    display: "7",
    suffix: "",
    label: "Hari garansi tukar ukuran",
    back: "Salah ukuran? Tukar mudah via WhatsApp.",
  },
];

function StatCell({ s }) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const toggle = () => setFlipped((f) => !f);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`${s.label}. Klik untuk ${flipped ? "tutup" : "lihat"} detail.`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className="relative cursor-pointer [transform-style:preserve-3d] outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-inset"
      initial={false}
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* sisi depan */}
      <div className="px-6 py-8 md:py-10 text-center [backface-visibility:hidden] hover:bg-amber-100 transition-colors duration-300">
        <span
          className="absolute top-2.5 right-3 text-neutral-300 text-base leading-none select-none"
          aria-hidden="true"
          title="Klik untuk detail"
        >
          ⟲
        </span>
        <span className="block font-display text-4xl md:text-[52px] font-semibold text-neutral-900 leading-[1.1] tabular-nums">
          {s.display}
          <span className="text-emerald-700">{s.suffix}</span>
        </span>
        <p className="text-xs md:text-sm text-neutral-500 mt-2 font-medium flex items-center justify-center gap-1.5">
          <span className="text-emerald-700 text-[10px]">✦</span>
          {s.label}
        </p>
      </div>
      {/* sisi belakang */}
      <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-emerald-800 flex flex-col items-center justify-center gap-2 px-5 text-center">
        <span className="text-amber-300 text-lg leading-none" aria-hidden="true">
          ✦
        </span>
        <p className="text-amber-50 text-sm font-medium leading-relaxed">{s.back}</p>
        <span className="text-amber-200/70 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
          Ketuk untuk kembali
        </span>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="py-14 md:py-16">
      <Reveal>
        <Tilt max={4} perspective={1400} className="will-change-transform">
          <div className="rounded-[28px] border-2 border-neutral-900 bg-white shadow-[8px_8px_0_#1c1917] overflow-hidden"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] bg-neutral-900 [perspective:1600px]">
              {stats.map((s, i) => (
                <StatCell key={i} s={s} />
              ))}
            </div>
          </div>
        </Tilt>
      </Reveal>
    </section>
  );
}
