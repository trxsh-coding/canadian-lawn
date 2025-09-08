import { Button, Modal, Typography } from '@canadian-lawn/ui-kit';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

import { ROUTES } from '@/config/routes';
import { AuthStatus, ProviderType } from '@/types/enums';

export const LoginButton = () => {
  const { status } = useSession();
  const router = useRouter();

  const isAuthenticated = status === AuthStatus.Authenticated;

  const redirectToProfile = React.useCallback(() => router.push(ROUTES.profile.url), [router]);

  const handleLogin = React.useCallback(
    () => signIn(ProviderType.Google, { callbackUrl: ROUTES.profile.url }),
    []
  );

  return (
    <Modal
      disable={isAuthenticated}
      className="lg:!max-w-[500px]"
      title={
        <Typography as="p" textAlign="left" family="gothic" className="text-left" view="heading3">
          Войти в личный кабинет
        </Typography>
      }
      description={
        <Typography as="p" view="card-price" color="base-black" weight="bold" textAlign="left">
          Через сервисы
        </Typography>
      }
      footer={<Button color="secondary">Войти по e-mail</Button>}
      trigger={
        <Button
          iconName="navigation/profile"
          color="icon-primary"
          className="hidden !px-0 md:!block"
          {...(isAuthenticated ? { onClick: redirectToProfile } : {})}
        />
      }
    >
      <Button iconName="common/google" buttonType="icon" onClick={handleLogin} />
    </Modal>
  );
};
