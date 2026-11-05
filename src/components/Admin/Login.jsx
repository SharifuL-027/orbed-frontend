import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios'; // Apnar banano axios instance

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Backend er /api/auth/login route e request pathano
      const response = await axiosInstance.post('/auth/login', { email, password });
      
      // Token ebong user info LocalStorage-e save kora
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Role check kore redirect kora (Admin hole dashboard-e, user hole home-e)
      if (response.data.user.role === 'admin') {
        alert("Admin Login Successful!");
        navigate('/admin/dashboard'); // Apnar admin dashboard route
      } else {
        alert("Login Successful!");
        navigate('/'); // Home page
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong during login");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#fafaf9]">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif text-center">Orbed Admin</h2>
        <p className="text-gray-500 text-sm text-center mb-8">Sign in to manage products & categories</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin@orbed.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645] transition-all"
              required 
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ab645] transition-all"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#8ab645] text-white py-3.5 rounded-xl font-bold hover:bg-[#7a9d3d] shadow-lg shadow-green-500/20 transition-all"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;