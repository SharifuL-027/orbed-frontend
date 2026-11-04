import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaLinkedinIn, FaSearch, FaShoppingBag } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Twitter X logo

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  // Scroll detect korar jonno framer-motion er hook
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // Scroll down korle navbar hide hobe (150px er niche namle)
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      // Scroll up korle abar show hobe
      setHidden(false);
    }

    // 50px er niche scroll korlei background solid white hobe
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'PAGES', path: '/pages' },
    { name: 'SERVICES', path: '/services' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'BLOG', path: '/blog' },
    { name: 'CONTACT US', path: '/contact' }
  ];

  return (
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
      {/* Topbar[cite: 8] */}
      <div className={`hidden md:flex justify-between items-center px-8 py-2 text-sm border-b transition-colors duration-300 ${isScrolled ? 'border-gray-200 text-gray-600' : 'border-white/20 text-white/90'}`}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaPhoneAlt size={12} />
            <span>Call : 123456789</span>
          </div>
          <div className="w-[1px] h-4 bg-white/20" /> {/* Vertical divider[cite: 8] */}
          <div className="flex items-center gap-2">
            <FaEnvelope size={12} />
            <span>mail@example.com</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-green-500 transition-colors"><FaFacebookF size={14} /></a>
          <a href="#" className="hover:text-green-500 transition-colors"><FaXTwitter size={14} /></a>
          <a href="#" className="hover:text-green-500 transition-colors"><FaLinkedinIn size={14} /></a>
        </div>
      </div>

      {/* Main Navbar[cite: 8] */}
      <nav className="flex items-center justify-between px-8 py-4">
        
        {/* Logo Area */}
        <a href="/" className="flex items-center gap-2 cursor-pointer z-50">
          <img 
            src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1793700637/Logo-02_aoau4k.png" 
            alt="Orbed Energy" 
            className="h-10 md:h-12 w-auto object-contain" 
          />
        </a>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 lg:space-x-8 items-center font-bold text-[13px] tracking-wide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.name} className="relative group cursor-pointer">
                <Link 
                  to={item.path} 
                  className={`py-1 transition-colors duration-300 ${isScrolled ? 'hover:text-green-500' : 'hover:text-green-300'}`}
                >
                  {item.name}
                </Link>

                {/* Active Page Underline (Smooth Animation) */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-500"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Hover Underline (Sudhu jokhun active thakbe na) */}
                {!isActive && (
                  <div className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full" />
                )}
              </li>
            );
          })}
        </ul>

        {/* Right Side Actions[cite: 8] */}
        <div className="flex items-center gap-6">
          <button className="hover:text-green-500 transition-colors">
            <FaSearch size={16} />
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <FaShoppingBag size={20} className="group-hover:text-green-500 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </div>
            <span className="font-bold text-sm">$0.00</span>
          </div>

          <button className="bg-[#8cc63f] hover:bg-[#7ebd34] text-white font-bold py-3 px-6 rounded-sm text-sm transition-all">
            GET APPOINTMENT
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;