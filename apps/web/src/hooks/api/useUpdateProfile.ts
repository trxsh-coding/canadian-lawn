import {
  apiClient,
  ENDPOINTS,
  ProfileUpdateInput,
  profileResponseSchema,
  userClient,
} from '@canadian-lawn/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdateProfilePayload = {
  id: string | number;
  token?: string;
  data: ProfileUpdateInput;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, token, data }: UpdateProfilePayload) => {
      const client = token ? userClient(token) : apiClient;
      const response = await client.put(`${ENDPOINTS.common.user}/${id}`, data);

      return profileResponseSchema.parse(response.data);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['me'], data);
    },
  });
};
