'use client';

import { sendRegistration } from '@canadian-lawn/api';
import { Button, Input, Typography } from '@canadian-lawn/ui-kit';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { AdaptiveModal } from '@/components/layout/AdaptiveModal/AdaptiveModal';
import { ROUTES } from '@/config/routes';
import { AuthStatus, ProviderType } from '@/types/enums';

interface LoginValues {
  identifier: string;
  password: string;
}

interface RegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
}

type View = 'login' | 'register';

export const LoginButton = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState<View>('login');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const captchaRef = React.useRef<ReCAPTCHA>(null);

  const loginForm = useForm<LoginValues>();
  const registerForm = useForm<RegisterValues>();

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setView('login');
      loginForm.reset();
      registerForm.reset();
      captchaRef.current?.reset();
    }
  };

  const onLoginSubmit = async (values: LoginValues) => {
    setIsSubmitting(true);
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

      setOpen(false);
      router.push(ROUTES.profile.url);
    } finally {
      setIsSubmitting(false);
      loginForm.reset();
    }
  };

  const onRegisterSubmit = async (values: RegisterValues) => {
    if (values.password !== values.confirmPassword) {
      registerForm.setError('confirmPassword', { message: 'Пароли не совпадают' });
      return;
    }

    const captchaToken = captchaRef.current?.getValue();
    if (!captchaToken) {
      toast.error('Пройдите проверку капчи');
      return;
    }

    setIsSubmitting(true);
    try {
      const captchaRes = await fetch('/api/verify-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: captchaToken }),
      });

      if (!captchaRes.ok) {
        toast.error('Проверка капчи не пройдена');
        captchaRef.current?.reset();
        return;
      }

      const registration = await sendRegistration({
        username: values.email.split('@')[0],
        email: values.email,
        password: values.password,
      });

      const result = await signIn(ProviderType.Credentials, {
        registrationJwt: registration.jwt,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Ошибка входа после регистрации');
        return;
      }

      toast.success('Добро пожаловать!');
      setOpen(false);
      router.push(ROUTES.profile.url);
    } catch {
      toast.error('Ошибка регистрации. Возможно, такой email уже используется.');
      captchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
      registerForm.reset();
    }
  };

  const isAuthenticated = status === AuthStatus.Authenticated;
  const redirectToProfile = React.useCallback(() => router.push(ROUTES.profile.url), [router]);
  const handleOAuth = React.useCallback(
    (provider: ProviderType) => signIn(provider, { callbackUrl: ROUTES.profile.url }),
    []
  );

  const loginContent = (
    <div key="login" className="flex flex-col">
      <form className="flex w-full max-w-[571px] flex-1 flex-col space-y-4">
        <Controller
          name="identifier"
          control={loginForm.control}
          rules={{ required: 'Введите почту' }}
          render={({ field }) => (
            <Input
              {...field}
              className="!bg-baseBg"
              value={field.value ?? ''}
              onChangeValue={field.onChange}
              errorMessage={loginForm.formState.errors.identifier?.message}
              placeholder="Почта"
            />
          )}
        />
        <Controller
          name="password"
          control={loginForm.control}
          rules={{ required: 'Введите пароль' }}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              className="!bg-baseBg"
              value={field.value ?? ''}
              onChangeValue={field.onChange}
              errorMessage={loginForm.formState.errors.password?.message}
              placeholder="Пароль"
            />
          )}
        />
      </form>
      <Button
        width="fill"
        className="mt-2"
        disabled={isSubmitting}
        onClick={loginForm.handleSubmit(onLoginSubmit)}
      >
        Войти
      </Button>
      <div className="mt-6 flex justify-center gap-2">
        <button type="button" onClick={() => setView('register')}>
          <Typography view="regular" color="tertiary" className="cursor-pointer hover:underline">
            Регистрация
          </Typography>
        </button>
        <Typography view="regular" color="tertiary">
          Забыл пароль
        </Typography>
      </div>
    </div>
  );

  const registerContent = (
    <div key="register" className="flex flex-col">
      <form className="flex w-full max-w-[571px] flex-1 flex-col space-y-4">
        <Controller
          name="email"
          control={registerForm.control}
          rules={{
            required: 'Введите почту',
            pattern: { value: /^\S+@\S+$/i, message: 'Некорректная почта' },
          }}
          render={({ field }) => (
            <Input
              {...field}
              className="!bg-baseBg"
              value={field.value ?? ''}
              onChangeValue={field.onChange}
              errorMessage={registerForm.formState.errors.email?.message}
              placeholder="Почта"
            />
          )}
        />
        <Controller
          name="password"
          control={registerForm.control}
          rules={{
            required: 'Введите пароль',
            minLength: { value: 6, message: 'Минимум 6 символов' },
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              className="!bg-baseBg"
              value={field.value ?? ''}
              onChangeValue={field.onChange}
              errorMessage={registerForm.formState.errors.password?.message}
              placeholder="Пароль"
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={registerForm.control}
          rules={{ required: 'Повторите пароль' }}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              className="!bg-baseBg"
              value={field.value ?? ''}
              onChangeValue={field.onChange}
              errorMessage={registerForm.formState.errors.confirmPassword?.message}
              placeholder="Повторите пароль"
            />
          )}
        />
      </form>
      <ReCAPTCHA
        ref={captchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        className="mt-2"
      />
      <Button
        width="fill"
        className="mt-2"
        disabled={isSubmitting}
        onClick={registerForm.handleSubmit(onRegisterSubmit)}
      >
        Зарегистрироваться
      </Button>
      <div className="mt-6 flex justify-center">
        <button type="button" onClick={() => setView('login')}>
          <Typography view="regular" color="tertiary" className="cursor-pointer hover:underline">
            Уже есть аккаунт? Войти
          </Typography>
        </button>
      </div>
    </div>
  );

  return (
    <AdaptiveModal
      open={open}
      onOpenChange={handleOpenChange}
      disableTrigger={isAuthenticated}
      className="md:!max-w-[500px]"
      title={
        <Typography as="p" textAlign="left" family="gothic" className="text-left" view="heading3">
          {view === 'login' ? 'Войти в личный кабинет' : 'Создать аккаунт'}
        </Typography>
      }
      footer={
        view === 'login' ? (
          <>
            <div className="flex gap-4">
              <Button
                className="shrink-0"
                iconName="common/google"
                buttonType="icon"
                onClick={() => handleOAuth(ProviderType.Google)}
              />
              <Button
                className="shrink-0"
                iconName="common/yandex"
                buttonType="icon"
                onClick={() => handleOAuth(ProviderType.Yandex)}
              />
            </div>
            <Typography as="p" view="card-price" color="base-black" weight="bold" textAlign="left">
              Через сервисы
            </Typography>
          </>
        ) : undefined
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
      {view === 'login' ? loginContent : registerContent}
    </AdaptiveModal>
  );
};
