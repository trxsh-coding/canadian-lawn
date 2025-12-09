import { apiClient, ENDPOINTS } from '@canadian-lawn/api';
import { Account, Profile, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

import { ProviderType } from '@/types/enums';

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
  return `${process.env.NEXT_PUBLIC_STRAPI_HOST}/auth/${provider}/callback?${params}`;
};

const extractProfileNames = (profile: Profile) => ({
  firstname: profile.given_name || profile.name || '',
  lastname: profile.family_name || '',
});

const updateUserProfile = async (userId: string, profile: Profile, jwt: string): Promise<void> => {
  const names = extractProfileNames(profile);

  if (!names.firstname && !names.lastname) {
    return;
  }

  await apiClient.put(`${ENDPOINTS.common.user}/${userId}`, names, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

const handleOAuthAuthentication = async (
  token: JWT,
  account: Account,
  profile: Profile,
  provider: ProviderType
): Promise<void> => {
  const callbackUrl = buildOAuthCallbackUrl(provider, account.access_token);
  const res = await apiClient.get<StrapiAuthResponse>(callbackUrl);

  token.strapiJWT = res.data.jwt;
  token.strapiUser = res.data.user;

  await updateUserProfile(res.data.user.id, profile, res.data.jwt);
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
      console.error('Ошибка авторизации Strapi:', err);
    }
  }

  return token;
};
