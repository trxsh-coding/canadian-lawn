import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';

export type AccordionItemProps = React.PropsWithChildren<{
  details: React.ReactNode | string;
  isOpen: boolean;
}>;

export const Accordion = ({ children, details, isOpen }: AccordionItemProps) => {
  return (
    <div className="overflow-hidden">
      <div className="cursor-pointer font-bold">{children}</div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="accordion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {details}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
