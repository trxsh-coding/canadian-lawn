'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

import { IS_SSR } from '@/config/isSSR';
import { queryClientConfig } from '@/config/queryClientConfig';

const makeQueryClient = () => new QueryClient(queryClientConfig);

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (IS_SSR) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();

    return browserQueryClient;
  }
};

export const QueryConnector = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
