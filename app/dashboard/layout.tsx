'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { SocketProvider } from '@/components/providers/SocketProvider';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { ShieldAlert, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { MobileBottomNav } from '@/components/dashboard/responsive/MobileBottomNav';
import { DashboardSkeleton } from '@/components/dashboard/responsive/SkeletonLoaders';

// Strict Whitelist Mapping for Frontend RBAC
const ROUTE_ROLE_MAP: Record<string, string[]> = {
  '/dashboard/projects': ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER', 'EMPLOYEE'],
  '/dashboard/crm': ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER'],
  '/dashboard/finance': ['SUPER_ADMIN', 'ADMIN'],
  '/dashboard/hr': ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER'],
  '/dashboard/referrals': ['SUPER_ADMIN', 'ADMIN', 'HUNTER', 'INFLUENCER'],
  '/dashboard/files': ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER', 'EMPLOYEE', 'CUSTOMER'],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  // Find if current route has role restrictions
  const restrictedRoute = Object.keys(ROUTE_ROLE_MAP).find(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAllowed = !restrictedRoute || (user && ROUTE_ROLE_MAP[restrictedRoute].includes(user.role));

  return (
    <SocketProvider>
      <div className="flex h-screen bg-[#0f0f1a] overflow-hidden font-sans text-slate-300">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto">
              {isLoading ? (
                <DashboardSkeleton />
              ) : !isAllowed ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-[#1a1a2e]/50 border border-rose-500/20 rounded-xl max-w-2xl mx-auto mt-12 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6 border border-rose-500/20">
                    <ShieldAlert size={32} />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
                  <p className="text-sm text-gray-400 max-w-md mb-6 leading-relaxed">
                    You do not have the required role privileges to view the page at <code className="text-rose-400 font-mono bg-rose-500/5 px-2 py-0.5 rounded border border-rose-500/10">{pathname}</code>.
                  </p>
                  <Link 
                    href="/dashboard" 
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                  >
                    Return to Command Center
                  </Link>
                </div>
              ) : (
                children
              )}
            </div>
          </main>
        </div>

        {/* Mobile-first bottom navigation bar */}
        <MobileBottomNav />
      </div>
    </SocketProvider>
  );
}
