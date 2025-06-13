import { z } from 'zod';

import { mediaSchema } from './media';

export const techniqueSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  price: z.number(),
  description: z.string().nullable(),
  image: mediaSchema.nullable().optional(),
  gallery: z.array(mediaSchema).nullable().optional(),
});

export type Technique = z.infer<typeof techniqueSchema>;
