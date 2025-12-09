import { z } from 'zod';

import { blocksContentSchema } from '@/schemas/block';
import { mediaSchema } from '@/schemas/media';

export const blogSchema = z.object({
  id: z.number(),
  slug: z.string(),
  documentId: z.string(),
  description: z.string().nullable().optional(),
  title: z.string(),
  image: mediaSchema.optional().nullable(),
  blocks: blocksContentSchema,
  date: z.string(),
});

export type Blog = z.output<typeof blogSchema>;

export type BlogInput = z.input<typeof blogSchema>;
