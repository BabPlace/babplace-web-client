import { useMainMap, useSwipeableButton } from '@/hooks';
import { Layout, LoadableMap, BabMarker, SwipeableEdgeDrawer, SwipeableButton, Guide } from '@/components';

const title = '골라밥 🍚';
const description = '친구들과 함께 오늘 메뉴를 골라골라 🍚';

export default function Home() {
  const { loading, latitude, longitude, addressName, onCenterChanged } = useMainMap();
  const { buttons, isShowGuide, hideGuide } = useSwipeableButton();
  return (
    <Layout title={title} description={description} style={{ maxWidth: '100%' }} bodyStyle={{ marginTop: '0px' }}>
      <LoadableMap isLoading={loading} center={{ lat: latitude, lng: longitude }} style={mapStyle} onCenterChanged={onCenterChanged} />
      <BabMarker />
      <SwipeableEdgeDrawer addressName={addressName} lat={latitude} lng={longitude} />
      <SwipeableButton buttons={buttons} />
      <Guide isShowGuide={isShowGuide} hideGuide={hideGuide} />
    </Layout>
  );
}

const mapStyle = {
  overflow: 'hidden',
  width: '100%',
  height: 'calc(100vh - var(--drawer-default-height) + var(--border-radius) + 7px)',
};
