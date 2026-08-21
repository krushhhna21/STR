import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Lock, Mail, User } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { API_BASE_URL } from '../config/api';

export const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      const { token, user } = await res.json();
      if (!res.ok) throw new Error(user?.error || 'Sign up failed');
      
      setAuth(user, token);
      navigate('/app', { replace: true });
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ access_token: tokenResponse.access_token }),
        });
        const { token, user } = await res.json();
        if (!res.ok) throw new Error('Google sign up failed');
        
        setAuth(user, token);
        navigate('/app', { replace: true });
      } catch(err: any) {
        setError(err.message || 'Google sign up failed');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-white lg:bg-[#F9F7FF] flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 gap-12">
      
      {/* Desktop Illustration Side */}
      <div className="hidden lg:flex flex-col flex-1 items-center justify-center p-12 max-w-2xl text-center">
        <div className="mb-8 w-40 h-40 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center -rotate-3 border border-white">
           <img src="/logo.png" alt="Study Buddy" className="w-24 h-24 drop-shadow-md" />
        </div>
        <h1 className="text-5xl font-black text-[#1E1B4B] mb-6 tracking-tight">Study Buddy</h1>
        <p className="text-xl text-[#4a4273] font-medium max-w-md">Focus, Learn, and Achieve your goals with your all-in-one study companion.</p>
      </div>

      {/* Auth Form Side */}
      <div className="w-full max-w-sm lg:max-w-md lg:bg-white lg:p-12 lg:rounded-[3rem] lg:shadow-2xl border border-transparent lg:border-gray-50 shrink-0">
        
        <div className="text-center mb-10">
          <div className="lg:hidden mb-6 flex justify-center">
            <img src="/logo.png" alt="Study Buddy" className="w-16 h-16 drop-shadow-md" />
          </div>
          <h1 className="text-3xl font-black text-[#1E1B4B] mb-2">Create Account ✨</h1>
          <p className="text-[#4a4273] font-medium">Join Study Buddy today</p>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-500 p-3 rounded-xl mb-6 text-sm font-semibold text-center border border-rose-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium shadow-sm transition-all text-gray-900"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium shadow-sm transition-all text-gray-900"
              placeholder="Email"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium shadow-sm transition-all text-gray-900"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-[#F52B91] text-white font-bold text-lg shadow-lg shadow-[#F52B91]/30 hover:bg-[#d8217d] transition-colors flex items-center justify-center mt-6 disabled:opacity-50"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-gray-100 w-full absolute"></div>
          <span className="bg-white lg:bg-transparent px-4 text-xs font-bold text-gray-400 relative z-10">or sign up with</span>
        </div>

        <button
          onClick={() => loginWithGoogle()}
          type="button"
          className="w-full py-4 rounded-2xl bg-white border border-gray-100 text-gray-700 font-bold text-base shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 mb-8"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Google
        </button>

        <p className="text-center text-sm font-medium text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-[#F52B91] font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
