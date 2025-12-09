import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import cn from '@/lib/utils/cnMerge';

function Drawer({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        'data-[state=open]:ui:animate-in data-[state=closed]:ui:animate-out data-[state=closed]:ui:fade-out-0 data-[state=open]:ui:fade-in-0 ui:fixed ui:inset-0 ui:z-50 ui:!border-none',
        className
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          'ui:fixed ui:inset-x-0 ui:border-baseWhite ui:bottom-0 ui:z-50 ui:mt-24 ui:flex ui:flex-col ui:rounded-t-lg ui:border-t ui:bg-background',
          'data-[state=open]:ui:animate-in data-[state=closed]:ui:animate-out data-[state=closed]:ui:slide-out-to-bottom data-[state=open]:ui:slide-in-from-bottom',
          'ui:h-auto ui:max-h-[80vh]',
          className
        )}
        {...props}
      >
        <div className="ui:!border-transparent ui:mx-auto ui:w-full ui:max-w-sm">{children}</div>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        'ui:flex ui:!border-transparent ui:flex-col ui:gap-0.5 ui:p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:ui:text-center group-data-[vaul-drawer-direction=top]/drawer-content:ui:text-center ui:md:gap-1.5 ui:md:text-left',
        className
      )}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('ui:mt-auto ui:flex ui:flex-col ui:gap-2 ui:p-4', className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn('ui:text-foreground ui:font-semibold', className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('ui:text-muted-foreground ui:text-sm', className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
