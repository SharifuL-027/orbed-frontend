import React from 'react';
import { FaFacebookF, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedinIn, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Updated Background: Clean minimal gradient based on brand colors
    <footer className="relative w-full overflow-hidden font-sans bg-gradient-to-b from-[#f4f7f0] to-[#e8efe0] pt-12 pb-8 md:pt-20 md:pb-10">
      
      {/* Optional Brand Logo Watermark Effect in Background */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.03] pointer-events-none scale-150 -mr-20">
        <img 
          src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1793700637/Logo-02_aoau4k.png" 
          alt="Watermark" 
          className="w-96 h-auto grayscale" 
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* White Solid Container with soft shadow instead of glassmorphism */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12">
            
            {/* Column 1: Brand */}
            <div className="sm:col-span-2 lg:col-span-5 flex flex-col gap-6">
              <Link to="/" className="flex items-center gap-2 cursor-pointer">
                <img 
                  src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1793700637/Logo-02_aoau4k.png" 
                  alt="Orbed Energy" 
                  className="h-10 md:h-12 w-auto object-contain" 
                />
              </Link>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed lg:pr-4 font-medium">
                Empowering Bangladesh with cutting-edge solar technology and sustainable energy solutions. Built for a greener tomorrow.
              </p>
              
              {/* Newsletter Subscription */}
              <div className="mt-2 flex items-center bg-gray-50 rounded-full border border-gray-200 overflow-hidden pr-1 max-w-sm w-full transition-all focus-within:border-[#8ab645] focus-within:ring-1 focus-within:ring-[#8ab645]/30">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-transparent px-5 py-3.5 text-sm outline-none text-gray-700 placeholder-gray-400 font-medium"
                />
                <button className="bg-[#8ab645] hover:bg-[#7ebd34] text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors shadow-sm">
                  <FaArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="sm:col-span-1 lg:col-span-3 lg:pl-10">
              <h3 className="text-gray-900 text-lg font-extrabold mb-5 md:mb-6">Quick Links</h3>
              <ul className="flex flex-col gap-3 md:gap-4">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Services', path: '/services' },
                  { name: 'Our Products', path: '/products' },
                  { name: 'Career Opportunities', path: '/careers' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-gray-500 hover:text-[#8ab645] transition-colors text-sm font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="sm:col-span-1 lg:col-span-4">
              <h3 className="text-gray-900 text-lg font-extrabold mb-5 md:mb-6">Contact Us</h3>
              <ul className="flex flex-col gap-4 md:gap-5">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#f4f9f1] flex items-center justify-center flex-shrink-0 mt-1">
                    <FaMapMarkerAlt className="text-[#8ab645] text-sm" />
                  </div>
                  <span className="text-gray-600 text-sm font-medium leading-relaxed pt-1">
                    House 482 (1st Fl), Road 6, Ave 6,<br/> Mirpur DOHS, Dhaka 1216
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#f4f9f1] flex items-center justify-center flex-shrink-0">
                    <FaPhoneAlt className="text-[#8ab645] text-sm" />
                  </div>
                  <span className="text-gray-600 text-sm font-bold">+880 1805-523132</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#f4f9f1] flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-[#8ab645] text-sm" />
                  </div>
                  <span className="text-gray-600 text-sm font-bold">info@orbedenergy.com</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Divider, Copyright & Socials */}
          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-100 flex flex-col-reverse lg:flex-row justify-between items-center gap-6">
            
            {/* Copyright & Developed By */}
            <p className="text-sm text-gray-500 font-semibold text-center lg:text-left flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <span>© {new Date().getFullYear()} Orbed Green Energy Limited. All Rights Reserved.</span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span>
                Developed by{' '}
                <a 
                  href="https://genesysltd.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#8ab645] hover:underline font-extrabold tracking-wide"
                >
                  Genesys Tech
                </a>
              </span>
            </p>
            
            {/* Social Icons (FB & WhatsApp only) */}
            <div className="flex gap-3">
  {/* Facebook */}
  <a 
    href="https://www.facebook.com/p/Orbed-Green-Energy-Ltd-61586079396076/" 
    target="_blank" 
    rel="noreferrer"
    className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-[#8ab645] hover:text-white hover:border-[#8ab645] transition-all duration-300 text-gray-600 shadow-sm"
  >
    <FaFacebookF size={14} />
  </a>

  {/* LinkedIn */}
  <a 
    href="https://www.linkedin.com/company/orbed-green-energy-limited/" 
    target="_blank" 
    rel="noreferrer"
    className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all duration-300 text-gray-600 shadow-sm"
  >
    <FaLinkedinIn size={14} />
  </a>

  {/* WhatsApp */}
  <a 
    href="https://wa.me/8801805523132" 
    target="_blank" 
    rel="noreferrer"
    className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 text-gray-600 shadow-sm"
  >
    <FaWhatsapp size={16} />
  </a>
</div>
            
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;