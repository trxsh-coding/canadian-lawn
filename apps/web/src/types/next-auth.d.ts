import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: {
      id?: string | number;
      username?: string;
      email?: string;
      image?: string | null;
      jwt?: string;
    };
  }

  interface User extends DefaultUser {
    id?: string | number;
    username?: string;
    email?: string;
    jwt?: string;
  }

  interface Profile {
    sub: string;
    name: string;
    email: string;
    picture: string;
    given_name: string;
    family_name: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    firstname: string;
    lastname: string;
    jwt?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    strapiJWT?: string;
    strapiUser?: {
      id?: string | number;
      username?: string;
      email?: string;
      image?: string | null;
    };
  }
}
