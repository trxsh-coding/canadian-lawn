'use client';
import { Button } from '@canadian-lawn/ui-kit';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useScrollLock } from 'usehooks-ts';

import Logo from '@/assets/img/logo.svg?url';
import { LoginButton } from '@/components/layout/LoginButton/LoginButton';
import { NavItem } from '@/components/layout/NavItem';
import { ROUTES } from '@/config/routes';
import { useOverlayStore } from '@/stores';
import { OverlayType } from '@/types/enums';
import cn from '@/utils/cnMerge';

export const Header = ({
  className,
  headerClassName,
}: {
  className?: string;
  onClick?: VoidFunction;
  headerClassName?: string;
}) => {
  const { addOverlay, removeOverlay, isOverlayActive } = useOverlayStore();
  const isOpen = isOverlayActive(OverlayType.Menu);
  const pathname = usePathname();
  const handleOpen = React.useCallback(() => {
    if (isOpen) {
      removeOverlay(OverlayType.Menu);
    } else {
      addOverlay(OverlayType.Menu);
    }
  }, [isOpen, removeOverlay, addOverlay]);

  const { lock, unlock } = useScrollLock();

  React.useEffect(() => {
    if (isOpen) lock();
    return () => unlock();
  }, [isOpen, lock, unlock]);

  React.useEffect(() => {
    removeOverlay(OverlayType.Menu);
  }, [pathname, removeOverlay]);

  const NavLinks = React.useMemo(
    () =>
      ({ className }: { className?: string }) =>
        Object.values(ROUTES).map(({ url, name, desktopHide }, index) => (
          <motion.div
            className={cn(desktopHide && 'lg:hidden', className)}
            key={url}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <NavItem active={url === pathname} href={url} name={name} />
          </motion.div>
        )),
    [pathname]
  );

  return (
    <AnimatePresence>
      <div className={cn('relative z-[100] flex flex-col', className)}>
        <div
          className={cn(
            'bg-secondary relative z-50 flex w-full flex-col rounded-sm p-5',
            headerClassName
          )}
        >
          <div className="flex justify-between">
            <div className="lg:hidden">
              <Button
                iconName="common/menu"
                color="icon-primary"
                className="h-4 w-4"
                onClick={handleOpen}
              />
            </div>
            <Image src={Logo} alt="logo" width={100} height={100} />
            <div className="xl: hidden w-full !flex-[0.9] justify-between lg:!flex lg:px-[60px] xl:px-[115px]">
              <NavLinks />
            </div>
            <div className="flex items-center gap-4 lg:gap-8">
              <Button iconName="common/zoom" color="icon-primary" className="!px-0" />
              <LoginButton />
              <Button iconName="common/cart" color="icon-primary" className="!px-0" />
            </div>
          </div>
          {isOpen && (
            <>
              <motion.div
                className="bg-secondary absolute top-[89%] left-1/2 z-50 flex h-full w-full -translate-x-1/2 flex-col gap-2 rounded-b-sm text-white"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <NavLinks className="lg:!hidden" />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};
