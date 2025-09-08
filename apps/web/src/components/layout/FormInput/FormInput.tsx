import { Input } from '@canadian-lawn/ui-kit';
import { Control, Controller, RegisterOptions, FieldValues, Path } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  placeholder: string;
  errorMessage?: string;
}

export const FormInput = <T extends FieldValues>({
  name,
  control,
  rules,
  placeholder,
  errorMessage,
}: FormInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <Input
        {...field}
        inputClassName="!bg-baseBg !rounded-sm p-4"
        onChangeValue={field.onChange}
        errorMessage={errorMessage}
        placeholder={placeholder}
      />
    )}
  />
);
