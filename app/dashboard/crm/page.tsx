'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Phone, Mail, Building, MoreHorizontal, Calendar, DollarSign } from 'lucide-react';

const initialPipeline = [
  {
    id: 'new',
    title: 'New Leads',
    color: 'bg-blue-500',
    leads: [
      { id: 'l1', company: 'Global Tech Inc', contact: 'John Smith', value: '$12,000', lastContact: 'Today', source: 'Website' },
      { id: 'l2', company: 'Nexus Innovations', contact: 'Sarah Connor', value: '$8,500', lastContact: 'Yesterday', source: 'Referral' },
    ]
  },
  {
    id: 'contacted',
    title: 'Contacted',
    color: 'bg-amber-500',
    leads: [
      { id: 'l3', company: 'Apex Retail', contact: 'Michael Chang', value: '$25,000', lastContact: '2 days ago', source: 'LinkedIn' },
    ]
  },
  {
    id: 'qualified',
    title: 'Qualified',
    color: 'bg-purple-500',
    leads: [
      { id: 'l4', company: 'Quantum Logistics', contact: 'Emma Wilson', value: '$45,000', lastContact: '3 days ago', source: 'Conference' },
      { id: 'l5', company: 'Starlight Media', contact: 'David Lee', value: '$15,000', lastContact: '1 week ago', source: 'Cold Call' },
    ]
  },
  {
    id: 'proposal',
    title: 'Proposal Sent',
    color: 'bg-rose-500',
    leads: [
      { id: 'l6', company: 'Horizon Finance', contact: 'Robert Chen', value: '$60,000', lastContact: '1 day ago', source: 'Website' },
    ]
  },
  {
    id: 'won',
    title: 'Closed Won',
    color: 'bg-emerald-500',
    leads: [
      { id: 'l7', company: 'Vertex Solutions', contact: 'Alice Cooper', value: '$32,000', lastContact: '1 month ago', source: 'Referral' },
    ]
  }
];

export default function CRMPipelinePage() {
  const [pipeline] = useState(initialPipeline);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sales Pipeline</h1>
          <p className="text-gray-400 text-sm mt-1">Manage leads, track opportunities, and close deals.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-[#1a1a2e] border border-[#2d2d4e] rounded-lg px-3 py-2 w-64 focus-within:border-[#6366f1] transition-colors">
            <Search size={16} className="text-gray-500" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="bg-transparent border-none outline-none text-sm text-white w-full"
            />
          </div>
          <button className="flex items-center justify-center p-2 bg-[#1a1a2e] hover:bg-[#2d2d4e] border border-[#2d2d4e] text-gray-300 rounded-lg transition-colors">
            <Filter size={18} />
          </button>
          <button className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus size={16} />
            Add Lead
          </button>
        </div>
      </div>

      {/* Pipeline Board Area */}
      <div className="flex-1 overflow-x-auto flex gap-6 pb-4">
        {pipeline.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80 flex flex-col bg-[#1a1a2e]/50 border border-[#2d2d4e] rounded-xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-[#2d2d4e] bg-[#1a1a2e]">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                <h3 className="font-semibold text-white">{stage.title}</h3>
                <span className="bg-[#2d2d4e] text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium ml-1">
                  {stage.leads.length}
                </span>
              </div>
              <button className="text-gray-500 hover:text-white transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              {stage.leads.map((lead) => (
                <div key={lead.id} className="bg-[#0f0f1a] border border-[#2d2d4e] p-4 rounded-lg hover:border-[#6366f1]/50 cursor-grab active:cursor-grabbing transition-colors group shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-[#2d2d4e] flex items-center justify-center">
                        <Building size={14} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{lead.company}</p>
                        <p className="text-xs text-gray-400">{lead.contact}</p>
                      </div>
                    </div>
                    <button className="text-gray-600 opacity-0 group-hover:opacity-100 hover:text-white transition-all">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <DollarSign size={13} className="text-emerald-400" />
                        <span>Value</span>
                      </div>
                      <span className="font-medium text-emerald-400">{lead.value}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Calendar size={13} />
                        <span>Last Contact</span>
                      </div>
                      <span className="text-gray-300">{lead.lastContact}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#2d2d4e] flex justify-between items-center">
                    <span className="bg-[#1a1a2e] text-gray-400 px-2 py-1 rounded text-[10px] font-medium border border-[#2d2d4e]">
                      {lead.source}
                    </span>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded bg-[#1a1a2e] border border-[#2d2d4e] text-gray-400 hover:text-[#818cf8] hover:border-[#818cf8]/50 transition-colors">
                        <Mail size={12} />
                      </button>
                      <button className="p-1.5 rounded bg-[#1a1a2e] border border-[#2d2d4e] text-gray-400 hover:text-emerald-400 hover:border-emerald-400/50 transition-colors">
                        <Phone size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-[#2d2d4e]/50 rounded-lg transition-colors border border-dashed border-transparent hover:border-[#6366f1]/50">
                <Plus size={16} />
                Add Lead
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
