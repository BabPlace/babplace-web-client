import React from 'react';
import { useQuery } from '@/hooks';
import { Visible } from '@/layouts';

const PWAGuide = () => {
  const { isPWA, setQuery } = useQuery();
  return (
    <Visible visible={isPWA}>
      <div
        onClick={() => {
          setQuery('pwa');
        }}
      >
        hihi
      </div>
    </Visible>
  );
};

export default PWAGuide;
