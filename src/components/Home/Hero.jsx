import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, } from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const dynamicWords = ["Solar.", "Wind.", "Clean Tech.", "Future."];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Frame transition standard variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] } 
    },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center">
      
      {/* Background Video */}
      <motion.video 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        // Niche apnar video er URL ba path boshiye din
        src="/orbed.mp4" 
      />

      {/* Dark Overlay gradient for contrast */}
      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/45 to-transparent z-10" />

      {/* Social Links on Left Panel */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 text-white/70 z-30">
  {[
    { Icon: FaFacebookF, url: "https://www.facebook.com/p/Orbed-Green-Energy-Ltd-61586079396076/" },
    { Icon: FaLinkedinIn, url: "https://www.linkedin.com/company/orbed-green-energy-limited/home/" },
  ].map((item, idx) => (
    <motion.a 
      key={idx}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer" 
      whileHover={{ scale: 1.2, x: 4, color: "#ffffff" }}
      className="transition-colors"
    >
      <item.Icon size={18} />
    </motion.a>
  ))}
</div>

      {/* Hero Content Section */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-8 lg:pl-32">
        <motion.div 
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Subtitle tag overlay */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
            <BsLightningChargeFill className="text-white text-lg animate-pulse" />
            <span className="text-white font-semibold tracking-[0.15em] text-sm uppercase">
              RENEWABLE WAY <span className="text-white ml-1">||·</span>
            </span>
          </motion.div>

          {/* Core Animating Headline Tag with standard sliding sequence using AnimatePresence */}
          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-7xl lg:text-[5.5rem] dm-sans-bold text-white leading-[1.05] mb-6 font-serif"
          >
            Bright idea is <br />
            using{' '}
            <span className="inline-block relative h-[1.1em] overflow-hidden align-bottom">
              
              {/* Ei invisible text ti sobtheke boro word tar soman width dhore rakhbe */}
              <span className="invisible pointer-events-none whitespace-nowrap">
                Clean Tech.
              </span>
              
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -35 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: "easeInOut" 
                  }}
                  className="absolute left-0 bottom-0 text-white font-bold whitespace-nowrap"
                >
                  {dynamicWords[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Secondary Subtext overlay */}
          <motion.p variants={itemVariants} className="text-lg text-white/90 mb-10 flex items-center gap-2">
            <span className="text-white">🌱</span> Powered by Nature. Engineered for Tomorrow.
          </motion.p>

          {/* Click actions buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <Link to="/products">
  <motion.button 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-2 bg-[#8ab645] hover:bg-[#729938] text-white dm-sans-bold py-4 px-8 rounded-sm transition-colors duration-300 cursor-pointer"
  >
    Explore our Products
    <FiArrowRight className="text-xl" />
  </motion.button>
</Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;