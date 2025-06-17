import { z } from 'zod';

import { mediaSchema } from '@/schemas/media';
import { roleSchema } from '@/schemas/role';

export const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().optional().nullable(),
  confirmed: z.boolean(),
  blocked: z.boolean(),
  role: roleSchema,
  avatar: mediaSchema.nullable().optional(),
});

export type User = z.infer<typeof userSchema>;
