import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useMainMap } from '@/hooks';
import { Layout, SwipeableEdgeDrawer, BabMarker } from '@/components';

const title = '골라밥 🍚';
const description = '친구들과 함께 오늘 메뉴를 골라골라 🍚';

export default function Home() {
  const { loading, latitude, longitude, addressName, onCenterChanged } = useMainMap();
  return (
    <Layout title={title} description={description} style={{ maxWidth: '100%' }} bodyStyle={{ marginTop: '0px' }}>
      {!loading && <Map center={{ lat: latitude, lng: longitude }} style={mapStyle} onCenterChanged={onCenterChanged}></Map>}
      <BabMarker />
      <SwipeableEdgeDrawer addressName={addressName} lat={latitude} lng={longitude} />
    </Layout>
  );
}

const mapStyle = {
  width: '100%',
  height: 'calc(100vh - var(--drawer-default-height) + var(--border-radius) + 7px)',
};
