import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { FaFacebookF, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// --- 3D Wind Turbine (Glossy White) ---
const WindTurbine = ({ position, scale, speed = 0.015 }) => {
  const rotorRef = useRef();

  useFrame(() => {
    if (rotorRef.current) {
      rotorRef.current.rotation.z -= speed;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Pole */}
      <mesh position={[0, -4, 0]}>
        <cylinderGeometry args={[0.1, 0.2, 8, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.5} clearcoat={1} />
      </mesh>
      
      {/* Rotor & Blades */}
      <group ref={rotorRef} position={[0, 0, 0.2]}>
        <mesh>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#8ab645" roughness={0.2} metalness={0.4} />
        </mesh>
        
        {/* Blade 1 */}
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[0.06, 4, 0.02]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Blade 2 */}
        <mesh position={[-1.732, -1, 0]} rotation={[0, 0, Math.PI * (2 / 3)]}>
          <boxGeometry args={[0.06, 4, 0.02]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Blade 3 */}
        <mesh position={[1.732, -1, 0]} rotation={[0, 0, Math.PI * (4 / 3)]}>
          <boxGeometry args={[0.06, 4, 0.02]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.5} />
        </mesh>
      </group>
    </group>
  );
};


// --- Glassmorphism Footer ---
const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden font-sans bg-[#eef2f5]">
      
      {/* --- 3D Background Canvas --- */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
          <fog attach="fog" args={['#eef2f5', 5, 25]} />
          <Environment preset="city" />

          {/* Turbines in a dreamy floating state */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <WindTurbine position={[-7, -1, -5]} scale={1.8} speed={0.015} />
            <WindTurbine position={[8, 1, -8]} scale={1.2} speed={0.012} />
            <WindTurbine position={[0, -3, -12]} scale={1.5} speed={0.01} />
          </Float>
        </Canvas>
      </div>

      {/* --- Glass Panel Content (Foreground) --- */}
      <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 pt-12 pb-8 md:pt-20 md:pb-10">
        
        {/* The Frosted Glass Container */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 sm:p-10 lg:p-16">
          
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
              <p className="text-gray-600 text-sm md:text-base leading-relaxed lg:pr-4">
                Empowering Bangladesh with cutting-edge solar technology and sustainable energy solutions. Built for a greener tomorrow.
              </p>
              
              {/* Newsletter Subscription */}
              <div className="mt-2 flex items-center bg-white/80 rounded-full border border-gray-200 overflow-hidden pr-1 max-w-sm w-full">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-transparent px-4 py-3 text-sm outline-none text-gray-700 placeholder-gray-400"
                />
                <button className="bg-[#8ab645] hover:bg-[#7ebd34] text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                  <FaArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Column 2: Quick Links (Website Navigation) */}
            <div className="sm:col-span-1 lg:col-span-3 lg:pl-10">
              <h3 className="text-gray-900 text-lg font-bold mb-5 md:mb-6">Quick Links</h3>
              <ul className="flex flex-col gap-3 md:gap-4">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Services', path: '/services' },
                  { name: 'Our Products', path: '/products' },
                  { name: 'Career Opportunities', path: '/careers' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-gray-600 hover:text-[#8ab645] transition-colors text-sm font-medium">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="sm:col-span-1 lg:col-span-4">
              <h3 className="text-gray-900 text-lg font-bold mb-5 md:mb-6">Contact Us</h3>
              <ul className="flex flex-col gap-4 md:gap-5">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-[#8ab645] mt-1 flex-shrink-0 text-base" />
                  <span className="text-gray-600 text-sm font-medium">House 482 (1st Fl), Road 6, Ave 6, Mirpur DOHS, Dhaka 1216</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="text-[#8ab645] flex-shrink-0 text-base" />
                  <span className="text-gray-600 text-sm font-medium">+880 1805-523132</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-[#8ab645] flex-shrink-0 text-base" />
                  <span className="text-gray-600 text-sm font-medium">info@orbedenergy.com</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Divider, Copyright & Socials */}
          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-300/50 flex flex-col-reverse lg:flex-row justify-between items-center gap-6">
            
            {/* Copyright & Developed By */}
            <p className="text-sm text-gray-500 font-medium text-center lg:text-left flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <span>© {new Date().getFullYear()} Orbed Green Energy Limited. All Rights Reserved.</span>
              <span className="hidden sm:inline">|</span>
              <span>
                Developed by{' '}
                <a 
                  href="https://genesystech.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#8ab645] hover:underline font-bold"
                >
                  Genesys
                </a>
              </span>
            </p>
            
            {/* Social Icons (FB & WhatsApp only) */}
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/p/Orbed-Green-Energy-Ltd-61586079396076/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/60 border border-white flex items-center justify-center hover:bg-[#8ab645] hover:text-white transition-all duration-300 text-gray-600 shadow-sm"
              >
                <FaFacebookF size={16} />
              </a>
              <a 
                href="https://wa.me/8801805523132" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/60 border border-white flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-300 text-gray-600 shadow-sm"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
            
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;