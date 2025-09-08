import { z } from 'zod';

import { blocksContentSchema } from '@/schemas/block';
import { mediaSchema } from '@/schemas/media';

export const AboutPageSchema = z.object({
  description: blocksContentSchema,
  image: mediaSchema.nullable(),
  items: z.array(
    z.object({
      title: z.string(),
      block: blocksContentSchema,
    })
  ),
});

export type AboutPage = z.infer<typeof AboutPageSchema>;
