import React from 'react';

type Props = {
  children: React.ReactNode;
  fill?: string;
  viewBox?: string;
} & React.SVGProps<SVGSVGElement>;

const SvgIcon = ({ children, viewBox, fill, ...props }: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={viewBox ?? '0 96 960 960'}
      fill={fill ?? 'rgba(var(--secondary-foreground-rgba))'}
      {...props}
    >
      {children}
    </svg>
  );
};

export default SvgIcon;
