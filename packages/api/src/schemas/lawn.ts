import { z } from 'zod';

import { filterSchema } from '@/schemas/filters';
import { mediaSchema } from '@/schemas/media';
import { monthsSchema } from '@/schemas/months';
import { partnerSchema } from '@/schemas/partner';

const packages = z.object({
  weight: z.number(),
  price: z.number(),
});

const LawnTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

const type = z.object({
  lawn_type: LawnTypeSchema.nullable().optional(),
  percent: z.number().nullable().optional(),
});

export const lawnSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable().optional(),
    slug: z.string().nullable(),
    speed: z.number().min(0).max(10).optional(),
    resistance: z.number().min(0).max(10).optional(),
    image: mediaSchema.optional().nullable(),
    gallery: z.array(mediaSchema).optional().nullable(),
    landing: monthsSchema.optional().nullable(),
    price: z.array(packages),
    type: z.array(type),
    partners_types: z.array(filterSchema).optional().nullable(),
    partner: partnerSchema.optional().nullable(),
  })
  .transform(({ partners_types, type, ...item }) => ({
    ...item,
    partnersType: partners_types,
    type: type.map(({ ...item }) => ({ percent: item.percent, lawnType: item.lawn_type })),
  }));

export type Lawn = z.output<typeof lawnSchema>;

export type LawnInput = z.input<typeof lawnSchema>;
