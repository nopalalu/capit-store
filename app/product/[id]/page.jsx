"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const Product = () => {
    const { id } = useParams();
    const { products, router, addToCart, currency } = useAppContext();

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);

    const fetchProductData = async () => {
        const product = products.find((product) => product._id === id);
        setProductData(product);
    };

    useEffect(() => {
        fetchProductData();
    }, [id, products.length]);

    if (!productData) return <ProductDetailSkeleton />;

    const inStock = productData.stock > 0;

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-8 pb-4 bg-white">
                <p className="text-xs text-neutral-400 mb-6">
                    <button onClick={() => router.push('/')} className="hover:text-neutral-700">Home</button>
                    <span className="mx-2">/</span>
                    <button onClick={() => router.push('/all-products')} className="hover:text-neutral-700">Shop</button>
                    <span className="mx-2">/</span>
                    <span className="text-neutral-700 font-medium">{productData.name}</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                    <Reveal>
                        <div className="group rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/60 mb-4">
                            <motion.div
                                whileHover={{ scale: 1.06 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full aspect-square"
                            >
                                <Image
                                    src={mainImage || productData.image[0]}
                                    alt={productData.name}
                                    className="w-full h-full object-cover"
                                    width={1280}
                                    height={720}
                                />
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                            {productData.image.map((image, index) => {
                                const active = (mainImage || productData.image[0]) === image;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => setMainImage(image)}
                                        className={`cursor-pointer rounded-xl overflow-hidden bg-neutral-100 border-2 transition ${active ? "border-neutral-900" : "border-transparent hover:border-neutral-300"}`}
                                    >
                                        <Image
                                            src={image}
                                            alt={productData.name}
                                            className="w-full aspect-square object-cover"
                                            width={300}
                                            height={300}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </Reveal>

                    <Reveal delay={0.1} className="flex flex-col">
                        <span className="inline-flex w-fit items-center rounded-full bg-neutral-100 text-neutral-600 text-xs font-semibold px-3 py-1 mb-3">
                            {productData.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
                            {productData.name}
                        </h1>
                        <p className="text-neutral-500 mt-4 leading-relaxed">{productData.description}</p>

                        <div className="flex items-baseline gap-3 mt-6">
                            <p className="text-3xl font-bold text-neutral-900">
                                {currency}{productData.offerPrice}
                            </p>
                            {productData.price > productData.offerPrice && (
                                <p className="text-lg text-neutral-400 line-through">
                                    {currency}{productData.price}
                                </p>
                            )}
                        </div>

                        <div className="mt-4">
                            {inStock ? (
                                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                                    In stock — {productData.stock} pcs
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600">
                                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                                    Stok Habis
                                </span>
                            )}
                        </div>

                        <div className="border-t border-neutral-200 my-8" />

                        <div className="flex flex-col sm:flex-row items-stretch gap-3">
                            <motion.button
                                whileTap={inStock ? { scale: 0.96 } : {}}
                                onClick={() => addToCart(productData._id)}
                                disabled={!inStock}
                                className={`flex-1 py-3.5 transition font-semibold rounded-xl text-sm
                ${!inStock
                                        ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                                        : "bg-white text-neutral-900 border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white"
                                    }`}
                            >
                                Add to Cart
                            </motion.button>
                            <motion.button
                                whileTap={inStock ? { scale: 0.96 } : {}}
                                onClick={() => {
                                    addToCart(productData._id);
                                    router.push("/cart");
                                }}
                                disabled={!inStock}
                                className={`flex-1 py-3.5 transition font-semibold rounded-xl text-sm
                ${!inStock
                                        ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                                        : "bg-neutral-900 text-white hover:bg-emerald-800"
                                    }`}
                            >
                                Buy now
                            </motion.button>
                        </div>
                    </Reveal>
                </div>

                <div className="mt-20">
                    <Reveal>
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-800 mb-2.5 flex items-center gap-2.5">
                                    <span className="inline-block w-7 h-[2px] bg-emerald-800 rounded-full" />
                                    Lanjut belanja
                                </p>
                                <p className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">Mungkin kamu <em className="text-emerald-800">juga suka.</em></p>
                            </div>
                            <button
                                onClick={() => router.push('/all-products')}
                                className="hidden sm:block text-sm font-semibold text-neutral-700 hover:text-emerald-800 transition shrink-0"
                            >
                                See all →
                            </button>
                        </div>
                    </Reveal>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full">
                        {products.slice(0, 5).map((product, index) => (
                            <ProductCard key={index} index={index} product={product} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Product;
