import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const {
    currency,
    router,
    getCartCount,
    getCartAmount,
    getToken,
    user,
    cartItems,
    setCartItems,
  } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/get-address", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserAddresses(data.address);
        if (data.address.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please Select an Address");
      }
      let cartItemsArray = Object.keys(cartItems).map((key) => ({
        product: key,
        quantity: cartItems[key],
      }));
      cartItemsArray = cartItemsArray.filter(item => item.quantity > 0)
      if (cartItemsArray.length === 0) {
        return toast.error('Cart is Empety')
      }
      const token = await getToken()
      const{data} = await axios.post('/api/order/create',{
        address: selectedAddress._id,
        items: cartItemsArray
      },{
        headers:{Authorization:`Bearer ${token}`}
      })
      if (data.success) {
        toast.success(data.message)
        setCartItems({})
        router.push('/order-placed')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserAddresses();
    }
  }, [user]);

  const tax = Math.floor(getCartAmount() * 0.02);
  const total = getCartAmount() + tax;

  return (
    <div className="w-full bg-white rounded-2xl border border-neutral-200 p-6">
      <h2 className="text-lg font-bold text-neutral-900">
        Order Summary
      </h2>
      <div className="my-5 border-t border-neutral-100" />

      <div className="space-y-6">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500 block mb-2">
            Select Address
          </label>
          <div className="relative w-full text-sm">
            <button
              type="button"
              className="w-full text-left px-4 py-2.5 bg-white text-neutral-800 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition flex items-center justify-between gap-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="truncate">
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg
                className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border border-neutral-200 rounded-xl shadow-lg mt-2 z-10 py-1.5 overflow-hidden">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2.5 hover:bg-neutral-50 cursor-pointer text-neutral-700"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city},{" "}
                    {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2.5 hover:bg-neutral-50 cursor-pointer text-center text-emerald-800 font-semibold border-t border-neutral-100"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-neutral-500 block mb-2">
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-1 min-w-0 outline-none px-4 py-2.5 text-sm text-neutral-800 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition"
            />
            <button className="bg-neutral-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-800 transition">
              Apply
            </button>
          </div>
        </div>

        <div className="border-t border-neutral-100" />

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <p className="text-neutral-500">Items ({getCartCount()})</p>
            <p className="font-semibold text-neutral-900">
              {currency}{getCartAmount()}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-neutral-500">Shipping Fee</p>
            <p className="font-semibold text-emerald-700">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-neutral-500">Tax (2%)</p>
            <p className="font-semibold text-neutral-900">
              {currency}{tax}
            </p>
          </div>
          <div className="flex justify-between text-base font-bold text-neutral-900 border-t border-neutral-100 pt-4">
            <p>Total</p>
            <p>{currency}{total}</p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-neutral-900 text-white text-sm font-semibold py-3.5 mt-6 rounded-xl hover:bg-emerald-800 transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
