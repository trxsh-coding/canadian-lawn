'use client';

import React from 'react';

import Logo from '@/assets/img/logo.svg';
import { Button } from '@canadian-lawn/ui-kit';
import { useToggle } from '@reactuses/core';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '@/config/routes';
import cn from '@/utils/cnMerge';
import { NavItem } from '@/components/layout/NavItem';

export const Header: React.FC = () => {
  const [isOpen, setOpen] = useToggle(false);

  const handleOpen = React.useCallback(() => setOpen(!isOpen), [isOpen]);

  return (
    <AnimatePresence>
      <div className={cn('relative z-[100] flex flex-col')}>
        <div className={cn('bg-secondary z-50 flex w-full flex-col rounded-sm rounded-b-none p-5')}>
          <div className="flex justify-between">
            <Button
              iconName="common/menu"
              color="icon-primary"
              className="h-6 w-6 lg:hidden"
              onClick={handleOpen}
            />
            <Logo />
            <div className="flex gap-4">
              <Button iconName="common/zoom" color="icon-primary" className="h-6 w-6" />
              <Button iconName="common/cart" color="icon-primary" className="h-6 w-6" />
            </div>
          </div>
          {isOpen && (
            <>
              <motion.div
                className="bg-secondary absolute top-[70px] left-0 z-50 flex w-full flex-col gap-2 rounded-b-sm text-white"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {Object.values(ROUTES).map(({ url, name }, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <NavItem href={url} name={name} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={() => setOpen(false)}
          />
        )}
      </div>
    </AnimatePresence>
  );
};
