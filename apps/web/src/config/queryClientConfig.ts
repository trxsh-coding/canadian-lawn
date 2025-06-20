import { type Query, type QueryClientConfig } from '@tanstack/react-query';
import { QueryClient, defaultShouldDehydrateQuery, isServer } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { cache } from 'react';

const MAX_RETRIES = 1;
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (isAxiosError(error) && HTTP_STATUS_TO_NOT_RETRY.includes(error.response?.status ?? 0)) {
          return false;
        }
        return failureCount < MAX_RETRIES;
      },
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: isServer ? 0 : 60 * 1000,
    },
    dehydrate: {
      shouldDehydrateQuery: (query: Query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
    },
  },
};

export const getSsrQueryClient = cache(() => new QueryClient(queryClientConfig));
