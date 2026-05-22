'use client';

import { useState, useEffect } from 'react';

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false); // Default to false for SSR stability

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const handleMatch = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleMatch(mediaQuery); // Check immediately on mount
    
    // Support modern and legacy matchMedia listeners
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMatch);
      return () => mediaQuery.removeEventListener('change', handleMatch);
    } else {
      mediaQuery.addListener(handleMatch);
      return () => mediaQuery.removeListener(handleMatch);
    }
  }, []);

  return isMobile;
}
