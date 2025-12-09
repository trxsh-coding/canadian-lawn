import {
  Cart,
  CartInput,
  cartResponseSchema,
  createCart,
  ENDPOINTS,
  FetchMode,
} from '@canadian-lawn/api';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { z } from 'zod';

import { buildCollectionPrefetchQuery } from '@/hooks/buildCollectionPrefetchQuery';

const queryKey = 'cart';

export const useCartMutation = ({ data }: { uuid: string; data?: Cart; disabled?: boolean }) =>
  useMutation<{ data: CartInput }, Error, null, Cart>({
    mutationFn: () => createCart({ data: data }),
    mutationKey: [ENDPOINTS.common.cart],
  });

export const useCart = ({
  enabled = false,
}: {
  id?: string;
  enabled?: boolean;
  token?: string;
}) => {
  const { data: session } = useSession();
  const token = session?.user.jwt;

  return buildCollectionPrefetchQuery<z.ZodType<Cart>, FetchMode.OBJECT>({
    endpoint: ENDPOINTS.common.cart,
    schema: cartResponseSchema,
    queryKey: [queryKey],
    mode: FetchMode.OBJECT,
    token,
    enabled: Boolean(token) || enabled,
  });
};
