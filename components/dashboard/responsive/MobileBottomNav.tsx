'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Megaphone, 
  Settings 
} from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const bottomNavItems = [
    { 
      name: 'Home', 
      href: '/dashboard', 
      icon: LayoutDashboard,
      roles: ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER', 'EMPLOYEE', 'CUSTOMER', 'HUNTER', 'INFLUENCER']
    },
    { 
      name: 'Projects', 
      href: '/dashboard/projects', 
      icon: Briefcase,
      roles: ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER', 'EMPLOYEE']
    },
    { 
      name: 'CRM', 
      href: '/dashboard/crm', 
      icon: Users,
      roles: ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER']
    },
    { 
      name: 'Referrals', 
      href: '/dashboard/referrals', 
      icon: Megaphone,
      roles: ['SUPER_ADMIN', 'ADMIN', 'HUNTER', 'INFLUENCER']
    },
    { 
      name: 'Settings', 
      href: '/dashboard/settings', 
      icon: Settings,
      roles: ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER', 'EMPLOYEE', 'CUSTOMER', 'HUNTER', 'INFLUENCER']
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#16162a]/95 backdrop-blur-lg border-t border-[#2d2d4e] px-4 py-2 flex items-center justify-around shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
      {bottomNavItems.map((item) => {
        const userRole = user?.role || 'ADMIN';
        const isAllowed = item.roles.includes(userRole);
        if (!isAllowed) return null;

        const isActive = item.href === '/dashboard'
          ? pathname === '/dashboard'
          : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 px-3 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-[#818cf8] bg-[#6366f1]/10 scale-105' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <item.icon size={20} className={isActive ? 'text-[#818cf8]' : 'text-gray-400'} />
            <span className="text-[10px] font-bold mt-1 tracking-wider uppercase">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
export default MobileBottomNav;
