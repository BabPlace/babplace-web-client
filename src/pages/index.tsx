import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import SwipeableEdgeDrawer from '@/components/SwipeableEdgeDrawer';

export default function Home() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  return (
    <Layout title='골라밥 🍚' description='친구들과 함께 오늘 메뉴를 골라골라 🍚'>
      <Header showButtons={false} />
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: '100%', height: '100vh' }}
        onCenterChanged={(map) => {
          setLat(map.getCenter().getLat());
          setLng(map.getCenter().getLng());
        }}
      >
        <MapMarker
          position={{
            lat: lat,
            lng: lng,
          }}
        />
      </Map>
      <SwipeableEdgeDrawer />
    </Layout>
  );
}
