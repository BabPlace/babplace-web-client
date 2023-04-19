import React from 'react';
import styled from '@emotion/styled';

type Props = {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  width?: string;
  height?: string;
  gap?: string | number;
  alignItems?: string;
  justifyContent?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Flex = ({ children, ...props }: Props) => {
  return <StyledFlex {...props}>{children}</StyledFlex>;
};

export default Flex;

const StyledFlex = styled.div<Omit<Props, 'children'>>`
  display: flex;

  flex-direction: ${({ direction }) => direction};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  gap: ${({ gap }) => gap};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
`;
