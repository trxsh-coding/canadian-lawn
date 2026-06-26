import { apiClient } from '@/clients';
import { ENDPOINTS } from '@/config';
import { type Cart, cartResponseSchema } from '@/schemas/cart';
import { validateResponse } from '@/utils/validateResponse';

export const createCart = async ({ data }: { data?: Cart }): Promise<Cart> => {
  const response = await apiClient.post(ENDPOINTS.common.cart, { data: data });

  return validateResponse(cartResponseSchema, response);
};

export const addItemToCart = async (data: {
  productId: number;
  quantity: number;
  price: number;
}): Promise<Cart> => {
  const response = await apiClient.post(`${ENDPOINTS.common.cart}/items`, data);

  return validateResponse(cartResponseSchema, response);
};

export const updateCartItem = async (itemId: number, quantity: number): Promise<Cart> => {
  const response = await apiClient.patch(`${ENDPOINTS.common.cart}/items/${itemId}`, {
    quantity,
  });

  return validateResponse(cartResponseSchema, response);
};

export const removeCartItem = async (itemId: number): Promise<Cart> => {
  const response = await apiClient.delete(`${ENDPOINTS.common.cart}/items/${itemId}`);

  return validateResponse(cartResponseSchema, response);
};
