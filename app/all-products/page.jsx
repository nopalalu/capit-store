'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {

    const { products } = useAppContext();

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-10 pb-4 bg-white min-h-screen">
                <div className="mb-8">
                    <p className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">All products</p>
                    <p className="text-sm text-neutral-500 mt-1.5">{products.length} items available</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full">
                    {products.map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
