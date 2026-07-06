import { z } from 'zod';

import { CartItemSchema } from '@/schemas/cartItem';

export const cartSchema = z
  .object({
    id: z.number(),
    uuid: z.string().uuid().optional().nullable(),
    cart_status: z.enum(['active', 'ordered', 'abandoned']).optional().nullable(),
    total: z.number().optional().nullable(),
    cart_items: z.array(CartItemSchema),
  })
  .transform(({ cart_items, ...item }) => ({
    ...item,
    items: cart_items,
  }));

export const cartResponseSchema = cartSchema;

export const addItemToCartSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  price: z.number(),
  packageWeight: z.number().optional(),
  packageUnit: z.string().optional(),
});

export const updateCartItemSchema = z.object({
  quantity: z.number(),
});

export type Cart = z.infer<typeof cartResponseSchema>;

export type CartInput = z.input<typeof cartSchema>;

export type CartResponse = z.infer<typeof cartResponseSchema>;

export type AddItemToCartInput = z.infer<typeof addItemToCartSchema>;

export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
