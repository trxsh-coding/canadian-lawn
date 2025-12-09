import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().email(),
  password: z.string().min(6),
});

export const loginResponseSchema = z.object({
  jwt: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string().email(),
    confirmed: z.boolean(),
    blocked: z.boolean(),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type LoginResponse = z.infer<typeof loginResponseSchema>;
