import { ENDPOINTS, FetchMode, Filters, filtersSchema } from '@canadian-lawn/api';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'lawn-by-slug';

export const useLawnFilters = () =>
  buildCollectionPrefetchQuery<z.ZodType<Filters>, FetchMode.ITEM>({
    endpoint: ENDPOINTS.common.lawnFilters,
    schema: filtersSchema,
    queryKey: [queryKey],
    mode: FetchMode.ITEM,
  });
