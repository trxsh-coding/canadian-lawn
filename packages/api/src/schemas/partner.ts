import { z } from 'zod';

import { locationSchema } from '@/schemas/location';
import { mediaSchema } from '@/schemas/media';
import { partnerTypeSchema } from '@/schemas/partnerType';

export const partnerSchema = z
  .object({
    id: z.number().optional(),
    name: z.string(),
    working_hours: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    open_on_weekends: z.boolean().optional().nullable(),
    how_to_get: z.string().optional().nullable(),
    location: locationSchema.nullable().optional(),
    website: z.string().optional().nullable(),
    logo: mediaSchema.nullable().optional(),
    partner_type: partnerTypeSchema.nullable().optional(),
    isFeature: z.boolean().nullable().optional(),
  })
  .transform(({ working_hours, open_on_weekends, how_to_get, partner_type, ...item }) => ({
    ...item,
    workingHours: working_hours,
    openOnWeekends: open_on_weekends,
    howToGet: how_to_get,
    partnerType: partner_type, // Renamed to camelCase
  }));

export type Partner = z.infer<typeof partnerSchema>;

export type PartnerInput = z.input<typeof partnerSchema>;
