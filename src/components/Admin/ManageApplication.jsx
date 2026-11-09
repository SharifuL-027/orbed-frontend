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
  FaPhone 
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

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = selectedApp ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedApp]);

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

  const cvUrl = (app) => `${import.meta.env.VITE_API_BASE_URL}/${app.cv}`;

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">Job Applications</h1>
        <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm">Review candidate profiles, contact details, and uploaded CVs.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-[#fafaf9] flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-50 rounded-full flex items-center justify-center text-[#8ab645] flex-shrink-0">
            <FaUserTie size={16} className="sm:text-lg" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Received Applications</h3>
          {!loading && (
            <span className="ml-auto text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {applications.length}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4">
            <FaSpinner className="animate-spin text-[#8ab645] text-3xl sm:text-4xl mb-4" />
            <p className="text-gray-500 font-semibold text-xs sm:text-sm">Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-16 sm:py-20 px-4">
            <p className="text-gray-500 text-sm">No job applications found yet.</p>
          </div>
        ) : (
          <>
            {/* Mobile: Card layout */}
            <ul className="md:hidden divide-y divide-gray-100">
              {applications.map((app) => (
                <li key={app._id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 truncate">{app.name}</p>
                      <span className="mt-1.5 bg-green-50 text-[#8ab645] px-2.5 py-1 rounded-full text-[11px] font-semibold inline-block max-w-full truncate">
                        {app.position}
                      </span>
                      <div className="mt-3 text-xs text-gray-600 space-y-1">
                        <div className="flex items-start gap-1.5 break-all">
                          <FaEnvelope size={11} className="text-gray-400 flex-shrink-0 mt-0.5" /> {app.email}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FaPhone size={11} className="text-gray-400 flex-shrink-0" /> {app.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2.5 rounded-lg transition-colors cursor-pointer"
                        title="View Details"
                        aria-label="View Details"
                      >
                        <FaEye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2.5 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                        aria-label="Delete Application"
                      >
                        <FaTrashAlt size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3">
                    {app.cv ? (
                      <a
                        href={cvUrl(app)}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-[#8ab645] hover:text-white text-gray-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors w-full"
                      >
                        <FaFileDownload size={12} /> Download CV
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs">No file</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Tablet & Desktop: Table layout */}
            <div className="hidden md:block w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-semibold">Candidate Name</th>
                    <th className="p-4 font-semibold">Position</th>
                    <th className="p-4 font-semibold">Email & Phone</th>
                    <th className="p-4 font-semibold">CV / Resume</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-bold text-gray-900">
                        <div className="truncate max-w-[9rem] lg:max-w-[14rem]">{app.name}</div>
                      </td>
                      <td className="p-4 text-gray-700 font-semibold">
                        <span className="bg-green-50 text-[#8ab645] px-3 py-1 rounded-full text-xs inline-block max-w-[8rem] lg:max-w-[12rem] truncate align-middle">
                          {app.position}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">
                        <div className="flex items-center gap-1.5 truncate max-w-[12rem] lg:max-w-[16rem]">
                          <FaEnvelope size={11} className="text-gray-400 flex-shrink-0" /> 
                          <span className="truncate">{app.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <FaPhone size={11} className="text-gray-400 flex-shrink-0" /> {app.phone}
                        </div>
                      </td>
                      <td className="p-4">
                        {app.cv ? (
                          <a 
                            href={cvUrl(app)} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            download
                            className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-[#8ab645] hover:text-white text-gray-700 px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
                          >
                            <FaFileDownload size={12} /> Download CV
                          </a>
                        ) : (
                          <span className="text-gray-400 text-xs">No file</span>
                        )}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <button 
                          onClick={() => setSelectedApp(app)}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-1 cursor-pointer"
                          title="View Details"
                          aria-label="View Details"
                        >
                          <FaEye size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(app._id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                          aria-label="Delete Application"
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

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedApp(null)}
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
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-serif">Candidate Details</h3>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  aria-label="Close"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Full Name</span>
                  <p className="text-base sm:text-lg font-bold text-gray-900 break-words">{selectedApp.name}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email</span>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700 break-all">{selectedApp.email}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Phone</span>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">{selectedApp.phone}</p>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Applied Position</span>
                  <p className="text-xs sm:text-sm font-bold text-[#8ab645] mt-0.5 break-words">{selectedApp.position}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Cover Letter / Message</span>
                  <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-3 sm:p-4 rounded-xl mt-1 leading-relaxed whitespace-pre-wrap break-words">
                    {selectedApp.message || 'No message provided.'}
                  </p>
                </div>
                {selectedApp.cv && (
                  <a
                    href={cvUrl(selectedApp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-[#8ab645] hover:text-white text-gray-700 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors w-full"
                  >
                    <FaFileDownload size={12} /> Download CV
                  </a>
                )}
              </div>

              <div className="flex justify-end p-4 sm:p-6 border-t border-gray-100 bg-[#fafaf9] shrink-0">
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="w-full sm:w-auto bg-gray-800 text-white px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-gray-900 transition-colors cursor-pointer"
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

export default ManageApplications;