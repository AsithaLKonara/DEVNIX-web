'use client';

import { useState } from 'react';
import { Copy, Users, DollarSign, Award, ArrowUpRight, Share2, Check } from 'lucide-react';

const referrals = [
  { id: 'REF-001', client: 'Acme Corp', date: 'Oct 01, 2026', status: 'Converted', value: '$12,000', commission: '$1,200' },
  { id: 'REF-002', client: 'TechFlow', date: 'Oct 05, 2026', status: 'Pending', value: 'TBD', commission: 'TBD' },
  { id: 'REF-003', client: 'Global Retail', date: 'Sep 15, 2026', status: 'Paid', value: '$25,000', commission: '$2,500' },
];

export default function ReferralDashboardPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://xonit.space/ref/alx2026';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Referral Program</h1>
          <p className="text-gray-400 text-sm mt-1">Earn 10% commission on every successful client referral.</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4e] border border-[#6366f1]/30 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366f1]/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">Invite & Earn</h2>
            <p className="text-gray-300 mb-6">Share your unique referral link. When a new client signs up and pays for a project, you get 10% of the project value straight to your bank account.</p>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#0f0f1a] border border-[#2d2d4e] rounded-lg overflow-hidden flex-1 max-w-md">
                <div className="px-4 py-3 bg-[#1a1a2e] border-r border-[#2d2d4e] text-gray-400">
                  <Share2 size={18} />
                </div>
                <input 
                  type="text" 
                  value={referralLink} 
                  readOnly 
                  className="bg-transparent border-none outline-none text-white px-4 py-3 w-full text-sm font-medium"
                />
              </div>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
              >
                {copied ? <><Check size={18} /> Copied!</> : <><Copy size={18} /> Copy Link</>}
              </button>
            </div>
          </div>
          
          <div className="hidden md:flex w-48 h-48 bg-[#0f0f1a] rounded-full border-4 border-[#6366f1]/20 items-center justify-center relative">
            <div className="absolute inset-0 border-4 border-[#6366f1] rounded-full border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
            <div className="text-center">
              <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Tier</p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]">Gold</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-blue-500"><Users size={64} /></div>
          <p className="text-sm font-medium text-gray-400">Total Referrals</p>
          <p className="text-3xl font-bold text-white mt-2">12</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-emerald-400 font-medium">3 active projects</span>
          </div>
        </div>
        
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500"><DollarSign size={64} /></div>
          <p className="text-sm font-medium text-gray-400">Total Earned</p>
          <p className="text-3xl font-bold text-white mt-2">$3,700</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-emerald-400 font-medium">+$1,200</span>
            <span className="text-gray-500">this month</span>
          </div>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-500"><Award size={64} /></div>
          <p className="text-sm font-medium text-gray-400">Pending Commission</p>
          <p className="text-3xl font-bold text-white mt-2">$1,200</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-amber-400 font-medium">Awaiting client payment</span>
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl flex flex-col">
        <div className="p-5 border-b border-[#2d2d4e] flex justify-between items-center">
          <h3 className="font-semibold text-white">Referral History</h3>
          <button className="flex items-center gap-1 text-sm text-[#818cf8] hover:text-white transition-colors">
            View Analytics <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0f0f1a] text-gray-400 border-b border-[#2d2d4e]">
              <tr>
                <th className="p-4 font-medium">Referral ID</th>
                <th className="p-4 font-medium">Client Name</th>
                <th className="p-4 font-medium">Date Joined</th>
                <th className="p-4 font-medium">Project Value</th>
                <th className="p-4 font-medium">Commission</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((ref) => (
                <tr key={ref.id} className="border-b border-[#2d2d4e]/50 hover:bg-[#2d2d4e]/30 transition-colors">
                  <td className="p-4 font-medium text-white">{ref.id}</td>
                  <td className="p-4 font-medium">{ref.client}</td>
                  <td className="p-4">{ref.date}</td>
                  <td className="p-4 text-gray-400">{ref.value}</td>
                  <td className="p-4 font-bold text-emerald-400">{ref.commission}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                      ref.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      ref.status === 'Converted' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {ref.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
