import React from 'react';
import { motion } from 'framer-motion';
import { FaSolarPanel, FaShieldAlt, FaCogs, FaLeaf, FaHeadset } from 'react-icons/fa';

const AboutPremium = () => {
  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Features Data from your content
  const features = [
    { icon: FaSolarPanel, text: "Powering businesses with expert solar solutions" },
    { icon: FaShieldAlt, text: "High-quality components and industry-leading warranties" },
    { icon: FaCogs, text: "End-to-end solar EPC services for hassle-free implementation" },
    { icon: FaLeaf, text: "Commitment to sustainability and reducing carbon footprints" },
    { icon: FaHeadset, text: "Dedicated after-sales support and maintenance services" }
  ];

  return (
    <section className="py-24 px-8 bg-[#0a0f16] relative overflow-hidden font-sans">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#8ab645] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900 rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: About & Services Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-[#8ab645]" />
              <h4 className="text-[#8ab645] font-bold text-sm tracking-widest uppercase">
                About Orbed Green Energy Limited
              </h4>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-serif leading-tight">
              Building a Cleaner, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8ab645] to-green-400">
                Sustainable Future
              </span>
            </h2>

            <div className="space-y-6 text-gray-400 text-base md:text-lg leading-relaxed">
              <p>
                At Orbed Green Energy Limited, we believe in building a cleaner, greener and more sustainable future through renewable energy. Founded with a vision to make solar power accessible across Bangladesh, we provide end-to-end solar solutions from design and installation to maintenance and energy optimization.
              </p>
              <p>
                Our team brings together expertise in engineering, energy management, and project delivery, ensuring every system we install performs efficiently and reliably for years.
              </p>
            </div>

            {/* Sub-section: Services Brief */}
            <div className="mt-10 p-6 bg-white/[0.03] border border-white/10 rounded-lg backdrop-blur-sm hover:border-[#8ab645]/50 transition-colors duration-500">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <FaCogs className="text-[#8ab645]" /> Core Services
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Orbed Green Energy Ltd. is an EPC company that provides full support on engineering, procurement, and construction activities. Our competencies in O&M services ensure the longevity and high performance of your PV systems.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Why Choose Us */}
        <div className="w-full lg:w-1/2">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-8"
          >
            <h3 className="text-3xl font-bold text-white font-serif">Why Choose Us?</h3>
          </motion.div>

          <motion.div 
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={index}
                  variants={cardVariant}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center gap-5 p-5 rounded-xl bg-gradient-to-r from-white/[0.05] to-transparent border border-white/[0.05] hover:border-[#8ab645]/40 hover:bg-white/[0.08] transition-all duration-300 cursor-default group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center group-hover:border-[#8ab645] group-hover:bg-[#8ab645]/10 transition-colors duration-300">
                    <Icon className="text-xl text-gray-400 group-hover:text-[#8ab645] transition-colors duration-300" />
                  </div>
                  <p className="text-gray-300 font-medium text-sm md:text-base leading-snug group-hover:text-white transition-colors duration-300">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AboutPremium;