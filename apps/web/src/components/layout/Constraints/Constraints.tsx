import React from 'react';

import cn from '@/utils/cnMerge';

export const Constraints = ({
  children,
  className,
  wrapperClassName,
  color = 'green',
  isSection = false,
}: {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  color?: 'green' | 'light' | 'dark-green';
  isSection?: boolean;
}) => (
  <div
    className={cn(
      'lg:px-section w-full',
      color === 'green' && 'bg-primary',
      color === 'light' && 'bg-baseBg',
      color === 'dark-green' && 'bg-secondary',
      isSection && 'pb-section',
      wrapperClassName
    )}
  >
    <div
      className={cn(
        'm-auto w-full px-4 md:max-w-[1300px] lg:px-5 xl:px-0 2xl:max-w-[1700px]',
        className
      )}
    >
      {children}
    </div>
  </div>
);
