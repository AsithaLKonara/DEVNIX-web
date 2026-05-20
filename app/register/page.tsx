'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { apiClient } from '@/lib/apiClient';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/auth/register', { name, email, password });

      if (response && (response as any).accessToken) {
        login((response as any).accessToken, (response as any).user);
      } else {
        // Backend may require email verification before issuing token
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-[#1a1a2e]/80 backdrop-blur-xl border border-[#2d2d4e] rounded-2xl p-10 text-center max-w-md w-full shadow-2xl">
          <div className="flex items-center justify-center w-16 h-16 bg-emerald-500/10 rounded-full border border-emerald-500/30 mx-auto mb-6">
            <CheckCircle size={32} className="text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Check your inbox!</h2>
          <p className="text-gray-400 text-sm">We've sent a verification link to <span className="text-white font-medium">{email}</span>. Please verify your account to continue.</p>
          <Link href="/login" className="inline-block mt-8 text-sm font-medium text-[#818cf8] hover:text-white transition-colors">
            Back to Login &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6366f1]/10 rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] -ml-64 -mb-64 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#1a1a2e]/80 backdrop-blur-xl border border-[#2d2d4e] rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block text-2xl font-black tracking-tighter text-white mb-6">
              XONIT<span className="text-[#6366f1]">.</span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Create your workspace</h1>
            <p className="text-gray-400 text-sm">Get started with Xonit Space today</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-rose-500/10 border border-rose-500/50 rounded-lg flex items-center gap-3 text-rose-400 text-sm">
              <AlertCircle size={16} className="shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#0f0f1a] border border-[#2d2d4e] text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-all"
                  placeholder="John Smith"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 ml-1">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#0f0f1a] border border-[#2d2d4e] text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full bg-[#0f0f1a] border border-[#2d2d4e] text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-all"
                  placeholder="Min. 8 characters"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3 font-medium transition-all"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>Create Account <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500 text-xs">
            By signing up you agree to our{' '}
            <span className="text-gray-300 cursor-pointer hover:text-white transition-colors">Terms of Service</span>
            {' '}&{' '}
            <span className="text-gray-300 cursor-pointer hover:text-white transition-colors">Privacy Policy</span>.
          </p>
        </div>

        <p className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-white font-medium hover:text-[#818cf8] transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
