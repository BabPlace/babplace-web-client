import React from 'react';
import styled from '@emotion/styled';

type Props = {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  width?: string;
  gap?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const FlexColumn = ({ children, direction = 'row', width = '', gap = '', ...props }: Props) => {
  return (
    <StyledFlexColumn direction={direction} width={width} gap={gap} {...props}>
      {children}
    </StyledFlexColumn>
  );
};

export default FlexColumn;

const StyledFlexColumn = styled.div<{ width: string; gap: string; direction: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  width: ${({ width }) => width};
  gap: ${({ gap }) => gap};
  align-items: center;
`;
