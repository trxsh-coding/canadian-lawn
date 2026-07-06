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
  className?: string;
  headerSectionClassName?: string;
  headerContentClassName?: string;
  topContentClassName?: string;
  contentWrapperClassName?: string;
  contentContainerClassName?: string;
  asideClassName?: string;
  mainClassName?: string;
  title?: string;
  image?: string;
  asideReversed?: boolean;
};

export const LayoutWrapper = ({
  children,
  title,
  topContent,
  className,
  asideContent,
  headerSectionClassName,
  headerContentClassName,
  topContentClassName,
  contentWrapperClassName,
  contentContainerClassName,
  asideClassName,
  mainClassName,
  asideReversed,
  image,
}: LayoutWrapperProps) => {
  return (
    <div className={cn('bg-baseBg flex min-h-[100vh] w-full flex-col', className)}>
      <Constraints
        className={cn('lg:px-0')}
        wrapperClassName={cn('relative', headerSectionClassName)}
      >
        {image && (
          <>
            <div
              style={{ backgroundImage: `url(${image})` }}
              className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat object-cover blur-sm"
            />
            <div className="absolute inset-0 bg-black/70"></div>
          </>
        )}
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
          <div className={cn('mt-4', headerContentClassName, topContentClassName)}>
            {topContent}
          </div>
        </div>
      </Constraints>

      <Constraints
        wrapperClassName={cn(
          'bg-baseBg flex flex-1 gap-5 grow',
          asideContent ? '!pt-0' : '',
          contentWrapperClassName
        )}
        className={cn(
          'bg-baseBg flex flex-1 grow flex-col gap-5 lg:flex-row',
          asideReversed && 'lg:flex-row-reverse',
          contentContainerClassName
        )}
      >
        {asideContent && (
          <aside
            className={cn(
              'bg-baseWhite shrink-0 rounded-none px-4 lg:w-[248px] lg:self-start lg:rounded-sm lg:p-5 xl:!block',
              asideClassName
            )}
          >
            {asideContent}
          </aside>
        )}
        <main
          className={cn(
            'bg-baseBg lg:my-section flex flex-1 grow flex-col overflow-auto',
            mainClassName
          )}
        >
          {children}
        </main>
      </Constraints>
      <Footer />
    </div>
  );
};
