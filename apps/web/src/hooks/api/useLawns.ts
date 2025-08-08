import { ENDPOINTS, FetchMode, Lawn, lawnSchema } from '@canadian-lawn/api';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'lawn';

type useLawnsProps = {
  filter?: Record<string, unknown>;
  limit?: number;
};

export const useLawns = ({ filter, limit }: useLawnsProps = {}) =>
  buildCollectionPrefetchQuery<z.ZodType<Lawn>, FetchMode.COLLECTION>({
    endpoint: ENDPOINTS.common.lawn,
    schema: lawnSchema,
    queryKey: [queryKey],
    mode: FetchMode.COLLECTION,
    params: {
      filters: {
        ...filter,
      },
      limit,
      populate: ['image', 'gallery', 'landing', 'price', 'type', 'type.lawn_type'],
    },
  });
