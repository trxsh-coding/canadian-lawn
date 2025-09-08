import { apiClient } from '@/clients';
import { ENDPOINTS } from '@/config';
import { LoginInput, LoginResponse, loginResponseSchema } from '@/schemas/login';
import { validateResponse } from '@/utils/validateResponse';

export const sendLogin = async (payload: LoginInput): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>(ENDPOINTS.common.register, payload);

  return validateResponse(loginResponseSchema, data);
};
