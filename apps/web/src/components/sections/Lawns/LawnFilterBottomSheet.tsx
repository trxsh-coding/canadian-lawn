import { Typography } from '@canadian-lawn/ui-kit';
import React from 'react';

import { FilterProps } from '@/components/sections/Lawns/types';
import { useExpanded } from '@/hooks/useExpanded';

export const LawnFilterBottomSheet = ({ items, title, maxVisibleItems = 5 }: FilterProps) => {
  const { setExpanded, hasHiddenItems, expanded } = useExpanded({
    items,
    maxVisibleItems,
  });

  return (
    <div className="flex flex-col gap-4">
      <Typography view="button" weight="normal">
        {title}
      </Typography>

      <div className="flex flex-col gap-2">
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
