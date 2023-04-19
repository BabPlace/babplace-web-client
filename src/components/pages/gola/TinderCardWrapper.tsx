import React from 'react';
import TinderCard from 'react-tinder-card';

// @ts-ignore
export default function TinderCardWrapper({ innerRef, ...props }) {
  return <TinderCard {...props} ref={innerRef} />;
}
