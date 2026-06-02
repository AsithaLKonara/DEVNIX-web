'use client';

import { useState } from 'react';
import Link from 'next/link';

import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  AlertCircle
} from 'lucide-react';
import { useAuth, User } from '@/components/providers/AuthProvider';
import { apiClient } from '@/lib/apiClient';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = (await apiClient.post('/auth/login', { email, password })) as {
        accessToken?: string;
        user?: User;
      };
      
      // Assumes API returns { accessToken: string, user: User }
      if (response && response.accessToken && response.user) {
        login(response.accessToken, response.user);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: unknown) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : 'Invalid email or password. Please try again.';
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center p-4 md:p-8 relative overflow-hidden bg-[#0a0714] text-white">
      {/* Background glowing gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[140px] -mr-96 -mt-96 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[140px] -ml-96 -mb-96 pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10 my-auto">
        <div className="bg-[#131124]/90 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col justify-center relative transition-all duration-300">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block text-2xl font-black tracking-tighter text-white mb-6 hover:opacity-90 transition-opacity">
                XONIT<span className="text-indigo-500">.</span>
              </Link>
              <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
              <p className="text-gray-400 text-sm">Enter your credentials to access your workspace</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center gap-3 text-rose-400 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300 ml-1">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="w-full bg-[#0a0714] border border-white/5 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                    placeholder="admin@xonit.space"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-medium text-gray-300">Password</label>
                  <Link href="/forgot-password" className="text-xs text-indigo-400 hover:text-white transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    className="w-full bg-[#0a0714] border border-white/5 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3 font-medium transition-all text-sm cursor-pointer shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    Sign in <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="text-center mt-8 text-gray-400 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-white font-medium hover:text-indigo-400 transition-colors">
                Create workspace
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
}
