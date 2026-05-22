'use client';

import { useState, useEffect } from 'react';
import { useIsMobile } from './useIsMobile';
import { useIsTablet } from './useIsTablet';

export interface ResponsiveSidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleOpen: () => void;
  toggleCollapse: () => void;
  setOpen: (open: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
}

export function useResponsiveSidebar(): ResponsiveSidebarState {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Automatically collapse or adjust states based on screen size changes
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false); // Mobile drawer is full size or hidden
    } else if (isTablet) {
      setIsCollapsed(true); // Tablet sidebar collapses by default
    } else {
      setIsCollapsed(false); // Desktop expanded by default
      setIsOpen(false);
    }
  }, [isMobile, isTablet]);

  return {
    isOpen,
    isCollapsed,
    toggleOpen: () => setIsOpen(prev => !prev),
    toggleCollapse: () => setIsCollapsed(prev => !prev),
    setOpen: setIsOpen,
    setCollapsed: setIsCollapsed,
  };
}
