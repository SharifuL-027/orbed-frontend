import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axiosInstance'; 
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
      const [catRes, prodRes] = await Promise.all([
        axiosInstance.get('/categories'),
        axiosInstance.get('/products')
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
    <div className="w-full selection:bg-[#8ab645] selection:text-white">
      
      {/* --- 100% PERFECT FIXED Parallax Hero Section (Same as About/Services) --- */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        
        {/* Still Fixed Background Layer */}
        <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=2070')` }}
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0f16]/90 via-[#0a0f16]/60 to-[#0a0f16]/90" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 mt-5">
          <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="flex items-center justify-center gap-3 mb-4"
                    >
                      <div className="w-8 h-0.5 bg-[#8ab645]" />
                      <h4 className="text-[#8ab645] font-bold text-xs tracking-[0.25em] uppercase">
                        Our Inventory
                      </h4>
                      <div className="w-8 h-0.5 bg-[#8ab645]" />
                    </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-5xl dm-sans-bold text-white leading-[1.2] mb-4"
          >
            Our Solar Products & Solutions
          </motion.h1>

        </div>
      </section>

      {/* Main Content Container with Shadow Overlay sliding over fixed hero */}
      <div className="relative z-10 bg-[#fafaf9] rounded-t-[3rem] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] pt-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
                selectedCategory === 'All'
                  ? 'bg-[#8ab645] text-white shadow-green-500/25'
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
                    ? 'bg-[#8ab645] text-white shadow-green-500/25'
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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
    {filteredProducts.map((product, index) => (
      <motion.article
        key={product._id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: "easeOut" }}
        whileHover={{ y: -6 }}
        className="group relative flex flex-col bg-white rounded-[28px] p-3 border border-gray-100 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_50px_-15px_rgba(138,182,69,0.35)] hover:border-[#8ab645]/30 transition-shadow duration-500"
      >
        {/* Product Image - 1:1 */}
        <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={
              product.image ||
              "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=800"
            }
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Soft gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category chip */}
          <span className="absolute top-3 left-3 bg-white/85 backdrop-blur-md text-[#6f9a2e] text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full shadow-sm">
            {product.category?.name || "Solar System"}
          </span>

          {/* Quick view (appears on hover) */}
          <button
            onClick={() => alert(`Viewing details for: ${product.name}`)}
            aria-label={`View ${product.name}`}
            className="absolute bottom-3 right-3 h-11 w-11 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#8ab645] hover:text-white transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        {/* Product Info */}
        <div className="flex flex-col grow px-3 pt-5 pb-3">
          <h3 className="text-lg font-bold text-gray-900 font-serif leading-snug line-clamp-1 group-hover:text-[#8ab645] transition-colors duration-300">
            {product.name}
          </h3>

          <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2 grow">
            {product.description ||
              "High performance certified solar equipment designed for maximum energy efficiency and long-term durability."}
          </p>

          <div className="mt-5 pt-4 border-t border-dashed border-gray-200 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                Price
              </span>
              <span className="text-xl font-extrabold text-gray-900">
                ${product.price}
              </span>
            </div>

            <button
              onClick={() => alert(`Viewing details for: ${product.name}`)}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-[#8ab645] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
            >
              Details
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </motion.article>
    ))}
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default Products;