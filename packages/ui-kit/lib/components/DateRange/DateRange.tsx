import { Typography } from '@/lib';
import cn from '@/lib/utils/cnMerge';

type DateRangeProps = {
  list: { key: string; label: string }[];
  active: string[];
  prefix?: string;
  suffix?: string;
};

export const DateRange = ({ list, active, prefix, suffix }: DateRangeProps) => {
  return (
    <div className="ui:flex ui:p-3 ui:bg-baseBg ui:items-center ui:gap-2 ui:rounded-sm">
      <Typography view="small" weight="semibold">
        {prefix}
      </Typography>
      <div className="ui:w-full ui:flex ui:items-end ui:gap-[0.5px] ui:pt-1">
        {list.map((item) => (
          <div
            key={item.key}
            className={cn(
              'ui:h-1 ui:bg-baseSilvery ui:flex-1 ui:rounded-lg',
              active.includes(item.key) && 'ui:bg-primary'
            )}
          />
        ))}
      </div>
      <Typography view="small" weight="semibold" className="ui:shrink-0">
        {suffix}
      </Typography>
    </div>
  );
};
