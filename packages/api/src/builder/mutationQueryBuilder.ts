import { AxiosInstance } from 'axios';
import { z } from 'zod';

import { apiClient } from '@/clients/axios';
import { validateResponse } from '@/utils/validateResponse';

export class MutationBuilder<TInput extends z.ZodTypeAny, TOutput extends z.ZodTypeAny> {
  private readonly inputSchema: TInput;
  private readonly outputSchema: TOutput;
  private readonly endpoint: string;
  private readonly client: AxiosInstance;

  constructor(
    inputSchema: TInput,
    outputSchema: TOutput,
    endpoint: string,
    client: AxiosInstance = apiClient
  ) {
    this.inputSchema = inputSchema;
    this.outputSchema = outputSchema;
    this.endpoint = endpoint;
    this.client = client;
  }

  async post(data: z.infer<TInput>): Promise<z.infer<TOutput>> {
    const parsed = this.inputSchema.parse(data);

    const response = await this.client.post(this.endpoint, parsed);

    return validateResponse(this.outputSchema, response.data);
  }

  async put(id: string | number, data: z.infer<TInput>): Promise<z.infer<TOutput>> {
    const parsed = this.inputSchema.parse(data);

    const response = await this.client.put(`${this.endpoint}/${id}`, { data: parsed });

    return validateResponse(this.outputSchema, response.data);
  }

  async delete(id: string | number): Promise<void> {
    await this.client.delete(`${this.endpoint}/${id}`);
  }
}
