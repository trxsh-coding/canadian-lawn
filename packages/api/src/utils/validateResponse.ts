import { z } from 'zod';

export function validateResponse<S extends z.ZodTypeAny>(schema: S, data: unknown): z.infer<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.log(result);
    console.error('Validation error:', result.error.format());
    throw new Error('Validation failed');
  }
  return result.data;
}
