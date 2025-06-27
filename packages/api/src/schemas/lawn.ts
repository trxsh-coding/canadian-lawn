import { z } from 'zod';

import { mediaSchema } from '@/schemas/media';
import { monthsSchema } from '@/schemas/months';

const packages = z.object({
  weight: z.number(),
  price: z.number(),
});

export const lawnSchema = z.object({
  name: z.string(),
  speed: z.number().min(0).max(10).optional(),
  resistance: z.number().min(0).max(10).optional(),
  image: mediaSchema.optional().nullable(),
  gallery: z.array(mediaSchema).optional().nullable(),
  landing: monthsSchema.optional().nullable(),
  price: z.array(packages),
});

export type Lawn = z.infer<typeof lawnSchema>;
