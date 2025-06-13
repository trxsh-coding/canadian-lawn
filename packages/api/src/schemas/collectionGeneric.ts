import { z, ZodType } from 'zod';

import { metaSchema } from '@/schemas/meta';

export type CollectionResponse<T> = {
  data: T[];
  meta: z.infer<typeof metaSchema>;
};

export const collectionResponseSchema = <T>(itemSchema: ZodType<T>) => {
  return z.object({
    data: z.array(itemSchema),
    meta: metaSchema,
  });
};
