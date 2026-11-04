import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiMail } from 'react-icons/fi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Prothom FAQ ta open thakbe

  // FAQ Data (Orbed er context onujayi)
  const faqData = [
    {
      question: "What type of solar solutions do you provide?",
      answer: "We offer comprehensive end-to-end solar solutions including Residential rooftops, Industrial energy systems, Commercial EPC, Solar Street Lights, and Solar Water Pumps."
    },
    {
      question: "What is the lifespan of your solar panels?",
      answer: "Our premium solar panels come with a 100% authenticity guarantee and are designed to ensure reliable performance over a 25+ year lifespan with regular servicing."
    },
    {
      question: "Do you provide after-sales maintenance?",
      answer: "Yes, we provide dedicated after-sales support and constant maintenance services to keep your solar systems efficient and running smoothly for long-term operations."
    },
    {
      question: "Are your solar components authentic?",
      answer: "Absolutely. We ensure direct factory imports from leading global manufacturers like HUAWEI, Jinko Solar, and LONGi Solar, providing a 100% authenticity guarantee with individual barcode tracking."
    },
    {
      question: "How can I get a quotation for my factory?",
      answer: "You can click on the 'Get Appointment' button on our navbar or contact us directly via phone or email. Our engineers will visit, assess your needs, and provide a customized system design."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-8 bg-gray-50 relative font-sans">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left Side: Heading & Contact Info */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32 h-fit">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-[#8ab645]" />
            <h4 className="text-[#8ab645] font-bold text-sm tracking-widest uppercase">
              F.A.Q
            </h4>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif leading-tight">
            Frequently <br /> Asked Questions
          </h2>
          
          <p className="text-gray-500 mb-10 leading-relaxed">
            Find answers to common questions about our solar solutions, installation process, and maintenance services.
          </p>

          {/* Contact Support Box */}
          <div className="bg-white p-8 rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.03)] border border-gray-100">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <FiMail className="text-[#8ab645] text-xl" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h4>
            <p className="text-gray-500 text-sm mb-6">
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <button className="w-full py-3 px-6 bg-[#8ab645] hover:bg-[#7ebd34] text-white font-bold rounded-lg transition-colors duration-300">
              Contact Us
            </button>
          </div>
        </div>

        {/* Right Side: Accordion */}
        <div className="w-full lg:w-2/3">
          <div className="flex flex-col gap-4">
            {faqData.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`border ${isActive ? 'border-[#8ab645] bg-white shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'} rounded-2xl overflow-hidden transition-all duration-300`}
                >
                  {/* Question Header */}
                  <button 
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
                  >
                    <h3 className={`text-lg md:text-xl font-bold pr-8 transition-colors duration-300 ${isActive ? 'text-[#8ab645]' : 'text-gray-900 group-hover:text-[#8ab645]'}`}>
                      {faq.question}
                    </h3>
                    
                    {/* Animated Plus/Minus Icon */}
                    <motion.div 
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-[#8ab645] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-green-50 group-hover:text-[#8ab645]'}`}
                    >
                      {isActive ? <FiMinus size={20} /> : <FiPlus size={20} />}
                    </motion.div>
                  </button>

                  {/* Answer Body with Smooth Height Animation */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="px-6 md:px-8 pb-8 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                          <div className="pt-4">
                            {faq.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;