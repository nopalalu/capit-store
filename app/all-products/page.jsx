'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import Reveal from "@/components/Reveal";

const AllProducts = () => {

    const { products } = useAppContext();

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-10 pb-4 bg-white min-h-screen">
                <Reveal>
                    <div className="mb-8">
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-800 mb-3 flex items-center gap-2.5">
                            <span className="inline-block w-7 h-[2px] bg-emerald-800 rounded-full" />
                            Katalog
                        </p>
                        <h1 className="font-display text-4xl md:text-[52px] leading-[1.05] font-semibold tracking-tight text-neutral-900">Semua <em className="text-emerald-800">sandal.</em></h1>
                        <p className="text-sm text-neutral-500 mt-3">{products.length} model tersedia — pilih jagoanmu.</p>
                    </div>
                </Reveal>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full">
                    {products.map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
