import React from 'react'
import { useAppContext } from '@/context/AppContext';
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {

    const { currency, router } = useAppContext()

    const discount = product.price > product.offerPrice
        ? Math.round((1 - product.offerPrice / product.price) * 100)
        : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="group flex flex-col w-full cursor-pointer bg-white rounded-2xl border border-neutral-200/80 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
            <div className="relative w-full aspect-square overflow-hidden bg-neutral-100">
                <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                {discount > 0 && (
                    <span className="absolute top-3 left-3 rounded-full bg-red-600 text-white text-[11px] font-semibold px-2.5 py-1">
                        -{discount}%
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-1 p-4">
                <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-400 truncate">
                    {product.category}
                </p>
                <p className="text-sm font-semibold text-neutral-900 truncate">
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
                    <button
                        onClick={(e) => { e.stopPropagation(); router.push('/product/' + product._id); scrollTo(0, 0); }}
                        className="px-4 py-1.5 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-emerald-800 transition"
                    >
                        Buy now
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard
