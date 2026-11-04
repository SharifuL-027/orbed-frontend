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
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Features Data
  const features = [
    { icon: FaSolarPanel, text: "Powering businesses with expert solar solutions" },
    { icon: FaShieldAlt, text: "High-quality components and industry-leading warranties" },
    { icon: FaCogs, text: "End-to-end solar EPC services for hassle-free implementation" },
    { icon: FaLeaf, text: "Commitment to sustainability and reducing carbon footprints" },
    { icon: FaHeadset, text: "Dedicated after-sales support and maintenance services" }
  ];

  return (
    <section className="py-24 px-8 bg-white relative overflow-hidden font-sans">
      
      {/* Subtle Background Pattern / Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 transform origin-top pointer-events-none z-0" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-green-50 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: About & Services Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#8ab645]" />
              <h4 className="text-[#8ab645] font-bold text-sm tracking-widest uppercase">
                About Orbed Green Energy
              </h4>
            </div>
            
            <h2 className="text-4xl md:text-5xl dm-sans-bold text-gray-900 mb-8 font-serif leading-tight">
              Building a Cleaner, <br/>
              <span className="text-[#8ab645]">
                Sustainable Future
              </span>
            </h2>

            <div className="space-y-6 text-gray-600 sans-medium text-justify text-base md:text-lg leading-relaxed">
              <p>
                At Orbed Green Energy Limited, we believe in building a cleaner, greener and more sustainable future through renewable energy. Founded with a vision to make solar power accessible across Bangladesh, we provide end-to-end solar solutions from design and installation to maintenance and energy optimization.
              </p>
              <p>
                Our team brings together expertise in engineering, energy management, and project delivery, ensuring every system we install performs efficiently and reliably for years.
              </p>
            </div>

            {/* Sub-section: Services Brief */}
            <div className="mt-12 p-8 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl relative overflow-hidden group hover:border-green-100 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#8ab645]" />
              <h3 className="text-xl dm-sans-bold text-gray-900 mb-3 flex items-center gap-2">
                <FaCogs className="text-[#8ab645]" /> Core Services
              </h3>
              <p className="text-gray-500 sans-medium text-sm md:text-base leading-relaxed">
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
            className="mb-10"
          >
            <h3 className="text-3xl font-bold text-gray-900 dm-sans-bold relative inline-block">
              Why Choose Us?
              <div className="absolute -bottom-3 left-0 w-1/2 h-1 bg-[#8ab645] rounded-full" />
            </h3>
          </motion.div>

          <motion.div 
            className="flex flex-col gap-5"
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
                  whileHover={{ scale: 1.02, x: 8 }}
                  className="flex items-center gap-6 p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgb(138,182,69,0.1)] hover:border-green-100 transition-all duration-300 cursor-default group"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-[#8ab645] transition-colors duration-500">
                    <Icon className="text-2xl text-[#8ab645] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <p className="text-gray-700 sans-medium text-base leading-snug group-hover:text-gray-900 transition-colors duration-300">
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