import { Blog, blogSchema, ENDPOINTS, FetchMode } from '@canadian-lawn/api';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'blog-by-id';

type useLawnsProps = {
  slug: string;
};

export const useBlogDetail = ({ slug }: useLawnsProps) =>
  buildCollectionPrefetchQuery<z.ZodType<Blog>, FetchMode.ITEM>({
    endpoint: ENDPOINTS.common.getBySlug(slug, 'blog'),
    schema: blogSchema,
    queryKey: [queryKey, slug.toString()],
    mode: FetchMode.ITEM,
    params: {
      populate: ['image'],
    },
  });
