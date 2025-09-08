import { z } from 'zod';

export const mediaSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string(),
  alternativeText: z.string().nullable(),
  caption: z.string().nullable(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  formats: z.any(),
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  size: z.number(),
  url: z.string(),
  previewUrl: z.string().nullable(),
  provider: z.string(),
  provider_metadata: z.any().nullable(),
});

export type Media = z.infer<typeof mediaSchema>;
