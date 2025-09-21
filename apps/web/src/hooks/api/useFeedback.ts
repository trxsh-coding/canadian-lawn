import { ENDPOINTS, feedbackResponseSchema, feedbackSchema } from '@canadian-lawn/api';

import { buildMutation } from '@/hooks/buildMutationQuery';

const queryKey = 'feedback';

export const useFeedback = () => {
  const { usePost } = buildMutation({
    inputSchema: feedbackSchema,
    outputSchema: feedbackResponseSchema,
    endpoint: ENDPOINTS.common.feedback,
    invalidateKeys: [queryKey],
  });
  return usePost();
};
