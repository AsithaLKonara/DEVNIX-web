'use client';

import { Bell, Search, Menu, X, CheckCircle, AlertCircle, Info, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/components/providers/SocketProvider';

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, isConnected, markAsRead } = useSocket();
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    localStorage.removeItem('xonit_space_auth_token');
    router.push('/login');
  };

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={16} className="text-emerald-400" />;
      case 'warning': return <AlertCircle size={16} className="text-amber-400" />;
      case 'error': return <X size={16} className="text-rose-400" />;
      default: return <Info size={16} className="text-blue-400" />;
    }
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
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#2d2d4e]/50 transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 border-2 border-[#1a1a2e] text-[8px] font-bold text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-[#2d2d4e] flex justify-between items-center bg-[#0f0f1a]">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white text-sm">Notifications</h3>
                  {isConnected ? (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  )}
                </div>
                <button 
                  className="text-xs text-[#818cf8] hover:text-white transition-colors"
                  onClick={() => notifications.forEach(n => markAsRead(n.id))}
                >
                  Mark all read
                </button>
              </div>
              
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500 text-sm">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`px-4 py-3 border-b border-[#2d2d4e]/50 flex gap-3 hover:bg-[#2d2d4e]/30 transition-colors group cursor-pointer ${notif.read ? 'opacity-60' : 'bg-[#6366f1]/5'}`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="mt-0.5 shrink-0">
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${notif.read ? 'text-gray-400' : 'text-gray-200 font-medium'} leading-snug`}>
                          {notif.message}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-1">
                          {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {!notif.read && (
                        <div className="shrink-0 flex flex-col justify-center">
                          <button 
                            className="p-1 rounded-full text-gray-500 hover:text-white hover:bg-[#2d2d4e] transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notif.id);
                            }}
                          >
                            <Check size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 bg-[#0f0f1a] border-t border-[#2d2d4e]">
                <button className="w-full py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

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
