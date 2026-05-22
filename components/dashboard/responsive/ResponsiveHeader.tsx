import React from 'react';

interface ResponsiveHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function ResponsiveHeader({ title, description, actions }: ResponsiveHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0 w-full">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">{title}</h1>
        {description && <p className="text-gray-400 text-xs sm:text-sm">{description}</p>}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto mt-1 md:mt-0">
          {actions}
        </div>
      )}
    </div>
  );
}
export default ResponsiveHeader;
