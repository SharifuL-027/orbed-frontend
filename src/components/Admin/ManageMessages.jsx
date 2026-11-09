import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, 
  FaSpinner, 
  FaEye, 
  FaTrashAlt, 
  FaTimes, 
  FaPhone, 
  FaUser 
} from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);

  // Fetch Messages
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/contact'); // Apnar backend route onujayi adjust kore niben
      
      const msgArray = Array.isArray(res.data) 
        ? res.data 
        : (res.data.messages || res.data.data || []);
      
      setMessages(msgArray);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = selectedMsg ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedMsg]);

  // Delete Message
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axiosInstance.delete(`/contact/${id}`);
        fetchMessages();
      } catch (error) {
        console.error("Error deleting message:", error);
        alert("Failed to delete message.");
      }
    }
  };

  return (
    <div className="w-full pb-10 px-3 sm:px-0">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">Customer Messages</h1>
        <p className="text-gray-500 mt-2 text-xs sm:text-sm">Manage inquiries and feedback submitted through the Contact Us page.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-[#fafaf9] flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 shrink-0">
            <FaEnvelope size={18} />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Inbox</h3>
          {!loading && (
            <span className="ml-auto text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {messages.length}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <FaSpinner className="animate-spin text-[#8ab645] text-3xl sm:text-4xl mb-4" />
            <p className="text-gray-500 font-semibold text-sm">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <p className="text-gray-500 text-sm">No messages found.</p>
          </div>
        ) : (
          <>
            {/* Mobile: Card layout */}
            <ul className="md:hidden divide-y divide-gray-100">
              {messages.map((msg) => (
                <li key={msg._id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 font-bold text-gray-900">
                        <FaUser size={13} className="text-gray-400 shrink-0" />
                        <span className="truncate">{msg.name}</span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-gray-800 line-clamp-2 break-words">
                        {msg.subject}
                      </p>
                      <div className="mt-2 text-xs text-gray-600 space-y-0.5">
                        <div className="break-all">{msg.email}</div>
                        {msg.phone && (
                          <div className="flex items-center gap-1 text-gray-400">
                            <FaPhone size={10} /> {msg.phone}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => setSelectedMsg(msg)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2.5 rounded-lg transition-colors"
                        title="View Message"
                        aria-label="View Message"
                      >
                        <FaEye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2.5 rounded-lg transition-colors"
                        title="Delete"
                        aria-label="Delete Message"
                      >
                        <FaTrashAlt size={18} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Tablet & Desktop: Table layout */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold">Sender Name</th>
                    <th className="p-4 font-semibold">Subject</th>
                    <th className="p-4 font-semibold">Contact Info</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {messages.map((msg) => (
                    <tr key={msg._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-bold text-gray-900">
                        <div className="flex items-center gap-2">
                          <FaUser size={14} className="text-gray-400 shrink-0" />
                          <span className="truncate max-w-[10rem] lg:max-w-[14rem]">{msg.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-800 font-semibold">
                        <div className="truncate max-w-[10rem] lg:max-w-xs">{msg.subject}</div>
                      </td>
                      <td className="p-4 text-gray-600 text-sm">
                        <div className="truncate max-w-[12rem] lg:max-w-xs">{msg.email}</div>
                        <div className="text-xs text-gray-400">{msg.phone}</div>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <button 
                          onClick={() => setSelectedMsg(msg)}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-2"
                          title="View Message"
                          aria-label="View Message"
                        >
                          <FaEye size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(msg._id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          title="Delete"
                          aria-label="Delete Message"
                        >
                          <FaTrashAlt size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </motion.div>

      {/* Message Modal */}
      <AnimatePresence>
        {selectedMsg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMsg(null)}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.97 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-lg max-h-[90vh] flex flex-col rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100 bg-[#fafaf9] shrink-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-serif">Message Details</h3>
                <button
                  onClick={() => setSelectedMsg(null)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  aria-label="Close"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">From</span>
                  <p className="text-sm sm:text-base font-bold text-gray-900 break-words">
                    {selectedMsg.name} <span className="font-semibold text-gray-600 break-all">({selectedMsg.email})</span>
                  </p>
                  {selectedMsg.phone && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <FaPhone size={10} /> {selectedMsg.phone}
                    </p>
                  )}
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</span>
                  <p className="text-sm font-semibold text-[#8ab645] break-words">{selectedMsg.subject}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</span>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 sm:p-4 rounded-xl mt-1 leading-relaxed whitespace-pre-wrap break-words">
                    {selectedMsg.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-end p-4 sm:p-6 border-t border-gray-100 bg-[#fafaf9] shrink-0">
                <button 
                  onClick={() => setSelectedMsg(null)}
                  className="w-full sm:w-auto bg-gray-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-900 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageMessages;