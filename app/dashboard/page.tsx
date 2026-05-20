'use client';

import { useState } from 'react';
import { AdminDashboard } from '@/components/dashboard/roles/AdminDashboard';
import { PmDashboard } from '@/components/dashboard/roles/PmDashboard';
import { DeveloperDashboard } from '@/components/dashboard/roles/DeveloperDashboard';
import { CustomerDashboard } from '@/components/dashboard/roles/CustomerDashboard';
import { HunterDashboard } from '@/components/dashboard/roles/HunterDashboard';

// Mock roles for development - will be replaced with real auth context
const ROLES = ['ADMIN', 'PROJECT_MANAGER', 'EMPLOYEE', 'CUSTOMER', 'HUNTER'];

export default function DashboardOverview() {
  const [activeRole, setActiveRole] = useState('ADMIN');

  return (
    <div className="space-y-6">
      {/* Dev Mode Role Switcher (Temporary) */}
      <div className="bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-lg p-4 flex items-center justify-between">
        <p className="text-sm text-[#818cf8] font-medium">Dev Mode: Viewing as Role</p>
        <select 
          className="bg-[#1a1a2e] border border-[#6366f1]/50 text-white text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-[#818cf8]"
          value={activeRole}
          onChange={(e) => setActiveRole(e.target.value)}
        >
          {ROLES.map(role => (
            <option key={role} value={role}>{role.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      {/* Role-Based Dashboard Rendering */}
      {activeRole === 'ADMIN' && <AdminDashboard />}
      {activeRole === 'PROJECT_MANAGER' && <PmDashboard />}
      {activeRole === 'EMPLOYEE' && <DeveloperDashboard />}
      {activeRole === 'CUSTOMER' && <CustomerDashboard />}
      {activeRole === 'HUNTER' && <HunterDashboard />}
    </div>
  );
}
