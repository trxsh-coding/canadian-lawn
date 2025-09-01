'use client';
import { Button } from '@canadian-lawn/ui-kit';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { useScrollLock } from 'usehooks-ts';

import Logo from '@/assets/img/logo.svg?url';
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
  headerClassName?: string;
}) => {
  const { addOverlay, removeOverlay, isOverlayActive } = useOverlayStore();
  const isOpen = isOverlayActive(OverlayType.Menu);

  const handleOpen = React.useCallback(() => {
    if (isOpen) {
      removeOverlay(OverlayType.Menu);
    } else {
      addOverlay(OverlayType.Menu);
    }
  }, [isOpen, addOverlay, removeOverlay]);

  const { lock, unlock } = useScrollLock();

  React.useEffect(() => {
    if (isOpen) lock();
    return () => unlock();
  }, [isOpen, lock, unlock]);

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
            <NavItem href={url} name={name} />
          </motion.div>
        )),
    []
  );

  return (
    <AnimatePresence>
      <div className={cn('relative z-[100] flex flex-col', className)}>
        <div
          className={cn(
            'bg-secondary z-50 flex w-full flex-col rounded-sm rounded-b-none p-5',
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
            <div className="xl: hidden w-full justify-between lg:!flex lg:px-[60px] xl:px-[115px]">
              <NavLinks />
            </div>
            <div className="flex items-center gap-4 lg:gap-8">
              <Button iconName="common/zoom" color="icon-primary" className="!px-0" />
              <Button
                iconName="navigation/profile"
                color="icon-primary"
                className="hidden !px-0 md:!block"
              />
              <Button iconName="common/cart" color="icon-primary" className="!px-0" />
            </div>
          </div>
          {isOpen && (
            <>
              <motion.div
                className="bg-secondary fixed top-[70px] left-0 z-50 flex w-full flex-col gap-2 rounded-b-sm text-white"
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
