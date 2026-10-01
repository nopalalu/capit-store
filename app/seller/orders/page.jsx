'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";


const Orders = () => {

    const { currency, getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSellerOrders = async () => {
        try {
            const token = await getToken()
            const {data} = await axios.get('/api/order/seller-order',{headers:{Authorization:`Bearer ${token}`}})
            if (data.success) {
                setOrders(data.orders)
                setLoading(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            fetchSellerOrders();
        }
    }, [user]);

    return (
        <div className="flex-1 min-h-screen bg-neutral-50 flex flex-col">
            {loading ? <Loading /> : (
                <div className="p-6 md:p-10">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Orders</h1>
                        <p className="text-sm text-neutral-500 mt-1">{orders.length} orders received</p>
                    </div>
                    {orders.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-4xl">
                            <p className="text-lg font-semibold text-neutral-900">No orders yet</p>
                            <p className="text-sm text-neutral-500 mt-2">New customer orders will appear here.</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-w-4xl">
                            {orders.map((order, index) => (
                                <div key={index} className="bg-white rounded-2xl border border-neutral-200 p-5 md:p-6">
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
                                        <p className="font-bold text-neutral-900 shrink-0">{currency}{order.amount}</p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-1">Ship to</p>
                                            <p className="font-medium text-neutral-800">{order.address.fullName}</p>
                                            <p className="text-neutral-500">{order.address.area}, {order.address.city}, {order.address.state}</p>
                                            <p className="text-neutral-500">{order.address.phoneNumber}</p>
                                        </div>
                                        <div className="sm:text-right">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-1">Buyer contact</p>
                                            <p className="text-neutral-500">No Pembeli : 0813213211</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default Orders;
