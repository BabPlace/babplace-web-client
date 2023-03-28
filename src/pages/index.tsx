import { useEffect, useState } from 'react';
import { Map, useInjectKakaoMapApi } from 'react-kakao-maps-sdk';
import { Header, Layout, SwipeableEdgeDrawer, BabMarker } from '@/components';

export default function Home() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const { loading } = useInjectKakaoMapApi({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY ?? '',
  });

  useEffect(() => {
    if (loading) return;

    const geocoder = new kakao.maps.services.Geocoder();
    console.log(geocoder);
  }, [loading]);

  return (
    <Layout title='골라밥 🍚' description='친구들과 함께 오늘 메뉴를 골라골라 🍚' style={{ marginTop: '0px' }}>
      {/* <Header /> */}
      {/* <div>🍚 골라밥 </div> */}
      <BabMarker />
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{
          width: '100%',
          height: 'calc(100% - var(--drawer-default-height) + var(--header-default-height) + var(--border-radius) + 7px)',
        }}
        onCenterChanged={(map) => {
          setLat(map.getCenter().getLat());
          setLng(map.getCenter().getLng());
        }}
      >
        {/* <MapMarker
          position={{
            lat: lat,
            lng: lng,
          }}
        /> */}
      </Map>
      <SwipeableEdgeDrawer />
    </Layout>
  );
}
