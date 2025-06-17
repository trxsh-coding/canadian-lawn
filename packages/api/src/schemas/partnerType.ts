import { z } from 'zod';

import { mediaSchema } from '@/schemas/media';

export const partnerTypeSchema = z.object({
  name: z.string(),
  slug: z.string(),
  media: mediaSchema.optional().nullable(),
  description: z.string().optional().nullable(),
});

export type PartnerType = z.infer<typeof partnerTypeSchema>;
