import { AnimatePresence, motion } from 'framer-motion';

import { Icon } from '@/lib';
import cn from '@/lib/utils/cnMerge';

type CheckboxProps = {
  color?: 'red' | 'light-red' | 'light' | 'bg';
  active: boolean;
  className?: string;
  iconClassName?: string;
  onClick?: VoidFunction;
};

export const Checkbox = ({
  color = 'red',
  active,
  onClick,
  className,
  iconClassName,
}: CheckboxProps) => {
  return (
    <div
      className={cn(
        'ui:w-6 ui:h-6 ui:rounded-[3px] ui:flex ui:justify-center ui:items-center ui:cursor-pointer',
        color === 'red' && 'ui:bg-tertiary',
        color === 'light-red' && 'ui:bg-secondaryRed',
        color === 'light' && 'ui:bg-baseSilvery',
        color === 'bg' && 'ui:bg-baseBg',
        active && 'ui:bg-tertiary',
        className
      )}
      onClick={onClick}
    >
      {active && (
        <AnimatePresence>
          <motion.div
            className="ui:h-fit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon
              className={cn('ui:inherit ui:h-[18px] ui:w-[18px]', iconClassName)}
              name="common/check"
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
