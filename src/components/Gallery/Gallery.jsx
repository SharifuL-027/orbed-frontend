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
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-4xl dm-sans-bold text-white leading-[1.2]"
          >
            Project Gallery &amp; Solar Milestones
          </motion.h1>
        </div>
      </section>

      {/* --- 2. Sharp Architectural Section: Featured Showcase Carousel --- */}
      <section className="relative z-10 bg-white -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.18)] py-24 px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          
          {/* Editorial Section Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-gray-200"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[2px] bg-[#8ab645]" />
                <span className="text-[#8ab645] dm-sans-bold text-xs uppercase tracking-[0.22em]">
                  Featured Highlights
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl dm-sans-bold text-gray-900 leading-tight">
                Delivering Clean Energy Across Bangladesh
              </h2>
            </div>

            {featuredSlides.length > 1 && (
              <div className="flex items-center gap-4">
                {/* Architectural Index Counter */}
                <div className="font-mono text-xs tracking-widest text-gray-400 mr-2">
                  <span className="text-xl dm-sans-bold text-gray-900">
                    {String(currentSlide + 1).padStart(2, '0')}
                  </span>
                  <span className="mx-1.5 text-gray-300">/</span>
                  <span>{String(featuredSlides.length).padStart(2, '0')}</span>
                </div>

                {/* Sharp Square Navigation Controls */}
                <div className="flex items-center border border-gray-300">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="w-12 h-12 hover:bg-[#0a192f] hover:text-white text-gray-800 flex items-center justify-center transition-colors duration-300 cursor-pointer border-r border-gray-300"
                  >
                    <FaChevronLeft size={13} />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="w-12 h-12 hover:bg-[#8ab645] hover:text-[#061325] text-gray-800 flex items-center justify-center transition-colors duration-300 cursor-pointer"
                  >
                    <FaChevronRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Main Interactive Sharp Carousel */}
          {loading ? (
            <div className="w-full h-105 md:h-145 bg-gray-100 animate-pulse" />
          ) : featuredSlides.length === 0 ? (
            <div className="w-full py-24 bg-[#fafaf9] border border-gray-200 text-center">
              <FaImages className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-700 dm-sans-bold text-lg">No Gallery Images Uploaded Yet</p>
              <p className="text-gray-400 text-sm mt-1">Images uploaded from the admin panel will appear here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Full-Bleed Sharp Stage */}
              <div className="relative w-full h-100 sm:h-125 lg:h-155 overflow-hidden shadow-[0_30px_70px_rgba(6,19,37,0.18)] bg-[#061325] group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={featuredSlides[currentSlide]._id}
                    src={resolveImageUrl(featuredSlides[currentSlide].imageUrl)}
                    alt={featuredSlides[currentSlide].title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Subtle Editorial Vignette */}
                <div className="absolute inset-0 bg-linear-to-t from-[#061325]/95 via-[#061325]/20 to-black/20 pointer-events-none" />

                {/* Top-Left Architectural Tag */}
                <div className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2.5 bg-[#061325]/80 backdrop-blur-md border-l-4 border-[#8ab645] px-4 py-2">
                  <span className="text-white text-xs dm-sans-bold uppercase tracking-[0.2em]">
                    {featuredSlides[currentSlide].category}
                  </span>
                </div>

                {/* Top-Right Sharp Expand Button */}
                <button
                  onClick={() => setLightboxImg(featuredSlides[currentSlide])}
                  title="View Fullscreen"
                  className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 bg-[#061325]/75 hover:bg-[#8ab645] backdrop-blur-md text-white hover:text-[#061325] border border-white/15 flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <FaExpand size={14} />
                </button>

                {/* Bottom Editorial Caption Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-t border-white/15 bg-linear-to-t from-[#061325] to-transparent">
                  <motion.div
                    key={`caption-${featuredSlides[currentSlide]._id}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="max-w-3xl"
                  >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl dm-sans-bold text-white leading-snug">
                      {featuredSlides[currentSlide].title}
                    </h3>
                    {featuredSlides[currentSlide].location && (
                      <p className="text-gray-300 text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 mt-2.5">
                        <FaMapMarkerAlt className="text-[#8ab645]" />
                        {featuredSlides[currentSlide].location}
                      </p>
                    )}
                  </motion.div>

                  <button
                    onClick={() => setLightboxImg(featuredSlides[currentSlide])}
                    className="self-start lg:self-end inline-flex items-center gap-3 text-xs dm-sans-bold uppercase tracking-[0.2em] text-white hover:text-[#8ab645] border-b border-white/30 hover:border-[#8ab645] pb-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    Inspect Full Photo
                  </button>
                </div>

                {/* Auto-Play Progress Bar at Bottom Edge */}
                {featuredSlides.length > 1 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/15">
                    <motion.div
                      key={`progress-${currentSlide}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5, ease: 'linear' }}
                      className="h-full bg-[#8ab645]"
                    />
                  </div>
                )}
              </div>

              {/* Sharp Architectural Thumbnail Strip */}
              {featuredSlides.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-3 pt-1">
                  {featuredSlides.map((slide, index) => (
                    <button
                      key={slide._id}
                      onClick={() => setCurrentSlide(index)}
                      className={`group relative h-20 sm:h-24 overflow-hidden transition-all duration-300 cursor-pointer border-b-4 ${
                        currentSlide === index
                          ? 'border-[#8ab645] opacity-100 shadow-md'
                          : 'border-transparent opacity-45 hover:opacity-85'
                      }`}
                    >
                      <img
                        src={resolveImageUrl(slide.imageUrl)}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      <span className="absolute bottom-1.5 left-2 font-mono text-[10px] font-bold text-white bg-black/60 px-1.5 py-0.5">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </button>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>
      </section>

      {/* --- 3. All Photos Grid with Architectural Filter --- */}
      {images.length > 0 && (
        <section className="py-24 px-6 lg:px-8 bg-[#fafaf9] border-t border-gray-200 relative z-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Editorial Section Header & Sharp Filter Tabs */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 mb-12 border-b border-gray-200">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[2px] bg-[#8ab645]" />
                  <span className="text-[#8ab645] dm-sans-bold text-xs uppercase tracking-[0.22em]">
                    Project Archive ({String(filteredImages.length).padStart(2, '0')})
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl dm-sans-bold text-gray-900 leading-tight">
                  Explore Complete Archive
                </h3>
              </div>

              {/* Sharp Architectural Filter Tabs */}
              <div className="flex flex-wrap border border-gray-300 bg-white">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 text-xs sm:text-sm dm-sans-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border-r last:border-r-0 border-gray-200 ${
                      activeCategory === cat
                        ? 'bg-[#061325] text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-[#8ab645]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sharp Architectural Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredImages.map((item, idx) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                  onClick={() => setLightboxImg(item)}
                  className="group bg-white border border-gray-200 hover:border-[#061325] shadow-xs hover:shadow-[0_25px_50px_rgba(6,19,37,0.12)] transition-all duration-500 cursor-pointer flex flex-col justify-between relative"
                >
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden bg-[#061325]">
                    <img
                      src={resolveImageUrl(item.imageUrl)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle Dark Overlay on Hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#061325]/70 via-transparent to-black/20 opacity-60 group-hover:opacity-85 transition-opacity duration-500" />

                    {/* Top-Left Category Tag */}
                    <span className="absolute top-4 left-4 bg-[#061325]/85 backdrop-blur-md border-l-2 border-[#8ab645] text-white text-[10px] dm-sans-bold uppercase tracking-[0.2em] px-3 py-1.5">
                      {item.category}
                    </span>

                    {/* Top-Right Square Expand Icon */}
                    <span className="absolute top-4 right-4 w-10 h-10 bg-white/90 group-hover:bg-[#8ab645] text-[#061325] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                      <FaExpand size={13} />
                    </span>

                    {/* Bottom-Left Index Number */}
                    <span className="absolute bottom-3 left-4 font-mono text-xs font-bold text-white/80">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between border-t border-gray-100">
                    <div>
                      <h4 className="text-lg sm:text-xl dm-sans-bold text-gray-900 group-hover:text-[#8ab645] transition-colors leading-snug">
                        {item.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-5 border-t border-gray-100">
                      {item.location ? (
                        <p className="text-xs uppercase tracking-wider text-gray-500 flex items-center gap-1.5 font-medium">
                          <FaMapMarkerAlt className="text-[#8ab645] shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </p>
                      ) : (
                        <span className="text-xs uppercase tracking-wider text-gray-400">
                          Orbed Solar
                        </span>
                      )}

                      <span className="text-[11px] dm-sans-bold uppercase tracking-widest text-[#061325] group-hover:text-[#8ab645] transition-colors shrink-0">
                        View →
                      </span>
                    </div>
                  </div>

                  {/* Bottom Hover Accent Bar */}
                  <div className="h-[3px] w-0 group-hover:w-full bg-[#8ab645] transition-all duration-500" />
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