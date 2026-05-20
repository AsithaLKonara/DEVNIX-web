'use client';

import { Bell, Search, Menu } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    // Basic logout handling for UI testing - will integrate properly later
    localStorage.removeItem('xonit_space_auth_token');
    router.push('/login');
  };

  return (
    <header className="h-16 bg-[#1a1a2e]/80 backdrop-blur-md border-b border-[#2d2d4e] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-400 hover:text-white rounded-md hover:bg-[#2d2d4e]/50"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:flex items-center gap-2 bg-[#0f0f1a] border border-[#2d2d4e] rounded-lg px-3 py-1.5 w-64 focus-within:border-[#6366f1] focus-within:ring-1 focus-within:ring-[#6366f1] transition-all">
          <Search size={16} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-gray-500"
          />
          <div className="flex items-center gap-1">
            <kbd className="hidden lg:inline-flex items-center gap-1 bg-[#1a1a2e] border border-[#2d2d4e] rounded px-1.5 text-[10px] font-medium text-gray-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#2d2d4e]/50 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1a1a2e]"></span>
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-[#2d2d4e]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 focus:ring-offset-[#1a1a2e]"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium text-sm">
              AL
            </div>
            <span className="hidden md:block text-sm font-medium text-white">Admin User</span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1a1a2e] border border-[#2d2d4e] rounded-lg shadow-xl py-1 overflow-hidden z-50">
              <div className="px-4 py-2 border-b border-[#2d2d4e]">
                <p className="text-sm text-white font-medium">Admin User</p>
                <p className="text-xs text-gray-400 truncate">admin@xonit.space</p>
              </div>
              <button 
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2d2d4e] hover:text-white transition-colors"
                onClick={() => {
                  setShowProfileMenu(false);
                  router.push('/dashboard/settings');
                }}
              >
                Profile Settings
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
