import { ENDPOINTS, FetchMode, LawnInput, lawnSchema } from '@canadian-lawn/api';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'lawn-by-slug';

type useLawnsProps = {
  filter?: Record<string, unknown>;
  limit?: number;
  slug: string;
};

export const useLawnDetail = ({ filter, limit, slug }: useLawnsProps) =>
  buildCollectionPrefetchQuery<z.ZodType<LawnInput>, FetchMode.ITEM>({
    endpoint: ENDPOINTS.common.lawnBySlug(slug),
    schema: lawnSchema,
    queryKey: [queryKey],
    mode: FetchMode.ITEM,
    params: {
      filters: {
        ...filter,
      },
      limit,
      populate: ['image', 'gallery', 'landing', 'price', 'type', 'type.lawn_type'],
    },
  });
