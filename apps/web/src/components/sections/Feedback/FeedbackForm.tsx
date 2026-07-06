'use client';

import { Button, Input } from '@canadian-lawn/ui-kit';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useFeedback } from '@/hooks/api/useFeedback';
import cn from '@/utils/cnMerge';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FeedbackFormProps = {
  className?: string;
  submitText?: string;
  onSuccess?: () => void;
};

export const FeedbackForm = ({
  className,
  submitText = 'Отправить',
  onSuccess,
}: FeedbackFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutateAsync, isPending } = useFeedback();

  const onSubmit = async (data: FormValues) => {
    const validatedData = {
      ...data,
      phone: Number(data.phone),
    };
    try {
      await mutateAsync(validatedData);

      reset();
      toast.success('Заявка отправлена');
      onSuccess?.();
    } catch {
      toast.error('Ошибка при отправлении');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex w-full flex-1 flex-col space-y-4', className)}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Введите имя' }}
        render={({ field }) => (
          <Input
            {...field}
            value={field.value ?? ''}
            onChangeValue={field.onChange}
            errorMessage={errors.name?.message}
            placeholder="Ваше имя*"
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Введите почту',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Некорректная почта',
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            value={field.value ?? ''}
            onChangeValue={field.onChange}
            errorMessage={errors.email?.message}
            placeholder="Почта*"
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        rules={{
          required: 'Введите телефон',
          pattern: {
            value: /^(\+7|7|8)\d{10}$/,
            message: 'Некорректный номер телефона',
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            value={field.value ?? ''}
            inputType="numeric-deferred"
            onChangeValue={field.onChange}
            errorMessage={errors.phone?.message}
            placeholder="Телефон*"
          />
        )}
      />

      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            value={field.value ?? ''}
            onChangeValue={field.onChange}
            errorMessage={errors.message?.message}
            placeholder="Ваш вопрос"
          />
        )}
      />

      <Button color="primary" loading={isPending} type="submit" className="w-full max-w-full">
        {submitText}
      </Button>
    </form>
  );
};
