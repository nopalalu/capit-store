"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Reveal from "./Reveal";

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const dur = 1400;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {val.toLocaleString("id-ID")}
      <span className="text-emerald-700">{suffix}</span>
    </span>
  );
}

const stats = [
  { to: 15000, suffix: "+", label: "Pasangan sandal terjual" },
  { to: 98, suffix: "%", label: "Ulasan bintang 5" },
  { to: 50, suffix: "+", label: "Model & varian warna" },
  { to: 7, suffix: "", label: "Hari garansi tukar ukuran" },
];

export default function Stats() {
  return (
    <section className="py-14 md:py-16">
      <Reveal>
        <div className="rounded-[28px] border-2 border-neutral-900 bg-white shadow-[8px_8px_0_#1c1917] overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] bg-neutral-900">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white px-6 py-8 md:py-10 text-center hover:bg-amber-100 transition-colors duration-300"
              >
                <p className="font-display text-4xl md:text-[52px] font-semibold text-neutral-900 leading-none">
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p className="text-xs md:text-sm text-neutral-500 mt-3 font-medium flex items-center justify-center gap-1.5">
                  <span className="text-emerald-700 text-[10px]">✦</span>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
