import { z } from 'zod';

import { mediaSchema } from '@/schemas/media';

export const ProductInCartSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string().optional(),
  type: z.string().optional(),
  price: z.number(),
  image: mediaSchema.nullable().optional(),
});

export const CartItemSchema = z
  .object({
    id: z.number(),
    quantity: z.number().int().min(1),
    price: z.number(),
    total: z.number().optional().nullable(),
    product: ProductInCartSchema,
    package_weight: z.number().nullable().optional(),
    package_unit: z.string().nullable().optional(),
  })
  .transform(({ package_weight, package_unit, ...item }) => ({
    ...item,
    packageWeight: package_weight,
    packageUnit: package_unit,
  }));

export type CartItem = z.infer<typeof CartItemSchema>;
