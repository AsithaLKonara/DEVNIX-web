'use client';

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <div className="flex gap-2">
          <select className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-md px-3 py-1.5 text-sm text-gray-300 outline-none focus:border-[#6366f1]">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$124,500', change: '+12.5%', isPositive: true },
          { label: 'Active Projects', value: '34', change: '+2', isPositive: true },
          { label: 'Pending Tasks', value: '142', change: '-5', isPositive: true },
          { label: 'Overdue Invoices', value: '3', change: '+1', isPositive: false },
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
        <div className="lg:col-span-2 bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6 min-h-[400px] flex items-center justify-center">
          <p className="text-gray-500 text-sm">Revenue Chart (Coming Soon)</p>
        </div>
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-[#6366f1]"></div>
                <div>
                  <p className="text-sm text-gray-300">New project <span className="text-white font-medium">Alpha Redesign</span> created.</p>
                  <p className="text-xs text-gray-500 mt-0.5">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
