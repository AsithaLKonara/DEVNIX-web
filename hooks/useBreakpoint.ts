'use client';

import { useState, useEffect } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const queries: Record<Breakpoint, string> = {
  xs: '(min-width: 320px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

export function useBreakpoint(): Breakpoint {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('lg'); // Default to desktop/lg on server-side

  useEffect(() => {
    const handleResize = () => {
      let matched: Breakpoint = 'xs';
      if (window.matchMedia(queries['2xl']).matches) matched = '2xl';
      else if (window.matchMedia(queries.xl).matches) matched = 'xl';
      else if (window.matchMedia(queries.lg).matches) matched = 'lg';
      else if (window.matchMedia(queries.md).matches) matched = 'md';
      else if (window.matchMedia(queries.sm).matches) matched = 'sm';
      setCurrentBreakpoint(matched);
    };

    handleResize(); // Run immediately on mount

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return currentBreakpoint;
}
