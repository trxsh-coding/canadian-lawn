import { z } from 'zod';

import { apiClient } from '@/clients/axios';
import {
  collectionResponseSchema,
  FetchMode,
  itemResponseSchema,
  plainArraySchema,
  type ResponseType,
} from '@/schemas/collectionGeneric';
import { validateResponse } from '@/utils/validateResponse';

export class FetchBuilder<T extends z.ZodTypeAny, M extends FetchMode> {
  private readonly schema: z.ZodType<T>;
  private readonly endpoint: string;
  private populate?: string[];
  private params?: Record<string, unknown>;
  private filters?: Record<string, unknown>;
  private limit?: number;
  private readonly mode: FetchMode = FetchMode.COLLECTION;

  constructor(schema: z.ZodType<T>, endpoint: string, mode: M) {
    this.schema = schema;
    this.endpoint = endpoint;
    this.mode = mode;
  }

  withPopulate(populate: string[]) {
    this.populate = populate;
    return this;
  }

  withParams(params: Record<string, unknown>) {
    this.params = params;
    return this;
  }

  withFilters(filters: Record<string, unknown>) {
    this.filters = filters;
    return this;
  }

  withLimit(limit: number) {
    this.limit = limit;
    return this;
  }

  async fetch(): Promise<ResponseType<T, M>> {
    const response = await apiClient.get(this.endpoint, {
      params: {
        ...this.params,
        ...(this.filters ? { filters: this.filters } : {}),
        ...(this.populate ? { populate: this.populate } : {}),
        ...(this.limit !== undefined ? { pagination: { pageSize: this.limit } } : {}), // Strapi v4 pagination
      },
    });

    let parsedSchema: z.ZodTypeAny;

    switch (this.mode) {
      case FetchMode.COLLECTION: {
        parsedSchema = collectionResponseSchema(this.schema);
        break;
      }
      case FetchMode.ITEM: {
        parsedSchema = itemResponseSchema(this.schema);
        break;
      }
      case FetchMode.ARRAY: {
        parsedSchema = plainArraySchema(this.schema);
        break;
      }
      default: {
        throw new Error(`Unknown mode '${this.mode}'`);
      }
    }

    return validateResponse(parsedSchema, response.data);
  }
}

export function createFetchBuilder<S extends z.ZodTypeAny, M extends FetchMode>(
  schema: S,
  endpoint: string,
  mode: M
): FetchBuilder<S, M> {
  return new FetchBuilder(schema, endpoint, mode);
}
