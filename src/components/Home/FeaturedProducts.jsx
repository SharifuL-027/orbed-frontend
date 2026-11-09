import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBolt } from 'react-icons/fa';

// Mock Data (Apni chaile eita apnar API thekeo nite paren)
const categories = ['All', 'Solar Panels', 'Inverters', 'Batteries', 'Accessories'];

const mockProducts = [
  {
    id: 1,
    name: 'Longi Hi-MO 5 Monocrystalline',
    category: 'Solar Panels',
    image: 'https://images.unsplash.com/photo-1509391366360-1e97f52ce23b?auto=format&fit=crop&q=80&w=800',
    description: 'High-efficiency 540W solar panel for residential and commercial use.'
  },
  {
    id: 2,
    name: 'Growatt MIN 5000TL-X',
    category: 'Inverters',
    image: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?auto=format&fit=crop&q=80&w=800',
    description: 'Smart grid-tied inverter with maximum efficiency up to 98.4%.'
  },
  {
    id: 3,
    name: 'Lithium-ion Tubular Battery 200Ah',
    category: 'Batteries',
    image: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&q=80&w=800',
    description: 'Long-lasting deep cycle battery designed for solar storage systems.'
  },
  {
    id: 4,
    name: 'Trina Solar Vertex S 400W',
    category: 'Solar Panels',
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-high power panel with outstanding visual appearance.'
  },
  {
    id: 5,
    name: 'Deye Hybrid Inverter 8kW',
    category: 'Inverters',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced hybrid inverter supporting both on-grid and off-grid setups.'
  },
  {
    id: 6,
    name: 'Solar Mounting Structure',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
    description: 'Durable aluminum mounting brackets for secure panel installation.'
  }
];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter products based on active category
  const filteredProducts = activeCategory === 'All' 
    ? mockProducts 
    : mockProducts.filter(product => product.category === activeCategory);

  return (
    <section className="py-20 lg:py-28 bg-[#fafaf9] w-full selection:bg-[#8ab645] selection:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* --- Section Header --- */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-6 h-0.5 bg-[#8ab645]" />
            <h4 className="text-[#8ab645] font-bold text-xs tracking-[0.25em] uppercase flex items-center gap-2">
              <FaBolt className="text-[10px]" /> Top Categories
            </h4>
            <div className="w-6 h-0.5 bg-[#8ab645]" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 font-serif"
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

        {/* --- Category Filter Tabs --- */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm ${
                activeCategory === category
                  ? 'bg-[#8ab645] text-white shadow-[#8ab645]/30'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-[#8ab645]'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* --- Products Grid --- */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white rounded-[24px] p-3 border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-15px_rgba(138,182,69,0.25)] hover:border-[#8ab645]/30 transition-all duration-500 flex flex-col"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge on Image */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#8ab645] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>

                {/* Product Info */}
                <div className="flex flex-col grow px-4 pt-5 pb-4">
                  <h3 className="text-xl font-bold text-gray-900 font-serif leading-tight mb-2 group-hover:text-[#8ab645] transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 grow">
                    {product.description}
                  </p>
                  
                  {/* View Details Link */}
                  <div className="mt-auto border-t border-dashed border-gray-200 pt-4">
                    <Link 
                      to={`/products`} 
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

      </div>
    </section>
  );
};

export default FeaturedProducts;