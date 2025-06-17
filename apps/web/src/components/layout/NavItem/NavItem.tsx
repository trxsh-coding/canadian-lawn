import { BaseClickable, Typography } from '@canadian-lawn/ui-kit';
import Link from 'next/link';

interface NavLinksProps {
  href: string;
  name: string;
  hide?: boolean;
}

export const NavItem = ({ href, name }: NavLinksProps) => {
  return (
    <div className="flex h-[42px] w-full flex-col items-center justify-center">
      <BaseClickable as={Link} href={href}>
        <Typography
          view="regular"
          family="golos"
          weight="normal"
          className="!text-baseSilvery !uppercase"
        >
          {name}
        </Typography>
      </BaseClickable>
    </div>
  );
};
