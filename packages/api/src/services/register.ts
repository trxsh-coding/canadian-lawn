import { apiClient } from '@/clients';
import { ENDPOINTS } from '@/config';
import { LoginResponse, loginResponseSchema } from '@/schemas/login';
import { RegisterInput } from '@/schemas/register';
import { validateResponse } from '@/utils/validateResponse';

export const sendRegistration = async (payload: RegisterInput): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>(ENDPOINTS.common.register, payload);

  return validateResponse(loginResponseSchema, data);
};
