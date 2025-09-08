import { BaseClickable, Button, Typography } from '@canadian-lawn/ui-kit';
import Link from 'next/link';

import { NavLinksItems, type NavLinkType } from '@/components/layout/NavLinks/config';

export const NavLinks = ({ onClick }: { onClick?: VoidFunction }) => {
  return (
    <div className="bg-baseWhite no-scrollbar z-50 flex h-[88px] translate-y-[50px] items-center justify-between overflow-scroll rounded-sm lg:mx-[31px] lg:px-[50px]">
      {NavLinksItems.map(({ text, url, iconName }: NavLinkType, index) => (
        <BaseClickable as={Link} href={url} key={index} className="w-max" onClick={onClick}>
          <Button
            iconName={iconName}
            color="secondary"
            className="!bg-baseWhite group-hover:!text-secondaryRed !w-max lg:py-8"
          >
            <Typography view="regular" family="golos" color="base-grey" weight="normal">
              {text}
            </Typography>
          </Button>
        </BaseClickable>
      ))}
    </div>
  );
};
