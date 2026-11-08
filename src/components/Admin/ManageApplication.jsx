import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUserTie, 
  FaSpinner, 
  FaFileDownload, 
  FaEye, 
  FaTrashAlt, 
  FaTimes, 
  FaEnvelope, 
  FaPhone, 
  FaBriefcase 
} from 'react-icons/fa';
import axiosInstance from '../../api/axiosInstance';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null); // Detail modal er jonno

  // Fetch Job Applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/careers'); // Apnar backend route onujayi adjust kore niben
      
      const appsArray = Array.isArray(res.data) 
        ? res.data 
        : (res.data.applications || res.data.data || []);
      
      setApplications(appsArray);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Delete Application
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await axiosInstance.delete(`/careers/${id}`);
        fetchApplications();
      } catch (error) {
        console.error("Error deleting application:", error);
        alert("Failed to delete application.");
      }
    }
  };

  return (
    <div className="w-full pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-serif">Job Applications</h1>
        <p className="text-gray-500 mt-2 text-sm">Review candidate profiles, contact details, and uploaded CVs.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 bg-[#fafaf9] flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-[#8ab645]">
            <FaUserTie size={18} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Received Applications</h3>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-[#8ab645] text-4xl mb-4" />
            <p className="text-gray-500 font-semibold text-sm">Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No job applications found yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Candidate Name</th>
                  <th className="p-4 font-semibold">Position</th>
                  <th className="p-4 font-semibold">Email & Phone</th>
                  <th className="p-4 font-semibold">CV / Resume</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-900">{app.name}</td>
                    <td className="p-4 text-gray-700 font-semibold">
                      <span className="bg-green-50 text-[#8ab645] px-3 py-1 rounded-full text-xs">
                        {app.position}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                      <div className="flex items-center gap-2"><FaEnvelope size={12} className="text-gray-400" /> {app.email}</div>
                      <div className="flex items-center gap-2 mt-1"><FaPhone size={12} className="text-gray-400" /> {app.phone}</div>
                    </td>
                    <td className="p-4">
                      {app.cv ? (
                        <a 
                          href={app.cv} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-2 bg-gray-100 hover:bg-[#8ab645] hover:text-white text-gray-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                        >
                          <FaFileDownload /> Download CV
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">No file</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setSelectedApp(app)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-2"
                        title="View Details"
                      >
                        <FaEye size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(app._id)}
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

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#fafaf9]">
                <h3 className="text-xl font-bold text-gray-900 font-serif">Candidate Details</h3>
                <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</span>
                  <p className="text-lg font-bold text-gray-900">{selectedApp.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</span>
                    <p className="text-sm font-semibold text-gray-700">{selectedApp.email}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</span>
                    <p className="text-sm font-semibold text-gray-700">{selectedApp.phone}</p>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Applied Position</span>
                  <p className="text-sm font-bold text-[#8ab645]">{selectedApp.position}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Cover Letter / Message</span>
                  <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl mt-1 leading-relaxed">
                    {selectedApp.message || 'No message provided.'}
                  </p>
                </div>
              </div>

              <div className="flex justify-end p-6 border-t border-gray-100 bg-[#fafaf9]">
                <button 
                  onClick={() => setSelectedApp(null)}
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

export default ManageApplications;