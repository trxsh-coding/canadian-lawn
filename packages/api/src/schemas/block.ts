import { BlocksContent } from '@strapi/blocks-react-renderer';
import { z } from 'zod';

export const blocksContentSchema = z.any() as z.ZodType<BlocksContent>;

export const blockContentItem = z.object({
  id: z.number(),
  title: z.string(),
  block: blocksContentSchema,
});

export type BlocksContentInput = z.infer<typeof blocksContentSchema>;

export type BlockContentItem = z.infer<typeof blockContentItem>;
