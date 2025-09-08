'use client';

import { Typography } from '@canadian-lawn/ui-kit';

import { Constraints } from '@/components/layout/Constraints';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import cn from '@/utils/cnMerge';

export type LayoutWrapperProps = {
  topContent?: React.ReactNode;
  children?: React.ReactNode;
  asideContent?: React.ReactNode;
  mainContentClassName?: string;
  topContentClassName?: string;
  mainContainerClassName?: string;
  mainWrapperClassName?: string;
  asideContentClassName?: string;
  className?: string;
  title?: string;
};

export const LayoutWrapper = ({
  children,
  title,
  topContent,
  className,
  asideContent,
  topContentClassName,
  mainContainerClassName,
  mainContentClassName,
  asideContentClassName,
  mainWrapperClassName,
}: LayoutWrapperProps) => {
  return (
    <div className={cn('bg-baseBg flex h-full min-h-screen w-full flex-col', className)}>
      <Constraints className="relative">
        <div className={cn('bg-primary flex flex-col py-5 lg:py-[35px]')}>
          <Header className="w-full" headerClassName="md:!rounded-b-sm" />
          {title && (
            <Typography
              color="base-white"
              view="heading1"
              textAlign="left"
              family="gothic"
              className="!mt-9 uppercase lg:m-0"
            >
              {title}
            </Typography>
          )}
          <div className={topContentClassName}>{topContent}</div>
        </div>
      </Constraints>

      <Constraints
        color="light"
        wrapperClassName={cn('flex flex-1 min-h-0 gap-5 ', mainWrapperClassName)}
        className={cn('flex flex-col gap-5 lg:flex-row', mainContainerClassName)}
      >
        {asideContent && (
          <aside
            className={cn(
              'bg-baseWhite shrink-0 rounded-sm lg:my-[25px] lg:w-[248px] lg:p-7 xl:!block',
              asideContentClassName
            )}
          >
            {asideContent}
          </aside>
        )}
        <main className={cn('flex flex-1 flex-col overflow-auto', mainContentClassName)}>
          {children}
        </main>
      </Constraints>
      <Footer />
    </div>
  );
};
