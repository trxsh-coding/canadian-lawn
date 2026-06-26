import { apiClient, MutationBuilder, userClient } from '@canadian-lawn/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z, ZodSchema } from 'zod';

// type MutationOptions<SOut> = {
//   invalidateKeys?: string[];
//   setQueryData?: { key: string[]; updater: (data: z.infer<SOut>) => void };
// };

export function buildMutation<SIn extends ZodSchema, SOut extends ZodSchema>({
  inputSchema,
  outputSchema,
  endpoint,
  invalidateKeys = [],
  setQueryData,
}: {
  inputSchema: SIn;
  outputSchema: SOut;
  endpoint: string;
  invalidateKeys?: string[];
  setQueryData?: { key: string[]; updater?: (data: z.infer<SOut>) => void };
}) {
  const getBuilder = (token?: string) =>
    new MutationBuilder(inputSchema, outputSchema, endpoint, token ? userClient(token) : apiClient);

  const handleSuccess = (queryClient: ReturnType<typeof useQueryClient>, data: z.infer<SOut>) => {
    invalidateKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
    if (setQueryData) {
      queryClient.setQueryData(setQueryData.key, data);
    }
  };

  const usePost = (token?: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: z.infer<SIn>) => getBuilder(token).post(data),
      onSuccess: (data) => handleSuccess(queryClient, data),
    });
  };

  const usePatch = (token?: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: z.infer<SIn>) => getBuilder(token).patch(data),
      onSuccess: (data) => handleSuccess(queryClient, data),
    });
  };

  const usePatchById = (token?: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, data }: { id: number | string; data: z.infer<SIn> }) =>
        getBuilder(token).patchById(id, data),
      onSuccess: (data) => handleSuccess(queryClient, data),
    });
  };

  const useDelete = (token?: string) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: number | string) => getBuilder(token).delete(id),
      onSuccess: (data) => handleSuccess(queryClient, data),
    });
  };

  return { usePost, usePatch, usePatchById, useDelete };
}
