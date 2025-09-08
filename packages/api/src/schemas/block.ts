import { BlocksContent } from '@strapi/blocks-react-renderer';
import { z } from 'zod';

export const blocksContentSchema = z.any() as z.ZodType<BlocksContent>;

export type BlocksContentInput = z.infer<typeof blocksContentSchema>;
