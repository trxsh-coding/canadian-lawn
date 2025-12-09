import React from 'react';

import { Tooltip, TooltipContent, TooltipPrimitive, TooltipTrigger } from './Tooltip';

type TooltipWrapperProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  alignOffset?: number;
  sideOffset?: number;
  delay?: number;
  side?: 'top' | 'bottom';
  align?: 'center' | 'end' | 'start';
  className?: string;
} & React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>;

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  children,
  content,
  delay,
  alignOffset = 100,
  sideOffset = 0,
  align = 'start',
  side = 'top',
  className,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      timer = setTimeout(() => setOpen(false), delay);
    }
    return () => clearTimeout(timer);
  }, [open, delay]);

  return (
    <Tooltip onOpenChange={setOpen} open={open} {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        align={align}
        side={side}
        className={className}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
};
