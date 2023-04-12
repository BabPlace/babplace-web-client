import { useMainMap } from '@/hooks';

import { Layout, LoadableMap, BabMarker, SwipeableEdgeDrawer, SwipeableButton, Guide, ErrorBoundary } from '@/components';

export default function Home() {
  const { loading, latitude: lat, longitude: lng, addressName, onCenterChanged } = useMainMap();

  return (
    <ErrorBoundary>
      <Layout title={title} description={description} bodyStyle={{ marginTop: '0px' }}>
        <Guide />
        <LoadableMap isLoading={loading} center={{ lat, lng }} style={mapStyle} onCenterChanged={onCenterChanged} />
        {!loading && <BabMarker />}
        {!loading && <SwipeableButton />}
        <SwipeableEdgeDrawer addressName={addressName} lat={lat} lng={lng} />
      </Layout>
    </ErrorBoundary>
  );
}

const title = '골라밥 🍚';
const description = '친구들과 함께 오늘 메뉴를 골라골라 🍚';
const mapStyle = {
  overflow: 'hidden',
  width: '100%',
  height: 'calc(100vh - var(--drawer-default-height) + var(--border-radius) + 7px)',
  zIndex: 0,
};
