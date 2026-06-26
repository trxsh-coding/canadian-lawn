import { ENDPOINTS, FetchMode, filtersSchema } from '@canadian-lawn/api';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

export const useLawnFilters = (productType: string) =>
  buildCollectionPrefetchQuery({
    endpoint: ENDPOINTS.common.lawnFilters,
    schema: filtersSchema,
    queryKey: ['filters', productType],
    mode: FetchMode.ITEM,
    params: {
      params: { productType },
    },
  });
