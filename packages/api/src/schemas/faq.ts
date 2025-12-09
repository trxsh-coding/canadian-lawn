import { z } from 'zod';

export const faqSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string().nullable().optional(),
  blocks: z.string().nullable(),
});

export type Faq = z.output<typeof faqSchema>;

export type FaqInput = z.input<typeof faqSchema>;
