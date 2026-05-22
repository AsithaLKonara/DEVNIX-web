import React from 'react';

interface ResponsiveTableProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveTable({ children, className = '' }: ResponsiveTableProps) {
  return (
    <div className="relative w-full overflow-hidden border border-[#2d2d4e] rounded-xl bg-[#1a1a2e]/30">
      {/* Horizontal Scroll wrapper */}
      <div className={`w-full overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-indigo-500/20 ${className}`}>
        <div className="min-w-full inline-block align-middle">
          {children}
        </div>
      </div>
      
      {/* Visual swipe hints for small viewports */}
      <div className="absolute top-0 right-0 h-full w-4 bg-gradient-to-l from-[#1a1a2e]/60 to-transparent pointer-events-none md:hidden" />
      <div className="absolute top-0 left-0 h-full w-4 bg-gradient-to-r from-[#1a1a2e]/60 to-transparent pointer-events-none md:hidden" />
    </div>
  );
}
export default ResponsiveTable;
