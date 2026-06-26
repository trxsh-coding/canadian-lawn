import {
  addItemToCartSchema,
  Cart,
  CartInput,
  cartResponseSchema,
  createCart,
  ENDPOINTS,
  FetchMode,
  updateCartItemSchema,
} from '@canadian-lawn/api';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';
import { buildMutation } from '@/hooks/buildMutationQuery';

const queryKey = 'cart';

export const useCartMutation = ({ data }: { uuid: string; data?: Cart; disabled?: boolean }) =>
  useMutation<{ data: CartInput }, Error, null, Cart>({
    mutationFn: () => createCart({ data: data }),
    mutationKey: [ENDPOINTS.common.cart],
  });

export const useCart = ({
  enabled = false,
  token,
}: {
  id?: string;
  enabled?: boolean;
  token?: string;
}) => {
  return buildCollectionPrefetchQuery<z.ZodType<Cart>, FetchMode.OBJECT>({
    endpoint: ENDPOINTS.common.cart,
    schema: cartResponseSchema,
    queryKey: [queryKey],
    mode: FetchMode.OBJECT,
    params: {
      populate: {
        cart_items: {
          populate: {
            product: {
              populate: ['image'],
            },
          },
        },
      },
    },
    enabled,
    token,
  });
};

const addItemMutation = buildMutation({
  inputSchema: addItemToCartSchema,
  outputSchema: cartResponseSchema,
  endpoint: `${ENDPOINTS.common.cart}/items`,
  setQueryData: { key: [queryKey] },
});

export const useAddItemToCart = (token?: string) => addItemMutation.usePost(token);

const updateItemMutation = buildMutation({
  inputSchema: updateCartItemSchema,
  outputSchema: cartResponseSchema,
  endpoint: `${ENDPOINTS.common.cart}/items`,
  setQueryData: { key: [queryKey] },
});

export const useUpdateCartItem = (token?: string) => updateItemMutation.usePatchById(token);

const removeItemMutation = buildMutation({
  inputSchema: z.void(),
  outputSchema: cartResponseSchema,
  endpoint: `${ENDPOINTS.common.cart}/items`,
  setQueryData: { key: [queryKey] },
});

export const useRemoveCartItem = (token?: string) => removeItemMutation.useDelete(token);
