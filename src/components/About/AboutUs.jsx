import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaLeaf, FaShieldAlt, FaLightbulb, FaUsers } from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';

const AboutUs = () => {

  // Animations
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  // Staircase/Siri Design Steps
  const processData = [
    {
      num: "01",
      title: "Energy Assessment",
      desc: "We analyze energy consumption patterns and identify sustainable optimization opportunities.",
      img: "https://images.unsplash.com/photo-1724041875334-0a6397111c7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
      mt: "lg:mt-0" 
    },
    {
      num: "02",
      title: "System Engineering",
      desc: "By evaluating your property's energy usage, roof capacity, and power requirements.",
      img: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=600",
      mt: "lg:mt-16" 
    },
    {
      num: "03",
      title: "Smart Installation",
      desc: "We analyze your energy consumption patterns to identify the most effective opportunities for sustainable..",
      img: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?auto=format&fit=crop&q=80&w=600",
      mt: "lg:mt-32" 
    },
    {
      num: "04",
      title: "Optimization",
      desc: "We analyze energy consumption patterns and identify sustainable optimization opportunities.",
      img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=600",
      mt: "lg:mt-48" 
    }
  ];

  const coreValues = [
    { icon: FaShieldAlt, title: "Integrity", desc: "Honest communication, transparent business practices, and reliable commitments." },
    { icon: FaBullseye, title: "Quality", desc: "Delivering high-quality products, dependable solutions, and professional service." },
    { icon: FaLightbulb, title: "Innovation", desc: "Embracing modern renewable technologies for smarter, efficient solutions." },
    { icon: FaUsers, title: "Customer Focus", desc: "Putting customers first by understanding needs and delivering lasting value." },
    { icon: FaLeaf, title: "Sustainability", desc: "Dedicated to a greener, more sustainable Bangladesh." }
  ];

  return (
    // Main container theke bg-white r overflow-hidden soriye deya hoyeche jate fixed bg kaj kore
    <div className="w-full selection:bg-[#8ab645] selection:text-white">
      
      {/* --- Special Hero Section with 100% PERFECT FIXED Parallax --- */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        
        {/* 100% Still Fixed Background Layer */}
        <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https\://res.cloudinary.com/dsrs8hryx/image/upload/q_auto,f_auto/v1794207752/Solar_panels_reflecting_sun_1ffa0567_2K_kdrgyu.jpg')` }}
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
            Driving Energy Independence Through Advanced Solar Solutions
          </motion.h1>
        </div>
      </section>

      {/* --- Section 1: The Orbed Story --- */}
      {/* Ekhane relative, z-10 ebong shadow deya hoyeche jate eta hero er upor diye slide kore */}
      <section className="py-24 lg:py-32 px-8 relative z-10 bg-white rounded-t-[3rem] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
            
            {/* Left Side: Overlapping Images */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                
                <motion.div 
                  variants={fadeLeft} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }}
                  className="rounded-3xl overflow-hidden shadow-2xl w-4/5 aspect-4/4"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" 
                    alt="Orbed Solar Plant" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute -bottom-8 right-0 sm:right-6 w-3/5 aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white"
                >
                  <img 
                    src="https://plus.unsplash.com/premium_photo-1663091595941-65815fcfeb32?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" 
                    alt="Solar Setup" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute top-10 -left-6 md:-left-10 bg-white p-4 md:p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 max-w-[220px]"
                >
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                    <BsLightningChargeFill className="text-[#8ab645] text-lg" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-lg leading-tight">10,000<span className="text-[#8ab645]">MW</span></h4>
                    <p className="text-gray-400 text-xs font-medium">Vision 2030 Target</p>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Right Side: Text Content */}
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#8ab645]"></span>
                  <span className="text-[#8ab645] dm-sans-bold text-xs uppercase tracking-widest">ABOUT US</span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl dm-sans-bold text-gray-900 mb-6 leading-tight">
                  About Orbed Green Energy Limited
                </h2>

                <div className="space-y-4 text-gray-600 sans-medium text-base md:text-lg leading-relaxed mb-8">
                  <p>
                    At Orbed Green Energy Limited, we believe in building a cleaner, greener and more sustainable future through renewable energy. Founded with a vision to make solar power accessible across Bangladesh, we provide end-to-end solar solutions from design and installation to maintenance and energy optimization.
                  </p>
                  <p>
                    We are helping our clients to build an efficient solar system with our solar skills in Bangladesh. Our team brings together expertise in engineering, energy management, and project delivery, ensuring every system we install performs efficiently and reliably.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  {[
                    "Solar Inverter Setup",
                    "Battery Storage Solutions",
                    "Solar Material Financing",
                    "24 X 7 Call & Chat Support",
                    "Proven Track Record",
                    "Customer-Centric Approach"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-[#8ab645]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-gray-800 font-semibold text-sm">{item}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Section 2: How Green Energy Works --- */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-white relative z-10 overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <img 
            src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1793797837/Gemini_Generated_Image_sj292gsj292gsj29_mbdzri.jpg" 
            alt="Background"
            className="w-full h-full object-cover object-bottom-left"
          />
        </div>

        <div className="max-w-350 mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16 lg:mb-12">
            <div className="lg:w-3/5">
              <motion.h4 
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="text-gray-400 font-bold text-[11px] tracking-[0.2em] uppercase mb-4"
              >
                HOW GREEN ENERGY WORKS
              </motion.h4>
              <motion.h2 
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="text-4xl md:text-5xl dm-sans-bold text-gray-900 tracking-tight leading-tight"
              >
                Building A Sustainable Future With Smart Solar Technology
              </motion.h2>
            </div>
            <div className="lg:w-2/5 lg:mt-12">
              <motion.p 
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="text-gray-500 text-sm md:text-base leading-relaxed"
              >
                We combine smart automation, renewable power systems, and scalable energy management to help businesses and communities reduce emissions.
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 lg:gap-y-0 pb-16 lg:pb-36">
            {processData.map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`flex flex-col ${item.mt}`}
              >
                <div className="relative mb-6 pb-3 pr-3 w-fit">
                  <img 
                    src={item.img} 
                    alt={item.title}
                    className="w-65 h-65 md:w-full md:h-auto aspect-4/5 object-cover rounded-3xl border border-gray-100"
                  />
                  <div className="absolute bottom-0 right-0 w-11 h-11 bg-[#8ab645] rounded-full flex items-center justify-center text-white font-bold text-xs border-4 border-white shadow-sm z-10">
                    {item.num}
                  </div>
                </div>
                
                <div className="pr-4 max-w-65 md:max-w-full relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mt-10 lg:mt-0 relative z-10"
          >
            <p className="text-gray-500 text-sm font-medium">
              Need more services based on your demand? <a href="/contact" className="text-gray-900 font-bold underline hover:text-[#8ab645] transition-colors">Contact us</a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Section 3: Mission & Vision --- */}
      <section className="py-24 lg:py-32 px-8 bg-white relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-[#fafaf9] p-10 lg:p-16 rounded-[2.5rem] border border-gray-100 relative overflow-hidden group hover:border-[#8ab645]/30 hover:shadow-[0_15px_40px_rgb(0,0,0,0.03)] transition-all duration-500"
            >
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8">
                <FaBullseye className="text-3xl text-[#8ab645]" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed text-justify">
                Our mission is to accelerate Bangladesh’s transition to clean and renewable energy by delivering reliable, affordable, and high-quality energy solutions. We are committed to integrating advanced technologies, industry best practices, and innovative approaches that meet the evolving energy needs of homes, institutions, and businesses. Through responsible project execution, customer-centric service, and uncompromising quality standards, we aim to reduce carbon emissions and promote environmental sustainability.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              className="bg-[#fafaf9] p-10 lg:p-16 rounded-[2.5rem] border border-gray-100 relative overflow-hidden group hover:border-[#8ab645]/30 hover:shadow-[0_15px_40px_rgb(0,0,0,0.03)] transition-all duration-500"
            >
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8">
                <FaEye className="text-3xl text-[#8ab645]" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed text-justify">
                Our vision is to build a nation where clean energy is accessible to all and sustainability is embedded in everyday life. We envision every residence, educational institution, hospital, commercial building, and industry harnessing the power of nature to meet energy demands responsibly. By fostering innovation, collaboration, and environmental stewardship, we aim to contribute to a greener economy and healthier communities. Our long-term aspiration is to lead the renewable energy sector by setting benchmarks in quality, reliability, and trust.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- Section 4: Core Values Grid --- */}
      <section className="py-24 px-8 bg-white border-t border-gray-100 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h4 className="text-[#8ab645] font-bold text-sm tracking-[0.2em] uppercase mb-4">What Drives Us</h4>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-serif">Our Core Values</h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={index}
                  variants={fadeUp}
                  className="bg-[#fafaf9] p-8 rounded-[2rem] border border-gray-100 hover:shadow-lg transition-all duration-300 text-center hover:border-green-100"
                >
                  <div className="w-16 h-16 mx-auto bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Icon className="text-2xl text-[#8ab645]" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;