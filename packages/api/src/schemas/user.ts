import { z } from 'zod';

import { mediaSchema } from '@/schemas/media';
import { roleSchema } from '@/schemas/role';

// Strapi serializes `biginteger` fields (like `phone`) as strings to avoid precision loss.
const phoneSchema = z
  .union([z.number(), z.string()])
  .nullable()
  .optional()
  .transform((value): number | null | undefined => {
    if (value === null || value === undefined) return value;

    return Number(value);
  });

export const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().optional().nullable(),
  phone: phoneSchema,
  firstname: z.string().optional().nullable(),
  lastname: z.string().optional().nullable(),
  patronymic: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  consent_personal_data: z.boolean().optional().nullable(),
  consent_marketing: z.boolean().optional().nullable(),
  confirmed: z.boolean(),
  blocked: z.boolean(),
  role: roleSchema.optional().nullable(),
  avatar: mediaSchema.nullable().optional(),
});

export type User = z.infer<typeof userSchema>;

export const profileUpdateSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  patronymic: z.string().optional().nullable(),
  email: z.string().email(),
  phone: z.number().optional().nullable(),
  address: z.string().optional().nullable(),
  consent_personal_data: z.boolean(),
  consent_marketing: z.boolean(),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

// Strapi's `PUT /users/:id` returns the sanitized user object directly (not wrapped in `data`).
export const profileResponseSchema = userSchema;
