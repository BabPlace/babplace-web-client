import Head from 'next/head';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Layout from '@/components/Layout';
import { useState } from 'react';
import SwipeableEdgeDrawer from '@/components/SwipeableEdgeDrawer';

export default function Home() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  return (
    <Layout title='Home' description='main'>
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
