import React, { ComponentProps } from 'react';
import Flex from './Flex';

type Props = ComponentProps<typeof Flex>;

const FlexRow = ({ children, width = '', gap = '', ...props }: Props) => {
  return (
    <Flex direction='row' width={width} gap={gap} {...props}>
      {children}
    </Flex>
  );
};

export default FlexRow;
