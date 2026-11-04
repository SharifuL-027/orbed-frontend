import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float} from '@react-three/drei';
import { FaFacebookF, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// --- 3D Wind Turbine Component ---
const WindTurbine = ({ position, scale, speed = 0.015 }) => {
  const rotorRef = useRef();

  // useFrame er maddhome pakha guloke constantly ghurano hocche
  useFrame(() => {
    if (rotorRef.current) {
      rotorRef.current.rotation.z -= speed;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Khuti ba Pole */}
      <mesh position={[0, -4, 0]}>
        <cylinderGeometry args={[0.15, 0.3, 8, 16]} />
        <meshStandardMaterial color="#8ab645" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Rotor & Blades */}
      <group ref={rotorRef} position={[0, 0, 0.3]}>
        {/* Majhkhaner Hub */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.5} />
        </mesh>
        
        {/* Pakha (Blades) - 120 degree angle e 3 ti pakha */}
        {/* Blade 1 */}
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[0.1, 4, 0.05]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Blade 2 */}
        <mesh position={[-1.732, -1, 0]} rotation={[0, 0, Math.PI * (2 / 3)]}>
          <boxGeometry args={[0.1, 4, 0.05]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Blade 3 */}
        <mesh position={[1.732, -1, 0]} rotation={[0, 0, Math.PI * (4 / 3)]}>
          <boxGeometry args={[0.1, 4, 0.05]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>
    </group>
  );
};


// --- Main Footer Component ---
const Footer = () => {
  return (
    <footer className="relative bg-[#0a0f16] w-full overflow-hidden text-gray-300 font-sans border-t border-gray-800">
      
      {/* --- 3D Background Canvas --- */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-40 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          {/* Paribesh er lighting ebong fog */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#8ab645" />
          <fog attach="fog" args={['#0a0f16', 10, 30]} />
          <Environment preset="city" />

          {/* Ekaadhik Turbine rakhlam ekta Wind Farm er feel anar jonno */}
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
            <WindTurbine position={[-8, 0, -5]} scale={1.5} speed={0.01} />
            <WindTurbine position={[6, -1, -10]} scale={1.2} speed={0.012} />
            <WindTurbine position={[12, 1, -15]} scale={1} speed={0.008} />
          </Float>
        </Canvas>
      </div>

      {/* --- Footer Content (Over the 3D Canvas) --- */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: About */}
          <div className="flex flex-col gap-6">
            <a href="/" className="flex items-center gap-2 cursor-pointer">
              <img 
                src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1793700637/Logo-02_aoau4k.png" 
                alt="Orbed Energy" 
                className="h-10 w-auto object-contain filter brightness-200" 
              />
            </a>
            <p className="text-gray-400 text-sm leading-relaxed">
              At Orbed Green Energy Limited, we believe in building a cleaner, greener and more sustainable future through reliable renewable energy solutions.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#8ab645] hover:border-[#8ab645] transition-all duration-300 text-white">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#8ab645] hover:border-[#8ab645] transition-all duration-300 text-white">
                <FaXTwitter size={14} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#8ab645] hover:border-[#8ab645] transition-all duration-300 text-white">
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 font-serif">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {['Home', 'About Us', 'Services', 'Projects', 'Career', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-[#8ab645] transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8ab645]" /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 font-serif">Our Services</h3>
            <ul className="flex flex-col gap-3">
              {['Residential Solar', 'Industrial Solutions', 'Commercial EPC', 'Solar Street Light', 'Solar Water Pump'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-400 hover:text-[#8ab645] transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8ab645]" /> {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6 font-serif">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#8ab645] mt-1 shrink-0" />
                <span className="text-gray-400 text-sm">House 482 (1st Floor), Road 6, Avenue 6, Mirpur DOHS, Dhaka 1216, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#8ab645] shrink-0" />
                <div className="flex flex-col text-gray-400 text-sm">
                  <span>+8801340320161</span>
                  <span>+8801805523132</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#8ab645] flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@orbedenergy.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Orbed Green Energy Limited. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;