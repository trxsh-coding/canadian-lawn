import { ENDPOINTS, FetchMode, lawnSchema } from '@canadian-lawn/api';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'lawn-by-slug';

type useLawnsProps = {
  filter?: Record<string, unknown>;
  limit?: number;
  slug: string;
};

export const useLawnDetail = ({ filter, limit, slug }: useLawnsProps) =>
  buildCollectionPrefetchQuery<typeof lawnSchema, FetchMode.ITEM>({
    endpoint: ENDPOINTS.common.getBySlug(slug, 'lawn'),
    schema: lawnSchema,
    queryKey: [queryKey, slug],
    mode: FetchMode.ITEM,
    params: {
      filters: {
        ...filter,
      },
      limit,
      populate: [
        'image',
        'gallery',
        'landing',
        'price',
        'type',
        'type.lawn_type',
        'parent',
        'children',
      ],
    },
  });
