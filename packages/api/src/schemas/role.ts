import { z } from 'zod';

const roleType = z.enum(['manager', 'authenticated', 'customer']);

export const roleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  type: roleType,
});

export type User = z.infer<typeof roleSchema>;
