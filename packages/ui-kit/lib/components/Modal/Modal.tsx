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
};

export const Modal = ({
  trigger,
  title,
  description,
  children,
  footer,
  className,
  disable,
  showCloseButton = true,
}: ModalProps) => {
  return (
    <Dialog>
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
