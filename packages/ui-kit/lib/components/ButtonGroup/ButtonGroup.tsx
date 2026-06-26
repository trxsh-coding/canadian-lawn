import { useCallback, useMemo } from 'react';

import { Button, type ButtonColor } from '@/lib';
import cn from '@/lib/utils/cnMerge';

export type ButtonGroupOption<T = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export type ButtonGroupProps<T = string> = {
  options: ButtonGroupOption<T>[];
  value?: T | T[];
  onChange?: (value: T | T[]) => void;
  multiple?: boolean;
  className?: string;
  buttonColor?: ButtonColor;
  buttonClassName?: string;
  activeButtonColor?: ButtonColor;
  activeButtonClassName?: string;
  width?: 'fit' | 'fill';
  radius?: 'small' | 'medium' | 'large';
  disabled?: boolean;
};

export const ButtonGroup = <T extends string = string>({
  options,
  value,
  onChange,
  multiple = false,
  className,
  buttonColor = 'secondary',
  buttonClassName,
  activeButtonColor = 'primary',
  activeButtonClassName,
  width = 'fit',
  radius = 'medium',
  disabled = false,
}: ButtonGroupProps<T>) => {
  const selectedValues = useMemo(() => {
    if (!value) return new Set<T>();
    return new Set(Array.isArray(value) ? value : [value]);
  }, [value]);

  const handleClick = useCallback(
    (optionValue: T) => {
      if (disabled || !onChange) return;

      if (multiple) {
        const newValues = new Set(selectedValues);
        if (newValues.has(optionValue)) {
          newValues.delete(optionValue);
        } else {
          newValues.add(optionValue);
        }
        onChange(Array.from(newValues) as T[] & T);
      } else {
        onChange(optionValue as T & T[]);
      }
    },
    [disabled, multiple, onChange, selectedValues]
  );

  return (
    <div className={cn('ui:flex ui:gap-2 ui:flex-wrap', className)}>
      {options.map((option) => {
        const isSelected = selectedValues.has(option.value);
        const isDisabled = disabled || option.disabled;

        return (
          <Button
            key={option.value}
            color={isSelected ? activeButtonColor : buttonColor}
            className={cn(
              'ui:transition-all ui:!p-[10px] ui:bg-baseWhite ui:hover:bg-baseSilvery ui:!rounded-[8px]',
              isSelected && 'ui:text-baseBlack ui:bg-baseSecondaryBg',
              isSelected ? activeButtonClassName : buttonClassName
            )}
            width={width}
            radius={radius}
            disabled={isDisabled}
            inactive={isDisabled}
            onClick={() => handleClick(option.value)}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};
