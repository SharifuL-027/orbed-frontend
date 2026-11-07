import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSolarPanel, 
  FaTools, 
  FaHardHat, 
  FaHandHoldingUsd, 
  FaDraftingCompass, 
  FaChevronDown 
} from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';

const Services = () => {
  // Animations
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } }
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
      tagline: "Intelligent Design, Engineered Excellence, Peak Efficiency",
      desc: "Our engineering experts deliver precision solar system designs tailored to your site, energy demands, and performance goals. From conceptual layouts to final specifications, we engineer maximum output.",
      bullets: [
        { title: "Custom Engineering", text: "Site-specific designs optimize energy yield, space utilization, and long-term reliability." },
        { title: "Performance Modeling", text: "Advanced simulations predict output, validate components, and ensure regulatory compliance." }
      ]
    },
    {
      icon: FaHandHoldingUsd,
      title: "Procurement of Components",
      tagline: "Trusted Sourcing, Quality Assured, Delivery Guaranteed",
      desc: "Our procurement experts secure premium solar components through established global partnerships. From panels to inverters, we deliver verified quality on time and within budget.",
      bullets: [
        { title: "Global Sourcing", text: "Direct partnerships with leading manufacturers guarantee authentic, high-efficiency components." },
        { title: "Supply Chain Reliability", text: "Streamlined logistics ensure just-in-time delivery for seamless project timelines." }
      ]
    },
    {
      icon: FaHardHat,
      title: "Construction & Installation",
      tagline: "Precision Engineering, Flawless Execution, Built to Perform",
      desc: "Our skilled teams handle complete solar construction and installation with precision. From site prep to grid connection, we deliver turnkey reliability.",
      bullets: [
        { title: "Site Assessment", text: "Expert evaluation matches system design to your location, load requirements, and regulatory standards." },
        { title: "Expert Installation", text: "Certified technicians use industry-leading methods for secure, high-performance solar deployments." }
      ]
    },
    {
      icon: FaTools,
      title: "Operation & Maintenance (O & M)",
      tagline: "Smart Design, Maximum Energy, Unmatched Efficiency",
      desc: "Our proven expertise in operation and maintenance maximizes PV plant performance and lifespan. Book individual services for seamless solar reliability.",
      bullets: [
        { title: "Tailored Design", text: "Expert engineers work with you to create a design that fits your spaces, energy needs and financial goals." },
        { title: "System Optimization", text: "Using advance software and industry best practice, we ensure that each component of the system is optimized for peak performance." }
      ]
    },
    {
      icon: FaSolarPanel,
      title: "Financing & Consultancy",
      tagline: "Strategic Funding, Expert Guidance, Solar Success",
      desc: "Comprehensive financing solutions paired with professional consultancy ensure viable solar investments. From feasibility studies to funding arrangements, we secure your project’s future.",
      bullets: [
        { title: "Financial Planning", text: "Customized funding strategies align with your budget, ROI goals, and net metering benefits." },
        { title: "Project Consultancy", text: "Technical and regulatory expertise streamlines design, permits, and optimal system performance." }
      ]
    }
  ];

  // FAQ Data
  const faqData = [
    {
      q: "Do you provide net‑metered solar solutions?",
      a: "Yes. We specialize in net-metered solar projects for residential, commercial, and industrial clients. Our team handles engineering design, utility coordination, and the complete process from application and approval through installation, testing, and meter commissioning."
    },
    {
      q: "Do you have your own procurement and supply chain for solar equipment?",
      a: "Yes. We have direct procurement channels with trusted manufacturers and authorized importers for solar panels, inverters, mounting structures, and balance-of-system components. This allows us to ensure quality, authenticity, and competitive pricing. We maintain stock of commonly used capacities to reduce project lead time."
    },
    {
      q: "What kind of deliverables are to be expected from Orbed Green Energy?",
      a: "We provide site assessment and feasibility report, system design with technical specifications, equipment quotes, project timeline, professional installation, system testing and commissioning, warranty documentation, user manuals, monitoring system setup, and ROI calculations with payback period projections."
    }
  ];

  // FAQ State
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="w-full font-sans">
      
      {/* --- 100% PERFECT FIXED Parallax Hero Section --- */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        
        {/* Still Fixed Background Layer */}
        <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509391366360-1200b7e1c8b7?auto=format&fit=crop&q=80&w=2070')` }}
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f16]/90 via-[#0a0f16]/60 to-[#0a0f16]/90" />
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
            <h4 className="text-[#8ab645] font-bold text-xs tracking-[0.25em] uppercase">
              Services
            </h4>
            <div className="w-8 h-[2px] bg-[#8ab645]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-6xl font-bold text-white font-serif leading-[1.2] mb-6"
          >
            Delivering expert solar services for <span className="text-[#8ab645]">reliable</span>, cost-effective energy.
          </motion.h1>
        </div>
      </section>

      {/* --- Introduction Section --- */}
      <section className="py-24 lg:py-32 px-8 relative z-10 bg-[#fafaf9] shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              Our Services
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Orbed Green Energy Ltd. provides full EPC services – engineering, procurement, and construction – for solar PV projects, plus specialized O&M to ensure optimal performance and longevity, with all services available separately.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Detailed Services Section --- */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 bg-white relative z-10 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {servicesData.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={index}
                  variants={fadeUp} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#fafaf9] p-10 lg:p-14 rounded-[2.5rem] border border-gray-100 group hover:border-[#8ab645]/30 hover:shadow-[0_15px_40px_rgb(0,0,0,0.04)] transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8">
                    <Icon className="text-3xl text-[#8ab645]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-serif">{service.title}</h3>
                  <p className="text-[#8ab645] font-semibold text-sm mb-6 uppercase tracking-wider">{service.tagline}</p>
                  <p className="text-gray-600 text-base leading-relaxed mb-8">
                    {service.desc}
                  </p>
                  
                  <div className="space-y-4 pt-6 border-t border-gray-200">
                    {service.bullets.map((bullet, bIndex) => (
                      <div key={bIndex} className="flex gap-4">
                        <div className="mt-1">
                          <BsLightningChargeFill className="text-[#8ab645]" />
                        </div>
                        <div>
                          <strong className="text-gray-900">{bullet.title}:</strong> <span className="text-gray-600">{bullet.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- Esteemed Clients Section --- */}
      <section className="py-20 px-8 bg-[#fafaf9] border-t border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 font-serif"
          >
            Our Esteemed Clients
          </motion.h2>
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60"
          >
            {/* Placeholder for Client Logos */}
            {[1, 2, 3, 4, 5].map((client) => (
              <motion.div key={client} variants={fadeUp} className="w-32 h-12 bg-gray-300 rounded-lg animate-pulse" />
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-24 px-8 bg-white border-t border-gray-100 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h4 className="text-[#8ab645] font-bold text-sm tracking-[0.2em] uppercase mb-4">Got Questions?</h4>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-serif">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div 
                key={index}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 bg-[#fafaf9] hover:bg-green-50 transition-colors text-left"
                >
                  <span className="text-lg font-bold text-gray-900">{faq.q}</span>
                  <FaChevronDown className={`text-[#8ab645] transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 bg-[#fafaf9]"
                    >
                      <p className="text-gray-600 leading-relaxed pt-2 border-t border-gray-200 mt-2">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Bottom CTA / Contact Information Box --- */}
      <section className="py-24 px-8 bg-[#0a0f16] relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Side */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif leading-tight">
                Helping Companies With <span className="text-[#8ab645]">Better Solutions</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                We partner with companies to deliver innovative solar EPC solutions that optimize energy output and reduce costs. Our end-to-end expertise in engineering, procurement, construction, and O&M ensures reliable, sustainable performance tailored to your business needs.
              </p>

              <div className="bg-[#121a25] p-8 rounded-[2rem] border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-3">Do you Need Help With Solar Panel Maintenance?</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Keep your solar panels performing at peak efficiency with our expert O&M services. We handle inspections, cleaning, repairs, and performance optimization to maximize energy yield and extend system lifespan.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white text-sm font-semibold">
                    <BsLightningChargeFill className="text-[#8ab645]" /> Easy Booking
                  </div>
                  <div className="flex items-center gap-3 text-white text-sm font-semibold">
                    <BsLightningChargeFill className="text-[#8ab645]" /> Free Expert Opinion
                  </div>
                  <div className="flex items-center gap-3 text-white text-sm font-semibold">
                    <BsLightningChargeFill className="text-[#8ab645]" /> Get Your products
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Button Side */}
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col items-center justify-center bg-gradient-to-br from-[#8ab645]/20 to-transparent p-12 rounded-[2.5rem] border border-[#8ab645]/30"
            >
              <h3 className="text-3xl font-bold text-white text-center mb-8 font-serif">Ready to Start Your Project?</h3>
              <Link 
                to="/contact" 
                className="bg-[#8ab645] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#7a9d3d] shadow-[0_10px_30px_rgba(138,182,69,0.3)] hover:shadow-[0_10px_40px_rgba(138,182,69,0.5)] transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact Us Now
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;