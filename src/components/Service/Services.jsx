import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSolarPanel, 
  FaTools, 
  FaHardHat, 
  FaHandHoldingUsd, 
  FaDraftingCompass, 
  FaArrowRight
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  // Services Data
  const servicesData = [
    {
      icon: FaDraftingCompass,
      title: "System Design & Engineering",
      tagline: "Intelligent Design, Engineered Excellence",
      desc: "Our engineering experts deliver precision solar system designs tailored to your site, energy demands, and performance goals.",
      bullets: [
        { title: "Custom Engineering", text: "Site-specific designs optimize yield." },
        { title: "Performance Modeling", text: "Simulations predict output." }
      ]
    },
    {
      icon: FaHandHoldingUsd,
      title: "Procurement of Components",
      tagline: "Trusted Sourcing, Quality Assured",
      desc: "Our procurement experts secure premium solar components through established global partnerships.",
      bullets: [
        { title: "Global Sourcing", text: "Partnerships with leading manufacturers." },
        { title: "Supply Chain", text: "Streamlined logistics ensure delivery." }
      ]
    },
    {
      icon: FaHardHat,
      title: "Construction & Installation",
      tagline: "Precision Engineering, Flawless Execution",
      desc: "Our skilled teams handle complete solar construction and installation with precision. We deliver turnkey reliability.",
      bullets: [
        { title: "Site Assessment", text: "Expert evaluation matches design." },
        { title: "Expert Installation", text: "Industry-leading installation methods." }
      ]
    },
    {
      icon: FaTools,
      title: "Operation & Maintenance",
      tagline: "Smart Design, Maximum Energy",
      desc: "Our proven expertise in operation and maintenance maximizes PV plant performance and lifespan.",
      bullets: [
        { title: "Tailored Design", text: "Designs fitting your specific spaces." },
        { title: "Optimization", text: "Ensure each component is optimized." }
      ]
    },
    {
      icon: FaSolarPanel,
      title: "Financing & Consultancy",
      tagline: "Strategic Funding, Expert Guidance",
      desc: "Comprehensive financing solutions paired with professional consultancy ensure viable solar investments.",
      bullets: [
        { title: "Financial Planning", text: "Customized funding strategies." },
        { title: "Project Consultancy", text: "Expertise streamlines design." }
      ]
    }
  ];

  return (
    <div className="w-full selection:bg-[#8ab645] selection:text-white">
      
      {/* --- 100% PERFECT FIXED Parallax Hero Section --- */}
            {/* --- 100% PERFECT FIXED Parallax Hero Section --- */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        
        {/* 100% Still Fixed Background Layer */}
        <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https\://res.cloudinary.com/dsrs8hryx/image/upload/q_auto,f_auto/v1794207752/Solar_panels_reflecting_sun_1ffa0567_2K_kdrgyu.jpg')` }}
          />
          {/* Dark Gradient Overlay - Corrected class here */}
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0f16]/90 via-[#0a0f16]/60 to-[#0a0f16]/90" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 mt-16">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-[2px] bg-[#8ab645]" />
            <h4 className="text-[#8ab645] dm-sans-bold text-xs tracking-[0.25em] uppercase">
              Our Services
            </h4>
            <div className="w-8 h-[2px] bg-[#8ab645]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl dm-sans-bold text-white leading-[1.2]"
          >
            Delivering Expert Solar Services for <span className="text-[#8ab645]">Reliable</span>, Cost-effective Energy.
          </motion.h1>
        </div>
      </section>

      {/* --- Section 1: Intro (Premium Overlapping Visuals)[cite: 2] --- */}
      <section className="py-24 lg:py-36 px-6 lg:px-8 relative z-10 bg-white rounded-t-[3rem] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Left: Premium Overlapping Vertical Images[cite: 2] */}
          <div className="w-full lg:w-1/2 relative h-125 lg:h-150 flex justify-center items-center">
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
            
            {/* Center Circular Glassy Badge[cite: 2] */}
            <motion.div 
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-white/90 backdrop-blur-md rounded-full flex flex-col items-center justify-center shadow-[0_15px_35px_rgba(0,0,0,0.15)] border-[8px] border-white z-30"
            >
              <BsLightningChargeFill className="text-[#8ab645] text-3xl mb-1" />
              <span className="text-2xl font-black text-gray-900 leading-tight">100%</span>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">EPC</span>
            </motion.div>
          </div>

          {/* Right: Intro Text[cite: 2] */}
          <div className="w-full lg:w-1/2">
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 mb-6 border border-green-100">
                <span className="w-2 h-2 bg-[#8ab645] rounded-full animate-pulse"></span>
                <span className="text-[#8ab645] font-bold text-xs tracking-widest uppercase">Our Core Expertise</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl dm-sans-bold text-gray-900 mb-8 font-serif leading-[1.1]">
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

      {/* --- Section 2: Services Grid (Premium Light Green BG)[cite: 2] --- */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-[#f8fbf6] relative z-10 border-t border-green-50">
        <div className="max-w-[1400px] mx-auto">
          
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl dm-sans-bold text-gray-900 font-serif leading-tight">
              Complete solar solution with <br className="hidden md:block" /> specialized EPC services
            </h2>
          </motion.div>

          {/* Service Cards Grid[cite: 2] */}
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
          >
            {servicesData.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={index}
                  variants={fadeUp} 
                  className="bg-white p-10 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(138,182,69,0.1)] transition-all duration-500 border border-gray-100 group relative flex flex-col h-full transform hover:-translate-y-2"
                >
                  {/* Top Icon Box[cite: 2] */}
                  <div className="w-16 h-16 bg-green-50 group-hover:bg-[#8ab645] rounded-2xl flex items-center justify-center text-[#8ab645] group-hover:text-white mb-8 transition-colors duration-500">
                    <Icon className="text-3xl" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">{service.title}</h3>
                  <p className="text-[#8ab645] font-bold text-xs uppercase tracking-widest mb-5">{service.tagline}</p>
                  <p className="text-gray-500 text-base leading-relaxed mb-8 flex-grow">
                    {service.desc}
                  </p>
                  
                  {/* Mini bullets */}
                  <div className="space-y-4 mb-10 border-t border-gray-100 pt-6">
                    {service.bullets.map((b, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <BsCheckCircleFill className="text-[#8ab645] mt-1 text-sm shrink-0" />
                        <p className="text-sm text-gray-600 leading-tight"><strong className="text-gray-900">{b.title}:</strong> {b.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Arrow Icon Button[cite: 2] */}
                  <div className="mt-auto flex justify-end">
                    <button className="w-12 h-12 rounded-full bg-[#f8fbf6] flex items-center justify-center text-gray-900 group-hover:bg-[#8ab645] group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                      <FaArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
     

      {/* --- Section 4: Bottom CTA / Contact (High-End Overlapping Dark Box)[cite: 2] --- */}
      <section className="py-24 lg:py-36 px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-350 mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left: 2 Staggered Vertical Images[cite: 2] */}
          <div className="w-full lg:w-[45%] flex gap-6 h-125 lg:h-150">
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

          {/* Right: Content & Stunning Premium Dark Box[cite: 2] */}
          <div className="w-full lg:w-[55%] lg:pl-12">
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              
              <h2 className="text-3xl md:text-3xl lg:text-4xl dm-sans-bold text-gray-900 mb-6 font-serif leading-[1.1]">
                Helping Companies With Better Solutions
              </h2>
              <p className="text-gray-500 sans-medium text-lg mb-10 leading-relaxed max-w-2xl">
                We partner with companies to deliver innovative solar EPC solutions that optimize energy output and reduce costs. Our end-to-end expertise ensures reliable performance tailored to your business needs.
              </p>

              {/* The Dark Box Overlapping Style[cite: 2] */}
              <div className="bg-linear-to-br from-[#061325] to-[#0a192f] p-10 md:p-12 rounded-[2.5rem] shadow-[0_30px_60px_rgba(10,25,47,0.2)] border border-white/10 relative overflow-hidden group">
                
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