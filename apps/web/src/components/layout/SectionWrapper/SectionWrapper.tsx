import { Button, Typography } from '@canadian-lawn/ui-kit';

import { Constraints } from '@/components/layout/Constraints';
import { ErrorWidget } from '@/components/layout/ErrorWidget';
import cn from '@/utils/cnMerge';

type SectionWrapperProps = {
  headline?: string;
  className?: string;
  childClassName?: string;
  children: React.ReactNode;
  withLink?: boolean;
  isError?: boolean;
  linkClassName?: string;
  headlineClassName?: string;
  backgroundColor?: 'white' | 'green' | 'light-green' | 'inherit';
};

export const SectionWrapper = ({
  headline,
  children,
  className,
  childClassName,
  headlineClassName,
  linkClassName,
  withLink = true,
  backgroundColor = 'white',
  isError,
}: SectionWrapperProps) => {
  return (
    <Constraints
      className={cn(
        'md:py-section mx-auto flex flex-col py-10',
        backgroundColor === 'green' && 'bg-secondary',
        backgroundColor === 'white' && 'bg-baseSecondaryBg',
        backgroundColor === 'light-green' && 'bg-primary',
        className
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-1 lg:flex-row lg:justify-between',
          headline && withLink && 'w-full flex-col items-start justify-between lg:flex-row'
        )}
      >
        {headline && (
          <Typography view="heading2" family="gothic" className={cn(headlineClassName)}>
            {headline}
          </Typography>
        )}
        {withLink && (
          <Button
            buttonType="text"
            color="icon-primary"
            iconClassName={cn(
              'w-4 h-4',
              (backgroundColor === 'green' || backgroundColor === 'light-green') &&
                '!text-baseWhite',
              linkClassName
            )}
          >
            Смотреть все
          </Button>
        )}
      </div>
      {isError ? (
        <ErrorWidget className="mt-6" />
      ) : (
        <div className={cn('mt-6 flex gap-5 overflow-scroll lg:overflow-auto', childClassName)}>
          {children}
        </div>
      )}
    </Constraints>
  );
};
