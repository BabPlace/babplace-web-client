import { GetServerSideProps } from 'next';
import axios from 'axios';
import { url } from '@/utils';
import Gola from './Gola';
import SetUser from './SetUser';
import type { Restaurant } from '../interfaces';

type Props = {
  userId: number;
  restaurants: Restaurant[];
};

function Page({ userId, restaurants }: Props) {
  const isValidUser = userId >= 0;

  if (!isValidUser) {
    return <SetUser />;
  }
  return <Gola restaurants={restaurants} isValidUser={isValidUser} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId;
  if (userId && !isNaN(Number(userId))) {
    try {
      const response = await axios<Restaurant[]>({ method: 'GET', url: url(`/restaurants?userId=${userId}`) });
      return {
        props: {
          userId: Number(userId),
          restaurants: response.data,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
  return {
    props: {
      userId: -1,
      restaurants: [],
    },
  };
};

export default Page;
