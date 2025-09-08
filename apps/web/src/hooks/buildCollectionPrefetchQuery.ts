import { ResponseType, createFetchBuilder, FetchMode } from '@canadian-lawn/api';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import { z, ZodSchema } from 'zod';

type QueryBuilderParams = {
  populate?: string[];
  params?: Record<string, unknown>;
  filters?: Record<string, unknown>;
  limit?: number;
};

type BuildCollectionType<S extends ZodSchema, M extends FetchMode> = {
  schema: S;
  endpoint: string;
  queryKey: string[];
  mode: M;
  params?: QueryBuilderParams;
  client?: AxiosInstance;
  enabled?: boolean;
};

export function buildCollectionPrefetchQuery<S extends ZodSchema, M extends FetchMode>({
  schema,
  queryKey,
  mode,
  params,
  endpoint,
  enabled = true,
  client,
}: BuildCollectionType<S, M>) {
  type SchemaType<S extends ZodSchema> = z.infer<S>;
  let builder = createFetchBuilder(schema, endpoint, mode, client);

  if (params?.populate) builder = builder.withPopulate(params.populate);

  if (params?.params) builder = builder.withParams(params.params);

  if (params?.filters) builder = builder.withFilters(params.filters);

  if (params?.limit) builder = builder.withLimit(params.limit);

  const queryFn = () => builder.fetch();

  const useHook = () => {
    return useQuery<ResponseType<SchemaType<S>, M>>({
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
