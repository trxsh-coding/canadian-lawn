import { z } from 'zod';

export const packageSchema = z.object({
  weight: z.number(),
  price: z.number(),
  stock: z.number().optional(),
  unit: z.string().default('kg').optional(),
});
