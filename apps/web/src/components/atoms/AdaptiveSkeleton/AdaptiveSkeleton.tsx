import React from 'react';

import cn from '@/utils/cnMerge';

type Props = {
  mobileContent: React.ReactNode;
  desktopContent: React.ReactNode;
  tabletContent?: React.ReactNode;
  withBg?: boolean;
  className?: string;
};

export const AdaptiveSkeleton = ({
  mobileContent,
  desktopContent,
  tabletContent,
  className,
  withBg,
}: Props) => (
  <div>
    <div
      className={cn(
        'hidden h-full w-full overflow-hidden p-6 lg:block',
        withBg && 'bg-baseWhite rounded-sm',
        className
      )}
    >
      {desktopContent}
    </div>
    <div
      className={cn(
        'hidden h-full w-full overflow-hidden p-3 md:!block',
        withBg && 'bg-baseWhite rounded-sm',
        className
      )}
    >
      {tabletContent}
    </div>

    <div
      className={cn(
        'block h-full w-full overflow-hidden p-3 md:hidden',
        withBg && 'bg-baseWhite rounded-sm',
        className
      )}
    >
      {mobileContent}
    </div>
  </div>
);
