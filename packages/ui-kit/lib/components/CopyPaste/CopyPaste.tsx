import React from 'react';

import { Icon, TooltipWrapper, Typography } from '@/lib';
import cn from '@/lib/utils/cnMerge';

type CopyPasteProps = {
  value: string;
  className?: string;
};

export const CopyPaste = ({ value, className }: CopyPasteProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (err) {
      console.error('Не удалось скопировать', err);
    }
  };

  React.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className={cn('ui:flex ui:gap-2 ui:items-center', className)}>
      <TooltipWrapper content="Скопировано!" className="!bg-baseWhite" open={copied} delay={1000}>
        <Icon
          width={24}
          height={24}
          name="common/copy"
          className="ui:cursor-pointer ui:w-4 ui:h-4"
          onClick={handleCopy}
        />
      </TooltipWrapper>
      <Typography view="card-price" color="base-white">
        {value}
      </Typography>
    </div>
  );
};
