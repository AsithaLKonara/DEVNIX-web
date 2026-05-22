'use client';

import { useState, useEffect } from 'react';

export function useIsTablet(): boolean {
  const [isTablet, setIsTablet] = useState<boolean>(false); // Default to false for SSR stability

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const handleMatch = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsTablet(e.matches);
    };

    handleMatch(mediaQuery); // Check immediately on mount
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMatch);
      return () => mediaQuery.removeEventListener('change', handleMatch);
    } else {
      mediaQuery.addListener(handleMatch);
      return () => mediaQuery.removeListener(handleMatch);
    }
  }, []);

  return isTablet;
}
