import { z } from 'zod';

export const filterSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const sliderRange = z.object({
  min: z.number(),
  max: z.number(),
});

export const filtersSchema = z.object({
  brands: z.array(filterSchema).optional().nullable(),
  lawnTypes: z.array(filterSchema).optional().nullable(),
  partnerTypes: z.array(filterSchema).optional().nullable(),
  purposes: z.array(filterSchema).optional().nullable(),
  features: z.array(filterSchema).nullable(),
  seedRiseDays: sliderRange,
  coveringWeeks: sliderRange,
});

export type Filters = z.infer<typeof filtersSchema>;

export type Filter = z.infer<typeof filterSchema>;
