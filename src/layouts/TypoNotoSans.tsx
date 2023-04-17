import React from 'react';
import { Typography, TypographyTypeMap } from '@mui/material';

type Props = {
  children?: React.ReactNode;
  text?: string;
  color?: string;
  component?: React.ElementType;
  className?: string;
} & TypographyTypeMap['props'];

const TypoNotoSans = ({ children, className, color, text, component = 'div', ...props }: Props) => {
  return (
    <Typography
      component={component}
      fontFamily='Noto Sans KR'
      color={color ?? 'rgba(var(--primary-foreground-rgba))'}
      {...props}
      className={className}
      noWrap={props.noWrap === undefined ? true : props.noWrap}
    >
      {text}
      {children}
    </Typography>
  );
};

export default TypoNotoSans;
