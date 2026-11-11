import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance'; 
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaCheckCircle, 
  FaShieldAlt, 
  FaPaperPlane, 
  FaBoxOpen, 
  FaTags,
  FaBolt,
  FaRegPaperPlane
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

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center text-gray-800">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-[5px] border-[#8ab645] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold tracking-wide">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!product) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-center text-gray-800 gap-5">
        <FaBoxOpen className="text-6xl text-gray-300" />
        <h2 className="text-2xl font-bold font-serif text-gray-700">Product not found!</h2>
        <button 
          onClick={() => navigate(-1)}
          className="px-8 py-3 bg-[#8ab645] text-white rounded-xl font-bold hover:bg-[#7ba43c] transition shadow-[0_10px_20px_-10px_rgba(138,182,69,0.5)] flex items-center gap-2"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-34 pb-20 bg-[#fafaf9] text-gray-800 px-4 sm:px-6 lg:px-8 selection:bg-[#8ab645] selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-600 hover:text-[#8ab645] transition-all mb-8 text-sm font-bold border border-gray-200 shadow-sm hover:shadow-md"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Products
        </button>

        {/* --- Product Hero Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-gray-100 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          
          {/* Image Gallery Column (5/12 width) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* 🔥 Fixed 4:5 Aspect Ratio Image Container */}
            <div className="relative aspect-[4/5] w-full rounded-none overflow-hidden bg-[#f4f7f0] border border-gray-100 flex items-center justify-center group">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={activeImage || product.imageUrls?.[0] || product.image || 'https://via.placeholder.com/800x1000'} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-white/95 text-[#8ab645] text-xs font-extrabold px-3.5 py-2 rounded-xl backdrop-blur-md flex items-center gap-2 shadow-sm border border-gray-100 uppercase tracking-wide">
                <FaBolt /> Premium Tech
              </span>
            </div>

            {/* Thumbnail Navigation */}
            {product.imageUrls && product.imageUrls.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide mt-2">
                {product.imageUrls.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-[3px] transition-all flex-shrink-0 cursor-pointer ${
                      activeImage === img 
                        ? 'border-[#8ab645] scale-105 shadow-[0_4px_12px_rgba(138,182,69,0.3)]' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded-xl" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Column (7/12 width) */}
          <div className="lg:col-span-7 flex flex-col h-full lg:pl-6">
            <div className="grow">
              
              {/* Category & Stock Badges */}
              

              {/* Product Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 font-serif leading-[1.15]">
                {product.name}
              </h1>

              {/* Product Description */}
              {product.description && (
                <div className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                  <p className='font-medium text-justify opacity-90'>{product.description}</p>
                </div>
              )}

              {/* Key Features Section */}
              {product.features && product.features.length > 0 && (
                <div className="mb-10 bg-gray-50/80 rounded-3xl p-6 sm:p-8 border border-gray-100">
                  <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                    <FaShieldAlt className="text-[#8ab645] text-lg" /> Key Features
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm text-gray-700 font-medium">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-[#8ab645]/15 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-[#8ab645]"></div>
                        </div>
                        <span className="leading-relaxed opacity-90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action CTA Button */}
            <div className="pt-4 border-t border-gray-100 mt-auto">
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto px-10 py-4 bg-gray-900 hover:bg-[#8ab645] text-white font-bold rounded-2xl shadow-[0_10px_20px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_10px_30px_-10px_rgba(138,182,69,0.5)] transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3 text-base"
              >
                <FaRegPaperPlane className="text-lg" /> Request Quote / Inquiry
              </button>
            </div>

          </div>
        </div>

        {/* --- Inquiry Form Section --- */}
        <div id="inquiry-section" className="mt-16 lg:mt-24 max-w-4xl mx-auto bg-white border border-gray-100 rounded-[2.5rem] p-6 sm:p-10 lg:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 font-serif">Interested in <span className="text-[#8ab645]">{product.name}</span>?</h2>
            <p className="text-gray-500 text-base font-medium max-w-lg mx-auto">Fill out the quick inquiry form below and our expert team will contact you shortly.</p>
          </div>

          {submittedSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-5 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold flex items-center gap-3 shadow-sm"
            >
              <FaCheckCircle className="text-2xl flex-shrink-0" />
              <span>Thank you! Your inquiry has been successfully sent. We will reach out to you soon.</span>
            </motion.div>
          )}

          <form onSubmit={handleInquirySubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2.5">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full bg-[#f8faf6] border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8ab645] focus:bg-white focus:ring-4 focus:ring-[#8ab645]/10 transition-all text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2.5">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-[#f8faf6] border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8ab645] focus:bg-white focus:ring-4 focus:ring-[#8ab645]/10 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2.5">Phone Number</label>
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+880 1XXXXXXXXX"
                className="w-full bg-[#f8faf6] border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8ab645] focus:bg-white focus:ring-4 focus:ring-[#8ab645]/10 transition-all text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2.5">Your Message / Requirements</label>
              <textarea 
                rows="5"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your specific requirements or queries regarding this product..."
                className="w-full bg-[#f8faf6] border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#8ab645] focus:bg-white focus:ring-4 focus:ring-[#8ab645]/10 transition-all text-sm font-medium resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-[#8ab645] to-[#7ba43c] hover:from-[#7ba43c] hover:to-[#6a8f33] text-white font-bold rounded-2xl shadow-[0_10px_25px_-8px_rgba(138,182,69,0.6)] transition-all duration-300 flex items-center justify-center gap-2 text-[15px] tracking-wide disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.99] cursor-pointer"
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