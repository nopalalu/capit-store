"use client";
import { useEffect, useState } from "react";

/**
 * Intro preloader — brand curtain yang tampil sekilas sebelum web kebuka.
 * Client-only: kalau JS mati, overlay tidak dirender dan konten langsung kelihatan.
 */
export default function Preloader() {
  const [leave, setLeave] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeave(true), 1400);
    const t2 = setTimeout(() => setGone(true), 2250);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  const first = "CAPIT".split("");
  const second = "STORE".split("");

  return (
    <div className={`preloader ${leave ? "preloader-leave" : ""}`} aria-hidden="true">
      <div className="preloader-inner">
        <p className="preloader-tag">Sandal lokal &mdash; Indonesia</p>
        <div className="preloader-word font-display" aria-label="Capit Store">
          {first.map((ch, i) => (
            <span key={`a-${i}`} className="preloader-letter" style={{ animationDelay: `${i * 55}ms` }}>
              {ch}
            </span>
          ))}
          <span className="preloader-letter" style={{ animationDelay: `${first.length * 55}ms` }}>
            &nbsp;
          </span>
          {second.map((ch, i) => (
            <span
              key={`b-${i}`}
              className="preloader-letter preloader-letter-accent"
              style={{ animationDelay: `${(first.length + 1 + i) * 55}ms` }}
            >
              {ch}
            </span>
          ))}
        </div>
        <div className="preloader-bar">
          <span />
        </div>
      </div>
    </div>
  );
}
