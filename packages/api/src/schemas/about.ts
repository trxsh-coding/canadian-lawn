import { z } from 'zod';

import { blockContentItem, blocksContentSchema } from '@/schemas/block';
import { mediaSchema } from '@/schemas/media';

export const AboutPageSchema = z.object({
  description: blocksContentSchema,
  image: mediaSchema.nullable(),
  items: z.array(blockContentItem),
});

export type AboutPage = z.infer<typeof AboutPageSchema>;
