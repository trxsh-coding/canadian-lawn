import { ENDPOINTS, FetchMode, LawnInput, lawnSchema } from '@canadian-lawn/api';
import { z, ZodType } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'lawn';

type useLawnsProps = {
  filters?: Record<string, unknown>;
  limit?: number;
};

export const useLawns = ({ filters = {}, limit = 10 }: useLawnsProps = {}) =>
  buildCollectionPrefetchQuery<z.ZodType<LawnInput>, FetchMode.COLLECTION>({
    endpoint: ENDPOINTS.common.lawn,
    schema: lawnSchema as ZodType,
    queryKey: [queryKey, JSON.stringify(filters), limit?.toString()],
    mode: FetchMode.COLLECTION,
    params: {
      ...filters,
      limit,
      populate: [
        'image',
        'gallery',
        'landing',
        'price',
        'type',
        'type.lawn_type',
        'partner',
        'partners_types',
        'parent',
        'children',
      ],
    },
  });
