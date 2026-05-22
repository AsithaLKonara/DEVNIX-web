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
  const mobileVal = cols.mobile ?? 1;
  const tabletVal = cols.tablet ?? 2;
  const desktopVal = cols.desktop ?? 3;
  const largeVal = cols.large ?? 4;

  // Tailwind JIT needs full unbroken strings to generate the CSS.
  // We use maps to ensure the compiler sees these full strings.
  const colMap: Record<number, string> = {
    1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4',
    5: 'grid-cols-5', 6: 'grid-cols-6', 7: 'grid-cols-7', 8: 'grid-cols-8',
    9: 'grid-cols-9', 10: 'grid-cols-10', 11: 'grid-cols-11', 12: 'grid-cols-12'
  };

  const mdColMap: Record<number, string> = {
    1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4',
    5: 'md:grid-cols-5', 6: 'md:grid-cols-6', 7: 'md:grid-cols-7', 8: 'md:grid-cols-8',
    9: 'md:grid-cols-9', 10: 'md:grid-cols-10', 11: 'md:grid-cols-11', 12: 'md:grid-cols-12'
  };

  const lgColMap: Record<number, string> = {
    1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6', 7: 'lg:grid-cols-7', 8: 'lg:grid-cols-8',
    9: 'lg:grid-cols-9', 10: 'lg:grid-cols-10', 11: 'lg:grid-cols-11', 12: 'lg:grid-cols-12'
  };

  const xlColMap: Record<number, string> = {
    1: 'xl:grid-cols-1', 2: 'xl:grid-cols-2', 3: 'xl:grid-cols-3', 4: 'xl:grid-cols-4',
    5: 'xl:grid-cols-5', 6: 'xl:grid-cols-6', 7: 'xl:grid-cols-7', 8: 'xl:grid-cols-8',
    9: 'xl:grid-cols-9', 10: 'xl:grid-cols-10', 11: 'xl:grid-cols-11', 12: 'xl:grid-cols-12'
  };

  const finalClasses = [
    colMap[mobileVal] || 'grid-cols-1',
    mdColMap[tabletVal] || 'md:grid-cols-2',
    lgColMap[desktopVal] || 'lg:grid-cols-3',
    xlColMap[largeVal] || 'xl:grid-cols-4'
  ].join(' ');

  return (
    <div className={`grid ${gap} ${finalClasses} ${className}`}>
      {children}
    </div>
  );
}
export default AdaptiveGrid;
