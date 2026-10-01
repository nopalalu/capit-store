'use client'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddAddress = () => {
    const { getToken, router} = useAppContext()

    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        area: '',
        city: '',
        state: '',
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const token = await getToken()
            const {data} = await axios.post('/api/user/add-address',{address},{headers:{Authorization:`Bearer ${token}`}})
            if (data.success) {
                toast.success(data.message)
                router.push('cart')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const inputCls = "px-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition w-full";

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-14 bg-neutral-50 min-h-screen">
                <div className="max-w-xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
                        Add Shipping Address
                    </h1>
                    <p className="text-sm text-neutral-500 mt-2">Where should we deliver your order?</p>

                    <form onSubmit={onSubmitHandler} className="bg-white rounded-2xl border border-neutral-200 p-7 mt-8 space-y-4">
                        <input
                            className={inputCls}
                            type="text"
                            placeholder="Full name"
                            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                            value={address.fullName}
                            required
                        />
                        <input
                            className={inputCls}
                            type="text"
                            placeholder="Phone number"
                            onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                            value={address.phoneNumber}
                            required
                        />
                        <input
                            className={inputCls}
                            type="text"
                            placeholder="Pin code"
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                            value={address.pincode}
                        />
                        <textarea
                            className={`${inputCls} resize-none`}
                            rows={4}
                            placeholder="Address (Area and Street)"
                            onChange={(e) => setAddress({ ...address, area: e.target.value })}
                            value={address.area}
                            required
                        ></textarea>
                        <div className="flex gap-4">
                            <input
                                className={inputCls}
                                type="text"
                                placeholder="City/District/Town"
                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                value={address.city}
                                required
                            />
                            <input
                                className={inputCls}
                                type="text"
                                placeholder="State"
                                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                value={address.state}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-neutral-900 text-white text-sm font-semibold py-3.5 rounded-xl hover:bg-emerald-800 transition">
                            Save Address
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddAddress;
