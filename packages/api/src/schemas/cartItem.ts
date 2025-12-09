import { z } from 'zod';

export const ProductInCartSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
});

export const CartItemSchema = z.object({
  id: z.number(),
  quantity: z.number().int().min(1),
  price: z.number(),
  total: z.number().optional().nullable(),
  product: ProductInCartSchema,
});

export type CartItem = z.infer<typeof CartItemSchema>;
