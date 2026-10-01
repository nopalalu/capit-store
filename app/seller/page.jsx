'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {

  const { getToken } = useAppContext()

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('price', price)
    formData.append('offerPrice', offerPrice)
    formData.append('stock', stock)


    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i])
    }
    try {
      const token = await getToken()
      const { data } = await axios.post('/api/product/add', formData, { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        toast.success("Product added successfully")
        setFiles([]);
        setName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setOfferPrice('');
        setStock('');
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  };

  const inputCls = "outline-none py-2.5 px-4 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder:text-neutral-400 focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition w-full";
  const labelCls = "text-sm font-semibold text-neutral-700 mb-1.5 block";

  return (
    <div className="flex-1 min-h-screen bg-neutral-50">
      <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Add Product</h1>
          <p className="text-sm text-neutral-500 mt-1">Fill in the details to list a new sandal.</p>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <p className={labelCls}>Product Images</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                <input onChange={(e) => {
                  const updatedFiles = [...files];
                  updatedFiles[index] = e.target.files[0];
                  setFiles(updatedFiles);
                }} type="file" id={`image${index}`} hidden accept="image/*" />
                <span className="block w-24 h-24 rounded-xl border-2 border-dashed border-neutral-200 hover:border-emerald-700 overflow-hidden transition bg-neutral-50">
                  <Image
                    key={index}
                    className="w-full h-full object-cover"
                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                    alt=""
                    width={100}
                    height={100}
                  />
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-5">
          <div>
            <label className={labelCls} htmlFor="product-name">Product Name</label>
            <input
              id="product-name"
              type="text"
              placeholder="e.g. Sandal Jepit Swallow Classic"
              className={inputCls}
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="product-description">Product Description</label>
            <textarea
              id="product-description"
              rows={4}
              className={`${inputCls} resize-none`}
              placeholder="Describe the product…"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className={labelCls} htmlFor="category">Category</label>
              <select
                id="category"
                className={inputCls}
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                required
              >
                <option value="" disabled hidden>-- Pilih --</option>
                <option value="Sandal Jepit">Sandal Jepit</option>
                <option value="Sandal Slide">Sandal Slide</option>
                <option value="Sandal Gunung">Sandal Gunung</option>
                <option value="Sandal Platform">Sandal Platform</option>
                <option value="Sandal Heels">Sandal Heels</option>
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="product-price">Price</label>
              <input
                id="product-price"
                type="number"
                placeholder="0"
                className={inputCls}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="offer-price">Offer Price</label>
              <input
                id="offer-price"
                type="number"
                placeholder="0"
                className={inputCls}
                onChange={(e) => setOfferPrice(e.target.value)}
                value={offerPrice}
                required
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="stock">Stock</label>
              <input
                id="stock"
                type="number"
                placeholder="0"
                className={inputCls}
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="px-10 py-3 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-emerald-800 transition">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
