import { ZodType } from 'zod';

import { apiClient } from '@/clients/axios';
import { CollectionResponse, collectionResponseSchema } from '@/schemas/collectionGeneric';
import { validateResponse } from '@/utils/validateResponse';

class CollectionFetchBuilder<T> {
  private readonly schema: ZodType<T>;
  private readonly endpoint: string;
  private populate?: Record<string, unknown | boolean>;
  private params?: Record<string, unknown>;
  private filters?: Record<string, unknown>;

  constructor(schema: ZodType<T>, endpoint: string, populate?: Record<string, unknown | boolean>) {
    this.populate = populate;
    this.schema = schema;
    this.endpoint = endpoint;
  }

  withPopulate(populate: Record<string, unknown | boolean>) {
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

  async fetch(): Promise<CollectionResponse<T>> {
    const response = await apiClient.get(this.endpoint, {
      params: {
        ...this.params,
        ...(this.populate ? { populate: this.populate } : {}),
      },
    });
    const collectionSchema = collectionResponseSchema(this.schema);

    return validateResponse(collectionSchema, response.data);
  }
}

export function fetchCollectionBuilder<T>(
  schema: ZodType<T>,
  endpoint: string,
  populate?: Record<string, unknown | boolean>
): CollectionFetchBuilder<T> {
  return new CollectionFetchBuilder<T>(schema, endpoint, populate);
}
