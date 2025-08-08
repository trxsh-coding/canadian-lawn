import { Typography } from '@canadian-lawn/ui-kit';
import { Checkbox } from '@canadian-lawn/ui-kit';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useToggle } from 'usehooks-ts';

type CheckboxOption = {
  id: number;
  name: string;
  documentId?: string;
};

type CheckboxFiltersListProps = {
  title: string;
  items: CheckboxOption[];
  selectedIds: number[];
  onChange: (value: CheckboxOption) => void;
  maxVisibleItems?: number;
  selectedItems: CheckboxOption[];
};

export const CheckboxFiltersList = ({
  items,
  title,
  maxVisibleItems = 5,
  selectedIds,
  onChange,
}: CheckboxFiltersListProps) => {
  const [expanded, setExpanded] = useToggle(false);

  const visibleItems = React.useMemo(
    () => (expanded ? items : items.slice(0, maxVisibleItems)),
    [expanded, items, maxVisibleItems]
  );

  const hasHiddenItems = items.length > maxVisibleItems;

  return (
    <div className="flex flex-col gap-4">
      <Typography view="button" weight="semibold">
        {title}
      </Typography>

      <div className="flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {visibleItems.map((item) => {
            const checked = selectedIds.includes(item.id);
            return (
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
                  active={checked}
                  onClick={() => onChange(item)}
                />
                <Typography view="regular">{item.name}</Typography>
              </motion.div>
            );
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
