import { ENDPOINTS, FetchMode, Technique, techniqueSchema } from '@canadian-lawn/api';
import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';
import { z } from 'zod';

const queryKey = 'technique';

export const useTechnique = () =>
  buildCollectionPrefetchQuery<z.ZodType<Technique>, FetchMode.COLLECTION>({
    endpoint: ENDPOINTS.common.technique,
    schema: techniqueSchema,
    queryKey: [queryKey],
    mode: FetchMode.COLLECTION,
    params: {
      populate: ['gallery', 'image'],
    },
  });
