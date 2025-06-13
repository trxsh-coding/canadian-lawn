import { ENDPOINTS, Technique, techniqueSchema } from '@canadian-lawn/api';
import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'technique';

export const useTechnique = () =>
  buildCollectionPrefetchQuery<Technique>(techniqueSchema, [queryKey], {
    endpoint: ENDPOINTS.common.technique,
    populate: {
      gallery: {
        populate: true,
      },
      image: {
        populate: true,
      },
    },
  });
