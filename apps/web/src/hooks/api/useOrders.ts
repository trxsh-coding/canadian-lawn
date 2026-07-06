import { ENDPOINTS, FetchMode, orderHistoryItemSchema } from '@canadian-lawn/api';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'orders';

export const useOrders = (token?: string) => {
  return buildCollectionPrefetchQuery<typeof orderHistoryItemSchema, FetchMode.ARRAY>({
    endpoint: ENDPOINTS.common.orders,
    schema: orderHistoryItemSchema,
    queryKey: [queryKey],
    mode: FetchMode.ARRAY,
    token,
    enabled: !!token,
  });
};
