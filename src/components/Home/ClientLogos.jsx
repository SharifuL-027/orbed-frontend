import React from 'react';
import { motion } from 'framer-motion';

const ClientLogos = () => {
  // Ekhane apnar client der data ebong logo link gulo boshaben
  // Orbed er project list theke asol nam gulo deya holo[cite: 12]
  const clientsData = [
    
    {
      name: "ERA Construction",
      logoUrl: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1793784263/logo-era-con-final_owp5af.png"
    },
    {
      name: "NRL Eco Bricks",
      logoUrl: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1793784262/Screenshot_14__1_-removebg-previ_dzqeqz.png"
    },
    {
        name: "RASS Associates Ltd",
        logoUrl: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1793784263/menulogo_1_vib0t7.png"
    },
    {
      name: "Bangladesh Water Development Board",
      logoUrl: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1793784321/bwdb-removebg-preview_d5core.png"
    },
    {
      name: "Min Oils Limited",
      logoUrl: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1793784263/download_dj3oyg.png"
    },
    {
      name: "RASS Resort",
      logoUrl: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1793784263/Screenshot_15__1_-removebg-previ_w74ykz.png"
    }
  ];

  // Seamless (kokhono na thama) loop er jonno array ke duplicate kora holo
  const duplicatedClients = [...clientsData, ...clientsData];

  return (
    <section className="py-20 bg-white overflow-hidden border-t border-gray-100 font-sans">
      
      {/* Title Area */}
      <div className="max-w-350 mx-auto px-8 mb-12 text-center">
        <h4 className="text-[#8ab645] dm-sans-bold text-sm tracking-widest uppercase mb-2">
          Who We Serve
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dm-sans-bold">
          Our Valued Clients
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden py-4">
        
        {/* Left and Right Fade Effects (Logo gulo smooth vabe miliye jawar jonno) */}
        <div className="absolute left-0 top-0 w-24 md:w-40 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-24 md:w-40 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Animated Track */}
        <motion.div
          className="flex items-center gap-16 md:gap-24 w-max"
          // Bam theke dan (Left to Right) animation
          initial={{ x: "-50%" }}
          animate={{ x: "0%" }}
          transition={{
            duration: 35, // Speed control (Baraile aro slow hobe)
            repeat: Infinity,
            ease: "linear", // Same speed e cholbe
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center min-w-[150px] md:min-w-[200px] transition-all duration-500 cursor-pointer"
              title={client.name}
            >
              <img 
                src={client.logoUrl} 
                alt={`${client.name} Logo`} 
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;