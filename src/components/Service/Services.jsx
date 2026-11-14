import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
 
  FaTools, 
  FaArrowRight,
  FaHome,
  FaBuilding,
  FaCog,
  FaLeaf,
  FaBolt,
  FaRegClock,
  FaShieldAlt,
  FaUsers,
  FaTint,
  FaSeedling,
  FaChartBar,
  FaCoins , 
  FaIndustry,
  FaDesktop,
} from 'react-icons/fa';
import { BsLightningChargeFill, BsCheckCircleFill } from 'react-icons/bs';

const Services = () => {
  const [activePillar, setActivePillar] = useState(null);
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
// Exact Circle Math Helpers
  const polarToCartesian = (cx, cy, r, angleInDegrees) => {
    const rad = (angleInDegrees * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const createArcPath = (cx, cy, r, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);
    const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  const createSlicePath = (cx, cy, innerR, outerR, startAngle, endAngle) => {
    const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
    const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
    const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);
    const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      `M ${innerStart.x} ${innerStart.y}`,
      `L ${outerStart.x} ${outerStart.y}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerEnd.x} ${innerEnd.y}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
      'Z',
    ].join(' ');
  };

  // 5 Symmetrical Pillars (72° apart, 68° span + 4° gap)
  const wheelSlices = [
    { id: 'industrial', start: -124, end: -56, mid: -90, color: '#78b843', pattern: 'img-industrial' },
    { id: 'commercial', start: -52, end: 16, mid: -18, color: '#377eb8', pattern: 'img-commercial' },
    { id: 'design', start: 20, end: 88, mid: 54, color: '#2965a8', pattern: 'img-design' },
    { id: 'maintenance', start: 92, end: 160, mid: 126, color: '#78b843', pattern: 'img-maintenance' },
    { id: 'residential', start: 164, end: 232, mid: 198, color: '#213358', pattern: 'img-residential' },
  ];
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

  
     {/* --- Section 2: Interactive Coded EPC Infographic --- */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          {/* Title Area */}
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f9ef] mb-4 border border-[#8ab645]/25">
              <span className="w-2 h-2 bg-[#8ab645] rounded-full animate-pulse"></span>
              <span className="text-[#6f9a2e] font-bold text-xs tracking-widest uppercase">360° Solar Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl dm-sans-bold text-gray-900 font-serif leading-tight">
              Complete solar solution with <br className="hidden md:block" /> specialized EPC services
            </h2>
          </motion.div>

          {/* ================= DESKTOP RADIAL INFOGRAPHIC (lg and up) ================= */}
          <div className="hidden lg:block relative">
            
            {/* 1. TOP CARD: INDUSTRIAL */}
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onMouseEnter={() => setActivePillar('industrial')}
              onMouseLeave={() => setActivePillar(null)}
              className={`max-w-xl mx-auto mb-10 rounded-[2rem] border-2 p-7 pt-8 relative transition-all duration-300 cursor-pointer ${
                activePillar === 'industrial' 
                  ? 'bg-[#eef7e6] border-[#78b843] shadow-[0_20px_50px_rgba(120,184,67,0.22)] -translate-y-1.5' 
                  : 'bg-[#f6faf2] border-[#78b843]/70 shadow-[0_10px_30px_rgba(0,0,0,0.03)]'
              }`}
            >
              {/* Overlapping Pill Header */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center">
                <div className="w-12 h-12 rounded-full bg-white border-[3px] border-[#78b843] flex items-center justify-center text-[#78b843] shadow-md z-10 -mr-3">
                  <FaIndustry className="text-xl" />
                </div>
                <div className="bg-[#78b843] text-white font-extrabold text-xl tracking-wide pl-6 pr-8 py-2 rounded-r-full shadow-md">
                  Industrial
                </div>
              </div>
              <p className="text-gray-800 text-[15px] font-medium leading-relaxed text-center mt-2">
                We offer customized solar solutions for energy-intensive industries, helping reduce electricity costs, improve energy efficiency, and support reliable, sustainable power generation for long-term operations.
              </p>
            </motion.div>

            {/* 2. MIDDLE ROW: RESIDENTIAL (Left) + EPC WHEEL (Center) + COMMERCIAL (Right) */}
            <div className="grid grid-cols-12 items-center gap-6 my-4">
              
              {/* Left Card: Residential */}
              <motion.div 
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onMouseEnter={() => setActivePillar('residential')}
                onMouseLeave={() => setActivePillar(null)}
                className={`col-span-4 rounded-[2rem] border-2 p-7 pt-9 relative transition-all duration-300 cursor-pointer ${
                  activePillar === 'residential' 
                    ? 'bg-[#edf2fa] border-[#213358] shadow-[0_20px_50px_rgba(33,51,88,0.2)] -translate-y-1.5' 
                    : 'bg-[#f4f7fc] border-[#213358]/75 shadow-[0_10px_30px_rgba(0,0,0,0.03)]'
                }`}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center">
                  <div className="bg-[#213358] text-white font-extrabold text-lg tracking-wide pl-7 pr-6 py-2 rounded-l-full shadow-md">
                    Residential
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white border-[3px] border-[#213358] flex items-center justify-center text-[#213358] shadow-md z-10 -ml-3">
                    <FaHome className="text-xl" />
                  </div>
                </div>
                <p className="text-gray-800 text-[14.5px] font-medium leading-relaxed text-justify mt-1">
                  We offer solar system installation on home rooftops with the target to lower electricity bills, increase property value, and reduce carbon footprint for households.
                </p>
              </motion.div>

              
              {/* Center Interactive SVG EPC Wheel */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="col-span-4 flex justify-center items-center"
              >
                <div className="relative w-[340px] xl:w-[380px] aspect-square select-none">
                  <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_18px_35px_rgba(0,0,0,0.12)]">
                    <defs>
                      {/* Full-coverage Image Patterns for 5 Slices */}
                      <pattern id="img-industrial" patternUnits="userSpaceOnUse" width="400" height="400">
                        <image href="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80" x="50" y="15" width="300" height="190" preserveAspectRatio="xMidYMid slice" />
                      </pattern>
                      <pattern id="img-commercial" patternUnits="userSpaceOnUse" width="400" height="400">
                        <image href="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80" x="185" y="45" width="210" height="225" preserveAspectRatio="xMidYMid slice" />
                      </pattern>
                      <pattern id="img-design" patternUnits="userSpaceOnUse" width="400" height="400">
                        <image href="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80" x="175" y="195" width="215" height="200" preserveAspectRatio="xMidYMid slice" />
                      </pattern>
                      <pattern id="img-maintenance" patternUnits="userSpaceOnUse" width="400" height="400">
                        <image href="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80" x="15" y="195" width="215" height="200" preserveAspectRatio="xMidYMid slice" />
                      </pattern>
                      <pattern id="img-residential" patternUnits="userSpaceOnUse" width="400" height="400">
                        <image href="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80" x="10" y="45" width="210" height="225" preserveAspectRatio="xMidYMid slice" />
                      </pattern>
                    </defs>

                    {/* 5 Concentric Slices, Outer Arcs & Connector Dots */}
                    {wheelSlices.map((slice) => {
                      const isActive = activePillar === slice.id;
                      const dotPos = polarToCartesian(200, 200, 178, slice.mid);

                      return (
                        <g key={slice.id}>
                          {/* Outer Colored Arc */}
                          <path
                            d={createArcPath(200, 200, 178, slice.start, slice.end)}
                            fill="none"
                            stroke={slice.color}
                            strokeWidth={isActive ? '11' : '8'}
                            strokeLinecap="round"
                            className="transition-all duration-300"
                          />

                          {/* Connector Node Dot */}
                          <circle
                            cx={dotPos.x}
                            cy={dotPos.y}
                            r={isActive ? '10' : '7.5'}
                            fill={slice.color}
                            stroke="#ffffff"
                            strokeWidth="3"
                            className="transition-all duration-300"
                          />

                          {/* Image Wedge Slice */}
                          <path
                            d={createSlicePath(200, 200, 82, 162, slice.start, slice.end)}
                            fill={`url(#${slice.pattern})`}
                            onMouseEnter={() => setActivePillar(slice.id)}
                            onMouseLeave={() => setActivePillar(null)}
                            style={{ opacity: activePillar && !isActive ? 0.6 : 1 }}
                            className="cursor-pointer transition-opacity duration-300"
                          />
                        </g>
                      );
                    })}

                    {/* Exact Center White Circle & Dual-Color Ring */}
                    <circle cx="200" cy="200" r="74" fill="#ffffff" />
                    <path
                      d={createArcPath(200, 200, 62, 165, 340)}
                      fill="none"
                      stroke="#78b843"
                      strokeWidth="6.5"
                      strokeLinecap="round"
                    />
                    <path
                      d={createArcPath(200, 200, 62, -10, 155)}
                      fill="none"
                      stroke="#213358"
                      strokeWidth="6.5"
                      strokeLinecap="round"
                    />
                    <text
                      x="200"
                      y="200"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="fill-gray-900 font-black text-[36px] tracking-tight"
                      style={{ fontFamily: 'sans-serif' }}
                    >
                      EPC
                    </text>
                  </svg>
                </div>
              </motion.div>

              {/* Right Card: Commercial */}
              <motion.div 
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onMouseEnter={() => setActivePillar('commercial')}
                onMouseLeave={() => setActivePillar(null)}
                className={`col-span-4 rounded-[2rem] border-2 p-7 pt-9 relative transition-all duration-300 cursor-pointer ${
                  activePillar === 'commercial' 
                    ? 'bg-[#edf5fc] border-[#377eb8] shadow-[0_20px_50px_rgba(55,126,184,0.22)] -translate-y-1.5' 
                    : 'bg-[#f4f9fd] border-[#377eb8]/75 shadow-[0_10px_30px_rgba(0,0,0,0.03)]'
                }`}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-white border-[3px] border-[#377eb8] flex items-center justify-center text-[#377eb8] shadow-md z-10 -mr-3">
                    <FaBuilding className="text-xl" />
                  </div>
                  <div className="bg-[#377eb8] text-white font-extrabold text-lg tracking-wide pl-6 pr-7 py-2 rounded-r-full shadow-md">
                    Commercial
                  </div>
                </div>
                <p className="text-gray-800 text-[14.5px] font-medium leading-relaxed text-justify mt-1">
                  Large-scale solar solutions for business and industrial facilities offering reliable power, significant long-term savings, and strong sustainability credentials for organizations.
                </p>
              </motion.div>

            </div>

            {/* 3. BOTTOM ROW: AFTER-SALES (Bottom-Left) + SYSTEM DESIGN (Bottom-Right) */}
            <div className="grid grid-cols-2 gap-12 max-w-5xl mx-auto mt-10">
              
              {/* Bottom-Left Card: After-Sales Service & Maintenance */}
              <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onMouseEnter={() => setActivePillar('maintenance')}
                onMouseLeave={() => setActivePillar(null)}
                className={`rounded-[2rem] border-2 p-7 pt-10 relative transition-all duration-300 cursor-pointer ${
                  activePillar === 'maintenance' 
                    ? 'bg-[#eef7e6] border-[#78b843] shadow-[0_20px_50px_rgba(120,184,67,0.22)] -translate-y-1.5' 
                    : 'bg-[#f6faf2] border-[#78b843]/70 shadow-[0_10px_30px_rgba(0,0,0,0.03)]'
                }`}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center whitespace-nowrap">
                  <div className="bg-[#78b843] text-white font-extrabold text-sm leading-tight px-6 py-2 rounded-l-2xl shadow-md text-center">
                    After-Sales Service <br /> &amp; Maintenance
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white border-[3px] border-[#78b843] flex items-center justify-center text-[#78b843] shadow-md z-10 -ml-2">
                    <FaTools className="text-lg" />
                  </div>
                </div>
                <p className="text-gray-800 text-[14.5px] font-medium leading-relaxed text-justify mt-1">
                  Constant maintenance support for installed solar systems. Regular servicing keeps panels efficient and ensures reliable performance over their 25+ year lifespan.
                </p>
              </motion.div>

              {/* Bottom-Right Card: System Design */}
              <motion.div 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, delay: 0.1 }}
                onMouseEnter={() => setActivePillar('design')}
                onMouseLeave={() => setActivePillar(null)}
                className={`rounded-[2rem] border-2 p-7 pt-10 relative transition-all duration-300 cursor-pointer ${
                  activePillar === 'design' 
                    ? 'bg-[#ecf3fb] border-[#2965a8] shadow-[0_20px_50px_rgba(41,101,168,0.22)] -translate-y-1.5' 
                    : 'bg-[#f3f7fc] border-[#2965a8]/75 shadow-[0_10px_30px_rgba(0,0,0,0.03)]'
                }`}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center whitespace-nowrap">
                  <div className="w-12 h-12 rounded-full bg-white border-[3px] border-[#2965a8] flex items-center justify-center text-[#2965a8] shadow-md z-10 -mr-3 relative">
                    <FaDesktop className="text-lg" />
                    <FaCog className="text-[9px] absolute top-3.5 text-white" />
                  </div>
                  <div className="bg-[#2965a8] text-white font-extrabold text-lg tracking-wide pl-6 pr-7 py-2 rounded-r-full shadow-md">
                    System Design
                  </div>
                </div>
                <p className="text-gray-800 text-[14.5px] font-medium leading-relaxed text-justify mt-1">
                  Personalized consultation, system design, sizing, and complete solution design to ensure each solar system matches the unique needs of the space and maximizes its energy output.
                </p>
              </motion.div>

            </div>
          </div>

          {/* ================= MOBILE & TABLET RESPONSIVE VIEW (Below lg) ================= */}
          <div className="lg:hidden space-y-12">
            
            {/* Compact Center EPC Emblem */}
            <div className="flex justify-center">
              <div className="w-36 h-36 rounded-full bg-white shadow-[0_15px_40px_rgba(0,0,0,0.1)] border-[6px] border-[#f4f9ef] flex flex-col items-center justify-center relative">
                <div className="absolute inset-1 rounded-full border-4 border-t-[#78b843] border-l-[#78b843] border-r-[#213358] border-b-[#377eb8]"></div>
                <span className="text-3xl font-black text-gray-900 tracking-tight">EPC</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#78b843] mt-0.5">Full Lifecycle</span>
              </div>
            </div>

            {/* Clean Stacked Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-2">
              
              {/* 1. Industrial */}
              <div className="rounded-3xl border-2 border-[#78b843]/75 bg-[#f6faf2] p-6 pt-9 relative shadow-sm">
                <div className="absolute -top-5 left-6 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-[#78b843] flex items-center justify-center text-[#78b843] shadow-sm z-10 -mr-2.5">
                    <FaIndustry className="text-base" />
                  </div>
                  <span className="bg-[#78b843] text-white font-bold text-base pl-5 pr-6 py-1.5 rounded-r-full shadow-sm">
                    Industrial
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We offer customized solar solutions for energy-intensive industries, helping reduce electricity costs, improve energy efficiency, and support reliable, sustainable power generation for long-term operations.
                </p>
              </div>

              {/* 2. Residential */}
              <div className="rounded-3xl border-2 border-[#213358]/75 bg-[#f4f7fc] p-6 pt-9 relative shadow-sm">
                <div className="absolute -top-5 left-6 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-[#213358] flex items-center justify-center text-[#213358] shadow-sm z-10 -mr-2.5">
                    <FaHome className="text-base" />
                  </div>
                  <span className="bg-[#213358] text-white font-bold text-base pl-5 pr-6 py-1.5 rounded-r-full shadow-sm">
                    Residential
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We offer solar system installation on home rooftops with the target to lower electricity bills, increase property value, and reduce carbon footprint for households.
                </p>
              </div>

              {/* 3. Commercial */}
              <div className="rounded-3xl border-2 border-[#377eb8]/75 bg-[#f4f9fd] p-6 pt-9 relative shadow-sm">
                <div className="absolute -top-5 left-6 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-[#377eb8] flex items-center justify-center text-[#377eb8] shadow-sm z-10 -mr-2.5">
                    <FaBuilding className="text-base" />
                  </div>
                  <span className="bg-[#377eb8] text-white font-bold text-base pl-5 pr-6 py-1.5 rounded-r-full shadow-sm">
                    Commercial
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Large-scale solar solutions for business and industrial facilities offering reliable power, significant long-term savings, and strong sustainability credentials for organizations.
                </p>
              </div>

              {/* 4. System Design */}
              <div className="rounded-3xl border-2 border-[#2965a8]/75 bg-[#f3f7fc] p-6 pt-9 relative shadow-sm">
                <div className="absolute -top-5 left-6 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-[#2965a8] flex items-center justify-center text-[#2965a8] shadow-sm z-10 -mr-2.5">
                    <FaDesktop className="text-base" />
                  </div>
                  <span className="bg-[#2965a8] text-white font-bold text-base pl-5 pr-6 py-1.5 rounded-r-full shadow-sm">
                    System Design
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Personalized consultation, system design, sizing, and complete solution design to ensure each solar system matches the unique needs of the space and maximizes its energy output.
                </p>
              </div>

              {/* 5. After-Sales Service & Maintenance */}
              <div className="md:col-span-2 rounded-3xl border-2 border-[#78b843]/75 bg-[#f6faf2] p-6 pt-9 relative shadow-sm">
                <div className="absolute -top-5 left-6 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-[#78b843] flex items-center justify-center text-[#78b843] shadow-sm z-10 -mr-2.5">
                    <FaTools className="text-sm" />
                  </div>
                  <span className="bg-[#78b843] text-white font-bold text-sm sm:text-base pl-5 pr-6 py-1.5 rounded-r-full shadow-sm">
                    After-Sales Service &amp; Maintenance
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Constant maintenance support for installed solar systems. Regular servicing keeps panels efficient and ensures reliable performance over their 25+ year lifespan.
                </p>
              </div>

            </div>
          </div>
          
        </div>
      </section>
      

      {/* --- Section 3: Modern Showcase - Solar Street Light & Water Pump Solutions --- */}
      <section className="py-24 lg:py-32 bg-white relative z-10 border-t border-gray-100 overflow-hidden">
        
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8ab645]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#1b5ea8]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#8ab645]/30 shadow-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[#8ab645] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#6f9a2e]">
                Specialized Off-Grid Solutions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl dm-sans-bold text-gray-900 font-serif leading-tight">
              Clean Infrastructure for <br className="hidden sm:block" /> Communities &amp; Agriculture
            </h2>
          </motion.div>

          <div className="space-y-28 lg:space-y-36">

            {/* =========================================================
                1. SOLAR STREET LIGHT SOLUTIONS (Text Left, Image Right)
            ========================================================= */}
            <div className="space-y-10 lg:space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14">
                
                {/* Left Content */}
                <motion.div
                  variants={fadeLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="lg:col-span-5 space-y-6"
                >
                  <div className="inline-flex items-center gap-2.5 text-xs font-extrabold tracking-widest uppercase text-[#1b5ea8] bg-[#1b5ea8]/8 px-3.5 py-1.5 rounded-lg">
                    <span>01</span>
                    <span className="w-1 h-1 rounded-full bg-[#1b5ea8]" />
                    <span>Public &amp; Industrial Lighting</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-[42px] dm-sans-bold text-gray-900 leading-[1.15]">
                    Solar Street Light <span className="text-[#8ab645]">Solutions</span>
                  </h3>

                  <p className="text-gray-600 sans-medium text-base sm:text-[17px] leading-relaxed">
                    We provide reliable and energy efficient solar street lighting solutions for roads, highways, rural areas, institutions and industrial premises. Our solutions ensure safer communities with clean and renewable energy.
                  </p>

                  <div className="pt-2">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2.5 text-sm font-bold text-[#0a192f] hover:text-[#8ab645] transition-colors group"
                    >
                      <span>Get a Lighting Proposal</span>
                      <span className="w-8 h-8 rounded-full bg-[#0a192f] text-white group-hover:bg-[#8ab645] flex items-center justify-center transition-colors">
                        <FaArrowRight size={11} />
                      </span>
                    </Link>
                  </div>
                </motion.div>

                {/* Right Modern Image Frame */}
                <motion.div
                  variants={fadeRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="lg:col-span-7"
                >
                  <div className="relative rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(10,25,47,0.12)] border-4 border-white bg-gray-100 group h-[280px] sm:h-[370px] lg:h-[410px]">
                    <img
                      src="https://res.cloudinary.com/wtbwxhmc/image/upload/q_auto,f_auto/v1794633517/orbed_02_ngr4er.png"
                      alt="Solar Street Light Solutions"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/65 via-transparent to-transparent" />

                    {/* Floating Glass Pill */}
                    <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-white/60 flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#8ab645] text-white flex items-center justify-center text-lg shrink-0">
                        <FaRegClock />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                          Smart Dusk-to-Dawn
                        </p>
                        <p className="text-xs text-gray-600 font-medium">
                          100% Autonomous &amp; Grid-Independent
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* 5-Card Interactive Feature Bento */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
              >
                {[
                  { icon: <FaLeaf />, text: "100% renewable and clean energy" },
                  { icon: <FaBolt />, text: "Energy efficient LED lighting" },
                  { icon: <FaRegClock />, text: "Automatic operation (dusk to dawn)" },
                  { icon: <FaShieldAlt />, text: "Low maintenance and long service life" },
                  { icon: <FaUsers />, text: "Ideal for rural and urban areas, highways and institutions" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`group bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_35px_rgba(138,182,69,0.14)] hover:border-[#8ab645]/45 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between gap-4 ${
                      idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#f3f8ec] text-[#78b843] group-hover:bg-[#8ab645] group-hover:text-white flex items-center justify-center text-lg transition-colors duration-300">
                      {item.icon}
                    </div>
                    <p className="text-[13.5px] font-semibold text-gray-700 leading-snug">
                      {item.text}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>


            {/* =========================================================
                2. SOLAR WATER PUMP SOLUTIONS (Image Left, Text Right)
            ========================================================= */}
            <div className="space-y-10 lg:space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14">
                
                {/* Left Modern Image Frame (Alternating on Desktop) */}
                <motion.div
                  variants={fadeLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="lg:col-span-7 order-2 lg:order-1"
                >
                  <div className="relative rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(10,25,47,0.12)] border-4 border-white bg-gray-100 group h-[280px] sm:h-[370px] lg:h-[410px]">
                    <img
                      src="https://res.cloudinary.com/wtbwxhmc/image/upload/q_auto,f_auto/v1794633517/orbed_01_l3o0tb.png"
                      alt="Solar Water Pump Solutions"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/65 via-transparent to-transparent" />

                    {/* Floating Glass Pill */}
                    <div className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-5 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-white/60 flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#1b5ea8] text-white flex items-center justify-center text-lg shrink-0">
                        <FaTint />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                          High-Yield Irrigation
                        </p>
                        <p className="text-xs text-gray-600 font-medium">
                          Zero Diesel Cost • Remote Off-Grid Ready
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Content */}
                <motion.div
                  variants={fadeRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="lg:col-span-5 space-y-6 order-1 lg:order-2"
                >
                  <div className="inline-flex items-center gap-2.5 text-xs font-extrabold tracking-widest uppercase text-[#78b843] bg-[#8ab645]/12 px-3.5 py-1.5 rounded-lg">
                    <span>02</span>
                    <span className="w-1 h-1 rounded-full bg-[#78b843]" />
                    <span>Agriculture &amp; Community Water</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-[42px] dm-sans-bold text-gray-900 leading-[1.15]">
                    Solar Water Pump <span className="text-[#1b5ea8]">Solutions</span>
                  </h3>

                  <p className="text-gray-600 sans-medium text-base sm:text-[17px] leading-relaxed">
                    We provide efficient and sustainable solar water pumping solutions for agricultural irrigation, drinking water supply and community water management. Our systems help increase productivity and ensure reliable water access even in remote and off-grid areas.
                  </p>

                  <div className="pt-2">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2.5 text-sm dm-sans-bold text-[#0a192f] hover:text-[#1b5ea8] transition-colors group"
                    >
                      <span>Consult for Pump Sizing</span>
                      <span className="w-8 h-8 rounded-full bg-[#0a192f] text-white group-hover:bg-[#1b5ea8] flex items-center justify-center transition-colors">
                        <FaArrowRight size={11} />
                      </span>
                    </Link>
                  </div>
                </motion.div>

              </div>

              {/* 5-Card Interactive Feature Bento */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
              >
                {[
                  { icon: <FaTint />, text: "Reliable and sustainable water supply" },
                  { icon: <FaSeedling />, text: "Suitable for irrigation, livestock and drinking water" },
                  { icon: <FaChartBar />, text: "Increases agricultural productivity" },
                  { icon: <FaCoins />, text: "Low operational cost and long service life" },
                  { icon: <FaLeaf />, text: "Environmentally friendly and off-grid solution" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`group bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_35px_rgba(27,94,168,0.12)] hover:border-[#1b5ea8]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between gap-4 ${
                      idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#eef4fb] text-[#1b5ea8] group-hover:bg-[#1b5ea8] group-hover:text-white flex items-center justify-center text-lg transition-colors duration-300">
                      {item.icon}
                    </div>
                    <p className="text-[13.5px] dm-sans-bold text-gray-700 leading-snug">
                      {item.text}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Section 4: Bottom CTA / Contact (High-End Overlapping Dark Box) --- */}
      <section className="py-24 lg:py-36 px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-300 mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left: 2 Staggered Vertical Images */}
          <div className="w-full lg:w-[45%] flex gap-6 h-125 lg:h-150">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-1/2 h-full pt-12 relative z-10">
              <img 
                src="https://plus.unsplash.com/premium_photo-1680206587718-19b00a9be6b5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" 
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
              <div className="bg-linear-to-br from-[#061325] to-[#0a192f] p-10 md:p-12 rounded-[2.5rem] shadow-[0_30px_60px_rgba(10,25,47,0.2)] border border-white/10 relative overflow-hidden group">
                
                {/* Subtle light glow effect inside box */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#8ab645] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>

                <h3 className="text-2xl md:text-3xl dm-sans-bold text-white mb-4 relative z-10">Do you Need Help With Solar Panel Maintenance?</h3>
                <p className="text-gray-400 sans-medium text-base leading-relaxed mb-8 relative z-10">
                  Keep your solar panels performing at peak efficiency with our expert O&M services. We handle inspections, cleaning, and performance optimization.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 relative z-10">
                  <div className="flex items-center gap-3 text-white text-base sans-medium bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                    <BsCheckCircleFill className="text-[#8ab645] text-lg" /> Easy Booking
                  </div>
                  <div className="flex items-center gap-3 text-white text-base sans-medium bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                    <BsCheckCircleFill className="text-[#8ab645] text-lg" /> Free Expert Opinion
                  </div>
                  <div className="flex items-center gap-3 text-white text-base sans-medium bg-white/5 px-4 py-3 rounded-xl border border-white/5 sm:col-span-2">
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