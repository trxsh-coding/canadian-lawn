import * as React from 'react';
import { useEffect, useRef } from 'react';

import cn from '@/lib/utils/cnMerge';

import type { OptionEntity, TabsProps } from './Tabs.types';
import { TabsItem } from './TabsItem';

export const TabsNonMemo = <O extends OptionEntity>({
  className,
  tabItemClassName,
  options,
  value,
  view = 'normal',
  onSetPosition,
  onChange,
  tabsPosition,
  tabItemTestId,
  testId,
}: TabsProps<O>) => {
  const tabRef = useRef<HTMLDivElement | null>(null);
  const handleChange = React.useCallback(
    (option: O) => {
      if (value?.key === option.key) {
        return;
      }

      const newValue = options.find((item) => item.key === option.key);

      if (newValue) {
        onChange(newValue);
      }
    },
    [onChange, options, value]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (tabRef.current && onSetPosition) {
        onSetPosition(tabRef.current.scrollLeft);
      }
    };
    const tabElement = tabRef.current;

    if (tabElement) {
      tabElement.addEventListener('scroll', handleScroll);

      if (tabsPosition) {
        tabElement.scrollLeft = tabsPosition;
      }

      return () => {
        tabElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [onSetPosition, tabsPosition]);

  return (
    <div
      className={cn(
        'ui:lg:gap-4 ui:gap-4 ui:flex ui:overflow-auto [&::-webkit-scrollbar]:ui:hidden',
        className
      )}
      ref={tabRef}
      data-testid={testId}
    >
      {options.map((item) => {
        const isActive = item.key === value?.key;

        return (
          <TabsItem<O>
            key={item.key}
            isActive={isActive}
            onChange={handleChange}
            option={item}
            view={view}
            className={tabItemClassName}
            itemTestId={tabItemTestId}
          />
        );
      })}
    </div>
  );
};

TabsNonMemo.displayName = 'Tabs';

export const Tabs = React.memo(TabsNonMemo) as typeof TabsNonMemo;
