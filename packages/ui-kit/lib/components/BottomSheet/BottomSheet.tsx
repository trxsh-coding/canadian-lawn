import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/lib/components/BottomSheet/Drawer';

type BottomSheetProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  mainContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  closeContent?: React.ReactNode;
} & React.ComponentProps<typeof DrawerPrimitive.Root>;

export const BottomSheet = ({
  children,
  footerContent,
  closeContent,
  mainContent,
  open,
  onOpenChange,
  title,
  description,
  ...props
}: BottomSheetProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} {...props}>
      {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
      <DrawerContent>
        {(title || description) && (
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
        )}

        {mainContent}

        {(closeContent || footerContent) && (
          <DrawerFooter>
            {closeContent && <DrawerClose asChild>{closeContent}</DrawerClose>}
            {footerContent}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};
