import type { NextApiRequest, NextApiResponse } from 'next';
import type { Restaurant, ResultResponse } from '../../interfaces';

const dummyResultResponse: ResultResponse = [
  {
    name: 'bugger king',
    good: ['닉네임은 요기', 'maybe english', 'Capital?', '1010101'],
    bad: [],
  },
  {
    name: 'pizza queen',
    good: ['최진용'],
    bad: ['su', 'choi', '한찬호'],
  },
  {
    name: '라면킹',
    good: ['최진용', '한찬호'],
    bad: ['su', 'choi'],
  },
  {
    name: 'pizza queen',
    good: ['최진용'],
    bad: ['su', 'choi', '한찬호'],
  },
  {
    name: '라면킹',
    good: ['최진용', '한찬호'],
    bad: ['su', 'choi'],
  },
  {
    name: 'pizza queen',
    good: ['최진용'],
    bad: ['su', 'choi', '한찬호'],
  },
  {
    name: '라면킹',
    good: ['최진용', '한찬호'],
    bad: ['su', 'choi'],
  },
  {
    name: '라면나라 피자왕자',
    good: [],
    bad: ['su', 'choi'],
  },
  {
    name: '마라마라 마라탕',
    good: [],
    bad: ['su', 'choi'],
  },
  {
    name: '김밥지옥',
    good: [],
    bad: ['su', 'choi'],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<ResultResponse>) {
  res.status(200).json(dummyResultResponse);
}
