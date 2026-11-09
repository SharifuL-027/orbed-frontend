import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBriefcase, 
  FaPaperPlane, 
  FaCloudUploadAlt,
  FaCheckCircle,
  FaAward,
  FaBookOpen,
  FaHandsHelping,
  FaChalkboardTeacher,
  FaUserTie,
  FaArrowRight,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';
import axiosInstance from '../../api/axiosInstance'; 

const Careers = () => {
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

  // Jobs Data
  const openPositions = [
    { id: 1, title: "Project Manager", type: "Full-Time", location: "Dhaka, Bangladesh" },
    { id: 2, title: "Solar Engineer", type: "Full-Time", location: "Bangladesh" }
  ];

  // Growth Perks
  const growthPerks = [
    { title: "Performance Recognition", icon: FaAward },
    { title: "Learning Opportunities", icon: FaBookOpen },
    { title: "Hands-on Experience", icon: FaHandsHelping },
    { title: "Training & Workshops", icon: FaChalkboardTeacher },
    { title: "Mentorship Programs", icon: FaUserTie }
  ];

  // Form State Management
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

  // 🔥 Fully Dynamic Submission with FormData (for CV/Document file upload)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('position', formData.position);
    submitData.append('message', formData.message);
    if (formData.cv) {
      submitData.append('cv', formData.cv); // File attachment
    }

    try {
      // Backend API call to save application and file in MongoDB / Server storage
      const response = await axiosInstance.post('/careers', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', position: '', message: '', cv: null });
      }
    } catch (error) {
      console.error("Application submission failed:", error);
      alert("Failed to submit application. Please try again.");
      setIsSubmitting(false);
    }
  };

  const scrollToForm = (positionTitle) => {
    setFormData(prev => ({ ...prev, position: positionTitle }));
    document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full selection:bg-[#8ab645] selection:text-white pb-24">
      
      {/* --- 100% PERFECT FIXED Parallax Hero Section --- */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        <div className="fixed top-0 left-0 w-full h-screen z-[-1]">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https\://res.cloudinary.com/dsrs8hryx/image/upload/q_auto,f_auto/v1794207752/Solar_panels_reflecting_sun_1ffa0567_2K_kdrgyu.jpg')` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0f16]/90 via-[#0a0f16]/60 to-[#0a0f16]/90" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mt-16">
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="text-3xl md:text-4xl dm-sans-bold text-white font-serif leading-[1.2] mb-6"
          >
            Join the Orbed Green Energy Ltd. Team and Power a Greener Future!
          </motion.h1>
        
        </div>
      </section>

      {/* --- Section 1: Career Growth & Development --- */}
      <section className="relative z-10 bg-[#fafaf9] rounded-t-[3rem] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] py-24 px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
            <h2 className="text-3xl md:text-4xl dm-sans-bold text-gray-900 mb-4">Career Growth & Development</h2>
            <p className="text-gray-600 sans-medium max-w-2xl mx-auto">We believe in empowering our team to grow both professionally and personally.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {growthPerks.map((perk, index) => {
              const Icon = perk.icon;
              return (
                <motion.div key={index} variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow duration-300 group">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-[#8ab645] mb-4 group-hover:bg-[#8ab645] group-hover:text-white transition-colors duration-300">
                    <Icon size={24} />
                  </div>
                  <h4 className="text-sm dm-sans-bold text-gray-900 leading-tight">{perk.title}</h4>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* --- Section 2: Why Join Us --- */}
      <section className="py-24 px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#8ab645]"></span>
                <span className="text-[#8ab645] dm-sans-bold text-xs uppercase tracking-widest">About Orbed</span>
              </div>
              <h2 className="text-3xl md:text-5xl dm-sans-bold text-gray-900 mb-6 font-serif leading-tight">
                Why Join Us
              </h2>
              <p className="text-gray-600 sans-medium text-justify text-lg leading-relaxed mb-8">
                At Orbed Green Energy Limited, we believe in building a cleaner, greener and more sustainable future through renewable energy. Together, let’s create sustainable solutions that empower communities and protect our planet.
              </p>
              <button onClick={() => document.getElementById('jobs-section').scrollIntoView({ behavior: 'smooth' })} className="bg-[#0a192f] text-white px-8 py-3.5 rounded-full dm-sans-bold hover:bg-[#8ab645] transition-colors duration-300">
                View Openings
              </button>
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <img src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800" alt="Solar Team" className="w-full h-auto object-cover rounded-3xl shadow-2xl" />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-[#8ab645]">
                  <BsLightningChargeFill size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 sans-medium text-lg">Sustainable</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Future Focus</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Section 3: Equal Opportunity --- */}
      <section className="py-24 px-6 lg:px-8 bg-[#cde4bf] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative">
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1668097613572-40b7c11c8727?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" alt="Team Diversity" className="w-full h-64 object-cover rounded-3xl mt-8 shadow-lg" />
                <img src="https://images.unsplash.com/photo-1726221062287-fda475b85493?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" alt="Professional Workplace" className="w-full h-64 object-cover rounded-3xl shadow-lg" />
              </div>
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl text-gray-900 mb-6 dm-sans-bold leading-tight">
                Equal Opportunity Employer
              </h2>
              <p className="text-gray-600 sans-medium text-justify text-lg leading-relaxed mb-6">
                We are an Equal Opportunity Employer and are committed to creating an inclusive and diverse workplace. All employment decisions are based on merit, qualifications, and business needs, without discrimination on the basis of race, color, religion, gender, age, disability, marital status, or any other legally protected characteristic.
              </p>
              <p className="text-gray-600 text-lg font-semibold">
                We encourage candidates from all backgrounds to apply and grow with us.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Section 4: Explore Career Opportunities --- */}
      <section id="jobs-section" className="py-24 px-6 lg:px-8 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-[#8ab645] dm-sans-bold text-sm tracking-[0.2em] uppercase mb-4">Open Positions</h4>
            <h2 className="text-3xl md:text-5xl dm-sans-bold text-gray-900 font-serif mb-6">Explore Career Opportunities</h2>
            <p className="text-gray-700 sans-medium">
              Design tailored energy plans, deliver clear solar insights, and grow your skills through challenging, rewarding career opportunities.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {openPositions.map((job) => (
              <motion.div key={job.id} variants={fadeUp} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-[#8ab645]/30 transition-all duration-300 flex flex-col group">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif group-hover:text-[#8ab645] transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-2"><FaBriefcase className="text-[#8ab645] dm-sans-bold" /> {job.type}</span>
                    <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-[#8ab645] dm-sans-bold" /> {job.location}</span>
                  </div>
                </div>
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <button 
                    onClick={() => scrollToForm(job.title)}
                    className="w-full flex items-center justify-between text-gray-800 font-bold group-hover:text-[#8ab645] transition-colors"
                  >
                    Apply Now
                    <span className="w-10 h-10 rounded-full bg-[#f4f9f1] flex items-center justify-center group-hover:bg-[#8ab645] group-hover:text-white transition-colors duration-300">
                      <FaArrowRight size={14} />
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Section 5: Dynamic Application Form Section --- */}
      <section className="py-24 px-6 lg:px-8 bg-[#0a192f] relative z-10">
        <div id="application-form" className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            
            {/* Form Left Side / Info */}
            <div className="w-full md:w-2/5 bg-gradient-to-br from-[#8ab645] to-[#6b8e34] p-10 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
              <h3 className="text-3xl dm-sans-bold mb-4 relative z-10">Submit Your Application</h3>
              <p className="text-white/90 text-sm sans-medium text-justify leading-relaxed mb-8 relative z-10">
                Ready to make an impact? Fill out the form, upload your updated CV, and our HR team will get back to you shortly.
              </p>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <FaCheckCircle className="text-white" /> Fast Processing
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <FaCheckCircle className="text-white" /> Equal Opportunity
                </div>
              </div>
            </div>

            {/* Form Right Side */}
            <div className="w-full md:w-3/5 p-10 md:p-12 bg-white">
              {submitSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-[#8ab645] mb-6">
                    <FaPaperPlane size={32} />
                  </div>
                  <h3 className="text-2xl dm-sans-bold text-gray-900 mb-2">Application Sent!</h3>
                  <p className="text-gray-500 mb-6">Thank you for your interest. We will review your profile and contact you soon.</p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="text-[#8ab645] dm-sans-bold hover:underline"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-[#fafaf9] border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645]/50 focus:border-[#8ab645] transition-all text-sm" placeholder="name@example.com" />
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
                    className="w-full bg-[#0a192f] text-white py-3.5 rounded-xl font-bold text-base hover:bg-[#8ab645] shadow-[0_10px_20px_rgba(10,25,47,0.2)] hover:shadow-[0_10px_30px_rgba(138,182,69,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">Processing <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /></span>
                    ) : (
                      <span className="flex items-center gap-2">Submit Application <FaPaperPlane /></span>
                    )}
                  </button>
                </form>
              )}
            </div>

          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Careers;