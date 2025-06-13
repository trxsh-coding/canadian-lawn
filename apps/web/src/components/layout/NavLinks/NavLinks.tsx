import { BaseClickable, Button, Typography } from '@canadian-lawn/ui-kit';
import Link from 'next/link';
import { NavLinksItems, type NavLinkType } from '@/components/layout/NavLinks/config';

export const NavLinks = () => {
  return (
    <div className="bg-baseWhite no-scrollbar z-50 flex translate-y-[70px] justify-between overflow-scroll rounded-sm p-6 lg:mx-[31px] lg:px-[50px] lg:py-8">
      {NavLinksItems.map(({ text, url, iconName }: NavLinkType, index) => (
        <BaseClickable Element={Link} href={url} key={index} className="w-max">
          <Button iconName={iconName} color="secondary" iconPos="left" className="!w-max">
            <Typography view="regular" family="golos" color="base-grey" weight="normal">
              {text}
            </Typography>
          </Button>
        </BaseClickable>
      ))}
    </div>
  );
};
