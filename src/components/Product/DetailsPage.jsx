import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'; 
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
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        const prodData = response.data.data || response.data;
        setProduct(prodData);
        if (prodData.imageUrls && prodData.imageUrls.length > 0) {
          setActiveImage(prodData.imageUrls[0]);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const customizedMessage = `Product Inquiry: ${product?.name} (ID: ${product?._id})\n\nCustomer Message:\n${formData.message}`;

      await axiosInstance.post('/contact', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: customizedMessage 
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

  const scrollToContact = () => {
    const contactSection = document.getElementById('inquiry-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center text-gray-800">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#8ab645] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-center text-gray-800 gap-4">
        <h2 className="text-2xl font-bold">Product not found!</h2>
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-[#8ab645] text-white rounded-xl font-semibold hover:bg-[#7ba43c] transition shadow-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] text-gray-800 py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#8ab645] selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-600 hover:text-[#8ab645] transition mb-8 text-sm font-bold border border-gray-200 shadow-sm"
        >
          <FaArrowLeft /> Back to Products
        </button>

        {/* Top Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white border border-gray-100 rounded-[2rem] p-6 sm:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
          
          {/* Image Gallery Column */}
          <div className="space-y-4">
            <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={activeImage || product.imageUrls?.[0] || product.image || 'https://via.placeholder.com/600'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-white/90 text-[#8ab645] text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center gap-1 shadow-sm border border-gray-100">
                <FaBolt /> Premium Solar Tech
              </span>
            </div>

            {product.imageUrls && product.imageUrls.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.imageUrls.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === img ? 'border-[#8ab645] scale-105 shadow-md shadow-[#8ab645]/20' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#8ab645]/10 text-[#769e39] border border-[#8ab645]/20 uppercase tracking-wider">
                  <FaTags className="text-[10px]" /> {product.category?.name || 'Solar Solution'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wider">
                  <FaBoxOpen className="text-[10px]" /> In Stock: {product.stock || 'Available'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6 font-serif">
                {product.name}
              </h1>

              {/* Description */}
              {product.description && (
                <div className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <h3 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                    Product Overview
                  </h3>
                  <p>{product.description}</p>
                </div>
              )}

              {/* 🔥 Key Features Section (Dynamic from Admin panel) */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FaShieldAlt className="text-[#8ab645]" /> Key Features
                  </h3>
                  <ul className="grid grid-cols-1 gap-3 text-sm text-gray-700 font-medium">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-[#8ab645]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-[#8ab645]"></div>
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action CTA Button */}
            <div className="pt-2">
              <button
                onClick={scrollToContact}
                className="w-full py-4 px-6 bg-gray-900 hover:bg-[#8ab645] text-white font-bold rounded-2xl shadow-[0_10px_20px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_20px_-10px_rgba(138,182,69,0.4)] transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 text-base"
              >
                <FaPaperPlane /> Request Quote / Inquiry
              </button>
            </div>

          </div>

        </div>

        {/* Inquiry / Contact Form Section */}
        <div id="inquiry-section" className="mt-16 max-w-3xl mx-auto bg-white border border-gray-100 rounded-[2rem] p-6 sm:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] relative overflow-hidden">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Interested in <span className="text-[#8ab645]">{product.name}</span>?</h2>
            <p className="text-gray-500 text-sm font-medium">Fill out the quick inquiry form below and our expert team will contact you shortly.</p>
          </div>

          {submittedSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold flex items-center gap-3"
            >
              <FaCheckCircle className="text-xl flex-shrink-0" />
              <span>Thank you! Your inquiry has been successfully sent. We will reach out to you soon.</span>
            </motion.div>
          )}

          <form onSubmit={handleInquirySubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8ab645] focus:ring-1 focus:ring-[#8ab645] transition text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8ab645] focus:ring-1 focus:ring-[#8ab645] transition text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Phone Number</label>
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+880 1XXXXXXXXX"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8ab645] focus:ring-1 focus:ring-[#8ab645] transition text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Your Message / Requirements</label>
              <textarea 
                rows="4"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your specific requirements or queries regarding this product..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8ab645] focus:ring-1 focus:ring-[#8ab645] transition text-sm font-medium resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-[#8ab645] hover:bg-[#7ba43c] text-white font-bold rounded-xl shadow-[0_10px_20px_-10px_rgba(138,182,69,0.5)] transition-all duration-300 flex items-center justify-center gap-2 text-base disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Submitting Inquiry...' : <> <FaPaperPlane /> Send Inquiry Now </>}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default DetailsPage;