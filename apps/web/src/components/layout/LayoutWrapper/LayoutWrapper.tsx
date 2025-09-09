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
  topContentWrapperClassName?: string;
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
  topContentWrapperClassName,
  mainContainerClassName,
  mainContentClassName,
  asideContentClassName,
  mainWrapperClassName,
}: LayoutWrapperProps) => {
  return (
    <div className={cn('bg-baseBg flex min-h-[100vh] w-full flex-col', className)}>
      <Constraints className={cn('relative px-4 lg:px-0', topContentWrapperClassName)}>
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
        wrapperClassName={cn('flex flex-1 gap-5 grow', mainWrapperClassName)}
        className={cn('flex flex-1 grow flex-col gap-5 lg:flex-row', mainContainerClassName)}
      >
        {asideContent && (
          <aside
            className={cn(
              'bg-baseWhite shrink-0 rounded-sm px-4 lg:w-[248px] lg:px-0 xl:!block',
              asideContentClassName
            )}
          >
            {asideContent}
          </aside>
        )}
        <main className={cn('flex flex-1 grow flex-col overflow-auto', mainContentClassName)}>
          {children}
        </main>
      </Constraints>
      <Footer />
    </div>
  );
};
