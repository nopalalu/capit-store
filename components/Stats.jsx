"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "./Reveal";

const stats = [
  { display: "15.000", suffix: "+", label: "Pasangan sandal terjual" },
  { display: "98", suffix: "%", label: "Ulasan bintang 5" },
  { display: "50", suffix: "+", label: "Model & varian warna" },
  { display: "7", suffix: "", label: "Hari garansi tukar ukuran" },
];

export default function Stats() {
  // Observer dipasang di strip (elemen statis, tidak ditransform) —
  // pola ini yang terbukti jalan, lalu dipakai untuk menggerakkan angka.
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="py-14 md:py-16">
      <Reveal>
        <div
          ref={ref}
          className="rounded-[28px] border-2 border-neutral-900 bg-white shadow-[8px_8px_0_#1c1917] overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] bg-neutral-900">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white px-6 py-8 md:py-10 text-center hover:bg-amber-100 transition-colors duration-300"
              >
                {/* Angka: slide-up dari balik mask, stagger per kolom */}
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    className="block font-display text-4xl md:text-[52px] font-semibold text-neutral-900 leading-[1.1] tabular-nums"
                    initial={{ y: "110%" }}
                    animate={inView ? { y: "0%" } : undefined}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + i * 0.13,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {s.display}
                    <span className="text-emerald-700">{s.suffix}</span>
                  </motion.span>
                </span>
                {/* Label: fade-in nyusul */}
                <motion.p
                  className="text-xs md:text-sm text-neutral-500 mt-2 font-medium flex items-center justify-center gap-1.5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.13 }}
                >
                  <span className="text-emerald-700 text-[10px]">✦</span>
                  {s.label}
                </motion.p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
