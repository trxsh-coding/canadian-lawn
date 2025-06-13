import { BaseClickable, Typography } from '@canadian-lawn/ui-kit';
import Link from 'next/link';

interface NavLinksProps {
  href: string;
  name: string;
}

export const NavItem = ({ href, name }: NavLinksProps) => {
  return (
    <div className="flex h-[42px] w-full flex-col items-center justify-center">
      <BaseClickable Element={Link} href={href}>
        <Typography view="regular" family="golos" color="base-white" weight="normal">
          {name}
        </Typography>
      </BaseClickable>
    </div>
  );
};
