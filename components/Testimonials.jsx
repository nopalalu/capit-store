"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const testimonials = [
  {
    name: "Rizky Pratama",
    city: "Purwokerto",
    product: "Sandal Gunung Ndaweg",
    text: "Jahitannya rapi, solnya empuk banget. Dipakai jalan jauh nggak bikin kaki pegal sama sekali.",
  },
  {
    name: "Sinta Maharani",
    city: "Jakarta",
    product: "Swallow Classic",
    text: "Udah beli tiga kali buat sekeluarga. Kualitasnya konsisten terus, pengirimannya juga cepat.",
  },
  {
    name: "Dimas Anggara",
    city: "Yogyakarta",
    product: "Lurad Premium",
    text: "Modelnya bagus dan nggak pasaran. Harga bersahabat untuk kualitas sekelas ini.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const go = (d) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <section className="py-16 md:py-20">
      <SectionHeader
        eyebrow="Kata mereka"
        title="Cerita kaki yang"
        accent="puas."
      />
      <Reveal>
        <div className="relative bg-amber-50 border border-amber-200/60 rounded-3xl px-7 py-10 md:px-14 md:py-12 overflow-hidden">
          <span className="font-display text-[120px] leading-none text-amber-200/70 absolute -top-4 left-6 select-none" aria-hidden="true">
            &ldquo;
          </span>
          <div className="relative min-h-[190px] md:min-h-[150px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: 40 * dir }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * dir }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex gap-1 text-amber-500 text-lg mb-4" aria-label="5 dari 5 bintang">
                  {"★★★★★"}
                </div>
                <blockquote className="font-display text-xl md:text-2xl text-neutral-900 leading-snug max-w-2xl">
                  {t.text}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-neutral-900 text-amber-50 flex items-center justify-center font-bold">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-neutral-900">{t.name}</span>
                    <span className="block text-xs text-neutral-500">{t.city} · beli {t.product}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="relative flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
                  aria-label={`Testimoni ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-neutral-900" : "w-2 bg-neutral-300 hover:bg-neutral-400"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Sebelumnya"
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition"
              >
                ←
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Berikutnya"
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
