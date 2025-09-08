import React from 'react';

import { BaseClickable } from '@/lib';
import { Typography } from '@/lib';
import type { OptionEntity, TabsProps } from '@/lib/components/Tabs/Tabs.types';
import cn from '@/lib/utils/cnMerge';

type Props<O extends OptionEntity> = {
  isActive: boolean;
  option: O;
  className?: string;
  view: TabsProps['view'];
  itemTestId?: string;
  titleTestId?: string;
  onChange: (option: O) => void;
};

export const TabsItem = <O extends OptionEntity>({
  isActive,
  option,
  onChange,
  className,
  itemTestId,
  titleTestId,
}: Props<O>) => {
  const handleClick = React.useCallback(() => {
    onChange(option);
  }, [onChange, option]);

  return (
    <BaseClickable
      onClick={handleClick}
      className={cn(
        'ui:transition-colors ui:bg-transparent ui:min-w-min ui:cursor-pointer ui:whitespace-nowrap ui:duration-300',
        className
      )}
      withHoverOpacity={false}
      data-testid={itemTestId}
      data-id={option.key}
    >
      <div className="flex flex-col">
        <Typography
          as="div"
          view="button"
          weight="normal"
          className={cn('ui:!w-fit ui:pb-2', isActive && 'ui:border-tertiary')}
          color={isActive ? 'tertiary' : 'primary'}
          data-testid={titleTestId}
        >
          {option.title}
        </Typography>
        {isActive && <div className="ui:rounded-t-lg ui:border-b-0 ui:h-1 ui:bg-tertiary" />}
      </div>
    </BaseClickable>
  );
};
