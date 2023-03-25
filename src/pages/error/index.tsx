import React from 'react';

type Props = {
  message: string;
};

const index = ({ message }: Props) => {
  return <div>{message}</div>;
};

export default index;
