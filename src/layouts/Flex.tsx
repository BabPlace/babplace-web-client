import React from 'react';
import styled from '@emotion/styled';

type Props = {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  width?: string;
  height?: string;
  gap?: string;
  alignItems?: string;
  justifyContent?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const FlexColumn = ({ children, ...props }: Props) => {
  return <StyledFlexColumn {...props}>{children}</StyledFlexColumn>;
};

export default FlexColumn;

const StyledFlexColumn = styled.div<Omit<Props, 'children'>>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  gap: ${({ gap }) => gap};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
`;
