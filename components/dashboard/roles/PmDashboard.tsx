'use client';

export function PmDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">Project Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Active Projects', value: '12', color: 'border-blue-500/50' },
          { label: 'Tasks Pending Review', value: '28', color: 'border-amber-500/50' },
          { label: 'Delayed Milestones', value: '3', color: 'border-rose-500/50' },
        ].map((stat, i) => (
          <div key={i} className={`bg-[#1a1a2e] border ${stat.color} rounded-xl p-5`}>
            <p className="text-sm font-medium text-gray-400">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Team Workload Map</h3>
          <div className="space-y-4">
            {[
              { name: 'Dev Team Alpha', load: 85 },
              { name: 'Design Team', load: 40 },
              { name: 'QA Team', load: 95 },
            ].map((team, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{team.name}</span>
                  <span className={team.load > 80 ? 'text-rose-400' : 'text-emerald-400'}>{team.load}% Capacity</span>
                </div>
                <div className="w-full bg-[#0f0f1a] rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${team.load > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${team.load}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Urgent Approvals</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 rounded-lg bg-[#0f0f1a] border border-[#2d2d4e] hover:border-[#6366f1] cursor-pointer transition-colors">
                <p className="text-sm text-gray-300 font-medium">Approve PR #1042</p>
                <p className="text-xs text-gray-500 mt-1">Project: E-Commerce Redesign</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
