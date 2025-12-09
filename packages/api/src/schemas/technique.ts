import { z } from 'zod';

export const techniqueSchema = z.object({
  model: z.string().nullable().optional(),
});
