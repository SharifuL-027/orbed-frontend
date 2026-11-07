import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSolarPanel, 
  FaTools, 
  FaHardHat, 
  FaHandHoldingUsd, 
  FaDraftingCompass, 
  FaChevronDown,
  FaArrowRight
} from 'react-icons/fa';
import { BsLightningChargeFill, BsCheckCircleFill } from 'react-icons/bs';

const Services = () => {
  // Animations
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
      desc: "Our engineering experts deliver precision solar system designs tailored to your site, energy demands, and performance goals.",
      bullets: [
        { title: "Custom Engineering", text: "Site-specific designs optimize energy yield." },
        { title: "Performance Modeling", text: "Advanced simulations predict output." }
      ]
    },
    {
      icon: FaHandHoldingUsd,
      title: "Procurement of Components",
      tagline: "Trusted Sourcing, Quality Assured",
      desc: "Our procurement experts secure premium solar components through established global partnerships.",
      bullets: [
        { title: "Global Sourcing", text: "Direct partnerships with leading manufacturers." },
        { title: "Supply Chain", text: "Streamlined logistics ensure just-in-time delivery." }
      ]
    },
    {
      icon: FaHardHat,
      title: "Construction & Installation",
      tagline: "Precision Engineering, Flawless Execution",
      desc: "Our skilled teams handle complete solar construction and installation with precision. We deliver turnkey reliability.",
      bullets: [
        { title: "Site Assessment", text: "Expert evaluation matches system design." },
        { title: "Expert Installation", text: "Certified technicians use industry-leading methods." }
      ]
    },
    {
      icon: FaTools,
      title: "Operation & Maintenance",
      tagline: "Smart Design, Maximum Energy",
      desc: "Our proven expertise in operation and maintenance maximizes PV plant performance and lifespan.",
      bullets: [
        { title: "Tailored Design", text: "Create a design that fits your spaces." },
        { title: "System Optimization", text: "Ensure each component is optimized." }
      ]
    },
    {
      icon: FaSolarPanel,
      title: "Financing & Consultancy",
      tagline: "Strategic Funding, Expert Guidance",
      desc: "Comprehensive financing solutions paired with professional consultancy ensure viable solar investments.",
      bullets: [
        { title: "Financial Planning", text: "Customized funding strategies align with budget." },
        { title: "Project Consultancy", text: "Technical expertise streamlines design." }
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
      q: "Do you have your own procurement and supply chain?",
      a: "Yes. We have direct procurement channels with trusted manufacturers and authorized importers for solar panels, inverters, mounting structures, and balance-of-system components. This allows us to ensure quality, authenticity, and competitive pricing."
    },
    {
      q: "What deliverables are expected from Orbed Green Energy?",
      a: "We provide site assessment and feasibility report, system design with technical specifications, equipment quotes, project timeline, professional installation, system testing and commissioning, warranty documentation, user manuals, and ROI calculations."
    }
  ];

  const [activeFaq, setActiveFaq] = useState(0);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="w-full font-sans bg-white">
      
      {/* --- 100% PERFECT FIXED Parallax Hero Section (Ager Motoi Same) --- */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509391366360-1200b7e1c8b7?auto=format&fit=crop&q=80&w=2070')` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0f16]/90 via-[#0a0f16]/60 to-[#0a0f16]/90" />
        </div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-0.5 bg-[#8ab645]" />
            <h4 className="text-[#8ab645] font-bold text-xs tracking-[0.25em] uppercase">Services</h4>
            <div className="w-8 h-0.5 bg-[#8ab645]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-6xl font-bold text-white font-serif leading-[1.2] mb-6"
          >
            Delivering expert solar services for <span className="text-[#8ab645]">reliable</span>, cost-effective energy.
          </motion.h1>
        </div>
      </section>

      {/* --- Section 1: Intro (Image Reference: Overlapping Vertical Images & Badge) --- */}
      <section className="py-24 lg:py-32 px-6 lg:px-8 relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Overlapping Vertical Images */}
          <div className="w-full lg:w-1/2 relative h-125 flex justify-center">
            <motion.img 
              variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1548615705-728eb781df5a?auto=format&fit=crop&q=80&w=600" 
              className="absolute left-4 md:left-12 top-0 w-3/5 h-[80%] object-cover rounded-2xl shadow-xl"
              alt="Solar Engineering"
            />
            <motion.img 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, delay: 0.2 }}
              src="https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?auto=format&fit=crop&q=80&w=600" 
              className="absolute right-4 md:right-12 bottom-0 w-3/5 h-[80%] object-cover rounded-2xl shadow-2xl border-4 border-white"
              alt="Solar Maintenance"
            />
            {/* Center Circular Badge */}
            <motion.div 
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.15)] border-[6px] border-white z-10"
            >
              <BsLightningChargeFill className="text-[#8ab645] text-2xl mb-1" />
              <span className="text-xl font-bold text-gray-900 leading-tight">100%</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">EPC</span>
            </motion.div>
          </div>

          {/* Right: Intro Text */}
          <div className="w-full lg:w-1/2">
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h4 className="text-[#8ab645] font-bold text-sm tracking-wider uppercase mb-3 flex items-center gap-2">
                <span className="w-4 h-1 bg-[#8ab645] rounded-full"></span> Our Services
              </h4>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-serif leading-tight">
                Orbed Green Energy Ltd. provides full EPC services
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                From engineering, procurement, and construction for solar PV projects, to specialized O&M ensuring optimal performance and longevity. All our expert services are available separately based on your demand.
              </p>
              <div className="flex gap-4">
                <Link to="/contact" className="bg-[#0a192f] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#8ab645] transition-colors duration-300">
                  Discover More
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* --- Section 2: Services Grid (Image Reference: Light green BG, Clean Cards) --- */}
      <section className="py-24 px-6 lg:px-8 bg-[#f4f9f1] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">
              Complete solar solution with <br className="hidden md:block" /> specialized EPC services
            </h2>
          </motion.div>

          {/* Service Cards Grid */}
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {servicesData.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={index}
                  variants={fadeUp} 
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group relative flex flex-col h-full"
                >
                  {/* Top Icon Box[cite: 2] */}
                  <div className="w-14 h-14 bg-[#8ab645] rounded-xl flex items-center justify-center text-white mb-6 shadow-md shadow-green-500/20">
                    <Icon className="text-2xl" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{service.title}</h3>
                  <p className="text-[#8ab645] font-semibold text-xs uppercase tracking-wider mb-4">{service.tagline}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 grow">
                    {service.desc}
                  </p>
                  
                  {/* Mini bullets */}
                  <div className="space-y-3 mb-8">
                    {service.bullets.map((b, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <BsCheckCircleFill className="text-[#8ab645] mt-0.5 text-xs shrink-0" />
                        <p className="text-xs text-gray-600"><strong className="text-gray-900">{b.title}:</strong> {b.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Arrow Icon[cite: 2] */}
                  <div className="mt-auto">
                    <button className="w-10 h-10 rounded-full bg-[#f4f9f1] flex items-center justify-center text-gray-900 group-hover:bg-[#8ab645] group-hover:text-white transition-colors duration-300">
                      <FaArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* --- Section 3: Esteemed Clients (Image Reference: Dark Blue Band)[cite: 2] --- */}
      <section className="py-20 px-8 bg-[#0a192f] relative z-10 text-center">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4 className="text-[#8ab645] font-bold text-sm tracking-[0.2em] uppercase mb-4">Trusted Partners</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 font-serif">
              Our Esteemed Clients
            </h2>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-70"
          >
            {[1, 2, 3, 4].map((client) => (
              <motion.div key={client} variants={fadeUp} className="w-32 h-10 bg-white/20 rounded-md backdrop-blur-sm animate-pulse" />
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Section 5: Bottom CTA / Contact (Image Reference: 2 vertical images left, content right)[cite: 2] --- */}
      <section className="py-24 px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: 2 Vertical Images Side-by-Side[cite: 2] */}
          <div className="w-full lg:w-1/2 flex gap-4 h-112.5">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-1/2 h-full pt-8">
              <img 
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=600" 
                alt="Solar Panel" 
                className="w-full h-full object-cover rounded-3xl"
              />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, delay: 0.2 }} className="w-1/2 h-full pb-8">
              <img 
                src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=600" 
                alt="Engineers" 
                className="w-full h-full object-cover rounded-3xl"
              />
            </motion.div>
          </div>

          {/* Right: Content & CTA Dark Box[cite: 2] */}
          <div className="w-full lg:w-1/2">
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-serif leading-tight">
                Helping Companies With Better Solutions
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We partner with companies to deliver innovative solar EPC solutions that optimize energy output and reduce costs. Our end-to-end expertise ensures reliable performance tailored to your business needs.
              </p>

              {/* Dark CTA Box (Similar to reference dark box overlapping images)[cite: 2] */}
              <div className="bg-[#0a192f] p-8 rounded-3xl border border-gray-800 relative">
                <h3 className="text-xl font-bold text-white mb-3">Do you Need Help With Solar Panel Maintenance?</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Keep your solar panels performing at peak efficiency with our expert O&M services. We handle inspections, cleaning, and performance optimization.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-white text-sm font-semibold">
                    <BsCheckCircleFill className="text-[#8ab645]" /> Easy Booking
                  </div>
                  <div className="flex items-center gap-3 text-white text-sm font-semibold">
                    <BsCheckCircleFill className="text-[#8ab645]" /> Free Expert Opinion
                  </div>
                  <div className="flex items-center gap-3 text-white text-sm font-semibold">
                    <BsCheckCircleFill className="text-[#8ab645]" /> Get Your products
                  </div>
                </div>
                <Link to="/contact" className="inline-block bg-[#8ab645] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#7a9d3d] transition-colors shadow-lg shadow-green-500/30">
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