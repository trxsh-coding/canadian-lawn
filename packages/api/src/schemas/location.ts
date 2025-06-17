import { z } from 'zod';

export const locationSchema = z.object({
  address: z.string().nullable().optional(),
  geohash: z.string().optional().nullable(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .nullable()
    .optional(),
});
