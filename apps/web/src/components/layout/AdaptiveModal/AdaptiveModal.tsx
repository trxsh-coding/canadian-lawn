'use client';

import { BottomSheet, Modal } from '@canadian-lawn/ui-kit';
import React from 'react';

import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useOverlayBlur } from '@/hooks/useOverlayBlur';
import cn from '@/utils/cnMerge';

type AdaptiveModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  trigger?: React.ReactNode;
  disableTrigger?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const AdaptiveModal = ({
  open,
  onOpenChange,
  title,
  description,
  footer,
  trigger,
  disableTrigger = true,
  className,
  children,
}: AdaptiveModalProps) => {
  const { isMobile } = useBreakpoints();

  useOverlayBlur(open);

  if (isMobile) {
    return (
      <BottomSheet
        open={open}
        onOpenChange={onOpenChange}
        title={title}
        description={description}
        mainContent={children}
        footerContent={footer}
      >
        {trigger}
      </BottomSheet>
    );
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      footer={footer}
      className={cn('w-full !max-w-[500px]', className)}
      trigger={trigger ?? <span />}
      disable={trigger ? disableTrigger : true}
    >
      {children}
    </Modal>
  );
};
