import React from 'react';
import Flex from './Flex';

type Props = {
  children: React.ReactNode;
  width?: string;
  gap?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const FlexColumn = ({ children, width = '', gap = '', ...props }: Props) => {
  return (
    <Flex direction='column' width={width} gap={gap} {...props}>
      {children}
    </Flex>
  );
};

export default FlexColumn;
