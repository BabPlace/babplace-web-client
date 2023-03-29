import type { NextApiRequest, NextApiResponse } from 'next';
import type { UserResponse } from '../../interfaces';

const dummyUserResponse: UserResponse = {
  userId: '1',
};

export default function handler(req: NextApiRequest, res: NextApiResponse<UserResponse>) {
  res.status(200).json(dummyUserResponse);
}
