import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { motion } from "framer-motion";
const ProductCard = ({ product }) => {

    const { currency, router } = useAppContext()

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
        >

            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-400 group">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-contain transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />

            </div>


            <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate text-gray-400">{product.description}</p>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">{currency}{product.offerPrice}</p>
                <button className="max-sm:hidden px-4 py-1.5 bg-sky-500 text-white border border-sky-500 rounded-full text-xs hover:bg-white hover:text-black transition">
                    Buy now
                </button>
            </div>
        </motion.div>
    )
}

export default ProductCard