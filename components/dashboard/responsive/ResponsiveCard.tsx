import React from 'react';

interface ResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function ResponsiveCard({ children, className = '', hoverable = false }: ResponsiveCardProps) {
  return (
    <div 
      className={`
        bg-[#1a1a2e]/55 
        backdrop-blur-md 
        border border-[#2d2d4e] 
        rounded-xl 
        p-4 sm:p-6 
        shadow-xl 
        transition-all 
        duration-300 
        ${hoverable ? 'hover:border-[#6366f1]/40 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-0.5' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
export default ResponsiveCard;
