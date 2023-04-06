import type { NextApiRequest, NextApiResponse } from 'next';
import type { TeamInfoResponse } from '@/interfaces';

const dummyTeamInfo: TeamInfoResponse = {
  name: 'dummy',
  radius: 1000,
  limitUser: 10,
  limitRestaurant: 10,
  latitude: 37.5665,
  longitude: 126.978,
};
export default function handler(req: NextApiRequest, res: NextApiResponse<TeamInfoResponse>) {
  res.status(200).json(dummyTeamInfo);
}
