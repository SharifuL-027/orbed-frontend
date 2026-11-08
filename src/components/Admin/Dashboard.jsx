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
// import axiosInstance from '../api/axiosInstance'; 

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    newApplications: 0,
    unreadMessages: 0
  });

  // Recent data simulation (Backend ready hole ekhane API call hobe)
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    // API Call Simulate kora hocche
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Backend theke data ashar example:
        // const res = await axiosInstance.get('/admin/dashboard-stats');
        // setStats(res.data.stats);
        
        // Dummy Data for visualization
        setTimeout(() => {
          setStats({
            totalProducts: 24,
            totalCategories: 6,
            newApplications: 12,
            unreadMessages: 5
          });
          setRecentApplications([
            { id: 1, name: 'Rafiqul Islam', position: 'Solar Engineer', date: 'Oct 24, 2026', status: 'Pending' },
            { id: 2, name: 'Tanjim Rahman', position: 'Project Manager', date: 'Oct 23, 2026', status: 'Reviewed' },
            { id: 3, name: 'Sadia Afrin', position: 'Sales Executive', date: 'Oct 22, 2026', status: 'Pending' },
          ]);
          setLoading(false);
        }, 1000);

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
      <div className="w-full h-[70vh] flex flex-col items-center justify-center">
        <FaCircleNotch className="animate-spin text-[#8ab645] text-4xl mb-4" />
        <p className="text-gray-500 font-semibold">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-serif">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">Welcome back! Here is what's happening today at Orbed Green Energy.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              </div>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#fafaf9]">
            <h3 className="text-lg font-bold text-gray-900">Recent Applications</h3>
            <button className="text-[#8ab645] text-sm font-bold hover:underline flex items-center gap-1">
              View All <FaArrowRight size={12} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Applicant Name</th>
                  <th className="p-4 font-semibold">Position</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-semibold text-gray-900">{app.name}</td>
                    <td className="p-4 text-gray-600 text-sm">{app.position}</td>
                    <td className="p-4 text-gray-500 text-sm">{app.date}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions / System Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-[#061325] to-[#0a192f] p-8 rounded-2xl text-white relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#8ab645] rounded-full blur-[60px] opacity-20 pointer-events-none"></div>
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <BsLightningChargeFill className="text-[#8ab645]" />
              </div>
              <h3 className="text-xl font-bold">System Status</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-gray-400 text-sm">Server</span>
                <span className="flex items-center gap-2 text-sm font-semibold"><span className="w-2 h-2 rounded-full bg-[#8ab645] animate-pulse"></span> Online</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-gray-400 text-sm">Database</span>
                <span className="text-sm font-semibold text-white">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Last Backup</span>
                <span className="text-sm font-semibold text-white">Today, 2:00 AM</span>
              </div>
            </div>
          </div>

          <button className="w-full mt-8 bg-[#8ab645] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#7a9d3d] transition-colors shadow-lg shadow-green-500/20">
            Generate Report
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;