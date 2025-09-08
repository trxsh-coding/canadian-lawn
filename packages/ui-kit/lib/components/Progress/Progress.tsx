import { Typography } from '@/lib';
import cn from '@/lib/utils/cnMerge';

type ProgressProps = {
  title?: string;
  progress: number;
  className?: string;
  titleClassName?: string;
};

export const Progress = ({ title, progress, className, titleClassName }: ProgressProps) => {
  const progressWidth = 10 * progress;
  return (
    <div className="ui:flex ui:flex-col ui:gap-2 ui:w-full ui:justify-end">
      {title && (
        <Typography view="small" color="secondary" className={titleClassName}>
          {title}
        </Typography>
      )}
      <div
        className={cn(
          'ui:max-w-full ui:w-full ui:rounded-[34px] ui:bg-baseSilvery ui:h-[3px]',
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
