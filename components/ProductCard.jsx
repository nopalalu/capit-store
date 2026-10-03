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

    const go = () => { router.push('/product/' + product._id); scrollTo(0, 0) };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.2 }}
                onClick={go}
                className="group flex flex-col w-full cursor-pointer"
            >
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-900/10">
                    <img
                        src={product.image[0]}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
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

                <div className="flex flex-col pt-3.5 px-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 truncate">
                        {product.category}
                    </p>
                    <p className="mt-1 text-[15px] font-semibold text-neutral-900 leading-snug line-clamp-2 min-h-[2.6em] underline decoration-emerald-700 decoration-2 underline-offset-4 [text-decoration-color:transparent] group-hover:[text-decoration-color:#047857] transition-[text-decoration-color] duration-300">
                        {product.name}
                    </p>
                    <div className="flex items-center justify-between mt-2.5">
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
                            whileTap={{ scale: 0.9 }}
                            aria-hidden="true"
                            className="w-10 h-10 rounded-full border-2 border-neutral-900 flex items-center justify-center text-neutral-900 transition-colors duration-300 group-hover:bg-neutral-900 group-hover:text-white"
                        >
                            <span className="inline-block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-lg leading-none">↗</span>
                        </motion.span>
                    </div>
                </div>
            </motion.div>
            <QuickView product={quickView ? product : null} onClose={() => setQuickView(false)} />
        </>
    )
}

export default ProductCard
