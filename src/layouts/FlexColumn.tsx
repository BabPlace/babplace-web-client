import React, { ComponentProps } from 'react';
import Flex from './Flex';

type Props = ComponentProps<typeof Flex>;

const FlexColumn = ({ children, width = '', gap = '', ...props }: Props) => {
  return (
    <Flex direction='column' width={width} gap={gap} {...props}>
      {children}
    </Flex>
  );
};

export default FlexColumn;
