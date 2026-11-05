import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiArrowRight,
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
      // Backend er /api/auth/login route e request pathano
      const response = await axiosInstance.post('/auth/login', { email, password });

      // Token ebong user info LocalStorage-e save kora
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      const isAdmin = response.data.user.role === 'admin';
      setSuccess(isAdmin ? 'Admin login successful! Redirecting...' : 'Login successful! Redirecting...');

      // Role check kore redirect kora
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
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07080b] px-5 py-10">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-[#8ab645]/20 blur-[150px]" />
        <div className="absolute bottom-[-200px] left-[-120px] h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[150px]" />
        <div className="absolute bottom-[-200px] right-[-120px] h-[420px] w-[420px] rounded-full bg-lime-400/10 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 70%)',
          }}
        />
      </div>

      {/* Card with gradient border */}
      <div className="relative z-10 w-full max-w-[440px]">
        <div className="rounded-[28px] bg-gradient-to-b from-white/20 via-white/5 to-transparent p-px shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
          <div className="rounded-[27px] bg-[#0d0f13]/90 p-8 backdrop-blur-2xl md:p-10">
            {/* Top accent line */}
            <div className="mx-auto mb-8 h-[3px] w-14 rounded-full bg-gradient-to-r from-transparent via-[#8ab645] to-transparent" />

            <div className="mb-9 text-center">
              <h2 className="font-serif text-[32px] font-bold tracking-tight text-white">Orbed Admin</h2>
              <p className="mt-2 text-sm text-gray-500">Sign in to manage products &amp; categories</p>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-sm text-red-300">
                <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-[#8ab645]/30 bg-[#8ab645]/10 p-3.5 text-sm text-[#b9e070]">
                <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block text-[13px] font-medium text-gray-400">
                  Email Address
                </label>
                <div className="group relative">
                  <FiMail className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-[#8ab645]" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@orbed.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 hover:border-white/15 focus:border-[#8ab645]/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-[#8ab645]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-2 block text-[13px] font-medium text-gray-400">
                  Password
                </label>
                <div className="group relative">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-[#8ab645]" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-3.5 pl-11 pr-12 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 hover:border-white/15 focus:border-[#8ab645]/60 focus:bg-white/[0.05] focus:ring-4 focus:ring-[#8ab645]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-600 transition hover:text-gray-200"
                  >
                    {showPassword ? <FiEyeOff className="h-[18px] w-[18px]" /> : <FiEye className="h-[18px] w-[18px]" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#9bc94f] via-[#8ab645] to-[#74a22f] py-3.5 text-sm font-bold text-[#0a0c0f] shadow-[0_10px_30px_-8px_rgba(138,182,69,0.55)] transition-all duration-200 hover:shadow-[0_14px_36px_-8px_rgba(138,182,69,0.7)] hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {/* shine effect */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {loading ? (
                  <>
                    <FiLoader className="relative h-4 w-4 animate-spin" />
                    <span className="relative">Signing in...</span>
                  </>
                ) : (
                  <>
                    <span className="relative">Login to Dashboard</span>
                    <FiArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;