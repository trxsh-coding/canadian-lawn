import { Constraints } from '@/components/layout/Constraints';
import { Button, Typography } from '@canadian-lawn/ui-kit';
import cn from '@/utils/cnMerge';

type SectionWrapperProps = {
  headline: string;
  className?: string;
  childClassName?: string;
  children: React.ReactNode;
};
export const SectionWrapper = ({
  headline,
  children,
  className,
  childClassName,
}: SectionWrapperProps) => {
  return (
    <Constraints className={cn('mx-auto flex flex-col', className)}>
      <div className="flex flex-col gap-1 lg:flex-row lg:justify-between">
        <Typography view="heading1" family="gothic">
          {headline}
        </Typography>
        <Button buttonType="text" color="tertiary">
          Смотреть все
        </Button>
      </div>
      <div className={cn('mt-6 flex gap-5 overflow-scroll lg:overflow-auto', childClassName)}>
        {children}
      </div>
    </Constraints>
  );
};
