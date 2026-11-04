import React from 'react';
import { motion } from 'framer-motion';

const ClientLogos = () => {
  // Brochure theke neya Authorized Channel Partners er list[cite: 13]
  const partners = [
    "HUAWEI", "Jinko Solar", "LONGi Solar", "JA SOLAR", 
    "TrinaSolar", "GROWATT", "Solis", "Deye", "SUNGROW", "CanadianSolar"
  ];

  // Seamless (kokhono na thama) loop er jonno array ke duplicate kora holo
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-white overflow-hidden border-t border-gray-100 font-sans">
      
      {/* Title Area */}
      <div className="max-w-[1400px] mx-auto px-8 mb-10 text-center">
        <h4 className="text-[#8ab645] font-bold text-sm tracking-widest uppercase mb-2">
          Global Technology
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">
          Authorized Channel Partners
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden py-4">
        
        {/* Left and Right Fade Effects (Premium feel er jonno) */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Animated Track */}
        <motion.div
          className="flex items-center gap-16 md:gap-32 w-max"
          // Bam theke dan (Left to Right) animation logic
          initial={{ x: "-50%" }}
          animate={{ x: "0%" }}
          transition={{
            duration: 35, // Speed control (Baraile aro slow hobe, komaile fast hobe)
            repeat: Infinity,
            ease: "linear", // Same speed e cholbe kono thama chhara
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center min-w-[150px] md:min-w-[200px] opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
            >
              {/* 
                Ekhane <img> tag babohar kore apnar asol logo dite parben. 
                Apatoto brochure theke neya nam gulo text hishebe deya holo.
              */}
              <span className="text-2xl md:text-3xl font-bold text-gray-400">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;