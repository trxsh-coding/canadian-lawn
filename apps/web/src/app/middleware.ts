import { withAuth } from 'next-auth/middleware';

import { ROUTES } from '@/config/routes';

export default withAuth({
  pages: {
    signIn: ROUTES.home.url,
  },
});

export const config = {
  matcher: ['/profile/:path*'],
};
