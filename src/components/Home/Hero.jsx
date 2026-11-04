import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaPlay } from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const dynamicWords = ["Solar.", "Wind.", "Clean Tech.", "Future."];
  const [index, setIndex] = useState(0);

  // Auto cyclic text timing transition (প্রতি ৩ সেকেন্ডে শব্দ পাল্টাবে)
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
      
      {/* High Quality Background Image */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ 
          
          backgroundImage: `url('https://res.cloudinary.com/dsrs8hryx/image/upload/v1793703181/american-public-power-association-XGAZzyLzn18-unsplash_kjkzit.jpg')` 
        }}
      />

      {/* Dark Overlay gradient for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-10" />

      {/* Social Links on Left Panel */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 text-white/70 z-30">
        {[FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube].map((Icon, idx) => (
          <motion.a 
            key={idx}
            href="#" 
            whileHover={{ scale: 1.2, x: 4, color: "#ffffff" }}
            className="transition-colors"
          >
            <Icon size={18} />
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
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-[#8ab645] hover:bg-[#729938] text-white font-bold py-4 px-8 rounded-sm transition-colors duration-300"
            >
              GET A QUOTE
              <FiArrowRight className="text-xl" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-transparent border border-white/40 hover:border-white text-white font-semibold py-4 px-8 rounded-sm transition-colors duration-300 group"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/40 group-hover:border-white transition-all">
                <FaPlay className="text-sm ml-1" />
              </span>
              WATCH STORY
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Down sliding indicators scroll block */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white z-20"
      >
        <span className="text-sm font-medium tracking-widest text-white">01 / 04</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;