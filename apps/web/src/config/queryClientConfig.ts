import { QueryClient, type QueryClientConfig } from '@tanstack/react-query';
import { cache } from 'react';

import { IS_SSR } from '@/config/isSSR';
import { isAxiosError } from 'axios';

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
      experimental_prefetchInRender: true,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: IS_SSR ? 0 : 60 * 1000,
    },
  },
};

export const getSsrQueryClient = cache(() => new QueryClient(queryClientConfig));
