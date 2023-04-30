import React from 'react';

type Props = {
  visible: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Visible = ({ visible, children, ...props }: Props) => {
  if (!visible) return <></>;
  return <div {...props}>{children}</div>;
};

export default Visible;
