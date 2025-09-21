import { Filter } from '@canadian-lawn/api';
import { Button, Typography } from '@canadian-lawn/ui-kit';
import { Checkbox } from '@canadian-lawn/ui-kit';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { FilterProps } from '@/components/sections/Lawns/types';
import { useExpanded } from '@/hooks/useExpanded';

type ViewType = {
  view: 'desktop' | 'mobile';
};

export const FilterList = ({
  items,
  title,
  maxVisibleItems = 5,
  selectedIds,
  onChange,
  view,
}: FilterProps & ViewType) => {
  const { setExpanded, hasHiddenItems, visibleItems, expanded } = useExpanded({
    items,
    maxVisibleItems,
  });

  const ListItems = ({ item, active }: { item: Filter; active: boolean }) => {
    return view === 'desktop' ? (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className="flex items-start gap-2"
      >
        <Checkbox
          className="!h-[18px] !w-[18px] shrink-0"
          color="bg"
          iconClassName="!w-3 !h-3"
          active={active}
          onClick={() => onChange(item)}
        />
        <Typography view="regular">{item.name}</Typography>
      </motion.div>
    ) : (
      <Button
        radius="large"
        color={active ? 'primary' : 'secondary'}
        onClick={() => onChange(item)}
        {...(active && { suffixIconName: 'common/cross' })}
      >
        {item.name}
      </Button>
    );
  };

  return (
    <div className="flex flex-col gap-4 p-6 lg:p-0">
      <Typography view="button" weight="semibold">
        {title}
      </Typography>

      <div className="flex flex-wrap gap-2 lg:flex-col">
        <AnimatePresence initial={false}>
          {visibleItems.map((item) => {
            const active = selectedIds.includes(item.id);
            return <ListItems key={item.id} item={item} active={active} />;
          })}
        </AnimatePresence>

        {hasHiddenItems && !expanded && (
          <Typography
            className="cursor-pointer"
            weight="bold"
            view="button"
            color="tertiary"
            onClick={setExpanded}
          >
            Посмотреть все
          </Typography>
        )}
      </div>
    </div>
  );
};
