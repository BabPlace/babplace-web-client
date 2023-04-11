import type { NextApiRequest, NextApiResponse } from 'next';
import type { ResultResponse } from '../../interfaces';

const dummyResultResponse: ResultResponse = [
  {
    restaurantName: 'bugger king',
    good: ['닉네임은 요기', 'maybe english', 'Capital?', '1010101'],
    bad: [],
  },
  {
    restaurantName: 'pizza queen',
    good: ['최진용'],
    bad: ['su', 'choi', '한찬호'],
  },
  {
    restaurantName: '라면킹',
    good: ['최진용', '한찬호'],
    bad: ['su', 'choi'],
  },
  {
    restaurantName: 'pizza queen',
    good: ['최진용'],
    bad: ['su', 'choi', '한찬호'],
  },
  {
    restaurantName: '라면킹',
    good: ['최진용', '한찬호'],
    bad: ['su', 'choi'],
  },
  {
    restaurantName: 'pizza queen',
    good: ['최진용'],
    bad: ['su', 'choi', '한찬호'],
  },
  {
    restaurantName: '라면킹',
    good: ['최진용', '한찬호'],
    bad: ['su', 'choi'],
  },
  {
    restaurantName: '라면나라 피자왕자',
    good: [],
    bad: ['su', 'choi'],
  },
  {
    restaurantName: '마라마라 마라탕',
    good: [],
    bad: ['su', 'choi'],
  },
  {
    restaurantName: '김밥지옥',
    good: [],
    bad: ['su', 'choi'],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<ResultResponse>) {
  res.status(200).json(dummyResultResponse);
}
