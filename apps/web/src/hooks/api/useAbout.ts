import { ENDPOINTS, FetchMode, AboutPage, AboutPageSchema } from '@canadian-lawn/api';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'about';

type usePartnersProps = {
  filter?: Record<string, unknown>;
  limit?: number;
};

export const useAbout = ({ filter, limit }: usePartnersProps = {}) =>
  buildCollectionPrefetchQuery<z.ZodType<AboutPage>, FetchMode.ITEM>({
    endpoint: ENDPOINTS.common.about,
    schema: AboutPageSchema,
    queryKey: [queryKey],
    mode: FetchMode.ITEM,
    params: {
      filters: {
        ...filter,
      },
      populate: ['items', 'image'],
      limit,
    },
  });
