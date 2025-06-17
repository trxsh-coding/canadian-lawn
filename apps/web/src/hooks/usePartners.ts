import { ENDPOINTS, FetchMode, Partner, partnerSchema } from '@canadian-lawn/api';
import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';
import { z } from 'zod';

const queryKey = 'partners';

type usePartnersProps = {
  filter?: Record<string, unknown>;
  limit?: number;
};

export const usePartners = ({ filter, limit }: usePartnersProps = {}) =>
  buildCollectionPrefetchQuery<z.ZodEffects<z.ZodType<Partner>>, FetchMode.COLLECTION>({
    endpoint: ENDPOINTS.common.partners,
    schema: partnerSchema,
    queryKey: [queryKey],
    mode: FetchMode.COLLECTION,
    params: {
      filters: {
        ...filter,
      },
      limit,
      populate: ['partners_type', 'logo'],
    },
  });
