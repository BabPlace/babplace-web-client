import { GetServerSideProps } from 'next';
import Gola from './Gola';
import SetUser from './SetUser';
import { getRestaurant } from '@/controller';
import type { Restaurant } from '../../interfaces';
import ErrorBoundary from '@/components/ErrorBoundary';

type Props = {
  userId: number;
  restaurants: Restaurant[];
};

function Page({ userId, restaurants }: Props) {
  const isValidUser = userId >= 0;

  return <ErrorBoundary>{isValidUser ? <Gola restaurants={restaurants} isValidUser={isValidUser} /> : <SetUser />}</ErrorBoundary>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId as string;
  if (userId && !isNaN(Number(userId))) {
    try {
      const restaurants = await getRestaurant({ userId });
      return {
        props: { userId: Number(userId), restaurants },
      };
    } catch (error) {
      return {
        props: { userId: userId, restaurants: [] },
      };
    }
  }
  return {
    props: { userId: -1, restaurants: [] },
  };
};

export default Page;
