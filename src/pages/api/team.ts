import type { NextApiRequest, NextApiResponse } from 'next';
import type { TeamResponse } from '../../interfaces';

const dummyTeamResponse: TeamResponse = {
  teamId: '1',
};

export default function handler(req: NextApiRequest, res: NextApiResponse<TeamResponse>) {
  res.status(200).json(dummyTeamResponse);
}
