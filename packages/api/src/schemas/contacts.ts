import { z } from 'zod';

import { locationSchema } from '@/schemas/location';
import { mediaSchema } from '@/schemas/media';

export const requisiteSchema = z.object({
  value: z.string().nullable().optional(),
  date: z.string().nullable().optional(),
});

const contactPageRawSchema = z.object({
  company_name: z.string().nullable().optional(),
  request_mail: z.string().nullable().optional(),
  offer_mail: z.string().nullable().optional(),
  address: locationSchema.nullable().optional(),
  inn: z.string().nullable().optional(),
  kpp: z.string().nullable().optional(),
  ogrn: z.string().nullable().optional(),
  PSRN: requisiteSchema.optional().nullable(),
  document: mediaSchema.nullable().optional(),
});

export const contactPageSchema = contactPageRawSchema.transform(
  ({ offer_mail, company_name, request_mail, ...item }) => ({
    ...item,
    offerMail: offer_mail,
    companyName: company_name,
    requestMail: request_mail,
  })
);

export type ContactPageInput = z.infer<typeof contactPageRawSchema>;

export type ContactPageType = z.infer<typeof contactPageSchema>;
