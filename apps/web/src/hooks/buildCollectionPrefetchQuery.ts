import { QueryClient, useQuery } from '@tanstack/react-query';
import { ZodType } from 'zod';
import { CollectionResponse, fetchCollectionBuilder } from '@canadian-lawn/api';

type QueryBuilderParams = {
  endpoint: string;
  populate?: Record<string, unknown | boolean>;
  params?: Record<string, unknown>;
};

export function buildCollectionPrefetchQuery<T>(
  schema: ZodType,
  queryKey: readonly string[],
  queryParams: QueryBuilderParams
) {
  const queryFn = (): Promise<CollectionResponse<T>> =>
    fetchCollectionBuilder<T>(schema, queryParams.endpoint, queryParams.populate).fetch();

  const useHook = () => {
    return useQuery<CollectionResponse<T>>({
      queryKey,
      queryFn,
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
