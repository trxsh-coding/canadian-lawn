import { apiClient } from '@/clients';
import { ENDPOINTS } from '@/config';
import { FeedbackInput, FeedbackResponse, feedbackResponseSchema } from '@/schemas';
import { validateResponse } from '@/utils/validateResponse';

export const sendFeedback = async (payload: FeedbackInput): Promise<FeedbackResponse> => {
  const { data } = await apiClient.post<FeedbackInput>(ENDPOINTS.common.feedback, {
    data: payload,
  });
  return validateResponse(feedbackResponseSchema, data);
};
