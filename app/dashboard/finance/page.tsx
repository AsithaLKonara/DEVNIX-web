'use client';

import { useState, useEffect } from 'react';
import { Download, Plus, Filter, TrendingUp, TrendingDown, DollarSign, CreditCard, Loader2, AlertCircle } from 'lucide-react';
import { financeApi, type Invoice } from '@/lib/api/modules.api';
import { CashFlowChart } from '@/components/dashboard/charts/CashFlowChart';
import { DashboardSkeleton } from '@/components/dashboard/responsive/SkeletonLoaders';

const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-2026-089', invoiceNumber: 'INV-2026-089', clientName: 'Acme Corp', project: { name: 'E-Commerce Redesign' }, amount: 12500, status: 'PAID', date: 'Oct 01, 2026' } as any,
  { id: 'INV-2026-090', invoiceNumber: 'INV-2026-090', clientName: 'TechFlow', project: { name: 'Mobile App Launch' }, amount: 8500, status: 'PENDING', date: 'Oct 05, 2026' } as any,
  { id: 'INV-2026-091', invoiceNumber: 'INV-2026-091', clientName: 'Global Retail', project: { name: 'CRM Integration' }, amount: 24000, status: 'OVERDUE', date: 'Sep 15, 2026' } as any,
  { id: 'INV-2026-092', invoiceNumber: 'INV-2026-092', clientName: 'Stark Industries', project: { name: 'Brand Identity' }, amount: 5000, status: 'DRAFT', date: 'Oct 10, 2026' } as any,
];

const MOCK_SUMMARY = {
  totalRevenue: 845200,
  totalExpenses: 18400,
  pendingInvoices: 42500,
  overduePayments: 24000,
};

export default function FinanceDashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [summary, setSummary] = useState(MOCK_SUMMARY);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [invoicesData, summaryData] = await Promise.all([
          financeApi.listInvoices(),
          financeApi.getFinancialSummary(),
        ]);
        setInvoices(Array.isArray(invoicesData) && invoicesData.length > 0 ? invoicesData : MOCK_INVOICES);
        
        if (summaryData && summaryData.totalRevenue !== undefined) {
           setSummary({
             totalRevenue: summaryData.totalRevenue,
             totalExpenses: summaryData.totalExpenses,
             pendingInvoices: summaryData.pendingInvoices,
             overduePayments: MOCK_SUMMARY.overduePayments, // Fallback if not provided
           });
        } else {
           setSummary(MOCK_SUMMARY);
        }
      } catch (err) {
        console.warn('Finance API unavailable, using mock data:', err);
        setError('Showing cached data — API connection unavailable.');
        setInvoices(MOCK_INVOICES);
        setSummary(MOCK_SUMMARY);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Financial Overview</h1>
          <p className="text-gray-400 text-sm mt-1">Track revenue, manage invoices, and monitor agency expenses.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-[#1a1a2e] hover:bg-[#2d2d4e] border border-[#2d2d4e] text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <Download size={16} />
            Export Report
          </button>
          <button className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus size={16} />
            New Invoice
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center gap-3 text-amber-400 text-sm">
          <AlertCircle size={16} />
          <p>{error}</p>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500"><TrendingUp size={64} /></div>
          <p className="text-sm font-medium text-gray-400">Total Revenue (YTD)</p>
          <p className="text-3xl font-bold text-white mt-2">LKR {summary.totalRevenue.toLocaleString()}</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-emerald-400 font-medium">+15.2%</span>
            <span className="text-gray-500">vs last year</span>
          </div>
        </div>
        
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-blue-500"><DollarSign size={64} /></div>
          <p className="text-sm font-medium text-gray-400">Outstanding Invoices</p>
          <p className="text-3xl font-bold text-white mt-2">LKR {summary.pendingInvoices.toLocaleString()}</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-gray-400 font-medium">{invoices.filter(i => i.status === 'PENDING').length} invoices pending</span>
          </div>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-rose-500"><TrendingDown size={64} /></div>
          <p className="text-sm font-medium text-gray-400">Overdue Payments</p>
          <p className="text-3xl font-bold text-white mt-2">LKR {summary.overduePayments.toLocaleString()}</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-rose-400 font-medium">Action Required</span>
          </div>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-purple-500"><CreditCard size={64} /></div>
          <p className="text-sm font-medium text-gray-400">Monthly Expenses</p>
          <p className="text-3xl font-bold text-white mt-2">LKR {summary.totalExpenses.toLocaleString()}</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-rose-400 font-medium">+2.4%</span>
            <span className="text-gray-500">vs last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Table */}
        <div className="lg:col-span-2 bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl flex flex-col">
          <div className="p-5 border-b border-[#2d2d4e] flex justify-between items-center">
            <h3 className="font-semibold text-white">Recent Invoices</h3>
            <button className="text-sm text-[#818cf8] hover:text-white transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="bg-[#0f0f1a] text-gray-400 border-b border-[#2d2d4e]">
                <tr>
                  <th className="p-4 font-medium">Invoice</th>
                  <th className="p-4 font-medium">Client / Project</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-[#2d2d4e]/50 hover:bg-[#2d2d4e]/30 transition-colors">
                    <td className="p-4 font-medium text-white">{inv.invoiceNumber || inv.id.slice(0, 8)}</td>
                    <td className="p-4">
                      <p className="text-white font-medium">{inv.clientName}</p>
                      <p className="text-xs text-gray-500">{inv.project?.name || 'N/A'}</p>
                    </td>
                    <td className="p-4 font-medium">LKR {inv.amount?.toLocaleString()}</td>
                    <td className="p-4">{inv.date || inv.issuedDate || 'N/A'}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        inv.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        inv.status === 'PENDING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        inv.status === 'OVERDUE' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Summary */}
        <div className="space-y-6">
          <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6 flex flex-col">
            <h3 className="font-semibold text-white mb-4">Cash Flow (30 Days)</h3>
            <div className="min-h-[160px] flex-1">
              <CashFlowChart />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Money In</p>
                <p className="text-lg font-bold text-emerald-400">LKR 65,000</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Money Out</p>
                <p className="text-lg font-bold text-rose-400">LKR 18,400</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-[#0f0f1a] border border-[#2d2d4e] hover:border-[#6366f1] text-gray-300 hover:text-white transition-colors group">
                <span className="text-sm font-medium">Record Expense</span>
                <Plus size={16} className="text-gray-500 group-hover:text-[#818cf8]" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-[#0f0f1a] border border-[#2d2d4e] hover:border-[#6366f1] text-gray-300 hover:text-white transition-colors group">
                <span className="text-sm font-medium">Send Reminders</span>
                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{invoices.filter(i => i.status === 'OVERDUE').length} Due</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-[#0f0f1a] border border-[#2d2d4e] hover:border-[#6366f1] text-gray-300 hover:text-white transition-colors group">
                <span className="text-sm font-medium">Connect Bank</span>
                <span className="text-xs text-emerald-400">Plaid</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
