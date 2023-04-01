import { GAxiosInstance } from './instance';
import { TeamInfoParams, TeamInfoResponse, TeamRequest, TeamResponse } from '@/interfaces';

export const createTeam = async ({ name, lat, lng, radius, limitUser = 20, limitRestaurant = 15 }: TeamRequest) => {
  const response = await GAxiosInstance.post<TeamResponse>('/team', {
    name,
    limitUser,
    radius,
    limitRestaurant,
    lat,
    lng,
  });
  return response.data;
};

export const getTeamInfo = async ({ teamId }: TeamInfoParams) => {
  const response = await GAxiosInstance.get<TeamInfoResponse>(`/teamInfo?teamId=${teamId}`);
  return response.data;
};
