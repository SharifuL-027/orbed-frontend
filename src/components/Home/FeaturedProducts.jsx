import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBolt, FaSpinner, FaBoxOpen } from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance'; // Make sure this path is correct

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch real data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, prodRes] = await Promise.all([
          axiosInstance.get('/categories'),
          axiosInstance.get('/products')
        ]);
        
        // Handling response depending on your API structure (e.g. data or data.data)
        const categoriesData = Array.isArray(catRes.data) ? catRes.data : (catRes.data.categories || catRes.data.data || []);
        const productsData = Array.isArray(prodRes.data) ? prodRes.data : (prodRes.data.products || prodRes.data.data || []);
        
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching featured data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products dynamically based on selected tab
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory || product.category?._id === activeCategory);

  return (
    <section className="py-20 lg:py-28 bg-[#fafaf9] w-full selection:bg-[#8ab645] selection:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* --- Section Header --- */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl dm-sans-bold text-gray-900 mb-5 font-serif"
          >
            Explore Our Solar Solutions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-medium text-sm md:text-base leading-relaxed"
          >
            Discover our premium range of solar panels, inverters, and accessories designed to power your home and business efficiently.
          </motion.p>
        </div>

        {/* --- Loading State --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-[#8ab645] text-4xl mb-4" />
            <p className="text-gray-500 font-semibold text-sm">Loading amazing products...</p>
          </div>
        ) : (
          <>
            {/* --- Category Filter Tabs (Dynamic) --- */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setActiveCategory('All')}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm ${
                  activeCategory === 'All'
                    ? 'bg-[#8ab645] text-white shadow-[#8ab645]/30'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-[#8ab645]'
                }`}
              >
                All Products
              </motion.button>
              
              {categories.map((cat, index) => (
                <motion.button
                  key={cat._id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveCategory(cat._id)}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm ${
                    activeCategory === cat._id
                      ? 'bg-[#8ab645] text-white shadow-[#8ab645]/30'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-[#8ab645]'
                  }`}
                >
                  {cat.name}
                </motion.button>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-xl mx-auto">
                <FaBoxOpen className="text-gray-300 text-5xl mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-1">No Products Found</h3>
                <p className="text-gray-400 text-sm">There are no items available in this category right now.</p>
              </div>
            ) : (
              /* --- Products Grid (Dynamic) --- */
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {/* Slice(0, 6) limits to only show maximum 6 products on homepage */}
                  {filteredProducts.slice(0, 6).map((product, index) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group bg-white rounded-[24px] p-3 border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-15px_rgba(138,182,69,0.25)] hover:border-[#8ab645]/30 transition-all duration-500 flex flex-col"
                    >
                      {/* Product Image */}
                      <Link to={`/products/${product._id}`} className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-gray-50 block cursor-pointer">
                        <img
                          src={product.imageUrls?.[0] || product.image || "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=800"}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        
                        {/* Category Badge on Image */}
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#8ab645] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                          {product.category?.name || "Solar System"}
                        </span>
                      </Link>

                      {/* Product Info */}
                      <div className="flex flex-col grow px-4 pt-5 pb-4">
                        <Link to={`/products/${product._id}`}>
                          <h3 className="text-lg font-bold text-gray-900 font-serif leading-tight mb-2 group-hover:text-[#8ab645] transition-colors duration-300 line-clamp-1 cursor-pointer">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 grow">
                          {product.description || "High performance certified solar equipment designed for maximum energy efficiency and long-term durability."}
                        </p>
                        
                        {/* View Details Link */}
                        <div className="mt-auto border-t border-dashed border-gray-200 pt-4">
                          <Link 
                            to={`/products/${product._id}`} 
                            className="flex items-center justify-between w-full group/btn"
                          >
                            <span className="text-sm font-bold text-gray-700 group-hover/btn:text-[#8ab645] transition-colors">
                              View Details
                            </span>
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 group-hover/btn:bg-[#8ab645] group-hover/btn:text-white transition-all duration-300 transform group-hover/btn:translate-x-1">
                              <FaArrowRight size={12} />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* --- View All CTA --- */}
            <div className="mt-16 text-center">
              <Link to="/products">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-gray-900 hover:bg-[#8ab645] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(138,182,69,0.3)] text-sm uppercase tracking-wide"
                >
                  View All Products
                  <FaArrowRight />
                </motion.button>
              </Link>
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default FeaturedProducts;