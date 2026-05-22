'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  CreditCard, 
  Settings,
  Menu,
  X,
  UserCheck,
  Megaphone,
  Bell,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';

const navItems = [
  { 
    name: 'Dashboard', 
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
    name: 'Finance', 
    href: '/dashboard/finance', 
    icon: CreditCard,
    roles: ['SUPER_ADMIN', 'ADMIN'] 
  },
  { 
    name: 'HR', 
    href: '/dashboard/hr', 
    icon: UserCheck,
    roles: ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER'] 
  },
  { 
    name: 'Referrals', 
    href: '/dashboard/referrals', 
    icon: Megaphone,
    roles: ['SUPER_ADMIN', 'ADMIN', 'HUNTER', 'INFLUENCER'] 
  },
  { 
    name: 'Files', 
    href: '/dashboard/files', 
    icon: FileText,
    roles: ['SUPER_ADMIN', 'ADMIN', 'PROJECT_MANAGER', 'EMPLOYEE', 'CUSTOMER'] 
  },
];

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1a2e] border-r border-[#2d2d4e]
        transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static
        flex flex-col h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-[#2d2d4e]">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/logo/group-3.png"
              alt="Xonit Logo"
              width={160}
              height={40}
              className="h-8 w-auto object-contain drop-shadow-[0_0_20px_rgba(123,164,208,0.3)]"
              priority
            />
          </Link>
          <button 
            onClick={() => setIsOpen(false)} 
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-md hover:bg-[#2d2d4e]/50 transition-colors shrink-0"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {(() => {
            const isSettingsActive = pathname === '/dashboard/settings' || pathname.startsWith('/dashboard/settings/');
            
            // Check if any specific sub-item (excluding root Dashboard) is active
            const isAnyOtherActive = navItems
              .filter((item) => item.href !== '/dashboard')
              .some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)) || isSettingsActive;

            return navItems.map((item) => {
              const userRole = user?.role || 'ADMIN';
              const isAllowed = item.roles.includes(userRole);
              if (!isAllowed) return null;

              const isActive = item.href === '/dashboard'
                ? pathname === '/dashboard' || (!isAnyOtherActive && pathname.startsWith('/dashboard/'))
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group
                    ${isActive 
                      ? 'bg-[#6366f1]/10 text-[#818cf8]' 
                      : 'text-[#a1a1b5] hover:bg-[#2d2d4e]/50 hover:text-white'
                    }
                  `}
                >
                  <item.icon size={20} className={isActive ? 'text-[#818cf8]' : 'text-gray-400 group-hover:text-white'} />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            });
          })()}
        </nav>

        <div className="p-4 border-t border-[#2d2d4e] flex flex-col gap-2">
          {(() => {
            const isSettingsActive = pathname === '/dashboard/settings' || pathname.startsWith('/dashboard/settings/');
            return (
              <Link
                href="/dashboard/settings"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group
                  ${isSettingsActive 
                    ? 'bg-[#6366f1]/10 text-[#818cf8]' 
                    : 'text-[#a1a1b5] hover:bg-[#2d2d4e]/50 hover:text-white'
                  }
                `}
              >
                <Settings size={20} className={isSettingsActive ? 'text-[#818cf8]' : 'text-gray-400 group-hover:text-white'} />
                <span className="font-medium text-sm">Settings</span>
              </Link>
            );
          })()}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors group text-left cursor-pointer border-none outline-none"
          >
            <LogOut size={20} className="text-rose-400 group-hover:text-rose-300" />
            <span className="font-medium text-sm">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
