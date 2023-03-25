import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';
import { url } from '@/utils/url';
import styles from '@/styles/Gola.module.css';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Error from 'next/error';
import Router from 'next/router';
import type { ResultRequest, Restaurant, SatisfactionByRestaurant } from '../interfaces';

const NoSSRCard = dynamic<{
  restaurant: Restaurant;
  changeInfo: Dispatch<SetStateAction<Restaurant>>;
  change: Dispatch<SetStateAction<boolean>>;
  addResult: (newResult: SatisfactionByRestaurant) => void;
  children?: React.ReactNode;
}>(() => import('../../components/Card'), {
  ssr: false,
});

type Props = {
  restaurants: Restaurant[];
  userId: number;
  error?: string | unknown;
};

function Page({ restaurants, userId, error }: Props) {
  const [restaurantInfo, setRestaurantInfo] = useState<Restaurant>(restaurants[0]);
  const [isChanged, setIsChanged] = useState(true);
  const [result, setResult] = useState<ResultRequest>({ userId, restaurantSatisfactions: [] });

  const addResult = (newResult: SatisfactionByRestaurant) => {
    setResult({ ...result, restaurantSatisfactions: [...result.restaurantSatisfactions, newResult] });
  };
  useEffect(() => {
    if (restaurants.length === result.restaurantSatisfactions.length) {
      console.log(url('/result'));
      axios.post(url('/result'), result).then((res) => {
        Router.push('/result');
      });
    }
  }, [result]);

  if (!userId || userId < 0) {
    return <Error statusCode={404} />;
  }
  return (
    <Layout title='restaurant choose page' description='restaurant choose page for team, user'>
      <div className={styles.container}>
        <div className={styles.relative}>
          <div className={styles.logo}>골라밥</div>
          {restaurants.map((restaurant) => (
            <NoSSRCard
              key={restaurant.id}
              restaurant={restaurant}
              changeInfo={setRestaurantInfo}
              change={setIsChanged}
              addResult={addResult}
            >
              <div className={styles.info}>
                {restaurantInfo.name}
                <p />
                {restaurantInfo.address}
                <p />
                {restaurantInfo.distance}
              </div>
            </NoSSRCard>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const userId = parseInt(context.query.userId as string);
  try {
    const response = await axios<Restaurant[]>({ method: 'GET', url: url(`/restaurants?userId=${userId}`) });
    const restaurants = response.data;
    return { props: { restaurants, userId } };
  } catch (error) {
    return { props: { restaurants: [], userId, error } };
  }
};

export default Page;
