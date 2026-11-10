import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiArrowRight,
  FiArrowLeft,
  FiAlertCircle,
  FiCheckCircle,
} from 'react-icons/fi';
import axiosInstance from '../../api/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/login', { email, password });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      const isAdmin = response.data.user.role === 'admin';
      setSuccess(isAdmin ? 'Admin login successful! Redirecting...' : 'Login successful! Redirecting...');

      setTimeout(() => {
        navigate(isAdmin ? '/admin/dashboard' : '/');
      }, 800);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong during login');
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07080b] px-5 py-10 selection:bg-[#8ab645] selection:text-white">
      
      {/* --- Premium Background Glow & Pattern --- */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}
          className="absolute left-1/2 top-[-180px] h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-[#8ab645]/20 blur-[150px]" 
        />
        <div className="absolute bottom-[-200px] left-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[150px]" />
        <div className="absolute bottom-[-200px] right-[-120px] h-[420px] w-[420px] rounded-full bg-lime-400/10 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 70%)',
          }}
        />
      </div>

      {/* --- Login Card --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <div className="rounded-[32px] bg-gradient-to-b from-white/10 via-white/5 to-transparent p-px shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
          <div className="relative rounded-[31px] bg-[#0d0f13]/90 p-8 backdrop-blur-2xl md:p-10">
            
            {/* 🔥 Awesome Back Button */}
            <button
              onClick={() => navigate('/')}
              className="group absolute left-6 top-6 flex items-center gap-2 text-[13px] font-medium text-gray-400 transition-colors hover:text-[#8ab645]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-all duration-300 group-hover:-translate-x-1 group-hover:bg-[#8ab645]/10 group-hover:shadow-[0_0_10px_rgba(138,182,69,0.2)]">
                <FiArrowLeft className="h-4 w-4" />
              </div>
              <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">Back</span>
            </button>

            {/* Top accent line */}
            <div className="mx-auto mb-8 mt-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-transparent via-[#8ab645] to-transparent" />

            {/* Header */}
            <div className="mb-9 text-center">
              <h2 className="font-serif text-[32px] font-bold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                Orbed 
              </h2>
              <p className="mt-2 text-sm text-gray-500">Sign in to manage products &amp; categories</p>
            </div>

            {/* Alerts */}
            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-sm text-red-300">
                <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 flex items-start gap-2.5 rounded-xl border border-[#8ab645]/30 bg-[#8ab645]/10 p-3.5 text-sm text-[#b9e070]">
                <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{success}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block text-[13px] sans-medium text-gray-400">
                  Email Address
                </label>
                <div className="group relative">
                  <FiMail className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-[#8ab645]" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-white/8 bg-white/3 py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 hover:border-white/15 focus:border-[#8ab645]/60 focus:bg-[#8ab645]/[0.02] focus:ring-4 focus:ring-[#8ab645]/10 focus:shadow-[0_0_15px_rgba(138,182,69,0.1)]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-2 block text-[13px] sans-medium text-gray-400">
                  Password
                </label>
                <div className="group relative">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-[18px] -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-[#8ab645]" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-white/8 bg-white/3 py-3.5 pl-11 pr-12 text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 hover:border-white/15 focus:border-[#8ab645]/60 focus:bg-[#8ab645]/[0.02] focus:ring-4 focus:ring-[#8ab645]/10 focus:shadow-[0_0_15px_rgba(138,182,69,0.1)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 transition-colors hover:text-white focus:outline-none"
                  >
                    {showPassword ? <FiEyeOff className="h-[18px] w-[18px]" /> : <FiEye className="h-[18px] w-[18px]" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#9bc94f] via-[#8ab645] to-[#74a22f] py-4 text-[15px] font-bold text-[#0a0c0f] shadow-[0_10px_30px_-8px_rgba(138,182,69,0.55)] transition-all duration-300 hover:shadow-[0_14px_36px_-8px_rgba(138,182,69,0.7)] hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {/* shine effect */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                
                {loading ? (
                  <>
                    <FiLoader className="relative h-5 w-5 animate-spin" />
                    <span className="relative tracking-wide">Signing in...</span>
                  </>
                ) : (
                  <>
                    <span className="relative tracking-wide">Login</span>
                    <FiArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;