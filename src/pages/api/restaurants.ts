// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Restaurant } from '../interfaces';

const dummyRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'pizza queen',
    address: '123 Main St',
    latitude: 33.5563,
    longitude: 126.79581,
    category: 'Italian',
    distance: 1500,
    teamcenterLat: 1,
    teamcenterLoong: 1,
  },
  {
    id: 2,
    name: 'bugger king',
    address: '123 Main St',
    latitude: 33.5563,
    longitude: 126.79581,
    category: 'Italian',
    distance: 1,
    teamcenterLat: 1,
    teamcenterLoong: 1,
  },
  {
    id: 3,
    name: '김밥천국',
    address: '123 Main St',
    latitude: 33.5563,
    longitude: 126.79581,
    category: 'Italian',
    distance: 1,
    teamcenterLat: 1,
    teamcenterLoong: 1,
  },
  {
    id: 4,
    name: '라면지옥',
    address: '123 Main St',
    latitude: 33.5563,
    longitude: 126.79581,
    category: 'Italian',
    distance: 1500,
    teamcenterLat: 1,
    teamcenterLoong: 1,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Restaurant[]>) {
  res.status(200).json(dummyRestaurants);
}
