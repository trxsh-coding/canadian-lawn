import {
  apiClient,
  CheckoutInput,
  checkoutResponseSchema,
  ENDPOINTS,
  userClient,
} from '@canadian-lawn/api';
import { useMutation } from '@tanstack/react-query';

type CheckoutPayload = CheckoutInput & { token?: string };

export const useCheckout = () =>
  useMutation({
    mutationFn: async ({ token, ...data }: CheckoutPayload) => {
      const client = token ? userClient(token) : apiClient;
      const response = await client.post(ENDPOINTS.common.checkout, data);
      return checkoutResponseSchema.parse(response.data);
    },
  });
