import React from 'react';

type Props = {
  children: React.ReactNode;
} & React.SVGProps<SVGSVGElement>;

const SvgIcon = ({ children, ...props }: Props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 96 960 960' fill='rgba(var(--secondary-foreground-rgba))' {...props}>
      {children}
    </svg>
  );
};

export default SvgIcon;
