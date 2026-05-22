import React from 'react';

interface AdaptiveGridProps {
  children: React.ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
  };
  className?: string;
  gap?: string;
}

export function AdaptiveGrid({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3, large: 4 }, 
  className = '',
  gap = 'gap-4 sm:gap-6'
}: AdaptiveGridProps) {
  const getColClasses = () => {
    const mobileVal = cols.mobile ?? 1;
    const tabletVal = cols.tablet ?? 2;
    const desktopVal = cols.desktop ?? 3;
    const largeVal = cols.large ?? 4;

    const mobileClass = `grid-cols-${mobileVal}`;
    const tabletClass = `md:grid-cols-${tabletVal}`;
    const desktopClass = `lg:grid-cols-${desktopVal}`;
    const largeClass = `xl:grid-cols-${largeVal}`;

    return `${mobileClass} ${tabletClass} ${desktopClass} ${largeClass}`;
  };

  return (
    <div className={`grid ${getColClasses()} ${gap} ${className}`}>
      {children}
    </div>
  );
}
export default AdaptiveGrid;
