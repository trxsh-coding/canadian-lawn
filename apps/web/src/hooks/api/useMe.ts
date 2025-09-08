import { ENDPOINTS, FetchMode, User, userClient, userSchema } from '@canadian-lawn/api';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'me';

export const useMe = ({ jwt, enabled = true }: { jwt?: string; enabled: boolean }) => {
  return buildCollectionPrefetchQuery<z.ZodType<User>, FetchMode.OBJECT>({
    endpoint: ENDPOINTS.common.me,
    schema: userSchema,
    queryKey: [queryKey],
    mode: FetchMode.OBJECT,
    client: jwt ? userClient(jwt) : undefined,
    enabled: enabled && !!jwt,
    params: {
      populate: ['role'],
    },
  });
};
