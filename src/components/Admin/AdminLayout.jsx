import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FaThLarge, FaTags, FaBoxOpen, FaSignOutAlt } from 'react-icons/fa';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#fafaf9] font-sans">
      
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-6">
        <div>
          <div className="mb-10 px-2">
            <h2 className="text-xl font-bold text-gray-900 font-serif">Orbed Admin</h2>
            <p className="text-xs text-gray-400">Green Energy Management</p>
          </div>

          <nav className="space-y-2">
            <Link 
              to="/admin/dashboard" 
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-[#8ab645] rounded-xl font-medium transition-all"
            >
              <FaThLarge size={16} /> Dashboard
            </Link>
            <Link 
              to="/admin/categories" 
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-[#8ab645] rounded-xl font-medium transition-all"
            >
              <FaTags size={16} /> Categories
            </Link>
            <Link 
              to="/admin/products" 
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-green-50 hover:text-[#8ab645] rounded-xl font-medium transition-all"
            >
              <FaBoxOpen size={16} /> Products
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-all"
          >
            <FaSignOutAlt size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white border-b border-gray-100 h-20 flex items-center justify-between px-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 font-serif">Control Panel</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-[#8ab645] rounded-full flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800">Admin User</h4>
              <p className="text-xs text-gray-400">admin@orbed.com</p>
            </div>
          </div>
        </header>

        <main className="p-8">
          {/* Nested routes gulo ekhane show korbe */}
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;