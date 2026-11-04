import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Prothom ti open thakbe

  // Orbed er data onujayi FAQ
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
    <section className="py-24 px-8 bg-white relative font-sans overflow-hidden">
      
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-b from-[#8ab645]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-250 mx-auto relative z-10">
        
        {/* Centered Header Area */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#8ab645]" />
            <h4 className="text-[#8ab645] font-bold text-sm tracking-[0.2em] uppercase">
              Any Questions?
            </h4>
            <div className="w-8 h-[2px] bg-[#8ab645]" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Frequently Asked Questions
          </h2>
          
          <p className="text-gray-500 text-lg leading-relaxed">
            Find answers to common questions about our solar solutions, installation process, and maintenance services.
          </p>
        </motion.div>

        {/* Centered Accordion List */}
        <div className="flex flex-col gap-4">
          {faqData.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`bg-white rounded-2xl transition-all duration-500 ${
                  isActive 
                    ? 'shadow-[0_15px_40px_rgb(0,0,0,0.06)] border border-[#8ab645]/30' 
                    : 'shadow-sm border border-gray-100 hover:shadow-[0_8px_25px_rgb(0,0,0,0.04)] hover:border-gray-200'
                }`}
              >
                {/* Question Header */}
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 md:px-8 md:py-6 text-left focus:outline-none group"
                >
                  <h3 className={`text-lg md:text-xl font-bold pr-8 transition-colors duration-300 ${
                    isActive ? 'text-[#8ab645]' : 'text-gray-800 group-hover:text-[#8ab645]'
                  }`}>
                    {faq.question}
                  </h3>
                  
                  {/* Chevron Icon with Rotation */}
                  <motion.div 
                    animate={{ rotate: isActive ? -180 : 0 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isActive 
                        ? 'bg-[#8ab645] text-white' 
                        : 'bg-gray-50 text-gray-400 group-hover:bg-green-50 group-hover:text-[#8ab645]'
                    }`}
                  >
                    <FiChevronDown size={22} />
                  </motion.div>
                </button>

                {/* Answer Body */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 text-gray-600 leading-relaxed text-base md:text-lg">
                        <div className="pt-2 border-t border-gray-50">
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

        {/* Bottom Contact Prompt */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-500">
            Can't find what you're looking for?{' '}
            <a href="/contact" className="text-[#8ab645] font-bold hover:underline underline-offset-4 transition-all">
              Contact our support team
            </a>
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;