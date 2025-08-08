import React from 'react';
import { type NumberFormatValues, NumericFormat, PatternFormat } from 'react-number-format';

import { formatTypes } from '@/lib';
import type { ComponentInputProps, InputFormat, PatternInputProps } from '@/lib';
import { BaseInput } from '@/lib/components/Input/BaseInput';

export const Input = React.memo(
  ({
    value,
    prefix,
    suffix,
    errorMessage,
    onChangeValue,
    min,
    max,
    inputType = 'default',
    onBlur,
    onKeyDown,
    ...props
  }: ComponentInputProps) => {
    const ref = React.useRef<HTMLInputElement | null>(null);

    const [inputValue, setInputValue] = React.useState(value ?? '');

    React.useEffect(() => {
      setInputValue(value ?? '');
    }, [value]);

    const onChangeValueHandler = React.useCallback((val: string) => {
      setInputValue(val);
    }, []);

    const commitValue = React.useCallback(() => {
      if (inputValue !== value) {
        onChangeValue?.(inputValue);
      }
    }, [inputValue, value, onChangeValue]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        commitValue();
        ref.current?.blur(); // опционально
      }
      onKeyDown?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      commitValue();
      onBlur?.(e);
    };

    const isAllowed = React.useCallback(
      (values: NumberFormatValues) => {
        const { floatValue } = values;
        if (floatValue === undefined) return true;
        const isAboveMin = min !== undefined ? floatValue >= min : true;
        const isBelowMax = max !== undefined ? floatValue <= max : true;
        return isAboveMin && isBelowMax;
      },
      [min, max]
    );

    if (inputType === 'pattern') {
      const { pattern, mask } = props as PatternInputProps;
      const resolvedFormat =
        pattern && pattern in formatTypes ? formatTypes[pattern as InputFormat] : pattern || '';

      return (
        <PatternFormat
          value={value}
          format={resolvedFormat}
          mask={mask}
          getInputRef={ref}
          allowEmptyFormatting
          onChange={(e) => onChangeValue?.(e.target.value)}
          customInput={BaseInput}
          {...props}
        />
      );
    }

    if (inputType === 'numeric' || inputType === 'numeric-deferred') {
      const isDeferred = inputType === 'numeric-deferred';

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (isDeferred) {
          onChangeValueHandler(val);
        } else {
          onChangeValue?.(val);
        }
      };

      return (
        <NumericFormat
          getInputRef={ref}
          value={isDeferred ? inputValue : value}
          suffix={suffix}
          prefix={prefix}
          isAllowed={isAllowed}
          onChange={handleChange}
          onBlur={isDeferred ? handleBlur : onBlur}
          onKeyDown={isDeferred ? handleKeyDown : onKeyDown}
          customInput={BaseInput}
          {...props}
        />
      );
    }

    return (
      <BaseInput
        ref={ref}
        value={value}
        onChange={(e) => onChangeValue?.(e.target.value)}
        errorMessage={errorMessage}
        {...props}
      />
    );
  }
);
