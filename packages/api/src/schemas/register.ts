import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email(),
  firstName: z.string().email(),
  lastName: z.string().email(),
  password: z.string().min(6),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
