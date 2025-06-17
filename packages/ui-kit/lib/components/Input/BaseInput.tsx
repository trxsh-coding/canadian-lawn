import React, { type ChangeEvent } from 'react';

import { Icon, type IconName, Typography, views } from '@/lib';
import type { BaseInputProps } from '@/lib/components/Input/types';
import cn from '@/lib/utils/cnMerge';

export const BaseInput = React.forwardRef<
  HTMLInputElement,
  BaseInputProps & {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  }
>(
  (
    {
      className,
      inputClassName,
      searchable,
      errorMessage,
      prefixIconClassName,
      onPrefixIconClick,
      onSuffixIconClick,
      suffixIconClassName,
      prefixIcon,
      suffixIcon,
      typographyView = 'regular',
      value,
      placeholder,
      onChange,
      onChangeValue,
      clearable,
      label,
      labelClassName,
      ...props
    },
    ref
  ) => {
    const withSearchIcon = React.useMemo(() => searchable && !value, [value, searchable]);
    const onClearHandler = React.useCallback(() => {
      onChangeValue?.('');
    }, [onChangeValue]);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!, []);

    const handleWrapperClick = () => {
      inputRef.current?.focus();
    };

    const InputIcon = React.useMemo(
      () =>
        ({
          name,
          onClick,
          className,
        }: {
          name: IconName;
          className?: string;
          onClick?: VoidFunction;
        }) => (
          <Icon
            width={16}
            height={16}
            name={name}
            className={cn('ui:text-secondaryGrey', onClick && 'ui:cursor-pointer', className)}
            onClick={onClick}
          />
        ),
      []
    );
    const Heading = ({
      children,
      isError,
      className,
    }: {
      children: React.ReactNode;
      isError?: boolean;
      className?: string;
    }) => (
      <Typography
        view="tiny"
        family="golosBold"
        weight={isError ? 'semibold' : 'normal'}
        color={isError ? 'tertiary' : 'base-black'}
        className={cn(className)}
      >
        {children}
      </Typography>
    );

    return (
      <div
        onClick={handleWrapperClick}
        className={cn(
          'ui:cursor-text ui:flex-col ui:px-3 ui:py-2 ui:lg:px-2.5 ui:relative ui:gap-2.5 ui:w-full ui:rounded-xs ui:bg-baseWhite ui:flex',
          className
        )}
      >
        {errorMessage && <Heading isError> {errorMessage}</Heading>}
        {label && <Heading className={labelClassName}>{label}</Heading>}
        <div className="ui:flex">
          {(prefixIcon || withSearchIcon) && (
            <InputIcon
              name={(searchable ? 'common/zoom' : prefixIcon)!}
              onClick={onPrefixIconClick}
              className={cn(prefixIconClassName)}
            />
          )}
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={cn(
              'ui:focus:outline-none ui:w-full ui:border-0 ui:bg-transparent ui:flex-1',
              typographyView && views[typographyView],
              inputClassName
            )}
            {...props}
          />
          {(suffixIcon || clearable) && (
            <InputIcon
              name={(clearable ? 'common/cross' : suffixIcon)!}
              className={suffixIconClassName}
              onClick={clearable ? onClearHandler : onSuffixIconClick}
            />
          )}
        </div>
      </div>
    );
  }
);

BaseInput.displayName = 'Input';
