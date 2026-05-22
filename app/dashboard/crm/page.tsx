'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Phone, Mail, Building, MoreHorizontal, Calendar, DollarSign, Loader2, AlertCircle } from 'lucide-react';
import { crmApi, type CrmLead } from '@/lib/api/modules.api';
import { DashboardSkeleton } from '@/components/dashboard/responsive/SkeletonLoaders';

interface PipelineStage {
  id: string;
  title: string;
  color: string;
  leads: CrmLead[];
}

const MOCK_LEADS: CrmLead[] = [
  { id: 'l1', clientName: 'John Smith', company: 'Global Tech Inc', value: 12000, stage: 'NEW', notes: 'Website' },
  { id: 'l2', clientName: 'Sarah Connor', company: 'Nexus Innovations', value: 8500, stage: 'NEW', notes: 'Referral' },
  { id: 'l3', clientName: 'Michael Chang', company: 'Apex Retail', value: 25000, stage: 'CONTACTED', notes: 'LinkedIn' },
  { id: 'l4', clientName: 'Emma Wilson', company: 'Quantum Logistics', value: 45000, stage: 'QUALIFIED', notes: 'Conference' },
  { id: 'l5', clientName: 'David Lee', company: 'Starlight Media', value: 15000, stage: 'QUALIFIED', notes: 'Cold Call' },
  { id: 'l6', clientName: 'Robert Chen', company: 'Horizon Finance', value: 60000, stage: 'PROPOSAL', notes: 'Website' },
  { id: 'l7', clientName: 'Alice Cooper', company: 'Vertex Solutions', value: 32000, stage: 'WON', notes: 'Referral' },
];

const STAGES = [
  { id: 'NEW', title: 'New Leads', color: 'bg-blue-500' },
  { id: 'CONTACTED', title: 'Contacted', color: 'bg-amber-500' },
  { id: 'QUALIFIED', title: 'Qualified', color: 'bg-purple-500' },
  { id: 'PROPOSAL', title: 'Proposal Sent', color: 'bg-rose-500' },
  { id: 'WON', title: 'Closed Won', color: 'bg-emerald-500' }
];

function mapLeadsToPipeline(leads: CrmLead[]): PipelineStage[] {
  return STAGES.map(stage => ({
    ...stage,
    leads: leads.filter(lead => lead.stage === stage.id)
  }));
}

export default function CRMPipelinePage() {
  const [pipeline, setPipeline] = useState<PipelineStage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      setIsLoading(true);
      try {
        const data = await crmApi.listLeads();
        setPipeline(mapLeadsToPipeline(Array.isArray(data) && data.length > 0 ? data : MOCK_LEADS));
      } catch (err) {
        console.warn('CRM API unavailable, using mock data:', err);
        setError('Showing cached data — API connection unavailable.');
        setPipeline(mapLeadsToPipeline(MOCK_LEADS));
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const handleMoveLead = async (leadId: string, newStage: string) => {
    // Optimistic update
    setPipeline(prev => {
      const updated = prev.map(stage => ({
        ...stage,
        leads: stage.leads.filter(l => l.id !== leadId)
      }));
      const lead = prev.flatMap(s => s.leads).find(l => l.id === leadId);
      if (lead) {
        const targetStage = updated.find(s => s.id === newStage);
        if (targetStage) {
          targetStage.leads.push({ ...lead, stage: newStage });
        }
      }
      return updated;
    });

    try {
      await crmApi.updateLeadStage(leadId, newStage);
    } catch (err) {
      console.warn('Lead stage update failed (backend offline)', err);
    }
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0 w-full">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Sales Pipeline</h1>
          <p className="text-gray-400 text-sm mt-1">Manage leads, track opportunities, and close deals.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto items-stretch sm:items-center gap-3">
          <div className="flex items-center gap-2 bg-[#1a1a2e] border border-[#2d2d4e] rounded-lg px-3 py-2 w-full md:w-64 focus-within:border-[#6366f1] transition-colors">
            <Search size={16} className="text-gray-500" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="bg-transparent border-none outline-none text-sm text-white w-full"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-initial flex items-center justify-center p-2 bg-[#1a1a2e] hover:bg-[#2d2d4e] border border-[#2d2d4e] text-gray-300 rounded-lg transition-colors">
              <Filter size={18} />
            </button>
            <button className="flex-[2] sm:flex-initial flex items-center justify-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
              <Plus size={16} />
              Add Lead
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center gap-3 text-amber-400 text-sm">
          <AlertCircle size={16} />
          <p>{error}</p>
        </div>
      )}

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
                      <div className="w-8 h-8 rounded bg-[#2d2d4e] flex items-center justify-center shrink-0">
                        <Building size={14} className="text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate w-40">{lead.company || lead.clientName}</p>
                        <p className="text-xs text-gray-400 truncate w-40">{lead.clientName}</p>
                      </div>
                    </div>
                    {/* Quick Move Dropdown */}
                    <div className="relative">
                      <button className="text-gray-600 opacity-0 group-hover:opacity-100 hover:text-white transition-all">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <DollarSign size={13} className="text-emerald-400" />
                        <span>Value</span>
                      </div>
                      <span className="font-medium text-emerald-400">LKR {lead.value?.toLocaleString() || '0'}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Calendar size={13} />
                        <span>Last Contact</span>
                      </div>
                      <span className="text-gray-300">Recently</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#2d2d4e] flex justify-between items-center">
                    <span className="bg-[#1a1a2e] text-gray-400 px-2 py-1 rounded text-[10px] font-medium border border-[#2d2d4e] truncate w-24 block">
                      {typeof lead.notes === 'string'
                        ? lead.notes
                        : Array.isArray(lead.notes) && (lead.notes as any[]).length > 0
                          ? (lead.notes as any[])[0].content
                          : 'No source'}
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
