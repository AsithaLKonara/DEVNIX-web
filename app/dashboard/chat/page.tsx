'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Users, Hash, Loader2, Circle } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { io, Socket } from 'socket.io-client';
import { apiClient } from '@/lib/apiClient';

interface ChatMessage {
  id: string;
  content: string;
  createdAt: string;
  sender: { id: string; firstName: string; lastName: string; role: string };
}

interface OnlineUser {
  id: string;
  email: string;
  role: string;
}

const ROLE_COLORS: Record<string, string> = {
  SUPER_ADMIN: 'text-rose-400',
  ADMIN: 'text-orange-400',
  PROJECT_MANAGER: 'text-blue-400',
  EMPLOYEE: 'text-emerald-400',
  CUSTOMER: 'text-purple-400',
  INFLUENCER: 'text-yellow-400',
  HR_MANAGER: 'text-cyan-400',
  ACCOUNTANT: 'text-indigo-400',
};

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const socketRef = useRef<Socket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('xonit_space_auth_token');
    if (!token) return;

    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace('/api/v1', '');

    // Load history via REST first
    apiClient.get('/chat/history').then((data: any) => {
      if (Array.isArray(data)) setMessages(data);
    }).catch(() => {}).finally(() => setIsLoading(false));

    // Connect to socket
    const socket = io(`${baseUrl}/chat`, {
      auth: { token: `Bearer ${token}` },
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('get_history');
    });
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('chat_history', (history: ChatMessage[]) => {
      setMessages(history);
      setIsLoading(false);
    });
    socket.on('new_message', (msg: ChatMessage) => {
      setMessages(prev => [...prev, msg]);
    });
    socket.on('online_users', (users: OnlineUser[]) => {
      setOnlineUsers(users);
    });

    return () => { socket.disconnect(); };
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current) return;
    socketRef.current.emit('send_message', { content: input.trim() });
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const getInitials = (msg: ChatMessage) =>
    `${msg.sender.firstName[0]}${msg.sender.lastName[0]}`;

  return (
    <div className="h-[calc(100vh-120px)] flex gap-4 animate-in fade-in duration-500">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#2d2d4e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#6366f1]/20 flex items-center justify-center">
              <Hash size={16} className="text-[#818cf8]" />
            </div>
            <div>
              <h1 className="font-semibold text-white text-sm">team-general</h1>
              <p className="text-xs text-gray-500">Internal team communication</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Circle size={8} className={isConnected ? 'fill-emerald-400 text-emerald-400' : 'fill-gray-500 text-gray-500'} />
            {isConnected ? 'Connected' : 'Connecting...'}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 size={24} className="animate-spin text-[#6366f1]" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-500">
              <Hash size={40} className="opacity-20" />
              <p className="text-sm">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isOwn = msg.sender.id === user?.id;
              const prevMsg = messages[i - 1];
              const isSameSender = prevMsg?.sender.id === msg.sender.id &&
                new Date(msg.createdAt).getTime() - new Date(prevMsg.createdAt).getTime() < 5 * 60 * 1000;

              return (
                <div key={msg.id} className={`flex gap-3 ${isSameSender ? 'mt-0.5' : 'mt-4'}`}>
                  {!isSameSender ? (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {getInitials(msg)}
                    </div>
                  ) : (
                    <div className="w-9 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    {!isSameSender && (
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className={`text-sm font-semibold ${ROLE_COLORS[msg.sender.role] || 'text-white'}`}>
                          {msg.sender.firstName} {msg.sender.lastName}
                          {isOwn && <span className="text-[10px] text-gray-500 ml-1">(you)</span>}
                        </span>
                        <span className="text-[10px] text-gray-600">{msg.sender.role.replace(/_/g, ' ')}</span>
                        <span className="text-[10px] text-gray-600">{formatTime(msg.createdAt)}</span>
                      </div>
                    )}
                    <div className={`inline-block px-3 py-2 rounded-xl text-sm max-w-[80%] break-words ${
                      isOwn ? 'bg-[#6366f1]/20 text-white border border-[#6366f1]/30' : 'bg-[#0f0f1a] text-gray-200 border border-[#2d2d4e]'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#2d2d4e]">
          <div className="flex gap-3 items-end">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message #team-general  (Enter to send)"
              rows={1}
              className="flex-1 bg-[#0f0f1a] border border-[#2d2d4e] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6366f1] resize-none transition-all placeholder:text-gray-600"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || !isConnected}
              className="w-10 h-10 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Online Users Sidebar */}
      <div className="w-56 bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <Users size={14} className="text-gray-400" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Online — {onlineUsers.length}
          </span>
        </div>
        <div className="space-y-3 flex-1 overflow-y-auto">
          {onlineUsers.length === 0 ? (
            <p className="text-xs text-gray-600">No users online</p>
          ) : (
            onlineUsers.map(u => (
              <div key={u.id} className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                    {u.email[0].toUpperCase()}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#1a1a2e]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-white truncate">{u.email.split('@')[0]}</p>
                  <p className={`text-[10px] truncate ${ROLE_COLORS[u.role] || 'text-gray-500'}`}>
                    {u.role.replace(/_/g, ' ')}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
