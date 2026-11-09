import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; // Apnar axios instance path onujayi fix kore neben
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaCheckCircle, 
  FaRegClock, 
  FaShieldAlt, 
  FaPaperPlane, 
  FaBoxOpen, 
  FaTags,
  FaBolt
} from 'react-icons/fa';

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  
  // Inquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Fetch Product Details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        // Response structure onujayi data set korun (e.g., response.data.data ba response.data)
        const prodData = response.data.data || response.data;
        setProduct(prodData);
        if (prodData.imageUrls && prodData.imageUrls.length > 0) {
          setActiveImage(prodData.imageUrls[0]);
        }
        setLoading(true); // temporary check
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  // Handle Inquiry Form Submit
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Apnar contact/inquiry API endpoint ekhane thakbe
      await axiosInstance.post('/contact', {
        ...formData,
        productName: product?.name,
        productId: product?._id
      });
      setSubmittedSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmittedSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Scroll to Inquiry Form Section
  const scrollToContact = () => {
    const contactSection = document.getElementById('inquiry-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#8ab645] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center text-white gap-4">
        <h2 className="text-2xl font-bold">Product not found!</h2>
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-[#8ab645] text-white rounded-xl font-semibold hover:opacity-90 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f17] text-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/60 hover:bg-gray-800 text-gray-300 hover:text-white transition mb-8 text-sm font-semibold border border-gray-700/50 backdrop-blur-md"
        >
          <FaArrowLeft /> Back to Products
        </button>

        {/* Top Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-gray-900/40 border border-gray-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
          
          {/* Image Gallery Column */}
          <div className="space-y-4">
            {/* Main Active Preview Image */}
            <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden bg-gray-950 border border-gray-800 flex items-center justify-center shadow-inner">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={activeImage || product.imageUrls?.[0] || 'https://via.placeholder.com/600'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-[#8ab645]/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center gap-1 shadow-lg">
                <FaBolt /> Premium Solar Tech
              </span>
            </div>

            {/* Thumbnail Selection Row */}
            {product.imageUrls && product.imageUrls.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.imageUrls.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === img ? 'border-[#8ab645] scale-105 shadow-md shadow-[#8ab645]/20' : 'border-gray-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Column */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8ab645]/10 text-[#8ab645] border border-[#8ab645]/20">
                  <FaTags className="text-[10px]" /> {product.category || 'Solar Solution'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FaBoxOpen className="text-[10px]" /> In Stock: {product.stock || 'Available'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="text-3xl font-black text-[#8ab645] mb-6 flex items-baseline gap-2">
                ৳ {product.price?.toLocaleString() || 'Contact for Price'}
                <span className="text-xs font-normal text-gray-400">VAT included</span>
              </div>

              {/* Description */}
              <div className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 bg-gray-950/40 p-4 rounded-2xl border border-gray-800/60">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Product Overview</h3>
                <p>{product.description || 'No description provided for this advanced solar product yet.'}</p>
              </div>

              {/* Key Features highlights */}
              <div className="grid grid-cols-2 gap-4 py-2 border-t border-b border-gray-800/80 my-6 text-xs text-gray-400 font-medium">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-[#8ab645] text-base" /> Official Warranty Support
                </div>
                <div className="flex items-center gap-2">
                  <FaRegClock className="text-[#8ab645] text-base" /> High Efficiency Output
                </div>
              </div>
            </div>

            {/* Action CTA Button -> Smooth scroll to query/contact form */}
            <div className="pt-2">
              <button
                onClick={scrollToContact}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#8ab645] to-[#76a03a] hover:from-[#7cbe3a] hover:to-[#689132] text-white font-bold rounded-2xl shadow-lg shadow-[#8ab645]/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 text-base"
              >
                <FaPaperPlane /> Enquire / Request Quote for This Product
              </button>
            </div>

          </div>

        </div>

        {/* Inquiry / Contact Form Section */}
        <div id="inquiry-section" className="mt-16 max-w-3xl mx-auto bg-gray-900/50 border border-gray-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8ab645]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Interested in <span className="text-[#8ab645]">{product.name}</span>?</h2>
            <p className="text-gray-400 text-sm">Fill out the quick inquiry form below and our expert team will contact you shortly.</p>
          </div>

          {submittedSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium flex items-center gap-3"
            >
              <FaCheckCircle className="text-lg flex-shrink-0" />
              <span>Thank you! Your inquiry has been successfully sent. We will reach out to you soon.</span>
            </motion.div>
          )}

          <form onSubmit={handleInquirySubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#8ab645] transition text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#8ab645] transition text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+880 1XXXXXXXXX"
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#8ab645] transition text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Your Message / Requirements</label>
              <textarea 
                rows="4"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your specific requirements or queries regarding this product..."
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#8ab645] transition text-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-[#8ab645] hover:bg-[#7ba43c] text-white font-bold rounded-xl shadow-lg shadow-[#8ab645]/20 transition flex items-center justify-center gap-2 text-base disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Submitting Inquiry...' : <> <FaPaperPlane /> Send Inquiry Now </>}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

DetailsPage.jsx
export default DetailsPage;