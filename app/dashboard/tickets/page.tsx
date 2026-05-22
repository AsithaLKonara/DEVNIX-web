'use client';

import { useState, useEffect } from 'react';
import { Plus, Ticket, Clock, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';
import { apiClient } from '@/lib/apiClient';
import { DashboardSkeleton } from '@/components/dashboard/responsive/SkeletonLoaders';

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  customer: { companyName: string; contactName: string; contactEmail: string };
}

interface Stats { open: number; inProgress: number; resolved: number; total: number }

const STATUS_CONFIG = {
  OPEN:        { label: 'Open',        color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  IN_PROGRESS: { label: 'In Progress', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  RESOLVED:    { label: 'Resolved',    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  CLOSED:      { label: 'Closed',      color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
};

const MOCK_TICKETS: SupportTicket[] = [
  { id: '1', subject: 'Cannot access project portal', description: 'Login page throws 403.', status: 'OPEN', createdAt: new Date().toISOString(), customer: { companyName: 'Wayne Enterprises', contactName: 'Lucius Fox', contactEmail: 'lucius@wayne.corp' } },
  { id: '2', subject: 'Invoice INV-2026-089 duplicate charge', description: 'We were billed twice.', status: 'IN_PROGRESS', createdAt: new Date(Date.now() - 86400000).toISOString(), customer: { companyName: 'TechFlow', contactName: 'Bob Smith', contactEmail: 'bob@techflow.io' } },
  { id: '3', subject: 'Milestone approval request', description: 'Phase 2 complete, requesting sign-off.', status: 'RESOLVED', createdAt: new Date(Date.now() - 172800000).toISOString(), customer: { companyName: 'Acme Corp', contactName: 'Jane Doe', contactEmail: 'jane@acme.com' } },
];

export default function TicketsPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [stats, setStats] = useState<Stats>({ open: 0, inProgress: 0, resolved: 0, total: 0 });
  const [filter, setFilter] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [form, setForm] = useState({ customerId: '', subject: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketsData, statsData] = await Promise.all([
          apiClient.get('/tickets'),
          apiClient.get('/tickets/stats'),
        ]);
        setTickets(Array.isArray(ticketsData) && (ticketsData as any[]).length > 0 ? ticketsData as SupportTicket[] : MOCK_TICKETS);
        if (statsData) setStats(statsData as unknown as Stats);
      } catch {
        setTickets(MOCK_TICKETS);
        const s = MOCK_TICKETS.reduce((acc, t) => { acc[t.status] = (acc[t.status] || 0) + 1; return acc; }, {} as any);
        setStats({ open: s.OPEN || 0, inProgress: s.IN_PROGRESS || 0, resolved: s.RESOLVED || 0, total: MOCK_TICKETS.length });
      } finally { setIsLoading(false); }
    };
    fetchData();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: status as any } : t));
    try { await apiClient.patch(`/tickets/${id}/status`, { status }); }
    catch { /* optimistic — ignore */ }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newTicket = await apiClient.post('/tickets', form) as SupportTicket;
      setTickets(prev => [newTicket, ...prev]);
      setShowNewModal(false);
      setForm({ customerId: '', subject: '', description: '' });
    } catch { /* handle error */ }
    finally { setIsSubmitting(false); }
  };

  const filtered = filter === 'ALL' ? tickets : tickets.filter(t => t.status === filter);

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Support Tickets</h1>
          <p className="text-gray-400 text-sm mt-1">Manage customer support requests and issues.</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} /> New Ticket
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total, icon: Ticket, color: 'text-blue-400' },
          { label: 'Open', value: stats.open, icon: AlertCircle, color: 'text-rose-400' },
          { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'text-amber-400' },
          { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: 'text-emerald-400' },
        ].map(card => (
          <div key={card.label} className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-400">{card.label}</p>
              <card.icon size={18} className={card.color} />
            </div>
            <p className="text-3xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === s ? 'bg-[#6366f1] text-white' : 'bg-[#1a1a2e] text-gray-400 border border-[#2d2d4e] hover:text-white'}`}
          >
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Ticket List */}
      <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <Ticket size={40} className="mx-auto mb-4 opacity-20" />
            <p className="text-sm">No tickets found.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#2d2d4e]">
            {filtered.map(ticket => (
              <div key={ticket.id} className="p-5 hover:bg-[#2d2d4e]/20 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-semibold text-white text-sm truncate">{ticket.subject}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${STATUS_CONFIG[ticket.status].color}`}>
                        {STATUS_CONFIG[ticket.status].label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-1">{ticket.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>{ticket.customer.companyName}</span>
                      <span>·</span>
                      <span>{ticket.customer.contactName}</span>
                      <span>·</span>
                      <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <select
                    value={ticket.status}
                    onChange={e => updateStatus(ticket.id, e.target.value)}
                    className="text-xs bg-[#0f0f1a] border border-[#2d2d4e] text-gray-300 rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#6366f1] shrink-0"
                  >
                    {Object.keys(STATUS_CONFIG).map(s => (
                      <option key={s} value={s}>{STATUS_CONFIG[s as keyof typeof STATUS_CONFIG].label}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Ticket Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Create Support Ticket</h3>
              <button onClick={() => setShowNewModal(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Subject</label>
                <input required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full bg-[#0f0f1a] border border-[#2d2d4e] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6366f1] transition-all"
                  placeholder="Brief description of the issue" />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Description</label>
                <textarea required rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full bg-[#0f0f1a] border border-[#2d2d4e] text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6366f1] transition-all resize-none"
                  placeholder="Detailed explanation..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowNewModal(false)}
                  className="flex-1 bg-[#0f0f1a] border border-[#2d2d4e] text-gray-300 rounded-xl py-2.5 text-sm hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="flex-1 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-xl py-2.5 text-sm font-medium transition-colors disabled:opacity-50">
                  {isSubmitting ? 'Creating...' : 'Create Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
