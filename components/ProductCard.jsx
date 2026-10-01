import React, { useState } from 'react'
import { useAppContext } from '@/context/AppContext';
import { motion } from "framer-motion";
import QuickView from "./QuickView";

const ProductCard = ({ product }) => {

    const { currency, router } = useAppContext()
    const [quickView, setQuickView] = useState(false);

    const discount = product.price > product.offerPrice
        ? Math.round((1 - product.offerPrice / product.price) * 100)
        : 0;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.2 }}
                onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
                className="group flex flex-col w-full cursor-pointer bg-white rounded-2xl border border-neutral-200/80 overflow-hidden hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.22)] hover:-translate-y-1.5 transition-all duration-300"
            >
                <div className="relative w-full aspect-square overflow-hidden bg-neutral-100">
                    <img
                        src={product.image[0]}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    {discount > 0 && (
                        <span className="absolute top-3 left-3 -rotate-6 rounded-lg bg-amber-300 text-neutral-900 text-[11px] font-bold px-2.5 py-1 shadow-md border border-neutral-900/10">
                            -{discount}%
                        </span>
                    )}
                    <button
                        onClick={(e) => { e.stopPropagation(); setQuickView(true); }}
                        aria-label={`Quick view ${product.name}`}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 shadow-md flex items-center justify-center text-neutral-700 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-neutral-900 hover:text-white"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.05 12.55a1 1 0 010-1.1 11.9 11.9 0 0119.9 0 1 1 0 010 1.1 11.9 11.9 0 01-19.9 0z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col gap-1 p-4">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400 truncate">
                        {product.category}
                    </p>
                    <p className="text-sm font-semibold text-neutral-900 truncate group-hover:text-emerald-800 transition-colors">
                        {product.name}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-baseline gap-1.5">
                            <p className="text-base font-bold text-neutral-900">
                                {currency}{product.offerPrice}
                            </p>
                            {product.price > product.offerPrice && (
                                <p className="text-xs text-neutral-400 line-through">
                                    {currency}{product.price}
                                </p>
                            )}
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.92 }}
                            onClick={(e) => { e.stopPropagation(); router.push('/product/' + product._id); scrollTo(0, 0); }}
                            className="px-4 py-1.5 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-emerald-800 transition-colors"
                        >
                            Buy now
                        </motion.button>
                    </div>
                </div>
            </motion.div>
            <QuickView product={quickView ? product : null} onClose={() => setQuickView(false)} />
        </>
    )
}

export default ProductCard
