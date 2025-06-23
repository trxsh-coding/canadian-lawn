'use client';

import { useBreakpoints } from './useBreakpoints';

type ResponsiveConfig = {
  desktop: number;
  tablet: number;
  mobile: number;
  mobileSm: number;
};

export const useResponsiveValue = (config: ResponsiveConfig) => {
  const { isDesktop, isTablet, isMobileSm } = useBreakpoints();

  if (isDesktop) return config.desktop;
  if (isTablet) return config.tablet;
  if (isMobileSm) return config.mobileSm;
  return config.mobile;
};
