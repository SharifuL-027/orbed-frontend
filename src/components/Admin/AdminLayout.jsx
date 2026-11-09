import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaBoxOpen, 
  FaTags, 
  FaEnvelope, 
  FaUserTie, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaGlobe
} from 'react-icons/fa';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Token remove kore login page e pathiye deya
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt },
    { name: 'Manage Categories', path: '/admin/categories', icon: FaTags },
    { name: 'Manage Products', path: '/admin/products', icon: FaBoxOpen },
    { name: 'Job Applications', path: '/admin/applications', icon: FaUserTie },
    { name: 'Messages', path: '/admin/messages', icon: FaEnvelope },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-[#0a192f] text-white flex flex-col shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 text-center border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold font-serif text-[#8ab645]">Orbed Admin</h2>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Control Panel</p>
          </div>
          {/* Close button for mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white p-1"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="grow p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)} // Mobile a click korle sidebar close hobe
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#8ab645] text-white shadow-lg' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={18} />
                <span className="font-semibold text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions: Back to Website & Logout */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          {/* 🔥 Back to Website Button */}
          <Link
            to="/"
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition-colors font-semibold text-sm"
          >
            <FaGlobe size={18} className="text-[#8ab645]" />
            Back to Website
          </Link>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-400 hover:text-white rounded-xl transition-colors font-semibold text-sm"
          >
            <FaSignOutAlt size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        
        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-8 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            {/* 🔥 Mobile Hamburger Button */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-gray-700 hover:text-[#8ab645] p-1 focus:outline-none"
            >
              <FaBars size={22} />
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
              {menuItems.find(item => item.path === location.pathname)?.name || 'Admin Panel'}
            </h2>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#fafaf9] p-4 sm:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;