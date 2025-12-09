import { Faq, faqSchema, ENDPOINTS, FetchMode } from '@canadian-lawn/api';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'faq';

export const useFaq = () =>
  buildCollectionPrefetchQuery<z.ZodType<Faq>, FetchMode.COLLECTION>({
    endpoint: ENDPOINTS.common.faq,
    schema: faqSchema,
    queryKey: [queryKey],
    mode: FetchMode.COLLECTION,
  });
