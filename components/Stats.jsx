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

// Papan flip mekanik: angka jatuh dari atas kayak papan jadwal kereta,
// memantul sekali sebelum berhenti pas. Jauh lebih "niat" dari fade biasa.
const flap = {
  hidden: { rotateX: -88, opacity: 0, y: -14 },
  show: (i) => ({
    rotateX: 0,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 210,
      damping: 15,
      mass: 0.9,
      delay: 0.25 + i * 0.16,
    },
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
                  <span
                    className="block overflow-visible [perspective:600px]"
                    aria-hidden="false"
                  >
                    <motion.span
                      className="block font-display text-4xl md:text-[52px] font-semibold text-neutral-900 leading-[1.1] tabular-nums origin-top"
                      custom={i}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.6 }}
                      variants={flap}
                      style={{ transformPerspective: 600 }}
                    >
                      {s.display}
                      <span className="text-emerald-700">{s.suffix}</span>
                    </motion.span>
                  </span>
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
