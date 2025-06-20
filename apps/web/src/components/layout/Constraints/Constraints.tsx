import React from 'react';

import cn from '@/utils/cnMerge';

export const Constraints = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('w-full px-4 lg:max-w-[1300px] lg:px-5 xl:px-0', className)}>{children}</div>
);
