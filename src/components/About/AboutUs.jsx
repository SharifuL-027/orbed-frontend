import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaLeaf, FaShieldAlt, FaLightbulb, FaUsers, FaShip, FaCheckCircle, FaWarehouse, FaHeadset } from 'react-icons/fa';
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

  // Process Data exact matching reference image text & layout[cite: 10]
  const processData = [
    {
      num: "01",
      title: "Energy Assessment",
      desc: "We analyze energy consumption patterns and identify sustainable optimization opportunities.",
      img: "https://images.unsplash.com/photo-1509391366360-1200236a282f?auto=format&fit=crop&q=80&w=600",
      mt: "lg:mt-0" // Ekdom upore
    },
    {
      num: "02",
      title: "System Engineering",
      desc: "By evaluating your property's energy usage, roof capacity, and power requirements.",
      img: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=600",
      mt: "lg:mt-12" // Ektu niche
    },
    {
      num: "03",
      title: "Smart Installation",
      desc: "We analyze your energy consumption patterns to identify the most effective opportunities for sustainable..",
      img: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?auto=format&fit=crop&q=80&w=600",
      mt: "lg:mt-24" // Aro niche
    },
    {
      num: "04",
      title: "Optimization",
      desc: "We analyze energy consumption patterns and identify sustainable optimization opportunities.",
      img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=600",
      mt: "lg:mt-36" // Ekdom niche (Siri er sesh dhap)
    }
  ];

  // Core Values Data
  const coreValues = [
    { icon: FaShieldAlt, title: "Integrity", desc: "Honest communication, transparent business practices, and reliable commitments." },
    { icon: FaBullseye, title: "Quality", desc: "Delivering high-quality products, dependable solutions, and professional service." },
    { icon: FaLightbulb, title: "Innovation", desc: "Embracing modern renewable technologies for smarter, efficient solutions." },
    { icon: FaUsers, title: "Customer Focus", desc: "Putting customers first by understanding needs and delivering lasting value." },
    { icon: FaLeaf, title: "Sustainability", desc: "Dedicated to a greener, more sustainable Bangladesh." }
  ];

  return (
    <div className="w-full bg-white font-sans overflow-hidden">
      
      {/* --- Special Hero Section --- */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=2070')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f16]/90 via-[#0a0f16]/60 to-[#0a0f16]/80 z-10" />
        
        <div className="relative z-20 text-center max-w-5xl mx-auto px-6 mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-12 h-[2px] bg-[#8ab645]" />
            <h4 className="text-[#8ab645] font-bold text-sm tracking-[0.2em] uppercase">
              Who We Are
            </h4>
            <div className="w-12 h-[2px] bg-[#8ab645]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white font-serif leading-[1.1] mb-6"
          >
            Delivering solar solutions <br className="hidden md:block"/> to drive <span className="text-[#8ab645]">energy independence.</span>
          </motion.h1>
        </div>
      </section>

      {/* --- Section 1: The Orbed Story --- */}
      <section className="py-24 lg:py-32 px-8 relative bg-[#fafaf9]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Image Setup */}
            <div className="w-full lg:w-1/2 relative">
              <motion.div 
                variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.1)] aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?auto=format&fit=crop&q=80&w=1200" 
                  alt="Orbed Solar Plant" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Floating Vision 2030 Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute -bottom-10 -right-4 md:-right-10 bg-white p-6 md:p-8 rounded-2xl shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-gray-100 max-w-[280px]"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <BsLightningChargeFill className="text-[#8ab645] text-xl" />
                  </div>
                  <h3 className="text-gray-900 font-bold text-2xl">10,000<span className="text-[#8ab645]">MW</span></h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  Aligned with Bangladesh Government's Renewable Energy Vision 2030.
                </p>
              </motion.div>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 font-serif leading-tight">
                  Building a Efficient <br/> Solar Ecosystem
                </h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  <p>
                    At Orbed Green Energy Limited, we believe in building a cleaner, greener and more sustainable future through renewable energy. Founded with a vision to make solar power accessible across Bangladesh, we provide end-to-end solar solutions from design and installation to maintenance and energy optimization.
                  </p>
                  <p>
                    Our team brings together expertise in engineering, energy management, and project delivery, ensuring every system we install performs efficiently and reliably for years.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Section 2: How Green Energy Works (Exact Staircase/Siri Design)[cite: 10] --- */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto">
          
          {/* Header Area based exactly on reference[cite: 10] */}
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
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-sans tracking-tight leading-[1.1]"
              >
                Building A Sustainable <br className="hidden md:block"/> Future With Smart Solar <br className="hidden md:block"/> Technology
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

          {/* Perfect Siri/Staircase Grid Layout[cite: 10] */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 lg:gap-y-0 pb-16 lg:pb-36">
            {processData.map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`flex flex-col ${item.mt}`} // Etai sei class jeta siri toiri kore
              >
                {/* Image & Badge Container[cite: 10] */}
                <div className="relative mb-6 pb-3 pr-3 w-fit">
                  <img 
                    src={item.img} 
                    alt={item.title}
                    className="w-[260px] h-[260px] md:w-full md:h-auto aspect-[4/5] object-cover rounded-3xl"
                  />
                  {/* Overlapping Green Circle Number Badge[cite: 10] */}
                  <div className="absolute bottom-0 right-0 w-11 h-11 bg-[#8ab645] rounded-full flex items-center justify-center text-white font-bold text-xs border-4 border-white shadow-sm z-10">
                    {item.num}
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="pr-4 max-w-[260px] md:max-w-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Link Area[cite: 10] */}
          <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mt-10 lg:mt-0"
          >
            <p className="text-gray-500 text-sm font-medium">
              Need more services based on your demand? <a href="/contact" className="text-gray-900 font-bold underline hover:text-[#8ab645] transition-colors">Contact us</a>
            </p>
          </motion.div>

        </div>
      </section>

      {/* --- Section 3: Mission & Vision --- */}
      <section className="py-24 lg:py-32 px-8 bg-[#fafaf9] border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-white p-10 lg:p-16 rounded-[2.5rem] border border-gray-100 relative overflow-hidden group hover:border-[#8ab645]/30 hover:shadow-[0_15px_40px_rgb(0,0,0,0.03)] transition-all duration-500"
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
              className="bg-white p-10 lg:p-16 rounded-[2.5rem] border border-gray-100 relative overflow-hidden group hover:border-[#8ab645]/30 hover:shadow-[0_15px_40px_rgb(0,0,0,0.03)] transition-all duration-500"
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
      <section className="py-24 px-8 bg-white border-t border-gray-100">
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