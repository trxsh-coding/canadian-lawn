import { MutationBuilder } from '@canadian-lawn/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z, ZodSchema } from 'zod';

export function buildMutation<SIn extends ZodSchema, SOut extends ZodSchema>({
  inputSchema,
  outputSchema,
  endpoint,
  invalidateKeys = [],
}: {
  inputSchema: SIn;
  outputSchema: SOut;
  endpoint: string;
  invalidateKeys?: string[];
}) {
  const builder = new MutationBuilder(inputSchema, outputSchema, endpoint);

  const usePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: z.infer<SIn>) => builder.post(data),
      onSuccess: () => {
        invalidateKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
      },
    });
  };

  return { usePost };
}
