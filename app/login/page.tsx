'use client';

import { useState } from 'react';
import Link from 'next/link';

import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  ShieldCheck, 
  Briefcase, 
  Code, 
  Building, 
  Award,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useAuth, User } from '@/components/providers/AuthProvider';
import { apiClient } from '@/lib/apiClient';

const DEMO_ROLES = [
  {
    role: 'SUPER_ADMIN',
    label: 'Super Admin',
    name: 'Alex Vance',
    email: 'superadmin@xonit.space',
    password: 'xonit123',
    icon: ShieldCheck,
    description: 'System configurations, billing controls, and full data access.',
    color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 hover:border-indigo-500 active:border-indigo-400',
    accentColor: '#6366f1',
    glowColor: 'bg-indigo-500/10'
  },
  {
    role: 'PROJECT_MANAGER',
    label: 'Project Manager',
    name: 'Sarah Connor',
    email: 'pm@xonit.space',
    password: 'xonit123',
    icon: Briefcase,
    description: 'Project scoping, Kanban boards, CRM pipeline, and meetings.',
    color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 hover:border-cyan-500 active:border-cyan-400',
    accentColor: '#06b6d4',
    glowColor: 'bg-cyan-500/10'
  },
  {
    role: 'EMPLOYEE',
    label: 'Lead Developer',
    name: 'Gordon Freeman',
    email: 'dev@xonit.space',
    password: 'xonit123',
    icon: Code,
    description: 'Task execution, daily time logs, leave requests, and payslips.',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 hover:border-emerald-500 active:border-emerald-400',
    accentColor: '#10b981',
    glowColor: 'bg-emerald-500/10'
  },
  {
    role: 'CUSTOMER',
    label: 'Client Portal',
    name: 'Bruce Wayne',
    email: 'client@xonit.space',
    password: 'xonit123',
    icon: Building,
    description: 'Project status tracking, invoice clearance, and NDA contracts.',
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 hover:border-amber-500 active:border-amber-400',
    accentColor: '#f59e0b',
    glowColor: 'bg-amber-500/10'
  },
  {
    role: 'INFLUENCER',
    label: 'Referral Partner',
    name: 'John Wick',
    email: 'hunter@xonit.space',
    password: 'xonit123',
    icon: Award,
    description: 'Lead recommendations, commission rates, and payouts tracking.',
    color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 hover:border-pink-500 active:border-pink-400',
    accentColor: '#ec4899',
    glowColor: 'bg-pink-500/10'
  }
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<string | null>(null);
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

  const handleQuickSelect = (roleInfo: typeof DEMO_ROLES[0]) => {
    setEmail(roleInfo.email);
    setPassword(roleInfo.password);
    setActiveRole(roleInfo.role);
    setError(null);
  };

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
    // Clear active role highlight if credentials are typed manually
    setActiveRole(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden bg-[#0a0714] text-white">
      {/* Background glowing gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[140px] -mr-96 -mt-96 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[140px] -ml-96 -mb-96 pointer-events-none"></div>
      
      <div className="w-full max-w-5xl relative z-10 my-auto">
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column - Sandbox Quick Roles Selector (order-2 on mobile, order-1 on desktop) */}
          <div className="md:col-span-7 flex flex-col justify-between bg-[#131124]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl order-2 md:order-1 transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-indigo-400 w-5 h-5 animate-pulse" />
                <span className="text-xs font-semibold tracking-wider text-indigo-300 uppercase">Sandbox Mode</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Demo Accounts</h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Experience Xonit Space through different system perspectives. Click any role profile below to auto-fill its corresponding sandbox credentials.
              </p>

              <div className="space-y-3.5">
                {DEMO_ROLES.map((roleInfo) => {
                  const IconComponent = roleInfo.icon;
                  const isActive = activeRole === roleInfo.role;
                  return (
                    <button
                      key={roleInfo.role}
                      onClick={() => handleQuickSelect(roleInfo)}
                      type="button"
                      className={`w-full text-left flex gap-4 p-4 rounded-xl border transition-all duration-300 bg-gradient-to-r relative overflow-hidden group ${
                        isActive 
                          ? `${roleInfo.color} border-opacity-100 shadow-[0_0_20px_rgba(99,102,241,0.15)] scale-[1.01]` 
                          : 'bg-[#18162b]/40 border-white/5 hover:bg-[#1f1d36]/60 hover:scale-[1.005]'
                      }`}
                    >
                      {/* Active indicator border */}
                      {isActive && (
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-1" 
                          style={{ backgroundColor: roleInfo.accentColor }}
                        />
                      )}

                      {/* Icon */}
                      <div className={`p-2.5 rounded-lg shrink-0 transition-colors duration-300 ${
                        isActive ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-400 group-hover:text-white'
                      }`}>
                        <IconComponent size={20} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-white text-sm">{roleInfo.label}</span>
                          <span className="text-[11px] text-gray-500 font-mono hidden sm:inline">{roleInfo.email}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 leading-snug">{roleInfo.description}</p>
                      </div>

                      {/* Checkmark or quick status */}
                      <div className="flex items-center justify-center shrink-0 pl-1">
                        {isActive ? (
                          <CheckCircle2 size={18} style={{ color: roleInfo.accentColor }} className="animate-scale-in" />
                        ) : (
                          <span className="text-[10px] text-indigo-400/60 font-semibold group-hover:text-indigo-400 transition-colors duration-300 uppercase tracking-wider hidden sm:block">Quick Fill</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
              <span>Current Sandbox Version: v1.2.0</span>
              <span>Secure DB Seed Data</span>
            </div>
          </div>

          {/* Right Column - Login Form (order-1 on mobile, order-2 on desktop) */}
          <div className="md:col-span-5 bg-[#131124]/90 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col justify-center order-1 md:order-2 relative transition-all duration-300">
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
    </div>
  );
}
