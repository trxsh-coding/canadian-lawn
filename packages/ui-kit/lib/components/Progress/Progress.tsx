import { Typography } from '@/lib';
import cn from '@/lib/utils/cnMerge';

type ProgressProps = {
  title?: string;
  progress: number;
  className?: number;
};

export const Progress = ({ title, progress, className }: ProgressProps) => {
  const progressWidth = 10 * progress;
  return (
    <div className="ui:flex ui:flex-col ui:gap-2 ui:w-fit">
      {title && (
        <Typography view="small" color="secondary">
          {title}
        </Typography>
      )}
      <div
        className={cn(
          'ui:w-max-[90px] ui:w-full ui:rounded-[34px] ui:bg-baseSilvery ui:h-[3px]',
          className
        )}
      >
        <div
          className="ui:rounded-[34px] ui:h-[3px] ui:bg-primary"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
};
