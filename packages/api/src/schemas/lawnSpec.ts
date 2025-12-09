import { z } from 'zod';

import { compositionItemSchema } from '@/schemas/composition';
import { LawnTypeSchema } from '@/schemas/lawn';
import { monthsSchema } from '@/schemas/months';
import { packageSchema } from '@/schemas/package';

export const lawnSingleSchema = z.object({
  id: z.number(),
  speed: z.number().nullable().optional(),
  resistance: z.number().nullable().optional(),
  landing: monthsSchema.nullable().optional(),
  seasonality: z.string().nullable().optional(),
  germinition_time: z.string().nullable().optional(),
  full_cover_time: z.string().nullable().optional(),
  density: z.string().nullable().optional(),
  shade_tolerance: z.string().nullable().optional(),
  type: LawnTypeSchema.nullable().optional(),
  mix: z.array(compositionItemSchema).optional().nullable(),
  package: z.array(packageSchema).optional().nullable(),
});
