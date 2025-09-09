import { BaseClickable, Typography } from '@canadian-lawn/ui-kit';
import Link from 'next/link';

import cn from '@/utils/cnMerge';

interface NavLinksProps {
  href: string;
  name: string;
  hide?: boolean;
  active?: boolean;
  onClick?: VoidFunction;
}

export const NavItem = ({ href, name, active, onClick }: NavLinksProps) => {
  return (
    <div className="flex h-[42px] w-full flex-col items-center justify-center">
      <BaseClickable as={Link} href={href} onClick={onClick}>
        <Typography
          view="regular"
          family="golos"
          className={cn(
            '!text-baseSilvery font-light !uppercase opacity-60',
            active && '!text-secondaryRed'
          )}
        >
          {name}
        </Typography>
      </BaseClickable>
    </div>
  );
};
