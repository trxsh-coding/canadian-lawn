import { ENDPOINTS, FetchMode, User, userSchema } from '@canadian-lawn/api';
import { useSession } from 'next-auth/react';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'me';

export const useMe = () => {
  const { data: session } = useSession();
  const token = session?.user.jwt;

  return buildCollectionPrefetchQuery<z.ZodType<User>, FetchMode.OBJECT>({
    endpoint: ENDPOINTS.common.me,
    schema: userSchema,
    queryKey: [queryKey],
    mode: FetchMode.OBJECT,
    token,
    enabled: Boolean(token),
    params: {
      populate: ['role'],
    },
  });
};
