import React from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveContainer({ children, className = '' }: ResponsiveContainerProps) {
  return (
    <div className={`px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-7xl ${className}`}>
      {children}
    </div>
  );
}
export default ResponsiveContainer;
