import { apiClient, ENDPOINTS } from '@canadian-lawn/api';
import NextAuth, { Profile } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
  providers: [
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
    async jwt({ token, account, profile }) {
      if (account?.access_token && profile) {
        try {
          const params = {
            access_token: account.access_token,
          };

          const queryParams = new URLSearchParams(params);

          const res = await apiClient.get(
            `${process.env.NEXT_PUBLIC_STRAPI_HOST}/auth/google/callback?${queryParams}`
          );

          token.strapiJWT = res.data.jwt;
          token.strapiUser = {
            ...res.data.user,
            firstname: res.data.user.firstname,
            lastname: res.data.user.lastname,
          };

          if (profile.family_name || profile.given_name || profile.name) {
            await apiClient.put(
              `${ENDPOINTS.common.user}/${res.data.user.id}`,
              {
                firstname: profile.given_name || profile.name || '',
                lastname: profile.family_name || '',
              },
              {
                headers: {
                  Authorization: `Bearer ${res.data.jwt}`,
                },
              }
            );
          }
        } catch (err) {
          console.error('Ошибка авторизации Strapi:', err);
          throw err;
        }
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
