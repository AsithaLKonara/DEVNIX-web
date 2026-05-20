'use client';

export function DeveloperDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">My Workspace</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Assigned Tasks', value: '8' },
          { label: 'In Progress', value: '2' },
          { label: 'In Review', value: '3' },
          { label: 'Hours Logged (Week)', value: '32h' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5">
            <p className="text-sm font-medium text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Today's Focus</h3>
          <div className="space-y-3">
            {[
              { title: 'Fix JWT auth bug', priority: 'High', status: 'In Progress' },
              { title: 'Update button component', priority: 'Medium', status: 'To Do' },
              { title: 'Write unit tests for utils', priority: 'Low', status: 'To Do' },
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#0f0f1a] border border-[#2d2d4e]">
                <div>
                  <p className="text-sm text-gray-300 font-medium">{task.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{task.status}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === 'High' ? 'bg-rose-500/10 text-rose-400' :
                  task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-emerald-500/10 text-emerald-400'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-[#6366f1]"></div>
                <div>
                  <p className="text-sm text-gray-300">You moved <span className="text-white font-medium">Add payment gateway</span> to Review.</p>
                  <p className="text-xs text-gray-500 mt-0.5">3 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
