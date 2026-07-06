'use client';

import { ProfileUpdateInput, User } from '@canadian-lawn/api';
import { Button, Checkbox, Input, Typography } from '@canadian-lawn/ui-kit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ProfileFormValues, profileFormSchema } from '@/components/sections/Profile/const';
import { useUpdateProfile } from '@/hooks/api/useUpdateProfile';

type PersonalProps = {
  user?: User;
};

const toDefaultValues = (user?: User): ProfileFormValues => ({
  email: user?.email ?? '',
  phone: user?.phone != null ? String(user.phone) : '',
  firstname: user?.firstname ?? '',
  lastname: user?.lastname ?? '',
  patronymic: user?.patronymic ?? '',
  address: user?.address ?? '',
  consent_personal_data: user?.consent_personal_data ?? false,
  consent_marketing: user?.consent_marketing ?? false,
});

export const Personal = ({ user }: PersonalProps) => {
  const { data: session } = useSession();
  const updateProfile = useUpdateProfile();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: toDefaultValues(user),
  });

  React.useEffect(() => {
    reset(toDefaultValues(user));
  }, [user, reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!session?.user.id) return;

    const payload: ProfileUpdateInput = {
      firstname: values.firstname,
      lastname: values.lastname,
      patronymic: values.patronymic || null,
      address: values.address || null,
      email: values.email,
      phone: Number(values.phone),
      consent_personal_data: values.consent_personal_data,
      consent_marketing: !!values.consent_marketing,
    };

    try {
      const updated = await updateProfile.mutateAsync({
        id: session.user.id,
        token: session.user.jwt,
        data: payload,
      });
      reset(toDefaultValues(updated));
      toast.success('Профиль обновлён');
    } catch {
      toast.error('Не удалось сохранить изменения. Попробуйте ещё раз');
    }
  };

  return (
    <form
      className="bg-baseWhite flex flex-col gap-5 rounded-sm p-4 lg:p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography view="large1" weight="bold">
        Контакты
      </Typography>

      <div className="flex flex-col gap-3">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              inputType="default"
              className="!bg-baseBg"
              placeholder="Почта* (для отправки документов и статуса заявки)"
              value={field.value}
              onChangeValue={field.onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              inputType="default"
              className="!bg-baseBg"
              placeholder="Телефон* (для связи)"
              type="tel"
              value={field.value}
              onChangeValue={field.onChange}
              errorMessage={errors.phone?.message}
            />
          )}
        />
      </div>

      <Typography view="card-price" weight="semibold">
        Данные для связи и получения заказа
      </Typography>

      <div className="flex flex-col gap-3">
        <Controller
          name="firstname"
          control={control}
          render={({ field }) => (
            <Input
              inputType="default"
              className="!bg-baseBg"
              placeholder="Имя*"
              value={field.value}
              onChangeValue={field.onChange}
              errorMessage={errors.firstname?.message}
            />
          )}
        />

        <Controller
          name="lastname"
          control={control}
          render={({ field }) => (
            <Input
              inputType="default"
              className="!bg-baseBg"
              placeholder="Фамилия*"
              value={field.value}
              onChangeValue={field.onChange}
              errorMessage={errors.lastname?.message}
            />
          )}
        />

        <Controller
          name="patronymic"
          control={control}
          render={({ field }) => (
            <Input
              inputType="default"
              className="!bg-baseBg"
              placeholder="Отчество (обязательно при доставке по России)"
              value={field.value ?? ''}
              onChangeValue={field.onChange}
              errorMessage={errors.patronymic?.message}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Input
              inputType="default"
              className="!bg-baseBg"
              placeholder="Адрес доставки"
              value={field.value ?? ''}
              onChangeValue={field.onChange}
              errorMessage={errors.address?.message}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Controller
          name="consent_personal_data"
          control={control}
          render={({ field }) => (
            <label className="flex cursor-pointer items-start gap-2">
              <Checkbox active={!!field.value} onClick={() => field.onChange(!field.value)} />
              <Typography view="regular">
                Я даю согласие на обработку персональных данных в соответствии с Политикой обработки
                персональных данных
              </Typography>
            </label>
          )}
        />
        {errors.consent_personal_data && (
          <Typography view="small" color="secondary-red">
            {errors.consent_personal_data.message}
          </Typography>
        )}

        <Controller
          name="consent_marketing"
          control={control}
          render={({ field }) => (
            <label className="flex cursor-pointer items-start gap-2">
              <Checkbox active={!!field.value} onClick={() => field.onChange(!field.value)} />
              <Typography view="regular">
                Я даю согласие на получение рекламных рассылок в виде e-mail, СМС, push или в
                мессенджерах
              </Typography>
            </label>
          )}
        />
      </div>

      <Button htmlType="submit" disabled={!isDirty} loading={updateProfile.isPending}>
        Сохранить
      </Button>
    </form>
  );
};
