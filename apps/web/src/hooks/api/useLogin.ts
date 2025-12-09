import { ENDPOINTS, loginResponseSchema, loginSchema } from '@canadian-lawn/api';

import { buildMutation } from '@/hooks/buildMutationQuery';

const queryKey = 'login';

export const useLogin = () => {
  const { usePost } = buildMutation({
    inputSchema: loginSchema,
    outputSchema: loginResponseSchema,
    endpoint: ENDPOINTS.common.login,
    invalidateKeys: [queryKey],
  });
  return usePost();
};
