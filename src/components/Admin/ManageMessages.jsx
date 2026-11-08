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
    <div className="w-full pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-serif">Customer Messages</h1>
        <p className="text-gray-500 mt-2 text-sm">Manage inquiries and feedback submitted through the Contact Us page.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 bg-[#fafaf9] flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
            <FaEnvelope size={18} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Inbox</h3>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-[#8ab645] text-4xl mb-4" />
            <p className="text-gray-500 font-semibold text-sm">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No messages found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
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
                    <td className="p-4 font-bold text-gray-900 flex items-center gap-2">
                      <FaUser size={14} className="text-gray-400" /> {msg.name}
                    </td>
                    <td className="p-4 text-gray-800 font-semibold truncate max-w-xs">{msg.subject}</td>
                    <td className="p-4 text-gray-600 text-sm">
                      <div>{msg.email}</div>
                      <div className="text-xs text-gray-400">{msg.phone}</div>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setSelectedMsg(msg)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-2"
                        title="View Message"
                      >
                        <FaEye size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(msg._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrashAlt size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Message Modal */}
      <AnimatePresence>
        {selectedMsg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#fafaf9]">
                <h3 className="text-xl font-bold text-gray-900 font-serif">Message Details</h3>
                <button onClick={() => setSelectedMsg(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">From</span>
                  <p className="text-base font-bold text-gray-900">{selectedMsg.name} ({selectedMsg.email})</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</span>
                  <p className="text-sm font-semibold text-[#8ab645]">{selectedMsg.subject}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</span>
                  <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl mt-1 leading-relaxed whitespace-pre-wrap">
                    {selectedMsg.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-end p-6 border-t border-gray-100 bg-[#fafaf9]">
                <button 
                  onClick={() => setSelectedMsg(null)}
                  className="bg-gray-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-900 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageMessages;