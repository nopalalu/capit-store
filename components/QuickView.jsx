"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";

export default function QuickView({ product, onClose }) {
  const { currency, addToCart, router } = useAppContext();

  useEffect(() => {
    if (!product) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  const discount =
    product && product.price > product.offerPrice
      ? Math.round((1 - product.offerPrice / product.price) * 100)
      : 0;

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-neutral-950/50 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view ${product.name}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl overflow-hidden w-full max-w-3xl grid md:grid-cols-2 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:rotate-90 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative bg-neutral-100 min-h-64 md:min-h-[420px]">
              <img
                src={product.image[0]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 -rotate-6 rounded-lg bg-amber-300 text-neutral-900 text-xs font-bold px-3 py-1.5 shadow-md border border-neutral-900/10">
                  -{discount}%
                </span>
              )}
            </div>

            <div className="p-7 md:p-9 flex flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800 mb-2">
                {product.category}
              </p>
              <h3 className="font-display text-2xl md:text-[28px] font-semibold text-neutral-900 leading-tight">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-3">
                <p className="text-2xl font-bold text-neutral-900">
                  {currency}{product.offerPrice}
                </p>
                {product.price > product.offerPrice && (
                  <p className="text-sm text-neutral-400 line-through">{currency}{product.price}</p>
                )}
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed mt-4 line-clamp-4">
                {product.description}
              </p>
              <p className="text-xs font-medium text-neutral-500 mt-3">
                {product.stock > 0 ? (
                  <span className="text-emerald-700">● Stok tersedia ({product.stock} pcs)</span>
                ) : (
                  <span className="text-red-600">● Stok habis</span>
                )}
              </p>

              <div className="flex gap-3 mt-auto pt-7">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { addToCart(product._id); onClose(); }}
                  disabled={product.stock <= 0}
                  className="flex-1 py-3 bg-neutral-900 text-white rounded-xl text-sm font-semibold hover:bg-emerald-800 transition disabled:opacity-40"
                >
                  + Keranjang
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { onClose(); router.push("/product/" + product._id); }}
                  className="flex-1 py-3 border-2 border-neutral-900 text-neutral-900 rounded-xl text-sm font-semibold hover:bg-neutral-900 hover:text-white transition"
                >
                  Lihat Detail
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
