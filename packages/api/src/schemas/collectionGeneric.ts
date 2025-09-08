import { z } from 'zod';

import { Meta, metaSchema } from '@/schemas/meta';

export enum FetchMode {
  COLLECTION = 'collection',
  ITEM = 'item',
  ARRAY = 'array',
  OBJECT = 'object',
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

export const objectResponseSchema = <S extends z.ZodTypeAny>(itemSchema: S) => itemSchema;

export const plainArraySchema = <S extends z.ZodTypeAny>(itemSchema: S) => z.array(itemSchema);

export type CollectionResponse<T> = {
  data: T[];
  meta: Meta;
};

export type ItemResponse<T> = {
  data: T;
  meta?: Meta;
};

export type ObjectResponse<T> = T;

export type PlainArrayResponse<T> = T[];

export type ResponseType<T, Mode extends FetchMode> = Mode extends FetchMode.COLLECTION
  ? CollectionResponse<T>
  : Mode extends FetchMode.ITEM
    ? ItemResponse<T>
    : Mode extends FetchMode.ARRAY
      ? PlainArrayResponse<T>
      : Mode extends FetchMode.OBJECT
        ? ObjectResponse<T>
        : never;
