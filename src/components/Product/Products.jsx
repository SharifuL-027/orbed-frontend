import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axios'; // Apnar centralized axios instance
import { FaBoxOpen, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Categories ebong Products fetch kora backend theke
  const fetchData = async () => {
    try {
      setLoading(true);
      // Eksathe categories ebong products fetch kora
      const [catRes, prodRes] = await Promise.all([
        axiosInstance.get('/categories'),
        axiosInstance.get('/products') // Apnar backend er product GET route (jodi route alada hoy thik kore niben)
      ]);
      setCategories(catRes.data);
      setProducts(prodRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load products from server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Category Filter Logic
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory || product.category?._id === selectedCategory);

  return (
    <div className="w-full min-h-screen bg-[#fafaf9] font-sans pb-24">
      
      {/* Hero Header Banner */}
      <section className="relative w-full h-[40vh] flex items-center justify-center bg-[#0a192f] px-6">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509391366360-1200b7e1c8b7?auto=format&fit=crop&q=80&w=2070')` }} />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/10 text-[#8ab645] text-xs font-bold uppercase tracking-widest">
            <BsLightningChargeFill /> Dynamic Inventory
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-serif mb-4">
            Our Solar Products & Solutions
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Explore our high-efficiency solar panels, inverters, and sustainable energy equipment.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
              selectedCategory === 'All'
                ? 'bg-[#8ab645] text-white shadow-green-500/20'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
                selectedCategory === cat._id
                  ? 'bg-[#8ab645] text-white shadow-green-500/20'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <FaSpinner className="animate-spin text-[#8ab645] text-4xl mb-4" />
            <p className="text-gray-500 font-semibold text-sm">Loading products from server...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl flex items-center gap-4 max-w-xl mx-auto my-12">
            <FaExclamationCircle className="text-2xl shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-xl mx-auto">
            <FaBoxOpen className="text-gray-300 text-5xl mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-1">No Products Found</h3>
            <p className="text-gray-400 text-sm">There are no items available in this category right now.</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={product.image || "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=800"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    ${product.price}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[#8ab645] text-xs font-bold uppercase tracking-wider mb-2">
                    {product.category?.name || "Solar System"}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif group-hover:text-[#8ab645] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                    {product.description || "High performance certified solar equipment designed for maximum energy efficiency and long-term durability."}
                  </p>

                  <button 
                    onClick={() => alert(`Viewing details for: ${product.name}`)}
                    className="w-full bg-[#fafaf9] group-hover:bg-[#8ab645] text-gray-800 group-hover:text-white py-3 rounded-xl font-bold text-sm transition-all border border-gray-200 group-hover:border-transparent shadow-sm"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;