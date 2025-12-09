import { AxiosInstance } from 'axios';
import { z } from 'zod';

import { apiClient, userClient } from '@/clients/axios';
import { Populate } from '@/populate';
import {
  collectionResponseSchema,
  FetchMode,
  itemResponseSchema,
  objectResponseSchema,
  plainArraySchema,
  type ResponseType,
} from '@/schemas/collectionGeneric';
import { validateResponse } from '@/utils/validateResponse';

export class FetchBuilder<T extends z.ZodType, M extends FetchMode> {
  private readonly schema: T;
  private readonly endpoint: string;
  private populate?: Populate;
  private params?: Record<string, unknown>;
  private filters?: Record<string, unknown>;
  private limit?: number;
  private readonly mode: M;
  private readonly client: AxiosInstance;

  constructor(schema: T, endpoint: string, mode: M, client: AxiosInstance = apiClient) {
    this.schema = schema;
    this.endpoint = endpoint;
    this.mode = mode;
    this.client = client;
  }

  withPopulate(populate: Populate) {
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

  fetch(): Promise<ResponseType<z.infer<T>, M>>;

  async fetch() {
    const response = await this.client.get(this.endpoint, {
      params: {
        ...this.params,
        ...(this.filters ? { filters: this.filters } : {}),
        ...(this.populate ? { populate: this.populate } : {}),
        ...(this.limit !== undefined ? { pagination: { pageSize: this.limit } } : {}),
      },
    });

    if (this.mode === FetchMode.COLLECTION) {
      return validateResponse(collectionResponseSchema(this.schema), response.data);
    }

    if (this.mode === FetchMode.ITEM) {
      return validateResponse(itemResponseSchema(this.schema), response.data);
    }

    if (this.mode === FetchMode.ARRAY) {
      return validateResponse(plainArraySchema(this.schema), response.data);
    }

    if (this.mode === FetchMode.OBJECT) {
      return validateResponse(objectResponseSchema(this.schema), response.data);
    }

    throw new Error(`Unknown mode ${this.mode}`);
  }
}

export function createFetchBuilder<S extends z.ZodType, M extends FetchMode>(
  schema: S,
  endpoint: string,
  mode: M,
  token?: string,
  client?: AxiosInstance
): FetchBuilder<S, M> {
  const effectiveClient = client ?? (token ? userClient(token) : apiClient);

  return new FetchBuilder(schema, endpoint, mode, effectiveClient);
}
