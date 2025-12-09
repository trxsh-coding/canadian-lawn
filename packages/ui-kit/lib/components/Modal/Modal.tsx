import React from 'react';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/lib';

type ModalProps = {
  trigger: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  disable?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const Modal = ({
  trigger,
  title,
  description,
  children,
  footer,
  className,
  disable,
  open,
  onOpenChange,
  showCloseButton = true,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {disable ? trigger : <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={className} showCloseButton={showCloseButton}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
