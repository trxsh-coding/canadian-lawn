import { z } from 'zod';

export const packageSchema = z.object({
  weight: z.number(),
  price: z.number(),
  unit: z.string().default('кг').optional(),
});

export type Package = z.infer<typeof packageSchema>;
