import { Faq, faqSchema, ENDPOINTS, FetchMode } from '@canadian-lawn/api';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'faq-detail';

export const useFaq = ({ slug }: { slug: string }) =>
  buildCollectionPrefetchQuery<z.ZodType<Faq>, FetchMode.COLLECTION>({
    endpoint: ENDPOINTS.common.getBySlug(slug, 'faq'),
    schema: faqSchema,
    queryKey: [queryKey, slug],
    mode: FetchMode.COLLECTION,
  });
