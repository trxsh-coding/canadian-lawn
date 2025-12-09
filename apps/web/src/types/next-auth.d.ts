import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username?: string;
      email: string;
      name: string;
      image?: string | null;
      firstname?: string;
      lastname?: string;
      jwt?: string;
    };
  }

  interface User extends DefaultUser {
    id: string;
    username?: string;
    email: string;
    name: string;
    image?: string;
    firstname?: string;
    lastname?: string;
    jwt?: string;
    strapiUser?: User;
  }

  interface Profile {
    sub: string;
    name: string;
    email: string;
    picture: string;
    given_name: string;
    family_name: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    strapiJWT?: string;
    strapiUser?: {
      id: string;
      username?: string;
      email: string;
      firstname?: string;
      lastname?: string;
    };
  }
}
