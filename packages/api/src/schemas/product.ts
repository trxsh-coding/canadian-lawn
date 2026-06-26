import { z } from 'zod';

import { lawnSingleSchema } from '@/schemas/lawnSpec';
import { mediaSchema } from '@/schemas/media';
import { partnerSchema } from '@/schemas/partner';
import { ProductType } from '@/types';

export const productTypeEnum = z.enum([
  ProductType.Lawn,
  ProductType.LawnMix,
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
  image: mediaSchema.nullable().optional(),
  categories: z.array(categorySchema).optional(),

  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().nullable(),
});

// Strict single-type schemas — used in productSchema discriminated union
const lawnOnlySchema = baseProductSchema.extend({
  type: z.literal(ProductType.Lawn),
  lawn: lawnSingleSchema,
});

const lawnMixOnlySchema = baseProductSchema.extend({
  type: z.literal(ProductType.LawnMix),
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

// Schema for lawn + lawn-mix products (catalog listing & detail)
export const lawnProductSchema = baseProductSchema.extend({
  type: z.union([z.literal(ProductType.Lawn), z.literal(ProductType.LawnMix)]),
  lawn: lawnSingleSchema.nullable(),
});

// Schema for machinery products (tractor + technique)
export const machineryProductSchema = z.discriminatedUnion('type', [
  tractorProductSchema,
  techniqueProductSchema,
]);

export const nonLawnProductSchema = z.discriminatedUnion('type', [
  techniqueProductSchema,
  tractorProductSchema,
  lawnMixOnlySchema,
]);

export const productSchema = z.discriminatedUnion('type', [
  lawnOnlySchema,
  techniqueProductSchema,
  tractorProductSchema,
  lawnMixOnlySchema,
]);

export type Product = z.infer<typeof productSchema>;

export type LawnProduct = z.infer<typeof lawnProductSchema>;

export type TechniqueProduct = z.infer<typeof techniqueProductSchema>;

export type TractorProduct = z.infer<typeof tractorProductSchema>;

export type MachineryProduct = z.infer<typeof machineryProductSchema>;

export type NonLawnProduct = z.infer<typeof nonLawnProductSchema>;
