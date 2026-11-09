import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Make sure react-icons is installed

const WhatsappButton = () => {
  
  const phoneNumber = "8801805523132"; 
  
  // Chat box-e automatic show korar default message
  const defaultMessage = "Hello! I would like to know more about Orbed Energy products and solutions.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex items-center group font-sans">
      
      {/* Tooltip text */}
      <div className="absolute right-full mr-4 bg-white text-slate-800 text-sm font-bold py-2 px-4 rounded-xl shadow-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap border border-slate-100">
        Chat with us
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-slate-100 rotate-45"></div>
      </div>

      {/* Floating WhatsApp Button with pulse animation */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_24px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        aria-label="Contact us on WhatsApp"
      >
        <span className="absolute inset-0 w-full h-full rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none"></span>
        
        <FaWhatsapp size={32} className="relative z-10" />
      </a>
      
    </div>
  );
};

export default WhatsappButton;