import React from 'react';
import { useToggle } from 'usehooks-ts';

interface useExpandedProps<T> {
  maxVisibleItems: number;
  items: T[];
}

export const useExpanded = <T>({ maxVisibleItems, items }: useExpandedProps<T>) => {
  const [expanded, setExpanded] = useToggle(false);

  const visibleItems = React.useMemo(
    () => (expanded ? items : items.slice(0, maxVisibleItems)),
    [expanded, items, maxVisibleItems]
  );

  const hasHiddenItems = items.length > maxVisibleItems;

  return { visibleItems, hasHiddenItems, setExpanded, expanded };
};
