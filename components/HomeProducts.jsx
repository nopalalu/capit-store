import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {

  const { products, router } = useAppContext()

  return (
    <div className="flex flex-col items-center pt-16 pb-4">
      <div className="flex items-end justify-between w-full mb-8">
        <div>
          <p className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">Popular products</p>
          <p className="text-sm text-neutral-500 mt-1.5">Our customers' most loved sandals</p>
        </div>
        <button
          onClick={() => { router.push('/all-products') }}
          className="hidden sm:block text-sm font-semibold text-neutral-700 hover:text-emerald-800 transition shrink-0"
        >
          See all →
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full">
        {products.map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
      <button
        onClick={() => { router.push('/all-products') }}
        className="sm:hidden mt-8 px-10 py-2.5 border border-neutral-300 rounded-full text-sm font-semibold text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition"
      >
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
