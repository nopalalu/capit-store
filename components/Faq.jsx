"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Apakah sandal yang dijual 100% original?",
    a: "Ya. Semua sandal di Capit Store original dari brand-nya masing-masing — Swallow, Lurad, dan koleksi pilihan kami. Bukan KW, bukan replika.",
  },
  {
    q: "Berapa lama pengiriman sampai?",
    a: "Pesanan dikirim maksimal 1×24 jam setelah pembayaran. Estimasi tiba 2–4 hari untuk Pulau Jawa dan 3–7 hari untuk luar Jawa, tergantung ekspedisi.",
  },
  {
    q: "Bagaimana kalau ukurannya tidak pas?",
    a: "Tenang, ada garansi 7 hari tukar ukuran selama sandal belum dipakai di luar ruangan dan dus masih lengkap. Hubungi kami lewat halaman Contact.",
  },
  {
    q: "Metode pembayaran apa saja yang tersedia?",
    a: "Transfer bank, e-wallet, dan bayar di tempat (COD) untuk area tertentu. Semua pembayaran diproses aman sebelum pesanan dikirim.",
  },
  {
    q: "Apakah bisa beli dalam jumlah banyak / grosir?",
    a: "Bisa. Untuk pembelian di atas 12 pasang (seragam komunitas, karyawan, dsb.) hubungi kami lewat halaman Contact untuk harga khusus.",
  },
];

function Item({ q, a, open, onClick }) {
  return (
    <div className="border-b border-neutral-200 last:border-0">
      <button
        onClick={onClick}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className={`text-[15px] font-semibold transition-colors ${open ? "text-emerald-800" : "text-neutral-900"}`}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 text-lg leading-none"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-neutral-500 leading-relaxed max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq({ title = "Sering ditanyakan" }) {
  const [open, setOpen] = useState(0);
  return (
    <Reveal>
      <div className="max-w-3xl mx-auto">
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-neutral-900 mb-4">{title}</h3>
        <div className="bg-white rounded-2xl border border-neutral-200/80 px-6 md:px-8">
          {faqs.map((f, i) => (
            <Item
              key={i}
              q={f.q}
              a={f.a}
              open={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
