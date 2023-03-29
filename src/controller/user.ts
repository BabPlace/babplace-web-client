import { GAxiosInstance } from './instance';
import { UserResponse, UserParams, UserRequest } from '@/interfaces';

export const createUser = async ({ teamId, nickName }: UserParams & UserRequest) => {
  const response = await GAxiosInstance.post<UserResponse>(`/user?teamId=${teamId}`, { nickName });
  return response.data;
};
