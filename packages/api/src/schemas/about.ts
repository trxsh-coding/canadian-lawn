import { type BlocksContent } from '@strapi/blocks-react-renderer';
import { z } from 'zod';

import { mediaSchema } from '@/schemas/media';

export const BlocksContentSchema = z.any() as z.ZodType<BlocksContent>;

export const AboutPageSchema = z.object({
  description: BlocksContentSchema,
  image: mediaSchema.nullable(),
  items: z.array(
    z.object({
      title: z.string(),
      block: BlocksContentSchema,
    })
  ),
});

export type AboutPage = z.infer<typeof AboutPageSchema>;
