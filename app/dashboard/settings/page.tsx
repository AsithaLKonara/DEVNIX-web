'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { 
  User as UserIcon, 
  Shield, 
  Bell, 
  Globe, 
  Save, 
  Lock, 
  Smartphone, 
  Laptop, 
  CreditCard, 
  Trash2, 
  CheckCircle,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

type TabType = 'profile' | 'security' | 'notifications' | 'workspace';

export default function SettingsPage() {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Profile Form States
  const [name, setName] = useState(user?.name || 'Guest User');
  const [email, setEmail] = useState(user?.email || 'guest@xonit.space');
  const [phone, setPhone] = useState('+94 77 123 4567');
  const [avatarIndex, setAvatarIndex] = useState(0);

  // Security Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mfaEnabled, setMfaEnabled] = useState(true);

  // Notification States
  const [notifyProjects, setNotifyProjects] = useState({ email: true, push: true, slack: false });
  const [notifyFinance, setNotifyFinance] = useState({ email: true, push: false, slack: true });
  const [notifyTickets, setNotifyTickets] = useState({ email: false, push: true, slack: true });

  // Workspace States
  const [currency, setCurrency] = useState('LKR');
  const [timezone, setTimezone] = useState('Asia/Colombo');
  const [marketingEmails, setMarketingEmails] = useState(false);

  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(null);

    // Simulate API update
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess('Settings successfully synchronized.');
      
      // If user profile is loaded, propagate local updates to the auth context
      if (user) {
        const updatedUser = {
          ...user,
          name,
          email,
          avatar: avatars[avatarIndex]
        };
        // Update local session storage representation
        const token = localStorage.getItem('xonit_space_auth_token') || 'mock-token';
        login(token, updatedUser);
      }

      // Automatically dismiss alert
      setTimeout(() => setSaveSuccess(null), 4000);
    }, 1000);
  };

  const handleClearCache = () => {
    if (confirm('Are you sure you want to clear your local workspace cache? This will reset custom preferences.')) {
      localStorage.removeItem('xonit_space_user_profile');
      alert('Local workspace cache cleared.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Configure profile details, control system security, and coordinate localization.</p>
      </div>

      {/* Success banner */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400 text-sm animate-in slide-in-from-top-4 duration-300">
          <CheckCircle size={18} />
          <p className="font-medium">{saveSuccess}</p>
        </div>
      )}

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Navigation Sidebar */}
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl overflow-hidden p-2 space-y-1">
          {[
            { id: 'profile', label: 'User Profile', icon: UserIcon },
            { id: 'security', label: 'Security & Access', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'workspace', label: 'Workspace Configuration', icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as TabType);
                  setSaveSuccess(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/10 border border-[#6366f1]/40 text-[#818cf8]' 
                    : 'text-gray-400 hover:text-white border border-transparent hover:bg-[#2d2d4e]/40'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-[#818cf8]' : 'text-gray-400'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents Area */}
        <div className="lg:col-span-3 bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6 lg:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* ─── Profile Tab ────────────────────────────────────────────────── */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Profile Details</h3>
                  <p className="text-xs text-gray-500 mt-1">Manage public profile indicators and direct contact endpoints.</p>
                </div>

                {/* Avatar Selection */}
                <div className="bg-[#0f0f1a]/60 border border-[#2d2d4e] rounded-xl p-5 flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <img 
                      src={avatars[avatarIndex]} 
                      alt="Avatar" 
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#6366f1] shadow-2xl"
                    />
                    <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#1a1a2e]" />
                  </div>
                  <div className="flex-1 text-center sm:text-left space-y-3">
                    <p className="text-sm font-semibold text-gray-300">Choose Profile Picture</p>
                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                      {avatars.map((av, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setAvatarIndex(i)}
                          className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all hover:scale-105 ${
                            avatarIndex === i ? 'border-[#6366f1] scale-110 shadow-lg' : 'border-transparent opacity-60'
                          }`}
                        >
                          <img src={av} alt={`Option ${i}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Profile Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400">Display Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-[#0f0f1a] border border-[#2d2d4e] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#6366f1] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#0f0f1a] border border-[#2d2d4e] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#6366f1] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400">Phone Number</label>
                    <input 
                      type="text" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0f0f1a] border border-[#2d2d4e] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#6366f1] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400">Assigned Privilege Role</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={user?.role?.replace(/_/g, ' ') || 'ADMIN'}
                        readOnly
                        className="w-full bg-[#0f0f1a]/40 border border-[#2d2d4e] text-gray-500 rounded-lg px-4 py-2.5 text-sm cursor-not-allowed"
                      />
                      <span className="absolute right-3 top-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Governed by RBAC
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Security Tab ───────────────────────────────────────────────── */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Security & Access</h3>
                  <p className="text-xs text-gray-500 mt-1">Configure credentials, manage two-factor authentication, and monitor active sessions.</p>
                </div>

                {/* Password Fields */}
                <div className="bg-[#0f0f1a]/30 border border-[#2d2d4e] rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Lock size={14} className="text-[#818cf8]" />
                    Change Password
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400">Current Password</label>
                      <input 
                        type="password"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full bg-[#0f0f1a] border border-[#2d2d4e] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#6366f1] transition-all placeholder:text-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400">New Password</label>
                      <input 
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-[#0f0f1a] border border-[#2d2d4e] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#6366f1] transition-all placeholder:text-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-400">Confirm New Password</label>
                      <input 
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-[#0f0f1a] border border-[#2d2d4e] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#6366f1] transition-all placeholder:text-gray-700"
                      />
                    </div>
                  </div>
                </div>

                {/* MFA toggle */}
                <div className="flex items-center justify-between p-5 bg-[#0f0f1a]/60 border border-[#2d2d4e] rounded-xl">
                  <div className="flex gap-3">
                    <Smartphone className="text-emerald-400 shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-white">Two-Factor Authentication (2FA)</p>
                      <p className="text-xs text-gray-500 mt-0.5">Secure your credentials by requiring a mobile verification pin.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={mfaEnabled} 
                      onChange={(e) => setMfaEnabled(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#6366f1]"></div>
                  </label>
                </div>

                {/* Sessions */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Device Sessions</h4>
                  <div className="space-y-3">
                    {[
                      { device: 'Google Chrome on macOS (Apple Silicon)', location: 'Colombo, Sri Lanka', active: true, icon: Laptop },
                      { device: 'Safari Browser on iPhone 16 Pro', location: 'Colombo, Sri Lanka', active: false, icon: Smartphone },
                    ].map((sess, idx) => {
                      const Icon = sess.icon;
                      return (
                        <div key={idx} className="flex items-center justify-between p-4 bg-[#0f0f1a]/30 border border-[#2d2d4e] rounded-xl">
                          <div className="flex gap-3 items-center">
                            <div className="p-2 bg-[#1a1a2e] border border-[#2d2d4e] rounded-lg text-[#818cf8]">
                              <Icon size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">{sess.device}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{sess.location}</p>
                            </div>
                          </div>
                          {sess.active ? (
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                              Current Session
                            </span>
                          ) : (
                            <button type="button" className="text-xs text-rose-400 hover:text-rose-300 font-semibold transition-colors">
                              Revoke
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ─── Notifications Tab ──────────────────────────────────────────── */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
                  <p className="text-xs text-gray-500 mt-1">Configure alerts, sound settings, and dynamic triggers across communication matrices.</p>
                </div>

                <div className="overflow-hidden border border-[#2d2d4e] rounded-xl bg-[#0f0f1a]/30">
                  <table className="w-full text-left text-sm text-gray-300">
                    <thead className="bg-[#0f0f1a] border-b border-[#2d2d4e] text-gray-400">
                      <tr>
                        <th className="p-4 font-semibold text-xs uppercase tracking-wider">Trigger Source</th>
                        <th className="p-4 font-semibold text-xs uppercase tracking-wider text-center">Email</th>
                        <th className="p-4 font-semibold text-xs uppercase tracking-wider text-center">Push</th>
                        <th className="p-4 font-semibold text-xs uppercase tracking-wider text-center">Slack</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2d2d4e]/40">
                      <tr>
                        <td className="p-4 font-medium">
                          <p className="text-white">Project Milestones</p>
                          <p className="text-xs text-gray-500 mt-0.5">Alerts when project deliverables change state or sprints are created.</p>
                        </td>
                        <td className="p-4 text-center">
                          <input type="checkbox" checked={notifyProjects.email} onChange={(e) => setNotifyProjects({...notifyProjects, email: e.target.checked})} className="rounded bg-[#0f0f1a] border-[#2d2d4e] text-[#6366f1] focus:ring-0" />
                        </td>
                        <td className="p-4 text-center">
                          <input type="checkbox" checked={notifyProjects.push} onChange={(e) => setNotifyProjects({...notifyProjects, push: e.target.checked})} className="rounded bg-[#0f0f1a] border-[#2d2d4e] text-[#6366f1] focus:ring-0" />
                        </td>
                        <td className="p-4 text-center">
                          <input type="checkbox" checked={notifyProjects.slack} onChange={(e) => setNotifyProjects({...notifyProjects, slack: e.target.checked})} className="rounded bg-[#0f0f1a] border-[#2d2d4e] text-[#6366f1] focus:ring-0" />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">
                          <p className="text-white">Financial Invoices</p>
                          <p className="text-xs text-gray-500 mt-0.5">Alerts for outstanding invoice dates, payments, and overdue flags.</p>
                        </td>
                        <td className="p-4 text-center">
                          <input type="checkbox" checked={notifyFinance.email} onChange={(e) => setNotifyFinance({...notifyFinance, email: e.target.checked})} className="rounded bg-[#0f0f1a] border-[#2d2d4e] text-[#6366f1] focus:ring-0" />
                        </td>
                        <td className="p-4 text-center">
                          <input type="checkbox" checked={notifyFinance.push} onChange={(e) => setNotifyFinance({...notifyFinance, push: e.target.checked})} className="rounded bg-[#0f0f1a] border-[#2d2d4e] text-[#6366f1] focus:ring-0" />
                        </td>
                        <td className="p-4 text-center">
                          <input type="checkbox" checked={notifyFinance.slack} onChange={(e) => setNotifyFinance({...notifyFinance, slack: e.target.checked})} className="rounded bg-[#0f0f1a] border-[#2d2d4e] text-[#6366f1] focus:ring-0" />
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">
                          <p className="text-white">Support Tickets & Chat</p>
                          <p className="text-xs text-gray-500 mt-0.5">Direct chat mentions, announcements, and ticket assignments.</p>
                        </td>
                        <td className="p-4 text-center">
                          <input type="checkbox" checked={notifyTickets.email} onChange={(e) => setNotifyTickets({...notifyTickets, email: e.target.checked})} className="rounded bg-[#0f0f1a] border-[#2d2d4e] text-[#6366f1] focus:ring-0" />
                        </td>
                        <td className="p-4 text-center">
                          <input type="checkbox" checked={notifyTickets.push} onChange={(e) => setNotifyTickets({...notifyTickets, push: e.target.checked})} className="rounded bg-[#0f0f1a] border-[#2d2d4e] text-[#6366f1] focus:ring-0" />
                        </td>
                        <td className="p-4 text-center">
                          <input type="checkbox" checked={notifyTickets.slack} onChange={(e) => setNotifyTickets({...notifyTickets, slack: e.target.checked})} className="rounded bg-[#0f0f1a] border-[#2d2d4e] text-[#6366f1] focus:ring-0" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ─── Workspace Tab ──────────────────────────────────────────────── */}
            {activeTab === 'workspace' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Workspace Configuration</h3>
                  <p className="text-xs text-gray-500 mt-1">Configure structural workspace overrides, currency display indices, and storage caches.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400">Display Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-[#0f0f1a] border border-[#2d2d4e] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#6366f1] transition-all"
                    >
                      <option value="LKR">Sri Lankan Rupee (LKR)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400">Default Timezone</label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full bg-[#0f0f1a] border border-[#2d2d4e] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#6366f1] transition-all"
                    >
                      <option value="Asia/Colombo">Asia/Colombo (GMT+5:30)</option>
                      <option value="America/New_York">America/New_York (GMT-5:00)</option>
                      <option value="Europe/London">Europe/London (GMT+0:00)</option>
                    </select>
                  </div>
                </div>

                {/* Newsletter Switch */}
                <div className="flex items-center justify-between p-5 bg-[#0f0f1a]/60 border border-[#2d2d4e] rounded-xl">
                  <div>
                    <p className="text-sm font-semibold text-white">Join Partner Network Announcements</p>
                    <p className="text-xs text-gray-500 mt-0.5">Receive occasional promotional metrics and system development updates.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={marketingEmails} 
                      onChange={(e) => setMarketingEmails(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#6366f1]"></div>
                  </label>
                </div>

                {/* Maintenance Section */}
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
                    <Trash2 size={15} />
                    Workspace Cache & Maintenance
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Clearing your local workspace cache forces a complete sync with the central databases. This resets active role overrides and cached layouts without modifying project states.
                  </p>
                  <button
                    type="button"
                    onClick={handleClearCache}
                    className="flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-medium px-4 py-2 rounded-lg text-xs transition-colors"
                  >
                    Clear Workspace Cache
                  </button>
                </div>
              </div>
            )}

            {/* Footer Form Action Buttons */}
            <div className="pt-6 border-t border-[#2d2d4e] flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 border border-[#2d2d4e] text-gray-300 hover:text-white rounded-lg text-sm transition-colors bg-[#0f0f1a]"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                {isSaving ? (
                  <>Synchronizing...</>
                ) : (
                  <>
                    <Save size={16} />
                    Save Settings
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
