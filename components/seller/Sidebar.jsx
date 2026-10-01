import React from 'react';
import Link from 'next/link';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname()
    const menuItems = [
        { name: 'Add Product', path: '/seller', icon: assets.add_icon },
        { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon },
        { name: 'Orders', path: '/seller/orders', icon: assets.order_icon },
    ];

    return (
        <div className='md:w-60 w-16 border-r border-neutral-200 min-h-screen bg-white py-4 flex flex-col gap-1 px-2 shrink-0'>
            {menuItems.map((item) => {

                const isActive = pathname === item.path;

                return (
                    <Link href={item.path} key={item.name} passHref>
                        <div
                            className={
                                `flex items-center py-2.5 px-3 gap-3 rounded-xl text-sm font-medium transition ${isActive
                                    ? "bg-neutral-900 text-white"
                                    : "text-neutral-600 hover:bg-neutral-100"
                                }`
                            }
                        >
                            <Image src={item.icon} alt="" className={`w-5 h-5 ${isActive ? "invert" : ""}`} />
                            <p className='md:block hidden'>{item.name}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBar;
