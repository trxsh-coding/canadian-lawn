import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

import { Button } from '@/lib';
import cn from '@/lib/utils/cnMerge';

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  overlayClassName,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  overlayClassName?: string;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogPrimitive.Overlay
        data-slot="dialog-overlay"
        className={cn(
          'data-[state=open]:ui:animate-in ui:cursor-pointer data-[state=closed]:ui:animate-out data-[state=closed]:ui:fade-out-0 data-[state=open]:ui:fade-in-0 ui:fixed ui:inset-0 ui:z-50 ui:bg-black/50',
          overlayClassName
        )}
        {...props}
      />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'ui:bg-background data-[state=open]:ui:animate-in data-[state=closed]:ui:animate-out data-[state=closed]:ui:fade-out-0 data-[state=open]:ui:fade-in-0 data-[state=closed]:ui:zoom-out-95 data-[state=open]:ui:zoom-in-95 ui:fixed ui:top-[50%] ui:left-[50%] ui:z-50 ui:grid ui:w-full ui:max-w-[calc(100%-2rem)] ui:translate-x-[-50%] ui:translate-y-[-50%] ui:gap-4 ui:rounded-lg ui:p-6 ui:shadow-lg ui:duration-200 sm:ui:max-w-lg',
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ui:ring-offset-background focus:ui:ring-ring data-[state=open]:ui:bg-accent data-[state=open]:ui:text-muted-foreground ui:absolute ui:top-4 ui:right-4 ui:rounded-xs ui:opacity-70 ui:transition-opacity hover:ui:opacity-100 focus:ui:ring-2 focus:ui:ring-offset-2 focus:ui:outline-hidden disabled:ui:pointer-events-none [&_svg]:ui:pointer-events-none [&_svg]:ui:shrink-0 [&_svg:not([class*='size-'])]:ui:size-4"
          >
            <Button iconName="common/cross" buttonType="icon" color="tertiary" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('ui:flex ui:flex-col ui:gap-2 ui:text-center sm:ui:text-left', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'ui:flex ui:flex-col-reverse ui:gap-2 sm:ui:flex-row sm:ui:justify-end',
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('ui:text-lg ui:leading-none ui:font-semibold', className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('ui:text-muted-foreground ui:text-sm', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
