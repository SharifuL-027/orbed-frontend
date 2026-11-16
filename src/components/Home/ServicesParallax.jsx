import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import {
  FaShip,
  FaShieldAlt,
  FaWarehouse,
  FaCoins,
  FaHeadset,
  FaHardHat,
  FaSolarPanel,
  FaHandshake,
  FaIndustry
} from 'react-icons/fa';

const ServicesParallax = () => {
  // Part 01: Turnkey EPC & Solar Services
  const servicesData = [
    {
      num: "01",
      title: "Residential Solar",
      desc: "Lower electricity bills, increase property value, and reduce carbon footprint for households.",
    },
    {
      num: "02",
      title: "Industrial Solutions",
      desc: "Customized solar for energy-intensive industries to improve efficiency and reduce costs.",
    },
    {
      num: "03",
      title: "Commercial EPC",
      desc: "Large-scale solar solutions offering reliable power and significant long-term savings.",
    },
    {
      num: "04",
      title: "System Design",
      desc: "Personalized consultation, system sizing, and complete solution design to maximize energy output.",
    },
    {
      num: "05",
      title: "After-Sales Service",
      desc: "Constant maintenance support and regular servicing to keep panels efficient over their lifespan.",
    },
    {
      num: "06",
      title: "Solar Water Pump Solutions",
      desc: "Efficient and sustainable water pumping for agricultural irrigation, livestock, and drinking water.",
    },
    {
      num: "07",
      title: "Solar Street Light Solutions",
      desc: "Reliable and energy-efficient lighting solutions for roads, highways, and rural areas ensuring safer communities.",
    }
  ];

  // Part 02: Trading & Distribution Advantages (Editorial Rows)
  const tradingAdvantages = [
    {
      num: "01",
      icon: FaShip,
      title: "Direct Factory Imports",
      desc: "Direct relationships with leading Tier-1 solar manufacturers across the globe, eliminating middleman markups."
    },
    {
      num: "02",
      icon: FaShieldAlt,
      title: "100% Authenticity Guarantee",
      desc: "Individual module barcode tracking, verified flash-test data, and authentic manufacturer warranty cards."
    },
    {
      num: "03",
      icon: FaWarehouse,
      title: "Ready Central Stock",
      desc: "Extensive warehouses in Dhaka ensuring immediate dispatch and uninterrupted supply across all 64 districts."
    },
    {
      num: "04",
      icon: FaCoins,
      title: "Competitive Wholesale Pricing",
      desc: "Bulk container purchasing power passed directly to B2B dealers, EPC contractors, and corporate developers."
    },
    {
      num: "05",
      icon: FaHeadset,
      title: "Local Technical Support",
      desc: "Fast, reliable on-ground after-sales support for system sizing, installation, and engineering assistance."
    }
  ];

  // Who We Serve Across Bangladesh
  const targetClients = [
    {
      num: "01",
      icon: FaHardHat,
      title: "EPC Contractors",
      desc: "Complete equipment packages: modules, inverters, cables, battery & structures."
    },
    {
      num: "02",
      icon: FaSolarPanel,
      title: "Solar Installers",
      desc: "Fast dispatch of wholesale components for commercial rooftop setups."
    },
    {
      num: "03",
      icon: FaHandshake,
      title: "Regional Dealers",
      desc: "Authorized dealership, ready stock, marketing collateral and margin security."
    },
    {
      num: "04",
      icon: FaIndustry,
      title: "Industrial Clients",
      desc: "Direct bulk procurement for large factory expansions and developments."
    }
  ];

  // 18 Authorized Channel Partners (Split into 2 sleek marquee rows)
  const partnersRow1 = [
    "HUAWEI",
    "JinKO Solar",
    "LONGi Solar",
    "JA SOLAR",
    "Gokin",
    "Trinasolar",
    "SOLAX POWER",
    "GROWATT",
    "Solis Inverters"
  ];

  const partnersRow2 = [
    "Deye",
    "LVTOPSUN",
    "SUNGROW",
    "Hoymiles",
    "Qin Shan",
    "TKG",
    "LEADER",
    "GOMAXX SOLAR",
    "CanadianSolar"
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  return (
    <section className="relative bg-[#171b20] w-full pt-24 pb-0 overflow-hidden font-sans">
      
      {/* =================================================================
          PART 01: EPC & TURNKEY SOLAR SERVICES
      ================================================================= */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 relative z-10">
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
              <span className="text-[#8ab645] text-xs dm-sans-bold tracking-widest uppercase mb-2 block">
                Part 01 • EPC Services
              </span>
              <h2 className="text-4xl md:text-5xl dm-sans-bold text-white mb-6">
                We Offer Our Clients.
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
                  className="group flex flex-col md:flex-row md:items-center py-8 border-b border-gray-700/80 hover:border-[#8ab645] transition-colors duration-300 cursor-pointer"
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
              href="/services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-0 right-10 w-24 h-24 rounded-full border border-gray-600 flex flex-col items-center justify-center text-gray-300 hover:text-white hover:border-white transition-all z-20"
            >
              <span className="text-[10px] uppercase tracking-widest text-center leading-tight mb-1">View all<br/>services</span>
              <FiArrowUpRight />
            </motion.a>

            {/* Rotated Polaroid/Image with Tape effect */}
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

      {/* =================================================================
          FULL WIDTH PARALLAX DIVIDER
      ================================================================= */}
      <div 
        className="mt-32 w-full h-[60vh] md:h-[75vh] relative bg-fixed bg-center bg-cover bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dsrs8hryx/image/upload/v1793703181/american-public-power-association-XGAZzyLzn18-unsplash_kjkzit.jpg')`
        }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Parallax Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <h2 className="text-4xl md:text-6xl dm-sans-bold text-white mb-4">
            Powering a Greener Tomorrow
          </h2>
          <p className="text-lg md:text-xl sans-medium text-gray-200">
            Join the transition to clean energy with reliable, affordable, and high-quality renewable technology.
          </p>
        </motion.div>
      </div>

     {/* =================================================================
          PART 02: SOLAR TRADING & DISTRIBUTION (PART 01 STYLE MATCH)
      ================================================================= */}
      <div className="relative bg-[#13171c] py-24 lg:py-32 border-t border-gray-800/80">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-28 right-0 w-96 h-96 bg-[#8ab645]/8 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-28 left-0 w-96 h-96 bg-[#2b7de9]/8 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-350 mx-auto px-6 sm:px-8 relative z-10 space-y-24 lg:space-y-32">

          {/* 1. Top Intro Split (Left-Aligned Like Part 01) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
            
            {/* Left Copy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="lg:col-span-6 space-y-6"
            >
              <span className="text-[#8ab645] text-xs dm-sans-bold tracking-widest uppercase block">
                Part 02 • Solar Trading &amp; Distribution
              </span>

              <h2 className="text-4xl md:text-5xl dm-sans-bold text-white leading-[1.15]">
                Connecting Global Tech <br />
                With <span className="text-[#8ab645]">Local Demand.</span>
              </h2>

              <p className="text-gray-300 sans-medium text-sm md:text-base leading-relaxed max-w-xl">
                Orbed Green Energy Limited&apos;s trading division is a trusted importer and distributor of authentic Tier-1 solar photovoltaic equipments in Bangladesh. We bridge world-renowned solar manufacturers directly to EPC contractors, regional solar installers, dealers, and corporate developers.
              </p>

              {/* Compact Minimalist Metrics */}
              <div className="grid grid-cols-3 divide-x divide-gray-800 pt-6 border-t border-gray-800/90 max-w-md">
                <div className="pr-4">
                  <p className="text-3xl dm-sans-bold text-white">100%</p>
                  <p className="text-xs text-gray-400 mt-1">Tier-1 Authentic</p>
                </div>
                <div className="px-5">
                  <p className="text-3xl dm-sans-bold text-[#8ab645]">64</p>
                  <p className="text-xs text-gray-400 mt-1">Districts Reach</p>
                </div>
                <div className="pl-5">
                  <p className="text-3xl dm-sans-bold text-white">18+</p>
                  <p className="text-xs text-gray-400 mt-1">Global Brands</p>
                </div>
              </div>
            </motion.div>

            {/* Right Clean Architectural Visual */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="lg:col-span-6"
            >
              <div className="relative rounded-2xl overflow-hidden group h-80 sm:h-96 lg:h-[420px] shadow-[0_25px_60px_rgba(0,0,0,0.55)] border border-gray-800/80">
                <img
                  src="https://images.unsplash.com/photo-1689942010216-dc412bb1e7a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                  alt="Solar Supply Chain and Warehouse"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#13171c] via-[#13171c]/20 to-transparent" />
                
                {/* Subtle Bottom Caption */}
                <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between border-t border-white/15 pt-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#8ab645] dm-sans-bold">
                      Dhaka Central Warehouse
                    </p>
                    <p className="text-gray-200 text-sm sans-medium mt-0.5">
                      Flash-tested Tier-1 inventory ready for immediate B2B dispatch
                    </p>
                  </div>
                  <span className="hidden sm:inline-block text-xs text-gray-400 font-mono">
                    BD // HUB
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* 2. Supply Chain Advantages (Exact Part 01 60/40 Split Mirror) */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Left Side: Numbered Editorial Rows (Same Scale as Part 01) */}
            <div className="w-full lg:w-3/5">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeIn}
                className="mb-10"
              >
                <span className="text-[#8ab645] text-xs dm-sans-bold tracking-widest uppercase mb-2 block">
                  Supply Chain Advantage
                </span>
                <h3 className="text-3xl md:text-4xl dm-sans-bold text-white leading-tight">
                  Built for Scale &amp; Reliability.
                </h3>
              </motion.div>

              <motion.div
                className="flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
              >
                {tradingAdvantages.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      variants={fadeIn}
                      className="group flex flex-col md:flex-row md:items-center py-7 border-b border-gray-700/80 hover:border-[#8ab645] transition-colors duration-300"
                    >
                      <div className="w-full md:w-[15%] mb-2 md:mb-0">
                        <span className="text-3xl font-bold text-white group-hover:text-[#8ab645] transition-colors">
                          {item.num}
                        </span>
                      </div>
                      <div className="w-full md:w-[37%] pr-4 mb-2 md:mb-0">
                        <h4 className="text-xl dm-sans-bold text-white group-hover:text-[#8ab645] transition-colors">
                          {item.title}
                        </h4>
                      </div>
                      <div className="w-full md:w-[40%] pr-4">
                        <p className="text-gray-300 sans-medium text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <div className="hidden md:flex w-[8%] justify-end">
                        <Icon className="text-xl text-gray-500 group-hover:text-[#8ab645] transition-colors duration-300" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Side: Signature Tilted Frame with Green Tape (Echoing Part 01) */}
            <div className="w-full lg:w-2/5 relative flex justify-center items-center py-8 lg:py-0">
              <motion.div
                initial={{ opacity: 0, rotate: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, rotate: -5, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative w-full max-w-[340px] aspect-4/5 bg-gray-800 rounded-lg shadow-2xl overflow-visible"
              >
                {/* Green Tape Accent */}
                <div className="absolute -top-4 -right-6 w-20 h-6 bg-[#8ab645] rotate-[15deg] shadow-md z-20 rounded-sm" />

                <img
                  src="https://res.cloudinary.com/wtbwxhmc/image/upload/v1794830968/inside_a_solar_warehouse_163fb7d3_bisbax.jpg"
                  alt="Tier-1 Solar Equipment Distribution"
                  className="w-full h-full object-cover rounded-md border-4 border-[#22272d] opacity-95"
                />

                {/* Subtle Bottom Tag */}
                <div className="absolute -bottom-5 left-5 right-5 bg-[#1b2026] border border-gray-700/90 px-4 py-3 rounded-lg shadow-xl flex items-center justify-between">
                  <span className="text-xs dm-sans-bold text-white uppercase tracking-wider">
                    Tier-1 Certified Stock
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#8ab645]" />
                </div>
              </motion.div>
            </div>

          </div>

          {/* 3. Who We Serve Across Bangladesh (Clean Left-Aligned Architectural Strip) */}
          <div className="space-y-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
              <div>
                <span className="text-[#8ab645] text-xs dm-sans-bold tracking-widest uppercase block mb-2">
                  Distribution Network
                </span>
                <h3 className="text-3xl md:text-4xl dm-sans-bold text-white leading-tight">
                  Who We Serve Across Bangladesh.
                </h3>
              </div>
              <p className="text-gray-400 sans-medium text-sm max-w-md">
                Tailored procurement programs designed for every tier of the solar value chain.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-y border-gray-800 divide-y md:divide-y-0 md:divide-x divide-gray-800 bg-white/[0.015]"
            >
              {targetClients.map((client, idx) => {
                const Icon = client.icon;
                return (
                  <div
                    key={idx}
                    className="p-7 lg:p-8 group hover:bg-white/[0.03] transition-colors duration-300 flex flex-col justify-between gap-7"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-mono text-gray-500 group-hover:text-[#8ab645] transition-colors">
                        {client.num}
                      </span>
                      <Icon className="text-xl text-gray-400 group-hover:text-[#8ab645] transition-colors" />
                    </div>

                    <div>
                      <h4 className="text-xl dm-sans-bold text-white mb-2.5 group-hover:text-[#8ab645] transition-colors">
                        {client.title}
                      </h4>
                      <p className="text-gray-300 sans-medium text-sm leading-relaxed">
                        {client.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* 4. Authorized Channel Partners (Sleek Marquee) */}
          <div className="space-y-8 pt-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-3"
            >
              <div>
                <span className="text-[#8ab645] text-xs dm-sans-bold tracking-widest uppercase block mb-2">
                  Global Alliances
                </span>
                <h3 className="text-3xl md:text-4xl dm-sans-bold text-white leading-tight">
                  Authorized Channel Partners.
                </h3>
              </div>
              <span className="text-xs uppercase tracking-widest text-gray-400 dm-sans-bold">
                Official Tier-1 Manufacturer Warranty
              </span>
            </motion.div>

            {/* Dual-Row Seamless Marquee */}
            <div className="relative overflow-hidden py-4 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] space-y-6">
              
              {/* Row 1 */}
              <motion.div
                className="flex gap-12 sm:gap-16 w-max items-center"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
              >
                {[...partnersRow1, ...partnersRow1].map((brand, idx) => (
                  <span
                    key={idx}
                    className="text-2xl md:text-3xl dm-sans-bold tracking-tight text-gray-500 hover:text-white transition-colors duration-300 select-none cursor-default"
                  >
                    {brand}
                  </span>
                ))}
              </motion.div>

              {/* Row 2 (Reverse Direction) */}
              <motion.div
                className="flex gap-12 sm:gap-16 w-max items-center"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 32 }}
              >
                {[...partnersRow2, ...partnersRow2].map((brand, idx) => (
                  <span
                    key={idx}
                    className="text-2xl md:text-3xl dm-sans-bold tracking-tight text-gray-600 hover:text-[#8ab645] transition-colors duration-300 select-none cursor-default"
                  >
                    {brand}
                  </span>
                ))}
              </motion.div>

            </div>
          </div>

          {/* 5. Clean Bottom B2B CTA Strip */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="pt-10 border-t border-gray-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          >
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl dm-sans-bold text-white leading-snug">
                Partner With Orbed for Wholesale Supply.
              </h3>
              <p className="text-gray-400 sans-medium text-sm mt-1.5">
                Get direct access to our latest B2B price list, Tier-1 module datasheets, and container booking schedule.
              </p>
            </div>

            <a
              href="/contact"
              className="group inline-flex items-center gap-2.5 bg-[#8ab645] hover:bg-[#9ac752] text-[#13171c] dm-sans-bold text-sm px-7 py-3.5 rounded-full transition-all duration-300 shrink-0 shadow-[0_10px_25px_rgba(138,182,69,0.2)]"
            >
              <span>Request B2B Price List</span>
              <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default ServicesParallax;