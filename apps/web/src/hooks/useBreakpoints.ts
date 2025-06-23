'use client';

import { useEffect, useState } from 'react';

export const BREAKPOINTS = {
  desktop: 1024,
  desktopXL: 1200,
  desktop2XL: 1400,
  tablet: 768,
  mobileSm: 480,
  mobileXs: 375,
};

export const useBreakpoints = () => {
  const [bodyWidth, setBodyWidth] = useState(BREAKPOINTS.desktop);

  useEffect(() => {
    const handleResize = () => {
      setBodyWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isDesktopXl: bodyWidth > BREAKPOINTS.desktopXL,
    isDesktop: bodyWidth > BREAKPOINTS.desktop,
    isDesktopStrict: bodyWidth >= BREAKPOINTS.desktop,
    isTablet: bodyWidth > BREAKPOINTS.tablet && bodyWidth <= BREAKPOINTS.desktop,
    isMobile: bodyWidth <= BREAKPOINTS.tablet,
    isMobileSm: bodyWidth <= BREAKPOINTS.mobileSm,
    isMobileXs: bodyWidth <= BREAKPOINTS.mobileXs,
    bodyWidth,
  };
};
