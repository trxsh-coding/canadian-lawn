import { ENDPOINTS, FetchMode, Populate } from '@canadian-lawn/api';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

type UseProductsProps<TSchema> = {
  filters?: Record<string, unknown>;
  limit?: number;
  populate?: Populate;
  schema: TSchema;
};

const queryKey = 'products';

export const useProducts = <T extends z.ZodTypeAny>({
  filters = {},
  limit = 20,
  populate = '*',
  schema,
}: UseProductsProps<T>) =>
  buildCollectionPrefetchQuery<T, FetchMode.COLLECTION>({
    endpoint: ENDPOINTS.common.products,
    schema,
    queryKey: [queryKey, filters?.toString()],
    mode: FetchMode.COLLECTION,
    params: {
      filters,
      limit,
      populate,
    },
  });
