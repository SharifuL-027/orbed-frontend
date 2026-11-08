import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaBoxOpen, 
  FaTags, 
  FaEnvelope, 
  FaUserTie, 
  FaSignOutAlt 
} from 'react-icons/fa';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#0a192f] text-white flex flex-col shadow-2xl">
        <div className="p-6 text-center border-b border-gray-700">
          <h2 className="text-2xl font-bold font-serif text-[#8ab645]">Orbed Admin</h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Control Panel</p>
        </div>

        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
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

        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-400 hover:text-white rounded-xl transition-colors font-semibold text-sm"
          >
            <FaSignOutAlt size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-gray-800">
            {menuItems.find(item => item.path === location.pathname)?.name || 'Admin Panel'}
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 text-[#8ab645] rounded-full flex items-center justify-center font-bold border border-green-100">
              AD
            </div>
            <span className="text-sm font-bold text-gray-700">Admin User</span>
          </div>
        </header>

        {/* Dynamic Page Content (Ekhane Dashboard, Products etc load hobe) */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#fafaf9] p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;