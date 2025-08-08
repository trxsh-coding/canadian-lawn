import React from 'react';

import { Button, type ButtonProps, Input } from '@/lib';
import cn from '@/lib/utils/cnMerge';

type ButtonCounterProps = {
  value: number;
  text: string;
  onClick: VoidFunction;
  onSuffixIconClick: VoidFunction;
  onIconClick: VoidFunction;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export const ButtonCounter = ({
  className,
  value,
  text,
  onClick,
  onSuffixIconClick,
  onIconClick,
  onChange,
  min,
  max,
}: ButtonCounterProps) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const isActive = Boolean(value);
  const buttonProps: ButtonProps = React.useMemo(() => {
    return isActive
      ? {
          color: 'secondary',
          iconName: 'common/minus',
          suffixIconName: 'common/plus',
          onSuffixIconClick,
          onIconClick,
          onClick: undefined,
        }
      : {
          color: 'primary',
          iconName: 'common/cart',
          onClick,
        };
  }, [isActive, onClick, onIconClick, onSuffixIconClick]);

  const onHandleValue = React.useCallback(
    (value: string) => {
      const numberValue = Number(value);

      if (numberValue > 0) {
        onChange(numberValue);
      }
    },
    [onChange]
  );

  const onHandleBlur = React.useCallback(() => {
    const inputValue = inputRef.current?.value;
    const num = Number(inputValue);
    if ((!inputValue || isNaN(num) || num === 0) && inputRef.current) {
      inputRef.current.value = value.toString();
    }
  }, [value]);

  return (
    <div className="ui:flex ui:items-center ui:gap-2">
      <Button {...buttonProps} width="fill" className={cn('ui:max-w-full ui:w-full', className)}>
        {isActive ? (
          <Input
            getInputRef={inputRef}
            min={min}
            max={max}
            onBlur={onHandleBlur}
            value={value.toString()}
            inputType="numeric"
            onChangeValue={onHandleValue}
            className="ui:px-0 ui:py-0 ui:bg-transparent ui:h-auto ui:border-none ui:shadow-none"
            inputClassName="ui:text-center ui:text-base ui:w-10"
          />
        ) : (
          text
        )}
      </Button>
    </div>
  );
};
