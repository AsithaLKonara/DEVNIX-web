'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/components/providers/AuthProvider';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  notifications: any[];
  addNotification: (notification: any) => void;
  markAsRead: (id: string) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  notifications: [],
  addNotification: () => {},
  markAsRead: () => {},
});

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([
    // Dummy initial data for UI preview
    { id: '1', type: 'info', message: 'Welcome to Xonit Space!', read: false, createdAt: new Date().toISOString() },
    { id: '2', type: 'success', message: 'Invoice #INV-2026-089 was paid.', read: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  ]);

  const { user } = useAuth();

  useEffect(() => {
    // Only connect if user is logged in
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    const token = localStorage.getItem('xonit_space_auth_token');
    if (!token) return;

    // Connect to the /ws namespace as defined in the NestJS backend
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:5000';
    
    const socketInstance = io(`${baseUrl}/ws`, {
      auth: {
        token: `Bearer ${token}`
      },
      transports: ['websocket'],
      autoConnect: true,
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('✅ WebSocket Connected');
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('❌ WebSocket Disconnected');
    });

    // Listen for new notifications
    socketInstance.on('notification', (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    // Mock connection for UI development if backend is not running
    if (!process.env.NEXT_PUBLIC_API_URL) {
      setTimeout(() => setIsConnected(true), 1000);
      
      const interval = setInterval(() => {
        const mockEvents = [
          { type: 'warning', message: 'Server CPU load is high (85%)' },
          { type: 'info', message: 'New lead assigned to you: TechFlow' },
          { type: 'success', message: 'Project "Alpha" marked as Done' }
        ];
        const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
        
        setNotifications(prev => [{
          id: Math.random().toString(36).substring(7),
          type: randomEvent.type,
          message: randomEvent.message,
          read: false,
          createdAt: new Date().toISOString()
        }, ...prev]);
      }, 30000);
      
      return () => clearInterval(interval);
    }

    return () => {
      socketInstance.disconnect();
    };
  }, [user]);

  const addNotification = (notification: any) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  return (
    <SocketContext.Provider value={{ socket, isConnected, notifications, addNotification, markAsRead }}>
      {children}
    </SocketContext.Provider>
  );
}
