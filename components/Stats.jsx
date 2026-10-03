"use client";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import Tilt from "./Tilt";

const stats = [
  { display: "15.000", suffix: "+", label: "Pasangan sandal terjual" },
  { display: "98", suffix: "%", label: "Ulasan bintang 5" },
  { display: "50", suffix: "+", label: "Model & varian warna" },
  { display: "7", suffix: "", label: "Hari garansi tukar ukuran" },
];

// Efek "cap stempel": angka menghantam dari besar + miring, lalu memantul ke posisi pas.
const stamp = {
  hidden: { opacity: 0, scale: 1.6, rotate: -7 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 280, damping: 14, delay: 0.15 + i * 0.14 },
  }),
};

export default function Stats() {
  return (
    <section className="py-14 md:py-16">
      <Reveal>
        <Tilt max={4} perspective={1400} className="will-change-transform">
          <div className="rounded-[28px] border-2 border-neutral-900 bg-white shadow-[8px_8px_0_#1c1917] overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] bg-neutral-900">
              {stats.map((s, i) => (
                <div key={i} className="px-6 py-8 md:py-10 text-center bg-white">
                  <motion.span
                    className="block font-display text-4xl md:text-[52px] font-semibold text-neutral-900 leading-[1.1] tabular-nums origin-center"
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    variants={stamp}
                  >
                    {s.display}
                    <span className="text-emerald-700">{s.suffix}</span>
                  </motion.span>
                  <p className="text-xs md:text-sm text-neutral-500 mt-2 font-medium flex items-center justify-center gap-1.5">
                    <span className="text-emerald-700 text-[10px]">✦</span>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Tilt>
      </Reveal>
    </section>
  );
}
