"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll ke paling atas setiap pindah halaman (client navigation).
 * Sengaja SKIP saat pertama mount supaya refresh halaman tetap
 * restore posisi scroll terakhir (perilaku browser yang dipertahankan).
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
