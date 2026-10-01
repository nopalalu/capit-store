import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";
import SectionHeader from "./SectionHeader";

const HomeProducts = () => {

  const { products, router } = useAppContext()

  return (
    <div className="flex flex-col pt-14 md:pt-16 pb-4">
      <SectionHeader
        eyebrow="Paling laris"
        title="Sandal yang paling"
        accent="dicintai."
        description="Pilihan pelanggan kami — dari jepit harian sampai sandal gunung."
        action={
          <button
            onClick={() => { router.push('/all-products') }}
            className="text-sm font-semibold text-neutral-700 hover:text-emerald-800 transition-colors shrink-0 group"
          >
            Lihat semua <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </button>
        }
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full">
        {products.map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
      <button
        onClick={() => { router.push('/all-products') }}
        className="sm:hidden mt-8 px-10 py-2.5 border border-neutral-300 rounded-full text-sm font-semibold text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition mx-auto"
      >
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
