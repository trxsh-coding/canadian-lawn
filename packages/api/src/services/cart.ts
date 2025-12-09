import { apiClient } from '@/clients';
import { ENDPOINTS } from '@/config';
import { type Cart, cartResponseSchema } from '@/schemas/cart';
import { validateResponse } from '@/utils/validateResponse';

export const createCart = async ({ data }: { data?: Cart }): Promise<Cart> => {
  const response = await apiClient.post(ENDPOINTS.common.cart, { data: data?.data });

  return validateResponse(cartResponseSchema, response);
};
