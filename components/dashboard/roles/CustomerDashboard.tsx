'use client';

export function CustomerDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">Client Portal</h2>
      </div>

      <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Active Project: E-Commerce Redesign</h3>
          <span className="bg-[#6366f1]/10 text-[#818cf8] px-3 py-1 rounded-full text-xs font-medium">In Progress</span>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Overall Progress</span>
            <span className="text-white font-medium">65%</span>
          </div>
          <div className="w-full bg-[#0f0f1a] rounded-full h-3">
            <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] h-3 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[#2d2d4e] pt-6">
          <div>
            <p className="text-sm text-gray-500">Project Manager</p>
            <p className="text-sm text-white font-medium mt-1">Sarah Jenkins</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Expected Delivery</p>
            <p className="text-sm text-white font-medium mt-1">Oct 15, 2026</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Latest Milestone</p>
            <p className="text-sm text-white font-medium mt-1">Design Handoff</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Invoices & Payments</h3>
          <div className="space-y-3">
            {[
              { id: 'INV-2026-04', amount: '$5,000', status: 'Paid', date: 'Sep 01, 2026' },
              { id: 'INV-2026-05', amount: '$5,000', status: 'Pending', date: 'Oct 01, 2026' },
            ].map((inv, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#0f0f1a] border border-[#2d2d4e]">
                <div>
                  <p className="text-sm text-white font-medium">{inv.id}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{inv.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white font-medium">{inv.amount}</p>
                  <span className={`text-xs ${inv.status === 'Paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6">
          <h3 className="font-semibold text-white mb-4">Recent Documents</h3>
          <div className="space-y-3">
            {[
              { name: 'Signed NDA.pdf', size: '245 KB' },
              { name: 'Wireframes_v2.fig', size: 'External Link' },
              { name: 'Project_Proposal.pdf', size: '1.2 MB' },
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#0f0f1a] border border-[#2d2d4e] hover:border-[#6366f1] cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#2d2d4e] flex items-center justify-center">
                    <span className="text-xs">📄</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium">{doc.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{doc.size}</p>
                  </div>
                </div>
                <button className="text-[#818cf8] hover:text-white text-sm font-medium">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
