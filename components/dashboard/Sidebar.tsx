'use client';

import Link from 'next/link';
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
  Bell
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
  { name: 'CRM', href: '/dashboard/crm', icon: Users },
  { name: 'Finance', href: '/dashboard/finance', icon: CreditCard },
  { name: 'HR', href: '/dashboard/hr', icon: UserCheck },
  { name: 'Referrals', href: '/dashboard/referrals', icon: Megaphone },
  { name: 'Files', href: '/dashboard/files', icon: FileText },
];

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();

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
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
              <span className="text-white font-bold text-lg">X</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Xonit Space</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
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
          })}
        </nav>

        <div className="p-4 border-t border-[#2d2d4e]">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#a1a1b5] hover:bg-[#2d2d4e]/50 hover:text-white transition-colors group"
          >
            <Settings size={20} className="text-gray-400 group-hover:text-white" />
            <span className="font-medium text-sm">Settings</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
