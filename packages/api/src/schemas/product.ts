import { z } from 'zod';

import { lawnSingleSchema } from '@/schemas/lawnSpec';
import { mediaSchema } from '@/schemas/media';
import { partnerSchema } from '@/schemas/partner';
import { ProductType } from '@/types';

export const productTypeEnum = z.enum([
  ProductType.Lawn,
  ProductType.Tractor,
  ProductType.Technique,
]);

const categorySchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string().optional(),
});

const baseProductSchema = z.object({
  id: z.number(),
  documentId: z.string(),

  name: z.string(),
  slug: z.string().optional(),

  price: z.number(),
  old_price: z.number().nullable(),

  description: z.string(),

  partner: partnerSchema.optional().nullable(),
  sku: z.string().nullable(),
  quantity: z.number().nullable(),

  images: z.array(mediaSchema).nullable(),
  categories: z.array(categorySchema).optional(),

  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().nullable(),
});

export const lawnProductSchema = baseProductSchema.extend({
  type: z.literal(ProductType.Lawn),
  lawn: lawnSingleSchema,
});

export const techniqueProductSchema = baseProductSchema.extend({
  type: z.literal(ProductType.Technique),
  lawn: z.null(),
});

export const tractorProductSchema = baseProductSchema.extend({
  type: z.literal(ProductType.Tractor),
  lawn: z.null(),
});

export const productSchema = z.discriminatedUnion('type', [
  lawnProductSchema,
  techniqueProductSchema,
  tractorProductSchema,
]);

export type Product = z.infer<typeof productSchema>;

export type LawnProduct = z.infer<typeof lawnProductSchema>;

export type TechniqueProduct = z.infer<typeof techniqueProductSchema>;

export type TractorProduct = z.infer<typeof tractorProductSchema>;
