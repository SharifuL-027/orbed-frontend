import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaFacebookF, 
  FaUser, 
  FaBars, 
  FaTimes 
} from 'react-icons/fa';

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const location = useLocation();

  // Scroll detect korar jonno framer-motion er hook
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // Scroll down korle navbar hide hobe (150px er niche namle) - Kintu Mobile menu open thakle hide hobe na
    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // 50px er niche scroll korlei background solid white hobe
    setIsScrolled(latest > 50 || mobileMenuOpen);
  });

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'PRODUCTS', path: '/products' },
    { name: 'CAREER', path: '/careers' },
    { name: 'CONTACT US', path: '/contact' }
  ];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-50 flex flex-col transition-colors duration-300 ${
          isScrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white"
        }`}
      >
        {/* Topbar (Hidden on Mobile) */}
        <div className={`hidden md:flex justify-between items-center px-4 md:px-8 py-2 text-sm border-b transition-colors duration-300 ${isScrolled ? 'border-gray-200 text-gray-600' : 'border-white/20 text-white/90'}`}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaPhoneAlt size={12} />
              <span>Call : 01805-523132</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20" /> 
            <div className="flex items-center gap-2">
              <FaEnvelope size={12} />
              <span>info@orbedenergy.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/p/Orbed-Green-Energy-Ltd-61586079396076/" target="_blank" rel="noreferrer" className="hover:text-green-500 transition-colors">
              <FaFacebookF size={14} />
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="flex items-center justify-between px-4 md:px-8 py-4">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer z-50">
            <img 
              src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1793700637/Logo-02_aoau4k.png" 
              alt="Orbed Energy" 
              className="h-10 md:h-12 w-auto object-contain" 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex space-x-6 xl:space-x-8 items-center font-bold text-[13px] tracking-wide">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name} className="relative group cursor-pointer">
                  <Link 
                    to={item.path} 
                    className={`py-1 transition-colors duration-300 ${isScrolled ? 'hover:text-[#8cc63f]' : 'hover:text-green-300'}`}
                  >
                    {item.name}
                  </Link>

                  {/* Active Page Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#8cc63f]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Hover Underline */}
                  {!isActive && (
                    <div className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#8cc63f] transition-all duration-300 group-hover:w-full" />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop Right Side Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/login" title="Admin Login" className="flex items-center gap-2 cursor-pointer group">
              <div className="relative p-2.5 bg-gray-100 group-hover:bg-green-50 rounded-full transition-colors">
                <FaUser size={18} className="text-gray-700 group-hover:text-[#8cc63f] transition-colors" />
              </div>
            </Link>
            
            {/* GET APPOINTMENT linked to contact */}
            <Link to="/contact">
              <button className="bg-[#8cc63f] hover:bg-[#7ebd34] text-white font-bold py-3 px-6 rounded-sm text-sm transition-all shadow-md">
                GET APPOINTMENT
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger Menu Icon */}
          <div className="lg:hidden flex items-center gap-4">
            {/* Mobile Contact Button */}
            <Link to="/contact" className="md:hidden">
              <button className="bg-[#8cc63f] text-white font-bold py-2 px-4 rounded-sm text-xs transition-all">
                APPOINTMENT
              </button>
            </Link>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full bg-white z-40 lg:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <ul className="flex flex-col gap-6 text-lg font-bold text-gray-900 mt-8">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.name} className="border-b border-gray-100 pb-3">
                    <Link 
                      to={item.path} 
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block w-full ${isActive ? 'text-[#8cc63f]' : 'hover:text-[#8cc63f]'}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
              
              {/* Admin Login added in mobile menu */}
              <li className="border-b border-gray-100 pb-3 mt-4">
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-gray-700 hover:text-[#8cc63f] transition-colors"
                >
                  <div className="p-2 bg-gray-100 rounded-full">
                    <FaUser size={16} />
                  </div>
                  Admin Login
                </Link>
              </li>
            </ul>

            {/* Mobile Footer Info */}
            <div className="mt-auto pt-10 flex flex-col gap-4 text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#8cc63f]" />
                <span>01805-523132</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#8cc63f]" />
                <span>info@orbedenergy.com</span>
              </div>
              <div className="flex gap-4 mt-4">
                <a href="https://www.facebook.com/p/Orbed-Green-Energy-Ltd-61586079396076/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-[#8cc63f] hover:text-white transition-all">
                  <FaFacebookF />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;