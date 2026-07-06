import { z } from 'zod';

import { CartItemSchema } from '@/schemas/cartItem';

export const deliveryTypeEnum = z.enum(['russia', 'courier', 'pickup']);

export const paymentTypeEnum = z.enum(['invoice', 'online']);

export const orderStatusEnum = z.enum(['new', 'confirmed', 'paid', 'completed', 'cancelled']);

const orderBaseSchema = z.object({
  name: z.string().min(2, { message: 'Введите имя (минимум 2 символа)' }),
  surname: z.string().min(2, { message: 'Введите фамилию (минимум 2 символа)' }),
  patronymic: z.string().optional(),
  phone: z.string().min(7, { message: 'Введите корректный номер телефона' }),
  email: z.string().email({ message: 'Введите корректный email' }),
  comment: z.string().max(1000).optional(),
  paymentType: paymentTypeEnum,
  deliveryType: deliveryTypeEnum,
  address: z.string().optional(),
  consentPersonalData: z.literal(true, {
    message: 'Необходимо согласие на обработку персональных данных',
  }),
  consentAds: z.boolean().optional(),
});

const withDeliveryRefinement = <T extends typeof orderBaseSchema>(schema: T) =>
  schema
    .refine((data) => data.deliveryType !== 'russia' || !!data.patronymic, {
      message: 'Отчество обязательно при доставке по России',
      path: ['patronymic'],
    })
    .refine((data) => data.deliveryType !== 'courier' || !!data.address, {
      message: 'Укажите адрес доставки',
      path: ['address'],
    });

export const orderSchema = withDeliveryRefinement(orderBaseSchema);

export const guestOrderItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().int().min(1),
  price: z.number(),
  packageWeight: z.number().optional(),
  packageUnit: z.string().optional(),
});

export const checkoutInputSchema = withDeliveryRefinement(
  orderBaseSchema.extend({
    items: z.array(guestOrderItemSchema).optional(),
  })
);

export const checkoutResponseSchema = z.object({
  success: z.boolean(),
  orderId: z.number(),
});

export type OrderFormData = z.infer<typeof orderSchema>;

export type CheckoutInput = z.infer<typeof checkoutInputSchema>;

export type CheckoutResponse = z.infer<typeof checkoutResponseSchema>;

export const orderHistoryItemSchema = z
  .object({
    id: z.number(),
    ordered_at: z.string().nullable().optional(),
    createdAt: z.string().nullable().optional(),
    order_name: z.string().nullable().optional(),
    order_surname: z.string().nullable().optional(),
    order_patronymic: z.string().nullable().optional(),
    order_phone: z.string().nullable().optional(),
    order_email: z.string().nullable().optional(),
    order_comment: z.string().nullable().optional(),
    payment_type: paymentTypeEnum.nullable().optional(),
    delivery_type: deliveryTypeEnum.nullable().optional(),
    delivery_address: z.string().nullable().optional(),
    order_status: orderStatusEnum.nullable().optional(),
    cart_items: z.array(CartItemSchema),
  })
  .transform(({ cart_items, ordered_at, createdAt, ...rest }) => ({
    ...rest,
    date: ordered_at ?? createdAt ?? null,
    items: cart_items,
    total: cart_items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  }));

export type OrderHistoryItem = z.infer<typeof orderHistoryItemSchema>;

export const orderHistoryResponseSchema = z.array(orderHistoryItemSchema);
