import { apiClient, ENDPOINTS } from '@canadian-lawn/api';
import NextAuth, { Profile } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import YandexProvider from 'next-auth/providers/yandex';

import { authJwt } from '@/auth/jwt';
import { ProviderType } from '@/types/enums';

interface GoogleProfile extends Profile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}

const handler = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error('Заполните все поля');
        }

        try {
          const res = await apiClient.post(`${ENDPOINTS.common.login}`, {
            identifier: credentials.identifier,
            password: credentials.password,
          });

          if (res.data.jwt && res.data.user.id) {
            return {
              id: String(res.data.user.id),
              email: res.data.user.email,
              name: res.data.user.username,
              jwt: res.data.jwt,
              strapiUser: res.data.user,
            };
          }

          return null;
        } catch (error) {
          console.error('Login error:', error);
          throw new Error('Неверный логин или пароль');
        }
      },
    }),
    YandexProvider({
      clientId: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_YANDEX_CLIENT_SECRETL!,
      authorization: {
        url: 'https://oauth.yandex.ru/authorize',
        params: {
          response_type: 'code',
          scope: 'login:info login:email',
          redirect_uri: 'http://localhost:3000/api/auth/callback/yandex',
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_ID!,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          firstname: profile.given_name || profile.name,
          lastname: profile.family_name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (user || (account && profile)) {
        token = await authJwt({
          token,
          account,
          profile,
          user,
          provider: (account?.provider || 'credentials') as ProviderType,
        });
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token.strapiUser,
          jwt: token.strapiJWT,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
