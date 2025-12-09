import React, { type ChangeEvent } from 'react';
import type { PatternFormatProps, NumericFormatProps } from 'react-number-format';

import type { IconName, TypographyView } from '@/lib';

export const formatTypes: InputMaskKeys = {
  card: '#### #### #### ####',
  date: '##/##',
  cvc: '###',
};

export type InputFormat = 'card' | 'date' | 'cvc';

export type InputMaskKeys = { [key in InputFormat]: string };

export type InputTypes = 'pattern' | 'numeric' | 'text' | 'numeric-deferred';

export type BaseInputProps = {
  placeholder?: string;
  errorMessage?: string;
  className?: string;
  inputClassName?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeValue?: (value: string) => void;
  icon?: IconName;
  value?: string;
  suffixIcon?: IconName;
  prefixIcon?: IconName;
  onSuffixIconClick?: VoidFunction;
  onPrefixIconClick?: VoidFunction;
  footnote?: string;
  label?: string;
  labelClassName?: string;
  clearable?: boolean;
  typographyView?: TypographyView;
  searchable?: boolean;
  suffixIconClassName?: string;
  prefixIconClassName?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  type?: 'password' | 'text' | 'tel';
};

/**
 * Обычный текстовый инпут
 */
export interface DefaultInputProps extends BaseInputProps {
  inputType?: 'default';
  value: string;
}

/**
 * Числовой форматированный инпут
 */
export interface NumericInputProps
  extends Omit<NumericFormatProps, 'customInput' | 'value' | 'onChange' | 'onValueChange'>,
    BaseInputProps {
  inputType: 'numeric';
  value: string;
  min?: number;
  max?: number;
}

/**
 * Инпут с паттерном (маской)
 */
export interface PatternInputProps
  extends Omit<PatternFormatProps, 'customInput' | 'format' | 'value' | 'max' | 'min'>,
    BaseInputProps {
  inputType: 'pattern';
  pattern: InputFormat | string;
  value: string;
  mask?: string;
}

/**
 * Общие доп. пропсы
 */
export type CommonInputProps = {
  label?: string;
  prefix?: string;
  suffix?: string;
  labelClassName?: string;
  footnoteClassName?: string;
};

/**
 * Числовой инпут с отложенным обновлением (onBlur / Enter)
 */
export interface NumericDeferredInputProps
  extends Omit<NumericFormatProps, 'customInput' | 'value' | 'onChange' | 'onValueChange'>,
    BaseInputProps {
  inputType: 'numeric-deferred';
  value: string;
  min?: number;
  max?: number;
}

/**
 * Объединённый тип пропсов компонента Input
 */
export type InputProps =
  | DefaultInputProps
  | NumericInputProps
  | PatternInputProps
  | NumericDeferredInputProps;

export type ComponentInputProps = InputProps & CommonInputProps;
