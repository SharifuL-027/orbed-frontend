import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaExpand,
  FaTimes,
  FaImages
} from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  // Backend base URL resolve helper (handles both relative /api/uploads and full Cloudinary URLs)
  const resolveImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const base = (axiosInstance.defaults.baseURL || '').replace(/\/api\/?$/, '');
    return `${base}${url}`;
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axiosInstance.get('/gallery');
        setImages(res.data || []);
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Featured slides for top carousel (falls back to all images if none marked featured)
  const featuredSlides = images.filter((img) => img.isFeatured).length > 0
    ? images.filter((img) => img.isFeatured)
    : images;

  // Auto-play carousel every 5 seconds
  useEffect(() => {
    if (featuredSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredSlides.length]);

  const nextSlide = () => {
    if (!featuredSlides.length) return;
    setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
  };

  const prevSlide = () => {
    if (!featuredSlides.length) return;
    setCurrentSlide((prev) => (prev - 1 + featuredSlides.length) % featuredSlides.length);
  };

  // Dynamic Categories
  const categories = ['All', ...new Set(images.map((item) => item.category).filter(Boolean))];

  const filteredImages = activeCategory === 'All'
    ? images
    : images.filter((item) => item.category === activeCategory);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  return (
    <div className="w-full selection:bg-[#8ab645] selection:text-white">
      
      {/* --- 1. Fixed Parallax Hero Section (Matches About & Careers) --- */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dsrs8hryx/image/upload/q_auto,f_auto/v1794207752/Solar_panels_reflecting_sun_1ffa0567_2K_kdrgyu.jpg')`
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0f16]/90 via-[#0a0f16]/60 to-[#0a0f16]/90" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 mt-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block text-[#8ab645] text-xs dm-sans-bold uppercase tracking-[0.25em] mb-3"
          >
            Our Visual Journey
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-5xl dm-sans-bold text-white leading-[1.2]"
          >
            Project Gallery &amp; Solar Milestones
          </motion.h1>
        </div>
      </section>

      {/* --- 2. Rounded Overlap Section: Featured Showcase Carousel --- */}
      <section className="relative z-10 bg-white rounded-t-[3rem] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#8ab645]" />
                <span className="text-[#8ab645] dm-sans-bold text-xs uppercase tracking-widest">
                  Featured Highlights
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl dm-sans-bold text-gray-900 leading-tight">
                Delivering Clean Energy Across Bangladesh
              </h2>
            </div>

            {featuredSlides.length > 1 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="w-12 h-12 rounded-full border border-gray-200 hover:border-[#8ab645] hover:bg-[#8ab645] hover:text-white text-gray-800 flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <FaChevronLeft size={14} />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="w-12 h-12 rounded-full border border-gray-200 hover:border-[#8ab645] hover:bg-[#8ab645] hover:text-white text-gray-800 flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}
          </motion.div>

          {/* Main Interactive Carousel */}
          {loading ? (
            <div className="w-full h-[420px] md:h-[560px] rounded-[2.5rem] bg-gray-100 animate-pulse" />
          ) : featuredSlides.length === 0 ? (
            <div className="w-full py-24 rounded-[2.5rem] bg-[#fafaf9] border border-gray-200 text-center">
              <FaImages className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-700 dm-sans-bold text-lg">No Gallery Images Uploaded Yet</p>
              <p className="text-gray-400 text-sm mt-1">Images uploaded from the admin panel will appear here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(10,25,47,0.16)] bg-[#0a192f] group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={featuredSlides[currentSlide]._id}
                    src={resolveImageUrl(featuredSlides[currentSlide].imageUrl)}
                    alt={featuredSlides[currentSlide].title}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Bottom Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-[#061325]/90 via-[#061325]/25 to-transparent pointer-events-none" />

                {/* Expand Lightbox Button */}
                <button
                  onClick={() => setLightboxImg(featuredSlides[currentSlide])}
                  title="View Fullscreen"
                  className="absolute top-6 right-6 w-11 h-11 rounded-full bg-black/40 hover:bg-[#8ab645] backdrop-blur-md text-white flex items-center justify-center transition-colors duration-300 cursor-pointer"
                >
                  <FaExpand size={14} />
                </button>

                {/* Slide Info Overlay */}
                <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <span className="inline-block bg-[#8ab645] text-[#061325] text-xs dm-sans-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
                      {featuredSlides[currentSlide].category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl dm-sans-bold text-white leading-snug">
                      {featuredSlides[currentSlide].title}
                    </h3>
                    {featuredSlides[currentSlide].location && (
                      <p className="text-gray-300 text-sm flex items-center gap-2 mt-2">
                        <FaMapMarkerAlt className="text-[#8ab645]" />
                        {featuredSlides[currentSlide].location}
                      </p>
                    )}
                  </div>

                  {/* Slide Counter */}
                  <div className="text-white/80 font-mono text-sm shrink-0">
                    <span className="text-2xl dm-sans-bold text-[#8ab645]">
                      {String(currentSlide + 1).padStart(2, '0')}
                    </span>
                    <span className="mx-1.5">/</span>
                    <span>{String(featuredSlides.length).padStart(2, '0')}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {featuredSlides.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {featuredSlides.map((slide, index) => (
                    <button
                      key={slide._id}
                      onClick={() => setCurrentSlide(index)}
                      className={`relative h-16 sm:h-20 w-24 sm:w-32 rounded-2xl overflow-hidden shrink-0 transition-all duration-300 cursor-pointer ${
                        currentSlide === index
                          ? 'ring-3 ring-[#8ab645] scale-[1.02] opacity-100'
                          : 'opacity-50 hover:opacity-85'
                      }`}
                    >
                      <img
                        src={resolveImageUrl(slide.imageUrl)}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* --- 3. All Photos Grid with Category Filter --- */}
      {images.length > 0 && (
        <section className="py-20 px-6 lg:px-8 bg-[#fafaf9] border-t border-gray-100 relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Filter Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
              <h3 className="text-2xl md:text-3xl dm-sans-bold text-gray-900">
                Explore Complete Archive
              </h3>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm dm-sans-bold transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#0a192f] text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-[#8ab645]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredImages.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setLightboxImg(item)}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={resolveImageUrl(item.imageUrl)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                      <span className="w-11 h-11 rounded-full bg-white text-gray-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                        <FaExpand size={14} />
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#8ab645]">
                      {item.category}
                    </span>
                    <h4 className="text-lg dm-sans-bold text-gray-900 mt-1 group-hover:text-[#8ab645] transition-colors">
                      {item.title}
                    </h4>
                    {item.location && (
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-2">
                        <FaMapMarkerAlt className="text-[#8ab645]" /> {item.location}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- 4. Fullscreen Lightbox Modal --- */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-[#8ab645] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <FaTimes size={18} />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full flex flex-col items-center"
            >
              <img
                src={resolveImageUrl(lightboxImg.imageUrl)}
                alt={lightboxImg.title}
                className="max-h-[78vh] w-auto object-contain rounded-2xl shadow-2xl"
              />
              <div className="text-center mt-5">
                <span className="text-xs uppercase tracking-widest text-[#8ab645] font-bold">
                  {lightboxImg.category}
                </span>
                <h4 className="text-xl sm:text-2xl dm-sans-bold text-white mt-1">
                  {lightboxImg.title}
                </h4>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;