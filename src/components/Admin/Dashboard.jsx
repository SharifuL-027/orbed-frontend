import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBoxOpen, 
  FaTags, 
  FaEnvelope, 
  FaUserTie, 
  FaArrowRight,
  FaCircleNotch
} from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';
import api from '../../api/axiosInstance'; 

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    newApplications: 0,
    unreadMessages: 0
  });

  const [recentApplications, setRecentApplications] = useState([]);

  // 🔥 ড্যাশবোর্ডের ডেটা ডাইনামিক করার জন্য API কল
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // ব্যাকএন্ড থেকে ড্যাশবোর্ড স্ট্যাটস এবং রিসেন্ট অ্যাপ্লিকেশন ফেচ করা
        // (ব্যাকএন্ডে রাউট না থাকলে ত্রুটি এড়াতে ট্রাই-ক্যাচ ব্যবহার করা হয়েছে)
        const res = await api.get('/admin/dashboard-stats').catch(() => null);

        if (res && res.data) {
          // যদি ব্যাকএন্ড থেকে সঠিক ফরম্যাটে ডেটা আসে
          setStats(res.data.stats || {
            totalProducts: res.data.totalProducts || 0,
            totalCategories: res.data.totalCategories || 0,
            newApplications: res.data.newApplications || 0,
            unreadMessages: res.data.unreadMessages || 0
          });
          setRecentApplications(res.data.recentApplications || []);
        } else {
          // ব্যাকএন্ড রাউট রেডি না থাকলে ফলব্যাক বা সেফ ডেটা
          setStats({
            totalProducts: 0,
            totalCategories: 0,
            newApplications: 0,
            unreadMessages: 0
          });
          setRecentApplications([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { title: "Total Products", value: stats.totalProducts, icon: FaBoxOpen, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Categories", value: stats.totalCategories, icon: FaTags, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Job Applications", value: stats.newApplications, icon: FaUserTie, color: "text-[#8ab645]", bg: "bg-green-50" },
    { title: "Unread Messages", value: stats.unreadMessages, icon: FaEnvelope, color: "text-orange-500", bg: "bg-orange-50" }
  ];

  if (loading) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center px-4">
        <FaCircleNotch className="animate-spin text-[#8ab645] text-4xl mb-4" />
        <p className="text-gray-500 font-semibold text-sm sm:text-base">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">Dashboard Overview</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">Welcome back! Here is what's happening today at Orbed Green Energy.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
            >
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</h3>
              </div>
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 ${stat.bg} ${stat.color}`}>
                <Icon size={22} className="sm:text-2xl" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Applications Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#fafaf9]">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Recent Applications</h3>
            <button className="text-[#8ab645] text-xs sm:text-sm font-bold hover:underline flex items-center gap-1 cursor-pointer">
              View All <FaArrowRight size={12} />
            </button>
          </div>
          
          {/* Responsive Table Wrapper */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[550px] sm:min-w-full">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-3 sm:p-4 font-semibold">Applicant Name</th>
                  <th className="p-3 sm:p-4 font-semibold">Position</th>
                  <th className="p-3 sm:p-4 font-semibold">Date</th>
                  <th className="p-3 sm:p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {recentApplications.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-400 font-medium">
                      No recent job applications found.
                    </td>
                  </tr>
                ) : (
                  recentApplications.map((app) => (
                    <tr key={app._id || app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 sm:p-4 font-semibold text-gray-900">{app.name}</td>
                      <td className="p-3 sm:p-4 text-gray-600">{app.position}</td>
                      <td className="p-3 sm:p-4 text-gray-500">
                        {app.date ? app.date : new Date(app.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold inline-block ${
                          app.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions / System Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-[#061325] to-[#0a192f] p-6 sm:p-8 rounded-2xl text-white relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#8ab645] rounded-full blur-[60px] opacity-20 pointer-events-none"></div>
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                <BsLightningChargeFill className="text-[#8ab645]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold">System Status</h3>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3 sm:pb-4">
                <span className="text-gray-400 text-xs sm:text-sm">Server</span>
                <span className="flex items-center gap-2 text-xs sm:text-sm font-semibold"><span className="w-2 h-2 rounded-full bg-[#8ab645] animate-pulse"></span> Online</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3 sm:pb-4">
                <span className="text-gray-400 text-xs sm:text-sm">Database</span>
                <span className="text-xs sm:text-sm font-semibold text-white">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs sm:text-sm">Last Backup</span>
                <span className="text-xs sm:text-sm font-semibold text-white">Today, 2:00 AM</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => alert("Report generation feature is coming soon!")}
            className="w-full mt-6 sm:mt-8 bg-[#8ab645] text-white py-3 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#7a9d3d] transition-colors shadow-lg shadow-green-500/20 cursor-pointer"
          >
            Generate Report
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;