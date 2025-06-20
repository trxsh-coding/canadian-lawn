'use client';

import { Button } from '@canadian-lawn/ui-kit';
import { useToggle } from '@reactuses/core';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

import Logo from '@/assets/img/logo.svg';
import { NavItem } from '@/components/layout/NavItem';
import { ROUTES } from '@/config/routes';
import cn from '@/utils/cnMerge';

export const Header: React.FC = () => {
  const [isOpen, setOpen] = useToggle(false);

  const handleOpen = React.useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

  const NavLinks = ({ className }: { className?: string }) =>
    Object.values(ROUTES).map(({ url, name, desktopHide }, index) => (
      <motion.div
        className={cn(desktopHide && 'lg:hidden', className)}
        key={index}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, delay: index * 0.05 }}
      >
        <NavItem href={url} name={name} />
      </motion.div>
    ));

  return (
    <AnimatePresence>
      <div className={cn('relative z-[100] flex flex-col')}>
        <div className={cn('bg-secondary z-50 flex w-full flex-col rounded-sm rounded-b-none p-5')}>
          <div className="flex justify-between">
            <div className="lg:hidden">
              <Button
                iconName="common/menu"
                color="icon-primary"
                className="h-6 w-6"
                onClick={handleOpen}
              />
            </div>
            <Logo className="shrink-0" />
            <div className="xl: hidden w-full justify-between lg:!flex lg:px-[60px] xl:px-[115px]">
              <NavLinks />
            </div>
            <div className="flex items-center gap-4">
              <Button iconName="common/zoom" color="icon-primary" className="h-6 w-6" />
              <Button iconName="navigation/profile" color="icon-primary" className="h-6 w-6" />
              <Button iconName="common/cart" color="icon-primary" className="h-6 w-6" />
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
        <motion.div
          className="fixed top-0 right-0 bottom-0 left-0 z-40 h-screen w-screen backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={() => setOpen(false)}
        />
      </div>
    </AnimatePresence>
  );
};
