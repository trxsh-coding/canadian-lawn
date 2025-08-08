import { z } from 'zod';

export const brandSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const lawnTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const features = z.object({
  id: z.number(),
  name: z.string(),
});

export const partnerTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const purposeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const featureSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const sliderRange = z.object({
  min: z.number(),
  max: z.number(),
});

export const filtersSchema = z.object({
  brands: z.array(brandSchema).optional().nullable(),
  lawnTypes: z.array(lawnTypeSchema).optional().nullable(),
  partnerTypes: z.array(partnerTypeSchema).optional().nullable(),
  purposes: z.array(purposeSchema).optional().nullable(),
  features: z.array(featureSchema).nullable(),
  seedRiseDays: sliderRange,
  coveringWeeks: sliderRange,
});

export type Filters = z.infer<typeof filtersSchema>;
