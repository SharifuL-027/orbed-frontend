import React from 'react';
import { motion } from 'framer-motion';
import { FaDraftingCompass, FaHardHat, FaSolarPanel, FaTools } from 'react-icons/fa';

const WorkFlow = () => {
  // Scroll animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-24 px-8 bg-white min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto">
        
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h4 className="text-[#8ab645] dm-sans-bold  text-sm tracking-widest uppercase mb-2">
            How We Work
          </h4>
          <h2 className="text-4xl md:text-5xl dm-sans-bold text-gray-900 mb-6 font-serif">
            Our End-to-End Solutions
          </h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            We provide comprehensive solar solutions covering consultation, system design, engineering, installation, commissioning, maintenance, and energy optimization.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center">
          
          {/* Left Column Features */}
          <div className="flex flex-col gap-16">
            {/* Feature 1 */}
            <motion.div 
              className="flex flex-col sm:flex-row lg:flex-row-reverse items-start lg:items-center gap-6 lg:text-right"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#8ab645] flex items-center justify-center text-white">
                <FaDraftingCompass size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">System Design</h3>
                <p className="text-gray-500 text-base leading-relaxed">
                  Personalized consultation, system design, and sizing to ensure each solar system matches unique space needs.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="flex flex-col sm:flex-row lg:flex-row-reverse items-start lg:items-center gap-6 lg:text-right"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#8ab645] flex items-center justify-center text-white">
                <FaHardHat size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">EPC Integration</h3>
                <p className="text-gray-500 text-base leading-relaxed">
                  Comprehensive engineering, procurement, and construction for reliable, sustainable power generation.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Center Image */}
          <motion.div 
            className="flex justify-center items-center py-10 lg:py-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img 
              src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1793706805/img-35-ot88szwi38qm1z16qgmb3d6q4_msz3tm.jpg" 
              alt="Green Energy Concept" 
              className="w-full max-w-[500px] xl:max-w-[600px] object-contain"
            />
          </motion.div>

          {/* Right Column Features */}
          <div className="flex flex-col gap-16">
            {/* Feature 3 */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start lg:items-center gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#8ab645] flex items-center justify-center text-white">
                <FaSolarPanel size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Sourcing</h3>
                <p className="text-gray-500 text-base leading-relaxed">
                  Premium solar panels and components secured with a 100% authenticity guarantee.
                </p>
              </div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start lg:items-center gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#8ab645] flex items-center justify-center text-white">
                <FaTools size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">After-Sales Maintenance</h3>
                <p className="text-gray-500 text-base leading-relaxed">
                  Constant maintenance support and regular servicing to ensure reliable performance over a 25+ year lifespan.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WorkFlow;