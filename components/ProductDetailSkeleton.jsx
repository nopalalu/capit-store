import React from 'react';
import Navbar from "@/components/Navbar";

/**
 * Skeleton halaman detail produk — tampil instan saat navigasi,
 * layout-nya meniru halaman aslinya biar transisinya mulus.
 */
const ProductDetailSkeleton = () => {
    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 pt-8 pb-4 bg-white" aria-hidden="true">
                <div className="skeleton h-4 w-44 rounded-full mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                    <div>
                        <div className="skeleton w-full aspect-square rounded-2xl mb-4" />
                        <div className="grid grid-cols-4 gap-3">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="skeleton w-full aspect-square rounded-xl" />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="skeleton h-6 w-24 rounded-full mb-3" />
                        <div className="skeleton h-10 w-3/4 rounded-lg" />
                        <div className="skeleton h-4 w-full rounded mt-4" />
                        <div className="skeleton h-4 w-11/12 rounded mt-2" />
                        <div className="skeleton h-4 w-2/3 rounded mt-2" />
                        <div className="skeleton h-9 w-44 rounded-lg mt-6" />
                        <div className="border-t border-neutral-200 my-8" />
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="skeleton h-[52px] flex-1 rounded-xl" />
                            <div className="skeleton h-[52px] flex-1 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetailSkeleton;
