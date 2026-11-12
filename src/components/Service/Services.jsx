import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSolarPanel, 
  FaTools, 
  FaHardHat, 
  FaHandHoldingUsd, 
  FaDraftingCompass, 
  FaArrowRight,
  FaLeaf, 
  FaBolt, 
  FaRegClock, 
  FaShieldAlt, 
  FaUsers,
  FaTint,
  FaSeedling,
  FaChartLine,
  FaCogs,
  FaGlobe
} from 'react-icons/fa';
import { BsLightningChargeFill, BsCheckCircleFill } from 'react-icons/bs';

const Services = () => {
  // Ultra-smooth Animations
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  return (
    <div className="w-full selection:bg-[#8ab645] selection:text-white">
      
      {/* --- 100% PERFECT FIXED Parallax Hero Section --- */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        
        {/* 100% Still Fixed Background Layer */}
        <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://res.cloudinary.com/dsrs8hryx/image/upload/q_auto,f_auto/v1794207752/Solar_panels_reflecting_sun_1ffa0567_2K_kdrgyu.jpg')` }}
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0f16]/90 via-[#0a0f16]/60 to-[#0a0f16]/90" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-4xl dm-sans-bold text-white leading-[1.2]"
          >
            Delivering Expert Solar Services for Reliable, Cost-effective Energy.
          </motion.h1>
        </div>
      </section>

      {/* --- Section 1: Intro (Premium Overlapping Visuals) --- */}
      <section className="py-24 lg:py-36 px-6 lg:px-8 relative z-10 bg-white rounded-t-[3rem] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Left: Premium Overlapping Vertical Images */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[600px] flex justify-center items-center">
            {/* Background Decorative Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-green-50 rounded-full blur-3xl opacity-60 z-0"></div>
            
            <motion.div 
              variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="absolute left-0 md:left-8 top-0 w-[60%] h-[75%] z-10"
            >
              <img 
                src="https://plus.unsplash.com/premium_photo-1679917152396-4b18accacb9d?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" 
                className="w-full h-full object-cover rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                alt="Solar Engineering"
              />
            </motion.div>

            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, delay: 0.2 }}
              className="absolute right-0 md:right-8 bottom-0 w-[60%] h-[75%] z-20"
            >
              <img 
                src="https://plus.unsplash.com/premium_photo-1680206587718-19b00a9be6b5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" 
                className="w-full h-full object-cover rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-8 border-white"
                alt="Solar Maintenance"
              />
            </motion.div>
            
            {/* Center Circular Glassy Badge */}
            <motion.div 
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-white/90 backdrop-blur-md rounded-full flex flex-col items-center justify-center shadow-[0_15px_35px_rgba(0,0,0,0.15)] border-[8px] border-white z-30"
            >
              <BsLightningChargeFill className="text-[#8ab645] text-3xl mb-1" />
              <span className="text-2xl font-black text-gray-900 leading-tight">100%</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">EPC</span>
            </motion.div>
          </div>

          {/* Right: Intro Text */}
          <div className="w-full lg:w-1/2">
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 mb-6 border border-green-100">
                <span className="w-2 h-2 bg-[#8ab645] rounded-full animate-pulse"></span>
                <span className="text-[#8ab645] font-bold text-xs tracking-widest uppercase">Our Core Expertise</span>
              </div>
              <h2 className="text-3xl md:text-4xl dm-sans-bold text-gray-900 mb-8 font-serif leading-[1.1]">
                Orbed Green Energy Ltd. provides full EPC services
              </h2>
              <p className="text-gray-500 sans-medium text-lg leading-relaxed mb-10">
                From engineering, procurement, and construction for solar PV projects, to specialized O&M ensuring optimal performance and longevity. All our expert services are available separately based on your demand.
              </p>
              <Link to="/contact" className="inline-flex items-center justify-center gap-3 bg-[#0a192f] text-white px-9 py-4 rounded-2xl font-bold text-base hover:bg-[#8ab645] hover:shadow-[0_10px_30px_rgba(138,182,69,0.3)] transition-all duration-300 transform hover:-translate-y-1">
                Discover More <FaArrowRight size={14} />
              </Link>
            </motion.div>
          </div>

        </div>
      </section>

  
     {/* --- Section 2: Services Infographic (Premium Light Green BG) --- */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Title Area */}
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl dm-sans-bold text-gray-900 font-serif leading-tight">
              Complete solar solution with <br className="hidden md:block" /> specialized EPC services
            </h2>
          </motion.div>

          {/* Infographic Image Area with Mobile Swipe Scroll */}
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 bg-white relative"
          >
            
            {/* Mobile Swipe Hint Badge */}
            <div className="sm:hidden absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-md flex items-center gap-2 text-xs font-bold text-[#8ab645] border border-gray-100 animate-pulse">
               Swipe to read <span className="text-sm">👉</span>
            </div>

            {/* Scrollable Container for Mobile */}
            <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide pb-2">
              
              {/* Image Box: Mobile e force kore 180% choura kora hoyeche jate boro dekhay, Desktop e normal */}
              <div className="w-[180%] sm:w-[130%] lg:w-full min-w-[700px] lg:min-w-full">
                <img 
                  src="https://res.cloudinary.com/wtbwxhmc/image/upload/v1794462526/Orbed_Bros_Print_File-03_in2awz.jpg" 
                  alt="Orbed EPC Services Infographic" 
                  className="w-full h-auto object-contain pointer-events-none select-none"
                />
              </div>
              
            </div>
          </motion.div>
          
        </div>
      </section>
      

      {/* --- Section 3: Specialized Solutions Infographic --- */}
    <section className="py-24 lg:py-32 bg-white relative z-10 border-t border-gray-100">

        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div

            variants={fadeUp}

            initial="hidden"

            whileInView="visible"

            viewport={{ once: true }}

            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"

          >

            <h2 className="text-3xl sm:text-4xl md:text-5xl dm-sans-bold text-gray-900 font-serif leading-tight">

             Solar Street Light &  <br className="hidden md:block" /> Waterpump Solutions

            </h2>

          </motion.div>

          <motion.div

            variants={fadeUp}

            initial="hidden"

            whileInView="visible"

            viewport={{ once: true }}

            className="w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 bg-white relative"

          >

            {/* Mobile Swipe Hint Badge (Optional kintu helpful) */}

            <div className="sm:hidden absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-md flex items-center gap-2 text-xs font-bold text-[#8ab645] border border-gray-100 animate-pulse">

               Swipe to read <span className="text-sm">👉</span>

            </div>



            {/* Scrollable Container for Mobile to prevent zooming issues */}

            <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide pb-2 bg-gray-50">

             

              {/* Image Box: Ensures readability on mobile by widening it */}

              <div className="w-[180%] sm:w-full min-w-[700px] lg:min-w-full flex justify-center">

                <img

                  // Ekhane apnar brochure image er link (Orbed Bros Print File-04.jpg.jpg) boshiye diben

                  src="https://res.cloudinary.com/wtbwxhmc/image/upload/v1794464612/Orbed_Bros_Print_File-04_k90q7e.jpg"

                  alt="Solar Street Light and Water Pump Solutions"

                  className="w-full h-auto object-contain pointer-events-none select-none"

                />

              </div>

             

            </div>

          </motion.div>



        </div>

      </section>

      {/* --- Section 4: Bottom CTA / Contact (High-End Overlapping Dark Box) --- */}
      <section className="py-24 lg:py-36 px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left: 2 Staggered Vertical Images */}
          <div className="w-full lg:w-[45%] flex gap-6 h-[500px] lg:h-[600px]">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-1/2 h-full pt-12 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=600" 
                alt="Solar Panel" 
                className="w-full h-full object-cover rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, delay: 0.2 }} className="w-1/2 h-full pb-12 relative z-20">
              <img 
                src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=600" 
                alt="Engineers" 
                className="w-full h-full object-cover rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
              />
            </motion.div>
          </div>

          {/* Right: Content & Stunning Premium Dark Box */}
          <div className="w-full lg:w-[55%] lg:pl-12">
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              
              <h2 className="text-3xl md:text-3xl lg:text-4xl dm-sans-bold text-gray-900 mb-6 font-serif leading-[1.1]">
                Helping Companies With Better Solutions
              </h2>
              <p className="text-gray-500 sans-medium text-lg mb-10 leading-relaxed max-w-2xl">
                We partner with companies to deliver innovative solar EPC solutions that optimize energy output and reduce costs. Our end-to-end expertise ensures reliable performance tailored to your business needs.
              </p>

              {/* The Dark Box Overlapping Style */}
              <div className="bg-gradient-to-br from-[#061325] to-[#0a192f] p-10 md:p-12 rounded-[2.5rem] shadow-[0_30px_60px_rgba(10,25,47,0.2)] border border-white/10 relative overflow-hidden group">
                
                {/* Subtle light glow effect inside box */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#8ab645] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">Do you Need Help With Solar Panel Maintenance?</h3>
                <p className="text-gray-400 text-base leading-relaxed mb-8 relative z-10">
                  Keep your solar panels performing at peak efficiency with our expert O&M services. We handle inspections, cleaning, and performance optimization.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 relative z-10">
                  <div className="flex items-center gap-3 text-white text-base font-medium bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                    <BsCheckCircleFill className="text-[#8ab645] text-lg" /> Easy Booking
                  </div>
                  <div className="flex items-center gap-3 text-white text-base font-medium bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                    <BsCheckCircleFill className="text-[#8ab645] text-lg" /> Free Expert Opinion
                  </div>
                  <div className="flex items-center gap-3 text-white text-base font-medium bg-white/5 px-4 py-3 rounded-xl border border-white/5 sm:col-span-2">
                    <BsCheckCircleFill className="text-[#8ab645] text-lg" /> Get Your products delivered directly
                  </div>
                </div>

                <Link to="/contact" className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-[#8ab645] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#7a9d3d] transition-all duration-300 shadow-[0_10px_30px_rgba(138,182,69,0.3)] hover:shadow-[0_15px_40px_rgba(138,182,69,0.5)] transform hover:-translate-y-1 relative z-10">
                  Book a Consultation
                </Link>
              </div>

            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Services;