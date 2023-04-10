import { Typography, TypographyTypeMap } from '@mui/material';

type Props = {
  children?: React.ReactNode;
  text?: string;
  color?: string;
  className?: string;
} & TypographyTypeMap['props'];

const TypoNotoSans = ({ children, className, color, text, ...props }: Props) => {
  return (
    <Typography
      component='div'
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
