import { ZodSchema } from 'zod';

export function validateResponse<T>(schema: ZodSchema<T>, data: T): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.error('API validation error', result.error);
    throw new Error(`Validation failed: ${result.error.message}`);
  }
  return result.data;
}
