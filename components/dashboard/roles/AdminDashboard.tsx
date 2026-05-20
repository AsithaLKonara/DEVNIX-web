'use client';

export function AdminDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">Command Center</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$245,800', change: '+18.2%', isPositive: true },
          { label: 'Active Projects', value: '42', change: '+5', isPositive: true },
          { label: 'Total Employees', value: '28', change: '0', isPositive: true },
          { label: 'Pending Invoices', value: '$12,400', change: '-$2,100', isPositive: true },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6 min-h-[300px]">
          <h3 className="font-semibold text-white mb-4">Revenue Overview</h3>
          <div className="flex items-center justify-center h-[200px] border border-dashed border-[#2d2d4e] rounded-lg">
            <p className="text-gray-500 text-sm">Chart Placeholder</p>
          </div>
        </div>
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6 min-h-[300px]">
          <h3 className="font-semibold text-white mb-4">System Alerts</h3>
          <div className="space-y-3">
            {[
              { title: 'Server CPU spike detected', type: 'warning' },
              { title: 'New employee onboarded: Jane Doe', type: 'info' },
              { title: 'Project "Alpha" is delayed', type: 'danger' },
              { title: 'Invoice #INV-2026 paid successfully', type: 'success' },
            ].map((alert, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#0f0f1a] border border-[#2d2d4e]">
                <div className={`w-2 h-2 rounded-full ${
                  alert.type === 'warning' ? 'bg-amber-500' :
                  alert.type === 'danger' ? 'bg-rose-500' :
                  alert.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                }`}></div>
                <span className="text-sm text-gray-300">{alert.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
