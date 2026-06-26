import { ENV } from '@canadian-lawn/env';
import axios from 'axios';
import { Account, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

import { ProviderType } from '@/types/enums';

const oauthClient = axios.create({
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

interface AuthJwtParams {
  token: JWT;
  profile?: Profile;
  account: Account | null;
  provider: ProviderType;
  user: AdapterUser | User;
}

interface StrapiUser {
  id: string;
  firstname?: string;
  lastname?: string;
  email: string;
  username: string;
}

interface StrapiAuthResponse {
  jwt: string;
  user: StrapiUser;
}

const buildOAuthCallbackUrl = (provider: ProviderType, accessToken?: string): string => {
  const params = new URLSearchParams({ access_token: accessToken || '' });
  return `${ENV.STRAPI_HOST}/auth/${provider}/callback?${params}`;
};

const handleOAuthAuthentication = async (
  token: JWT,
  account: Account,
  profile: Profile,
  provider: ProviderType
): Promise<void> => {
  const callbackUrl = buildOAuthCallbackUrl(provider, account.access_token);

  const res = await oauthClient.get<StrapiAuthResponse>(callbackUrl);
  token.strapiJWT = res.data.jwt;
  token.strapiUser = res.data.user;
};

export const authJwt = async ({
  token,
  account,
  profile,
  provider,
  user,
}: AuthJwtParams): Promise<JWT> => {
  if (user) {
    token.strapiJWT = user.jwt;
    token.strapiUser = user.strapiUser;
  }

  if (account?.access_token && profile) {
    try {
      await handleOAuthAuthentication(token, account, profile, provider);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(
          'Ошибка авторизации Strapi:',
          JSON.stringify(
            {
              message: err.message,
              code: err.code,
              url: err.config?.url,
              method: err.config?.method,
              status: err.response?.status,
              statusText: err.response?.statusText,
              data: err.response?.data,
            },
            null,
            2
          )
        );
      } else {
        console.error('Неизвестная ошибка авторизации Strapi:', err);
      }
    }
  }

  return token;
};
