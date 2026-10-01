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
    <span ref={ref}>
      {val.toLocaleString("id-ID")}
      {suffix}
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 rounded-3xl overflow-hidden border border-neutral-200">
          {stats.map((s, i) => (
            <div key={i} className="bg-white px-6 py-8 md:py-10 text-center hover:bg-amber-50/60 transition-colors">
              <p className="font-display text-3xl md:text-[40px] font-semibold text-emerald-900 leading-none">
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="text-xs md:text-sm text-neutral-500 mt-2.5 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
