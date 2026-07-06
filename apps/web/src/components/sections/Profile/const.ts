import { z } from 'zod';

export const profileFormSchema = z.object({
  email: z.string().email({ message: 'Введите корректный email' }),
  phone: z.string().min(7, { message: 'Введите корректный номер телефона' }),
  firstname: z.string().min(1, { message: 'Введите имя' }),
  lastname: z.string().min(1, { message: 'Введите фамилию' }),
  patronymic: z.string().optional(),
  address: z.string().optional(),
  consent_personal_data: z.boolean().refine((value) => value === true, {
    message: 'Необходимо согласие на обработку персональных данных',
  }),
  consent_marketing: z.boolean().optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
