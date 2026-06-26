import { ENDPOINTS, FetchMode, User, userSchema } from '@canadian-lawn/api';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'me';

export const useMe = (token?: string) => {
  return buildCollectionPrefetchQuery<z.ZodType<User>, FetchMode.OBJECT>({
    endpoint: ENDPOINTS.common.me,
    schema: userSchema,
    queryKey: [queryKey],
    mode: FetchMode.OBJECT,
    params: {
      populate: ['role'],
    },
    token,
    enabled: !!token,
  });
};
