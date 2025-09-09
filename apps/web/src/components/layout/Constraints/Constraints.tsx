import React from 'react';

import cn from '@/utils/cnMerge';

export const Constraints = ({
  children,
  className,
  wrapperClassName,
  color = 'green',
}: {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  color?: 'green' | 'light' | 'dark-green';
  isSection?: boolean;
}) => (
  <div
    className={cn(
      'lg:px-section flex w-full justify-center p-4 md:px-[30px]',
      color === 'green' && 'bg-primary',
      color === 'light' && 'bg-baseSecondaryBg',
      color === 'dark-green' && 'bg-secondary',
      wrapperClassName
    )}
  >
    <div className={cn('w-full md:max-w-[1600px] xl:px-0 2xl:max-w-[1800px]', className)}>
      {children}
    </div>
  </div>
);
