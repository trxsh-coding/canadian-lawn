import { z } from 'zod';

import { Meta, metaSchema } from '@/schemas/meta';

export enum FetchMode {
  COLLECTION = 'collection',
  ITEM = 'item',
  ARRAY = 'array',
}

export const collectionResponseSchema = <S extends z.ZodTypeAny>(itemSchema: S) =>
  z.object({
    data: z.array(itemSchema),
    meta: metaSchema,
  });

export const itemResponseSchema = <S extends z.ZodTypeAny>(itemSchema: S) =>
  z.object({
    data: itemSchema,
    meta: metaSchema.optional(),
  });

export const plainArraySchema = <S extends z.ZodTypeAny>(itemSchema: S) => z.array(itemSchema);

export type CollectionResponse<T> = {
  data: T[];
  meta: Meta;
};

export type ItemResponse<T> = {
  data: T;
  meta?: Meta;
};

export type PlainArrayResponse<T> = T[];

export type ResponseType<T, Mode extends FetchMode> = Mode extends 'collection'
  ? CollectionResponse<T>
  : Mode extends 'item'
    ? ItemResponse<T>
    : Mode extends 'array'
      ? PlainArrayResponse<T>
      : never;
