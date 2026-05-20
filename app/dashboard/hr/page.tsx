'use client';

import { useState } from 'react';
import { Users, UserPlus, Calendar, Clock, Download, CheckCircle, XCircle } from 'lucide-react';

const employees = [
  { id: 'EMP-001', name: 'Alice Cooper', role: 'Senior Developer', department: 'Engineering', status: 'Active' },
  { id: 'EMP-002', name: 'Bob Smith', role: 'Project Manager', department: 'Management', status: 'On Leave' },
  { id: 'EMP-003', name: 'Charlie Davis', role: 'UI/UX Designer', department: 'Design', status: 'Active' },
  { id: 'EMP-004', name: 'Diana Prince', role: 'HR Manager', department: 'Human Resources', status: 'Active' },
];

const leaveRequests = [
  { id: 'LR-102', employee: 'Bob Smith', type: 'Annual Leave', dates: 'Oct 15 - Oct 20', status: 'Pending' },
  { id: 'LR-103', employee: 'Charlie Davis', type: 'Sick Leave', dates: 'Oct 10 (Half Day)', status: 'Pending' },
];

export default function HRDashboardPage() {
  const [activeTab, setActiveTab] = useState<'employees' | 'leave'>('employees');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Human Resources</h1>
          <p className="text-gray-400 text-sm mt-1">Manage team members, attendance, and leave requests.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-[#1a1a2e] hover:bg-[#2d2d4e] border border-[#2d2d4e] text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <Download size={16} />
            Export Data
          </button>
          <button className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <UserPlus size={16} />
            Add Employee
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-blue-500"><Users size={64} /></div>
          <p className="text-sm font-medium text-gray-400">Total Employees</p>
          <p className="text-3xl font-bold text-white mt-2">24</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-emerald-400 font-medium">+2</span>
            <span className="text-gray-500">this month</span>
          </div>
        </div>
        
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500"><Clock size={64} /></div>
          <p className="text-sm font-medium text-gray-400">Present Today</p>
          <p className="text-3xl font-bold text-white mt-2">21</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-gray-400 font-medium">87.5% attendance rate</span>
          </div>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-500"><Calendar size={64} /></div>
          <p className="text-sm font-medium text-gray-400">On Leave</p>
          <p className="text-3xl font-bold text-white mt-2">3</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-amber-400 font-medium">View details</span>
          </div>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-rose-500"><CheckCircle size={64} /></div>
          <p className="text-sm font-medium text-gray-400">Pending Approvals</p>
          <p className="text-3xl font-bold text-white mt-2">5</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-rose-400 font-medium">Requires action</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl flex flex-col">
          <div className="p-4 border-b border-[#2d2d4e] flex gap-4">
            <button 
              onClick={() => setActiveTab('employees')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'employees' ? 'bg-[#2d2d4e] text-white' : 'text-gray-400 hover:text-white hover:bg-[#2d2d4e]/50'
              }`}
            >
              Employee Directory
            </button>
            <button 
              onClick={() => setActiveTab('leave')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'leave' ? 'bg-[#2d2d4e] text-white' : 'text-gray-400 hover:text-white hover:bg-[#2d2d4e]/50'
              }`}
            >
              Leave Management
            </button>
          </div>
          
          <div className="overflow-x-auto">
            {activeTab === 'employees' ? (
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-[#0f0f1a] text-gray-400 border-b border-[#2d2d4e]">
                  <tr>
                    <th className="p-4 font-medium">Employee</th>
                    <th className="p-4 font-medium">Role</th>
                    <th className="p-4 font-medium">Department</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} className="border-b border-[#2d2d4e]/50 hover:bg-[#2d2d4e]/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium text-xs">
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-white font-medium">{emp.name}</p>
                            <p className="text-xs text-gray-500">{emp.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-medium">{emp.role}</td>
                      <td className="p-4">{emp.department}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                          emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {emp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-[#0f0f1a] text-gray-400 border-b border-[#2d2d4e]">
                  <tr>
                    <th className="p-4 font-medium">Employee</th>
                    <th className="p-4 font-medium">Leave Type</th>
                    <th className="p-4 font-medium">Dates</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((req) => (
                    <tr key={req.id} className="border-b border-[#2d2d4e]/50 hover:bg-[#2d2d4e]/30 transition-colors">
                      <td className="p-4 font-medium text-white">{req.employee}</td>
                      <td className="p-4">{req.type}</td>
                      <td className="p-4">{req.dates}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Approve">
                            <CheckCircle size={16} />
                          </button>
                          <button className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors" title="Reject">
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4">Upcoming Birthdays</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2d2d4e] flex items-center justify-center text-xl">🎂</div>
                <div>
                  <p className="text-sm font-medium text-white">Diana Prince</p>
                  <p className="text-xs text-emerald-400">Tomorrow</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2d2d4e] flex items-center justify-center text-xl">🎈</div>
                <div>
                  <p className="text-sm font-medium text-white">Alice Cooper</p>
                  <p className="text-xs text-gray-400">Oct 25</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2d2d4e] rounded-lg transition-colors">
                Company Policies
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2d2d4e] rounded-lg transition-colors">
                Payroll Details
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#2d2d4e] rounded-lg transition-colors">
                Performance Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
