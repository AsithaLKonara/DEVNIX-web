'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { apiClient } from '@/lib/apiClient';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isVerified: boolean;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ['/login', '/register', '/', '/about', '/contact', '/products', '/services'];

  const refreshProfile = async () => {
    try {
      const token = localStorage.getItem('xonit_space_auth_token');
      if (!token) throw new Error('No token');
      
      const response = await apiClient.get('/auth/me');
      setUser(response as unknown as User);
    } catch (error) {
      setUser(null);
      localStorage.removeItem('xonit_space_auth_token');
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await refreshProfile();
      setIsLoading(false);
    };

    initAuth();
  }, []);

  // Route protection
  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = publicRoutes.includes(pathname);
    
    if (!user && !isPublicRoute) {
      router.push('/login');
    } else if (user && (pathname === '/login' || pathname === '/register')) {
      router.push('/dashboard');
    }
  }, [user, isLoading, pathname, router]);

  const login = (token: string, userData: User) => {
    localStorage.setItem('xonit_space_auth_token', token);
    setUser(userData);
    router.push('/dashboard');
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout API failed', error);
    } finally {
      localStorage.removeItem('xonit_space_auth_token');
      setUser(null);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
