import { Button, Icon, Typography } from '@canadian-lawn/ui-kit';

import cn from '@/utils/cnMerge';

type ErrorWidgetProps = {
  className?: string;
  onClick?: () => void;
};

export const ErrorWidget = ({ className, onClick }: ErrorWidgetProps) => {
  return (
    <div
      className={cn(
        'bg-baseWhite flex w-full flex-col items-center justify-between rounded-sm pt-3 pb-6 md:mb-6 md:h-[240px]',
        className
      )}
    >
      <div className="mb-4 flex flex-col items-center justify-center md:mb-2">
        <Icon name="common/error" className="mb-2.5 h-[100px] w-[100px]" />
        <Typography
          view="regular"
          family="golos"
          textAlign="center"
          className="!text-baseBlack w-[235px] md:w-full"
        >
          Не удалось загрузить данные. Попробуйте обновить страницу.
        </Typography>
      </div>
      <Button color="secondary" className="flex max-w-[235px]" onClick={onClick}>
        Попробовать снова
      </Button>
    </div>
  );
};
