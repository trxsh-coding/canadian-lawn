import { ENDPOINTS, FetchMode, User, userSchema } from '@canadian-lawn/api';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'users';
type useUsersProps = {
  filter?: Record<string, unknown>;
};

export const useUsers = ({ filter }: useUsersProps = {}) =>
  buildCollectionPrefetchQuery<z.ZodType<User>, FetchMode.ARRAY>({
    endpoint: ENDPOINTS.common.user,
    schema: userSchema,
    queryKey: [queryKey],
    mode: FetchMode.ARRAY,
    params: {
      filters: {
        ...filter,
      },
      populate: ['role', 'avatar'],
    },
  });
