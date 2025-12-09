import { z } from 'zod';

export const productRelationSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string(),
  slug: z.string().optional(),
});

export const compositionItemSchema = z.object({
  percent: z.number().min(0).max(100),
  product: productRelationSchema.nullable().optional(),
});
