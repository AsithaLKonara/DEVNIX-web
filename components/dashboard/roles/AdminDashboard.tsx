'use client';

import { RevenueOverviewChart } from '@/components/dashboard/charts/RevenueOverviewChart';

export function AdminDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">Command Center</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: 'LKR 245,800', change: '+18.2%', isPositive: true },
          { label: 'Active Projects', value: '42', change: '+5', isPositive: true },
          { label: 'Total Employees', value: '28', change: '0', isPositive: true },
          { label: 'Pending Invoices', value: 'LKR 12,400', change: '-LKR 2,100', isPositive: true },
        ].map((stat, i) => (
          <div key={i} className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 hover:border-[#6366f1]/50 transition-colors">
            <p className="text-sm font-medium text-gray-400">{stat.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                stat.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6 min-h-[350px] flex flex-col">
          <h3 className="font-semibold text-white mb-4">Revenue Overview</h3>
          <div className="flex-1 min-h-[220px]">
            <RevenueOverviewChart />
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          {/* Quick HR Actions panel */}
          <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-white mb-3 text-sm">Quick HR Actions</h3>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0f0f1a] border border-[#2d2d4e] hover:border-[#6366f1]/30 transition-all">
                  <div>
                    <p className="text-xs font-bold text-white">Bob Smith</p>
                    <p className="text-[10px] text-gray-500">Annual Leave (5 days)</p>
                  </div>
                  <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded text-[9px] uppercase font-bold">Pending</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0f0f1a] border border-[#2d2d4e] hover:border-[#6366f1]/30 transition-all">
                  <div>
                    <p className="text-xs font-bold text-white">Charlie Davis</p>
                    <p className="text-[10px] text-gray-500">Sick Leave (1 day)</p>
                  </div>
                  <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded text-[9px] uppercase font-bold">Pending</span>
                </div>
              </div>
            </div>
            <a href="/dashboard/hr" className="mt-3 w-full py-2 bg-[#6366f1]/10 hover:bg-[#6366f1]/20 border border-[#6366f1]/20 text-[#818cf8] hover:text-white rounded-lg text-[11px] font-bold text-center block transition-all">
              Launch HR Portal
            </a>
          </div>

          {/* System Alerts panel */}
          <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 flex-1">
            <h3 className="font-semibold text-white mb-3 text-sm">System Alerts</h3>
            <div className="space-y-2">
              {[
                { title: 'Server CPU spike detected', type: 'warning' },
                { title: 'New employee onboarded: Jane Doe', type: 'info' },
                { title: 'Project "Alpha" is delayed', type: 'danger' },
                { title: 'Invoice #INV-2026 paid successfully', type: 'success' },
              ].map((alert, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded bg-[#0f0f1a] border border-[#2d2d4e]">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    alert.type === 'warning' ? 'bg-amber-500' :
                    alert.type === 'danger' ? 'bg-rose-500' :
                    alert.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                  }`}></div>
                  <span className="text-xs text-gray-300 truncate">{alert.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
