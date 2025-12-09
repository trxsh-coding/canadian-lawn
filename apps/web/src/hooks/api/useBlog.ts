import { Blog, blogSchema, ENDPOINTS, FetchMode } from '@canadian-lawn/api';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'blogs';

export const useBlog = () =>
  buildCollectionPrefetchQuery<z.ZodType<Blog>, FetchMode.COLLECTION>({
    endpoint: ENDPOINTS.common.blog,
    schema: blogSchema,
    queryKey: [queryKey],
    mode: FetchMode.COLLECTION,
    params: {
      populate: ['image'],
    },
  });
