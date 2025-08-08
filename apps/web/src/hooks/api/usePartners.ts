import { ENDPOINTS, FetchMode, partnerSchema, PartnerInput } from '@canadian-lawn/api';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'partners';

type usePartnersProps = {
  filter?: Record<string, unknown>;
  limit?: number;
};

export const usePartners = ({ filter, limit }: usePartnersProps = {}) =>
  buildCollectionPrefetchQuery<z.ZodType<PartnerInput>, FetchMode.COLLECTION>({
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
