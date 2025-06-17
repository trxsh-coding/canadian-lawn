import React from 'react';
import { NumericFormat, PatternFormat } from 'react-number-format';
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
    inputType = 'default',
    ...props
  }: ComponentInputProps) => {
    const ref = React.useRef<HTMLInputElement | null>(null);

    const onChangeValueHandler = React.useCallback(
      (value: string) => onChangeValue?.(value),
      [onChangeValue]
    );

    const InputType = React.useMemo(() => {
      if (inputType === 'pattern') {
        const { pattern, mask } = props as PatternInputProps;

        const resolvedFormat =
          pattern && pattern in formatTypes ? formatTypes[pattern as InputFormat] : pattern || '';

        return (
          <PatternFormat
            value={value}
            mask={mask}
            getInputRef={ref}
            onChangeValue={onChangeValue}
            format={resolvedFormat}
            allowEmptyFormatting
            onChange={(event) => onChangeValueHandler?.(event.target.value)}
            customInput={BaseInput}
            {...props}
          />
        );
      }

      if (inputType === 'numeric') {
        return (
          <NumericFormat
            getInputRef={ref}
            value={value}
            suffix={suffix}
            prefix={prefix}
            onChangeValue={onChangeValue}
            onChange={(event) => onChangeValueHandler?.(event.target.value)}
            customInput={BaseInput}
            {...props}
          />
        );
      }

      return (
        <BaseInput
          value={value}
          ref={ref}
          onChangeValue={onChangeValue}
          onChange={(event) => onChangeValueHandler?.(event.target.value)}
          errorMessage={errorMessage}
          {...props}
        />
      );
    }, [
      inputType,
      value,
      onChangeValue,
      errorMessage,
      props,
      onChangeValueHandler,
      suffix,
      prefix,
    ]);

    return <div className="ui:flex ui:flex-col ui:justify-start ui:gap-1">{InputType}</div>;
  }
);
