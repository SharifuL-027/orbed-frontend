import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaTwitter,
  FaPaperPlane,
  FaCheckCircle
} from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';

const ContactUs = () => {
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

  // Form State Management for Admin Panel
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form data payload admin panel API er jonno ready
    const payload = { ...formData };

    try {
      // Future Backend API Call Example:
      // await axiosInstance.post('/api/contact', payload);
      
      // Simulation for now
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 1500);
    } catch (error) {
      console.error("Message submission failed:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full selection:bg-[#8ab645] selection:text-white pb-24">
      
      {/* --- 100% PERFECT FIXED Parallax Hero Section --- */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=2070')` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0f16]/90 via-[#0a0f16]/60 to-[#0a0f16]/90" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-0.5 bg-[#8ab645]" />
            <h4 className="text-[#8ab645] dm-sans-bold text-xs tracking-[0.25em] uppercase">Contact Us</h4>
            <div className="w-8 h-0.5 bg-[#8ab645]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-5xl dm-sans-bold text-white font-serif leading-[1.2] mb-6"
          >
            From panels to net metering – your <span className="text-[#8ab645]">energy partners</span> in Bangladesh
          </motion.h1>
        </div>
      </section>

      {/* --- Main Content Wrapper --- */}
      <div className="relative z-10 bg-[#fafaf9] rounded-t-[3rem] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] pt-24 pb-12 border-b border-gray-100">
        
        {/* --- Info Cards Grid (Clean layout inspired by image[cite: 3]) --- */}
        <div className="max-w-350 mx-auto px-6 lg:px-8 mb-24">
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Address */}
            <motion.div variants={fadeUp} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#f4f9f1] rounded-full flex items-center justify-center text-[#8ab645] mb-6">
                <FaMapMarkerAlt size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Contact Us</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-50">
                House No. 482, Road No. 06, Avenue 06,<br/>Mirpur DOHS, Mirpur,<br/>Dhaka 1216
              </p>
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#f4f9f1] rounded-full flex items-center justify-center text-[#8ab645] mb-6">
                <FaEnvelope size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Email Us At</h3>
              <a href="mailto:info@orbedenergy.com" className="text-gray-500 text-sm hover:text-[#8ab645] transition-colors">
                info@orbedenergy.com
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div variants={fadeUp} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#f4f9f1] rounded-full flex items-center justify-center text-[#8ab645] mb-6">
                <FaPhoneAlt size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Call Us At</h3>
              <p className="text-gray-500 text-sm leading-loose">
                <a href="tel:+8801340320161" className="block hover:text-[#8ab645] transition-colors">+880 134 032 0161</a>
                <a href="tel:+8801805523132" className="block hover:text-[#8ab645] transition-colors">+880 180 552 3132</a>
              </p>
            </motion.div>

            {/* Social */}
            <motion.div variants={fadeUp} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#f4f9f1] rounded-full flex items-center justify-center text-[#8ab645] mb-6">
                <BsLightningChargeFill size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#8ab645] hover:text-white transition-colors"><FaFacebookF /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#8ab645] hover:text-white transition-colors"><FaLinkedinIn /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#8ab645] hover:text-white transition-colors"><FaTwitter /></a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* --- Split Layout: Image Left, Form Right (Inspired by top section of image[cite: 3]) --- */}
        <div className="max-w-350 mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left Side Visual[cite: 3] */}
            <div className="w-full lg:w-5/12 relative pt-8 lg:pt-0">
              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <img 
                  src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=800" 
                  alt="Solar Experts" 
                  className="w-full h-auto object-cover rounded-3xl shadow-xl"
                />
                {/* Overlapping Green Box matching reference layout[cite: 3] */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                  className="absolute -bottom-8 -right-4 lg:-right-10 bg-[#8ab645] text-white p-8 rounded-2xl shadow-xl max-w-[220px]"
                >
                  <BsLightningChargeFill className="text-3xl mb-3 opacity-90" />
                  <h4 className="text-2xl font-bold font-serif mb-1">100%</h4>
                  <p className="text-sm font-medium opacity-90 leading-tight">Reliable Renewable Energy Solutions</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Side Form */}
            <div className="w-full lg:w-7/12 lg:pl-10">
              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                
                <h4 className="text-[#8ab645] font-bold text-sm tracking-[0.2em] uppercase mb-3">Send Us Message</h4>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif leading-tight">
                  Get In Touch With Us
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-10">
                  Contact us today, and our experts will be happy to assist you in making the best decision for your solar energy needs!
                </p>

                {submitSuccess ? (
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-10 text-center">
                    <FaCheckCircle className="text-5xl text-[#8ab645] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600 mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
                    <button onClick={() => setSubmitSuccess(false)} className="text-[#8ab645] font-bold hover:underline">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm" placeholder="Your Name" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm" placeholder="Your Email" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm" placeholder="Phone Number" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
                        <input type="text" name="subject" required value={formData.subject} onChange={handleInputChange} className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm" placeholder="Subject" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                      <textarea name="message" required rows="5" value={formData.message} onChange={handleInputChange} className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm resize-none" placeholder="How can we help you?"></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-[#0a192f] text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-[#8ab645] shadow-[0_10px_20px_rgba(10,25,47,0.1)] hover:shadow-[0_10px_30px_rgba(138,182,69,0.3)] transition-all flex items-center justify-center gap-3 w-full md:w-auto"
                    >
                      {isSubmitting ? (
                        <>Processing <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /></>
                      ) : (
                        <>Send Message <FaPaperPlane /></>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
            
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactUs;