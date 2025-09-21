import { z } from 'zod';

export const feedbackSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.number(),
  message: z.string(),
});

export const feedbackResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime().optional(),
  }),
});

export type FeedbackResponse = z.infer<typeof feedbackResponseSchema>;

export type FeedbackInput = z.infer<typeof feedbackSchema>;
