'use client';

import { useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { AdminDashboard } from '@/components/dashboard/roles/AdminDashboard';
import { PmDashboard } from '@/components/dashboard/roles/PmDashboard';
import { DeveloperDashboard } from '@/components/dashboard/roles/DeveloperDashboard';
import { CustomerDashboard } from '@/components/dashboard/roles/CustomerDashboard';
import { HunterDashboard } from '@/components/dashboard/roles/HunterDashboard';
import { Loader2 } from 'lucide-react';

// Dev Mode roles for override when backend is offline
const ROLES = ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER', 'EMPLOYEE', 'CUSTOMER', 'HUNTER'];

function RoleDashboard({ role }: { role: string }) {
  switch (role) {
    case 'SUPER_ADMIN':
    case 'ADMIN':
      return <AdminDashboard />;
    case 'PROJECT_MANAGER':
      return <PmDashboard />;
    case 'EMPLOYEE':
      return <DeveloperDashboard />;
    case 'CUSTOMER':
      return <CustomerDashboard />;
    case 'HUNTER':
      return <HunterDashboard />;
    default:
      return <AdminDashboard />;
  }
}

export default function DashboardOverview() {
  const { user, isLoading } = useAuth();
  const [devOverride, setDevOverride] = useState<string | null>(null);

  // While auth is loading, show spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-[#6366f1]" />
      </div>
    );
  }

  // The active role is either from the dev override or the authenticated user
  const activeRole = devOverride || user?.role || 'ADMIN';

  return (
    <div className="space-y-6">
      {/* Dev Mode Role Switcher — only shown when no user is authenticated (local dev) */}
      {!user && (
        <div className="bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-lg p-4 flex items-center justify-between">
          <p className="text-sm text-[#818cf8] font-medium">Dev Mode: Viewing as Role</p>
          <select 
            className="bg-[#1a1a2e] border border-[#6366f1]/50 text-white text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-[#818cf8]"
            value={activeRole}
            onChange={(e) => setDevOverride(e.target.value)}
          >
            {ROLES.map(role => (
              <option key={role} value={role}>{role.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
      )}

      {/* Role-Based Dashboard Rendering */}
      <RoleDashboard role={activeRole} />
    </div>
  );
}
