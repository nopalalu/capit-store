import React, { useState } from 'react'
import { useAppContext } from '@/context/AppContext';
import { motion } from "framer-motion";
import QuickView from "./QuickView";

const ProductCard = ({ product, index = 0 }) => {

    const { currency, router } = useAppContext()
    const [quickView, setQuickView] = useState(false);

    const discount = product.price > product.offerPrice
        ? Math.round((1 - product.offerPrice / product.price) * 100)
        : 0;

    // Biarkan Next.js yang atur scroll ke atas sebagai bagian dari navigasi —
    // scroll manual di sini bikin "teleport" dua tahap (lompat dulu, halaman nyusul).
    const go = () => router.push('/product/' + product._id);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    duration: 0.6,
                    delay: (index % 4) * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, amount: 0.15 }}
                onClick={go}
                className="group flex flex-col w-full cursor-pointer rounded-2xl border-2 border-neutral-900 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[7px_7px_0_#1c1917]"
            >
                <div className="relative w-full aspect-square overflow-hidden bg-neutral-100 border-b-2 border-neutral-900">
                    <img
                        src={product.image[0]}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-hover:rotate-[1deg]"
                    />
                    {discount > 0 && (
                        <span className="absolute top-3 left-3 -rotate-6 rounded-lg bg-amber-300 text-neutral-900 text-[11px] font-bold px-2.5 py-1 shadow-md border-2 border-neutral-900">
                            -{discount}%
                        </span>
                    )}
                    <button
                        onClick={(e) => { e.stopPropagation(); setQuickView(true); }}
                        aria-label={`Quick view ${product.name}`}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md border-2 border-neutral-900 flex items-center justify-center text-neutral-700 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-neutral-900 hover:text-white"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.05 12.55a1 1 0 010-1.1 11.9 11.9 0 0119.9 0 1 1 0 010 1.1 11.9 11.9 0 01-19.9 0z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-14 group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap rounded-full bg-neutral-900 text-white text-[11px] font-bold uppercase tracking-[0.14em] px-4 py-2">
                        Lihat detail →
                    </span>
                </div>

                <div className="flex flex-col gap-1 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 truncate">
                        {product.category}
                    </p>
                    <p className="text-[15px] font-semibold text-neutral-900 leading-snug line-clamp-2 min-h-[2.6em]">
                        {product.name}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-baseline gap-1.5">
                            <p className="font-display text-[19px] font-semibold text-neutral-900">
                                {currency}{product.offerPrice}
                            </p>
                            {product.price > product.offerPrice && (
                                <p className="text-xs text-neutral-400 line-through">
                                    {currency}{product.price}
                                </p>
                            )}
                        </div>
                        <motion.span
                            whileTap={{ scale: 0.88 }}
                            aria-hidden="true"
                            className="w-10 h-10 rounded-full bg-amber-300 border-2 border-neutral-900 flex items-center justify-center text-neutral-900 transition-all duration-300 group-hover:bg-neutral-900 group-hover:text-amber-300 group-hover:rotate-45"
                        >
                            <span className="text-lg leading-none">↗</span>
                        </motion.span>
                    </div>
                </div>
            </motion.div>
            <QuickView product={quickView ? product : null} onClose={() => setQuickView(false)} />
        </>
    )
}

export default ProductCard
