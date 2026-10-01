'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const ProductList = () => {
  const { router, getToken, user, currency } = useAppContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    offerPrice: '',
    stock: '',
  });

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/product/seller-list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setProducts(data.products);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      offerPrice: product.offerPrice,
      stock: product.stock,
    });
    setShowModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const { data } = await axios.put(`/api/product/${selectedProduct._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        toast.success("Produk berhasil diupdate");
        setShowModal(false);
        fetchSellerProduct();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus produk ini?");
    if (!confirm) return;
    try {
      const token = await getToken();
      const { data } = await axios.delete(`/api/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        toast.success("Produk berhasil dihapus!");
        fetchSellerProduct();
      } else {
        toast.error(data.message || "Gagal menghapus produk.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus produk.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user]);

  const inputCls = "w-full px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition";

  return (
    <div className="flex-1 min-h-screen bg-neutral-50 flex flex-col">
      {loading ? <Loading /> : (
        <div className="w-full p-6 md:p-10">
          <div className="flex items-center justify-between mb-6 max-w-5xl">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Products</h1>
              <p className="text-sm text-neutral-500 mt-1">{products.length} products listed</p>
            </div>
            <button
              onClick={() => router.push('/seller')}
              className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-emerald-800 transition"
            >
              + Add Product
            </button>
          </div>
          <div className="max-w-5xl w-full overflow-hidden rounded-2xl bg-white border border-neutral-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-neutral-400 border-b border-neutral-200">
                    <th className="px-5 py-4 font-semibold">Product</th>
                    <th className="px-5 py-4 font-semibold max-sm:hidden">Category</th>
                    <th className="px-5 py-4 font-semibold">Price</th>
                    <th className="px-5 py-4 font-semibold max-sm:hidden">Stock</th>
                    <th className="px-5 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {products.map((product, index) => (
                    <tr key={index} className="hover:bg-neutral-50/70 transition">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden shrink-0">
                            <Image
                              src={product.image[0]}
                              alt="product Image"
                              className="w-full h-full object-cover"
                              width={100}
                              height={100}
                            />
                          </div>
                          <span className="font-medium text-neutral-800 truncate">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 max-sm:hidden">
                        <span className="inline-flex items-center rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium px-2.5 py-1">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-neutral-900 whitespace-nowrap">{currency}{product.offerPrice}</td>
                      <td className="px-5 py-3.5 max-sm:hidden">
                        {product.stock > 0 ? (
                          <span className="text-neutral-600">{product.stock} pcs</span>
                        ) : (
                          <span className="text-red-600 font-medium">Habis</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-700 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => router.push(`/product/${product._id}`)}
                            className="px-3 py-1.5 bg-white border border-neutral-200 text-neutral-700 text-xs font-semibold rounded-lg hover:border-neutral-900 transition max-sm:hidden"
                          >
                            Visit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Product */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 md:p-8 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-neutral-900 mb-5">Edit Product</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-neutral-700 block mb-1.5">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputCls}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-neutral-700 block mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`${inputCls} resize-none`}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-neutral-700 block mb-1.5">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={inputCls}
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
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold text-neutral-700 block mb-1.5">Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className={inputCls}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-neutral-700 block mb-1.5">Offer Price</label>
                  <input
                    type="number"
                    value={formData.offerPrice}
                    onChange={(e) => setFormData({ ...formData, offerPrice: e.target.value })}
                    className={inputCls}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-neutral-700 block mb-1.5">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className={inputCls}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 bg-neutral-100 text-neutral-700 text-sm font-semibold rounded-xl hover:bg-neutral-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-emerald-800 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ProductList;
