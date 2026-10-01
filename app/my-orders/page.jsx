'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import Reveal from "@/components/Reveal";

const MyOrders = () => {

    const { currency, getToken, user, router } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = await getToken()
            const {data} = await axios.get('/api/order/list',{headers:{Authorization:`Bearer ${token}`}})
            if (data.success) {
                setOrders(data.orders.reverse())
                setLoading(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user){
            fetchOrders();
        }
    }, [user]);

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-10 min-h-screen bg-neutral-50">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-8">Pesanan <em className="text-emerald-800">kamu.</em></h1>
                    </Reveal>
                    {loading ? <Loading /> : orders.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
                            <p className="text-lg font-semibold text-neutral-900">No orders yet</p>
                            <p className="text-sm text-neutral-500 mt-2">Your orders will appear here after checkout.</p>
                            <button
                                onClick={() => router.push('/all-products')}
                                className="mt-6 px-8 py-3 bg-neutral-900 text-white rounded-full text-sm font-semibold hover:bg-emerald-800 transition"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order, index) => (
                                <Reveal key={index} delay={Math.min(index * 0.06, 0.3)}>
                                <div className="bg-white rounded-2xl border border-neutral-200 p-5 md:p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row gap-5 md:items-center justify-between">
                                        <div className="flex gap-4 items-center min-w-0">
                                            <div className="w-14 h-14 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                                                <Image
                                                    className="w-8 h-8 object-contain"
                                                    src={assets.box_icon}
                                                    alt="box_icon"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-neutral-900 text-sm truncate">
                                                    {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                                </p>
                                                <p className="text-xs text-neutral-500 mt-1">
                                                    {order.items.length} items · {new Date(order.date).toLocaleDateString()} · COD
                                                </p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-neutral-900 md:text-right shrink-0">{currency}{order.amount}</p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-1">Ship to</p>
                                            <p className="font-medium text-neutral-800">{order.address.fullName}</p>
                                            <p className="text-neutral-500">{order.address.area}, {order.address.city}, {order.address.state}</p>
                                            <p className="text-neutral-500">{order.address.phoneNumber}</p>
                                        </div>
                                        <div className="sm:text-right">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-1">Courier contact</p>
                                            <p className="text-neutral-500">No Admin Kurir : 08123123412</p>
                                        </div>
                                    </div>
                                </div>
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;
