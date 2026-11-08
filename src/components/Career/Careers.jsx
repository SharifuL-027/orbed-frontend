import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaClock, 
  FaPaperPlane, 
  FaCloudUploadAlt,
  FaCheckCircle
} from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';
// import axiosInstance from '../api/axiosInstance'; // Future backend connect er jonno

const Careers = () => {
  // Animations
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  // Demo Jobs Data (Apnar data ekhane bosaben)
  const openPositions = [
    { id: 1, title: "Solar Site Engineer", type: "Full-Time", location: "Dhaka, Bangladesh", deadline: "Dec 30, 2026" },
    { id: 2, title: "Project Manager (EPC)", type: "Contract", location: "Chattogram, Bangladesh", deadline: "Jan 15, 2027" },
    { id: 3, title: "Sales Executive", type: "Full-Time", location: "Remote / Dhaka", deadline: "Nov 30, 2026" }
  ];

  // Form State Management (Admin panel er jonno ready)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    cv: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, cv: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🔥 Admin Panel er jonno FormData toiri kora (Jate file upload hoy)
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('position', formData.position);
    submitData.append('message', formData.message);
    if (formData.cv) {
      submitData.append('cv', formData.cv);
    }

    try {
      // Future Backend Call Example:
      // await axiosInstance.post('/api/careers/apply', submitData, { headers: { 'Content-Type': 'multipart/form-data' }});
      
      // Simulation for now
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', position: '', message: '', cv: null });
      }, 1500);
    } catch (error) {
      console.error("Application submission failed:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full font-sans bg-white selection:bg-[#8ab645] selection:text-white">
      
      {/* --- 100% PERFECT FIXED Parallax Hero Section --- */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f16]/90 via-[#0a0f16]/60 to-[#0a0f16]/90" />
        </div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-[2px] bg-[#8ab645]" />
            <h4 className="text-[#8ab645] font-bold text-xs tracking-[0.25em] uppercase">Join Our Team</h4>
            <div className="w-8 h-[2px] bg-[#8ab645]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-6xl font-bold text-white font-serif leading-[1.2] mb-6"
          >
            Build Your Career With <span className="text-[#8ab645]">Orbed Green Energy</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto"
          >
            Be part of a sustainable future. We are always looking for passionate individuals to drive energy independence.
          </motion.p>
        </div>
      </section>

      {/* --- Main Content Wrapper (Sliding over fixed hero) --- */}
      <div className="relative z-10 bg-[#fafaf9] rounded-t-[3rem] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] pt-20 pb-24">
        
        {/* Why Join Us Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24 text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-12">
            Why Work With Us?
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Innovative Projects", desc: "Work on cutting-edge solar technologies and large-scale EPC projects." },
              { title: "Career Growth", desc: "Continuous learning, mentorship, and opportunities to lead teams." },
              { title: "Sustainable Impact", desc: "Contribute directly to a greener economy and reduce carbon footprints." }
            ].map((perk, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#8ab645] mb-6 mx-auto">
                  <BsLightningChargeFill size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{perk.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Current Openings */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-12 text-center">
            Current Openings
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {openPositions.map((job) => (
              <motion.div key={job.id} variants={fadeUp} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#8ab645]/30 transition-all duration-300 group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#8ab645] transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5"><FaBriefcase className="text-[#8ab645]" /> {job.type}</span>
                    <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-[#8ab645]" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><FaClock className="text-[#8ab645]" /> {job.deadline}</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setFormData({...formData, position: job.title});
                    document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#fafaf9] group-hover:bg-[#8ab645] text-gray-800 group-hover:text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all border border-gray-200 group-hover:border-transparent whitespace-nowrap"
                >
                  Apply Now
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dynamic Application Form Section */}
        <div id="application-form" className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            
            {/* Form Left Side / Info */}
            <div className="w-full md:w-2/5 bg-gradient-to-br from-[#061325] to-[#0a192f] p-10 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8ab645] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
              <h3 className="text-3xl font-bold mb-4 font-serif relative z-10">Submit Your Application</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 relative z-10">
                Ready to make an impact? Fill out the form, upload your updated CV, and our HR team will get back to you shortly.
              </p>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <FaCheckCircle className="text-[#8ab645]" /> Fast Processing
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <FaCheckCircle className="text-[#8ab645]" /> Equal Opportunity
                </div>
              </div>
            </div>

            {/* Form Right Side */}
            <div className="w-full md:w-3/5 p-10 md:p-12">
              {submitSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-[#8ab645] mb-6">
                    <FaPaperPlane size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Sent!</h3>
                  <p className="text-gray-500 mb-6">Thank you for your interest. We will review your profile and contact you soon.</p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="text-[#8ab645] font-bold hover:underline"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number *</label>
                      <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm" placeholder="+880 1..." />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Applying For *</label>
                      <select name="position" required value={formData.position} onChange={handleInputChange} className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm text-gray-700">
                        <option value="">Select a position</option>
                        {openPositions.map(job => (
                          <option key={job.id} value={job.title}>{job.title}</option>
                        ))}
                        <option value="General Application">General Application</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Cover Letter / Message</label>
                    <textarea name="message" rows="3" value={formData.message} onChange={handleInputChange} className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm resize-none" placeholder="Tell us why you're a great fit..."></textarea>
                  </div>

                  {/* Document Upload Area */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Upload CV / Resume (PDF, DOCX) *</label>
                    <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center hover:border-[#8ab645] transition-colors bg-[#fafaf9] group">
                      <input 
                        type="file" 
                        name="cv" 
                        required 
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      />
                      <FaCloudUploadAlt className="text-3xl text-gray-400 group-hover:text-[#8ab645] mb-2 transition-colors" />
                      <p className="text-sm font-semibold text-gray-700">
                        {formData.cv ? <span className="text-[#8ab645]">{formData.cv.name}</span> : "Drag & drop or click to browse"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Max file size: 5MB</p>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#8ab645] text-white py-3.5 rounded-xl font-bold text-base hover:bg-[#7a9d3d] shadow-[0_10px_20px_rgba(138,182,69,0.2)] hover:shadow-[0_10px_30px_rgba(138,182,69,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">Processing <FaClock className="animate-spin" /></span>
                    ) : (
                      <span className="flex items-center gap-2">Submit Application <FaPaperPlane /></span>
                    )}
                  </button>
                </form>
              )}
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Careers;