import { ENDPOINTS, FetchMode, contactPageSchema } from '@canadian-lawn/api';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'contacts';

type usePartnersProps = {
  filter?: Record<string, unknown>;
  limit?: number;
};

export const useContacts = ({ filter, limit }: usePartnersProps = {}) =>
  buildCollectionPrefetchQuery<typeof contactPageSchema, FetchMode.ITEM>({
    endpoint: ENDPOINTS.common.contacts,
    schema: contactPageSchema,
    queryKey: [queryKey],
    mode: FetchMode.ITEM,
    params: {
      filters: {
        ...filter,
      },
      populate: ['PSRN', 'document'],
      limit,
    },
  });
