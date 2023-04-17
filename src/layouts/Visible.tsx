import React from 'react';
import styled from '@emotion/styled';

type Props = {
  visible: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Visible = ({ visible, children, ...props }: Props) => {
  return (
    <StyledDiv visible={visible} {...props}>
      {children}
    </StyledDiv>
  );
};

export default Visible;

const StyledDiv = styled.div<{ visible: boolean }>`
  && {
    display: ${({ visible }) => (visible ? '' : 'none')};
  }
`;
