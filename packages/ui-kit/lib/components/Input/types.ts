import type { PatternFormatProps, NumericFormatProps } from 'react-number-format';
import type { IconName, TypographyView } from '@/lib';
import type { ChangeEvent } from 'react';

export const formatTypes: InputMaskKeys = {
  card: '#### #### #### ####',
  date: '##/##',
  cvc: '###',
};

export type InputFormat = 'card' | 'date' | 'cvc';

export type InputMaskKeys = { [key in InputFormat]: string };

export type InputTypes = 'pattern' | 'numeric' | 'text';

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
  extends Omit<NumericFormatProps, 'customInput' | 'value' | 'onChange'>,
    BaseInputProps {
  inputType: 'numeric';
  value: string;
}

/**
 * Инпут с паттерном (маской)
 */
export interface PatternInputProps
  extends Omit<PatternFormatProps, 'customInput' | 'format' | 'value'>,
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
 * Объединённый тип пропсов компонента Input
 */
export type InputProps = DefaultInputProps | NumericInputProps | PatternInputProps;

export type ComponentInputProps = InputProps & CommonInputProps;
