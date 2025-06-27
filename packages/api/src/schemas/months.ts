import { z } from 'zod';

export const monthsSchema = z.object({
  january: z.boolean(),
  february: z.boolean(),
  march: z.boolean(),
  april: z.boolean(),
  may: z.boolean(),
  june: z.boolean(),
  july: z.boolean(),
  august: z.boolean(),
  september: z.boolean(),
  october: z.boolean(),
  november: z.boolean(),
  december: z.boolean(),
});

export type Months = z.infer<typeof monthsSchema>;
