'use client'
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import Reveal from "@/components/Reveal";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {

  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount, currency } = useAppContext();

  const cartEntries = Object.keys(cartItems).filter(
    (itemId) => cartItems[itemId] > 0 && products.find((p) => p._id === itemId)
  );

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-10 pb-20 min-h-screen bg-neutral-50">
        <Reveal>
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
              Keranjang <em className="text-emerald-800">kamu.</em>
            </h1>
            <p className="text-sm text-neutral-500">{getCartCount()} items</p>
          </div>
        </Reveal>

        {cartEntries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
            <p className="text-lg font-semibold text-neutral-900">Your cart is empty</p>
            <p className="text-sm text-neutral-500 mt-2">Looks like you haven't added any sandals yet.</p>
            <button
              onClick={() => router.push('/all-products')}
              className="mt-6 px-8 py-3 bg-neutral-900 text-white rounded-full text-sm font-semibold hover:bg-emerald-800 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 w-full bg-white rounded-2xl border border-neutral-200 divide-y divide-neutral-100 overflow-hidden">
              <AnimatePresence initial={false}>
              {cartEntries.map((itemId) => {
                const product = products.find((product) => product._id === itemId);
                return (
                  <motion.div
                    key={itemId}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -32 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-4 p-4 md:p-5"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-neutral-900 truncate">{product.name}</p>
                          <p className="text-sm text-neutral-500 mt-0.5">{currency}{product.offerPrice} each</p>
                        </div>
                        <button
                          className="text-xs font-medium text-neutral-400 hover:text-red-600 transition shrink-0"
                          onClick={() => updateCartQuantity(product._id, 0)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 border border-neutral-200 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}
                            className="p-1 hover:opacity-70 transition"
                            aria-label="Decrease quantity"
                          >
                            <Image src={assets.decrease_arrow} alt="decrease" className="w-4 h-4" />
                          </button>
                          <input
                            onChange={e => updateCartQuantity(product._id, Number(e.target.value))}
                            type="number"
                            value={cartItems[itemId]}
                            className="w-8 text-center text-sm font-semibold outline-none appearance-none bg-transparent"
                          />
                          <button
                            onClick={() => addToCart(product._id)}
                            className="p-1 hover:opacity-70 transition"
                            aria-label="Increase quantity"
                          >
                            <Image src={assets.increase_arrow} alt="increase" className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-bold text-neutral-900">
                          {currency}{(product.offerPrice * cartItems[itemId]).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              </AnimatePresence>
            </div>
            <div className="w-full lg:w-96 shrink-0">
              <OrderSummary />
              <button
                onClick={() => router.push('/all-products')}
                className="group flex items-center mt-5 gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition"
              >
                <Image
                  className="group-hover:-translate-x-1 transition rotate-180"
                  src={assets.arrow_right_icon_colored}
                  alt="back"
                />
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
