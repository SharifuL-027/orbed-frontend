import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

const ServicesParallax = () => {
  // Orbed er brochure theke neya data
  const servicesData = [
    {
      num: "01",
      title: "Residential Solar",
      desc: "Lower electricity bills, increase property value, and reduce carbon footprint for households.", //[cite: 10]
    },
    {
      num: "02",
      title: "Industrial Solutions",
      desc: "Customized solar for energy-intensive industries to improve efficiency and reduce costs.", //[cite: 10]
    },
    {
      num: "03",
      title: "Commercial EPC",
      desc: "Large-scale solar solutions offering reliable power and significant long-term savings.", //[cite: 10]
    },
    {
      num: "04",
      title: "Solar Street Light",
      desc: "Reliable and energy-efficient solar street lighting solutions for safer communities.", //[cite: 11]
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <section className="relative bg-[#171b20] w-full pt-24 pb-0 overflow-hidden font-sans">
      

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Side: Services List */}
          <div className="w-full lg:w-3/5">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="mb-12"
            >
              <span className="text-gray-400 text-xs dm-sans-bold tracking-widest uppercase mb-2 block">
                Services
              </span>
              <h2 className="text-4xl md:text-5xl dm-sans-bold text-white mb-6">
                Benefits to Save Energy
              </h2>
            </motion.div>

            <motion.div 
              className="flex flex-col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {servicesData.map((service, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="group flex flex-col md:flex-row md:items-center py-8 border-b border-gray-700 hover:border-[#8ab645] transition-colors duration-300 cursor-pointer"
                >
                  <div className="w-full md:w-1/5 mb-4 md:mb-0">
                    <span className="text-3xl font-bold text-white group-hover:text-[#8ab645] transition-colors">
                      {service.num}
                    </span>
                  </div>
                  <div className="w-full md:w-2/5 pr-4 mb-2 md:mb-0">
                    <h3 className="text-xl dm-sans-bold text-white group-hover:text-[#8ab645] transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <div className="w-full md:w-[35%] pr-4">
                    <p className="text-gray-200 sans-medium text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                      {service.desc}
                    </p>
                  </div>
                  <div className="hidden md:flex w-[5%] justify-end">
                    <FiArrowUpRight className="text-2xl text-gray-500 group-hover:text-[#8ab645] transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side: Design Elements (Rotated Image & Circular Button) */}
          <div className="w-full lg:w-2/5 relative flex justify-center items-center py-20 lg:py-0">
            
            {/* Circular View All Button */}
            <motion.a 
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-0 right-10 w-24 h-24 rounded-full border border-gray-600 flex flex-col items-center justify-center text-gray-300 hover:text-white hover:border-white transition-all z-20"
            >
              <span className="text-[10px] uppercase tracking-widest text-center leading-tight mb-1">View all<br/>services</span>
              <FiArrowUpRight />
            </motion.a>

            {/* Rotated Polarod/Image with Tape effect */}
            <motion.div 
              initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 6, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative w-full max-w-87.5 aspect-4/5 bg-gray-800 rounded-lg shadow-2xl overflow-visible"
            >
              {/* Green Tape */}
              <div className="absolute -top-4 -left-6 w-20 h-6 bg-[#8ab645] rotate-[-15deg] shadow-md z-20 rounded-sm"></div>
              
              {/* Image */}
              <img 
                src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1793776396/image.png_12178865_zwnc3o.jpg" 
                alt="Solar Panel Setup" 
                className="w-full h-full object-cover rounded-md border-4 border-[#22272d] opacity-90 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Full Width Parallax Section Below */}
      <div 
        className="mt-32 w-full h-[60vh] md:h-[80vh] relative bg-fixed bg-center bg-cover bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dsrs8hryx/image/upload/v1793703181/american-public-power-association-XGAZzyLzn18-unsplash_kjkzit.jpg')`
        }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        
        {/* Parallax Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <h2 className="text-4xl md:text-6xl dm-sans-bold text-white mb-4 dm-sans-bold">
            Powering a Greener Tomorrow
          </h2>
          <p className="text-lg md:text-xl sans-medium text-gray-200">
            Join the transition to clean energy with reliable, affordable, and high-quality renewable technology. {/*[cite: 9, 15] */}
          </p>
        </motion.div>
      </div>

    </section>
  );
};

export default ServicesParallax;