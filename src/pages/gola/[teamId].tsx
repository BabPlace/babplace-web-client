import { GetServerSideProps } from 'next';
import Gola from './Gola';
import SetUser from './SetUser';
import { getRestaurant } from '@/controller';
import type { Restaurant } from '../../interfaces';

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
  const userId = context.query.userId as string;
  if (userId && !isNaN(Number(userId))) {
    const response = await getRestaurant({ userId });
    return {
      props: {
        userId: Number(userId),
        restaurants: response,
      },
    };
  }
  return {
    props: {
      userId: -1,
      restaurants: [],
    },
  };
};

export default Page;
