import { ResponseType, createFetchBuilder, FetchMode, Populate } from '@canadian-lawn/api';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import { z } from 'zod';

type QueryBuilderParams = {
  populate?: Populate;
  params?: Record<string, unknown>;
  filters?: Record<string, unknown>;
  limit?: number;
};

export type BuildCollectionType<S extends z.ZodType, M extends FetchMode> = {
  schema: S;
  endpoint: string;
  queryKey: string[];
  mode: M;
  params?: QueryBuilderParams;
  client?: AxiosInstance;
  enabled?: boolean;
  token?: string;
};

export function buildCollectionPrefetchQuery<S extends z.ZodSchema, M extends FetchMode>({
  schema,
  queryKey,
  mode,
  params,
  endpoint,
  enabled = true,
  token,
}: BuildCollectionType<S, M>) {
  type SchemaType<S extends z.ZodSchema> = z.infer<S>;

  let builder = createFetchBuilder(schema, endpoint, mode, token);

  if (params?.populate) builder = builder.withPopulate(params.populate);

  if (params?.params) builder = builder.withParams(params.params);

  if (params?.filters) builder = builder.withFilters(params.filters);

  if (params?.limit) builder = builder.withLimit(params.limit);

  const queryFn: () => Promise<ResponseType<z.infer<S>, M>> = () => builder.fetch();

  const useHook = () => {
    return useQuery<ResponseType<SchemaType<S>, M>, Error, ResponseType<SchemaType<S>, M>>({
      enabled,
      queryKey,
      queryFn,
      staleTime: 0,
    });
  };

  const prefetch = async (queryClient: QueryClient) => {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn,
    });
  };

  return {
    useHook,
    prefetch,
  };
}
