import { z } from 'zod';

import { CartItemSchema } from '@/schemas/cartItem';
import { itemResponseSchema } from '@/schemas/response';

export const cartSchema = z.object({
  id: z.number(),
  uuid: z.string().uuid(),
  cart_status: z.enum(['active', 'ordered', 'abandoned']),
  total: z.number(),
  items: z.array(CartItemSchema),
});

export const cartResponseSchema = itemResponseSchema(cartSchema);

export type Cart = z.infer<typeof cartResponseSchema>;

export type CartInput = z.input<typeof cartSchema>;

export type CartResponse = z.infer<typeof cartResponseSchema>;
