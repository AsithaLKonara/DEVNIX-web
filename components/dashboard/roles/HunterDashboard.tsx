'use client';

export function HunterDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">Partner Dashboard</h2>
        <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Copy Referral Link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Earnings', value: 'LKR 4,250', color: 'text-emerald-400' },
          { label: 'Pending Payout', value: 'LKR 1,000', color: 'text-amber-400' },
          { label: 'Active Referrals', value: '3', color: 'text-blue-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 text-center">
            <p className="text-sm font-medium text-gray-400">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6">
        <h3 className="font-semibold text-white mb-4">Your Referrals</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0f0f1a] text-gray-400 border-b border-[#2d2d4e]">
              <tr>
                <th className="p-3 font-medium rounded-tl-lg">Client Name</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Project Value</th>
                <th className="p-3 font-medium">Your Commission (10%)</th>
                <th className="p-3 font-medium rounded-tr-lg">Payout Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#2d2d4e]/50 hover:bg-[#2d2d4e]/30">
                <td className="p-3 font-medium text-white">Acme Corp</td>
                <td className="p-3"><span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs">Project Active</span></td>
                <td className="p-3">LKR 10,000</td>
                <td className="p-3 text-emerald-400 font-medium">LKR 1,000</td>
                <td className="p-3"><span className="text-amber-400">Pending</span></td>
              </tr>
              <tr className="border-b border-[#2d2d4e]/50 hover:bg-[#2d2d4e]/30">
                <td className="p-3 font-medium text-white">TechFlow Inc</td>
                <td className="p-3"><span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full text-xs">Negotiation</span></td>
                <td className="p-3">TBD</td>
                <td className="p-3 text-gray-500">-</td>
                <td className="p-3"><span className="text-gray-500">-</span></td>
              </tr>
              <tr className="hover:bg-[#2d2d4e]/30">
                <td className="p-3 font-medium text-white">Global Retail</td>
                <td className="p-3"><span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs">Completed</span></td>
                <td className="p-3">LKR 32,500</td>
                <td className="p-3 text-emerald-400 font-medium">LKR 3,250</td>
                <td className="p-3"><span className="text-emerald-400">Paid out</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
