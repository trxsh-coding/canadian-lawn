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
  isSection?: boolean;
  linkClassName?: string;
  headlineClassName?: string;
  wrapperClassName?: string;
  color?: 'dark-green' | 'green' | 'light';
};

export const SectionWrapper = ({
  headline,
  children,
  className,
  childClassName,
  headlineClassName,
  linkClassName,
  wrapperClassName,
  color,
  isSection,
  withLink = true,
  isError,
}: SectionWrapperProps) => {
  return (
    <Constraints
      wrapperClassName={cn(isSection && '!pr-0', wrapperClassName)}
      className={cn(isSection && '!mx-0', className)}
      color={color}
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
              (color === 'dark-green' || color === 'green') && '!text-baseWhite',
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
