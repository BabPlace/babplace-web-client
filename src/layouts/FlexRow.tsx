import React from 'react';
import Flex from './Flex';

type Props = {
  children: React.ReactNode;
  width?: string;
  gap?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const FlexRow = ({ children, width = '', gap = '', ...props }: Props) => {
  return (
    <Flex direction='row' width={width} gap={gap} {...props}>
      {children}
    </Flex>
  );
};

export default FlexRow;
