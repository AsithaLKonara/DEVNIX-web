'use client';

import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ children, className = '' }: DashboardShellProps) {
  const isMobile = useIsMobile();

  return (
    <div 
      className={`
        w-full 
        max-w-full 
        overflow-x-hidden 
        min-h-[calc(100vh-4rem)] 
        flex 
        flex-col 
        relative
        ${isMobile ? 'pb-20' : 'pb-8'} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
export default DashboardShell;
