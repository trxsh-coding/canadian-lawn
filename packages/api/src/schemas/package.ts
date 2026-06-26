import { z } from 'zod';

export const packageSchema = z.object({
  weight: z.number(),
  price: z.number(),
  unit: z.string().default('kg').optional(),
});

export type Package = z.infer<typeof packageSchema>;
