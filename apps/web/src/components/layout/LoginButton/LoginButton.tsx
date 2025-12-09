import { Button, Input, Modal, Typography } from '@canadian-lawn/ui-kit';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ROUTES } from '@/config/routes';
import { AuthStatus, ProviderType } from '@/types/enums';

interface FormValues {
  identifier: string;
  password: string;
}

export const LoginButton = () => {
  const { status } = useSession();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    try {
      const result = await signIn(ProviderType.Credentials, {
        identifier: values.identifier,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Неверный логин или пароль');
        return;
      }

      router.push(ROUTES.profile.url);
    } finally {
      reset();
    }
  };

  const isAuthenticated = status === AuthStatus.Authenticated;

  const redirectToProfile = React.useCallback(() => router.push(ROUTES.profile.url), [router]);

  const handleLogin = React.useCallback(
    (provider: ProviderType) => signIn(provider, { callbackUrl: ROUTES.profile.url }),
    []
  );

  return (
    <Modal
      disable={isAuthenticated}
      className="md:!max-w-[500px]"
      title={
        <Typography as="p" textAlign="left" family="gothic" className="text-left" view="heading3">
          Войти в личный кабинет
        </Typography>
      }
      footer={
        <>
          <div className="flex gap-4">
            <Button
              className="shrink-0"
              iconName="common/google"
              buttonType="icon"
              onClick={() => handleLogin(ProviderType.Google)}
            />
            <Button
              className="shrink-0"
              iconName="common/yandex"
              buttonType="icon"
              onClick={() => handleLogin(ProviderType.Yandex)}
            />
          </div>
          <Typography as="p" view="card-price" color="base-black" weight="bold" textAlign="left">
            Через сервисы
          </Typography>
        </>
      }
      trigger={
        <Button
          iconName="navigation/profile"
          color="icon-primary"
          className="hidden !px-0 md:!block"
          {...(isAuthenticated ? { onClick: redirectToProfile } : {})}
        />
      }
    >
      <div className="flex flex-col">
        <form onSubmit={() => null} className="flex w-full max-w-[571px] flex-1 flex-col space-y-4">
          <Controller
            name="identifier"
            control={control}
            rules={{ required: 'Введите почту' }}
            render={({ field }) => (
              <Input
                {...field}
                className="!bg-baseBg"
                value={field.value ?? ''}
                onChangeValue={field.onChange}
                errorMessage={errors.identifier?.message}
                placeholder="Почта"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: 'Введите пароль' }}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                className="!bg-baseBg"
                value={field.value ?? ''}
                onChangeValue={field.onChange}
                errorMessage={errors.password?.message}
                placeholder="Пароль"
              />
            )}
          />
        </form>
        <Button width="fill" className="mt-2" onClick={handleSubmit(onSubmit)}>
          Войти
        </Button>
        <div className="mt-6 flex justify-center gap-2">
          <Typography view="regular" color="tertiary">
            Регистрация
          </Typography>
          <Typography view="regular" color="tertiary">
            Забыл пароль
          </Typography>
        </div>
      </div>
    </Modal>
  );
};
