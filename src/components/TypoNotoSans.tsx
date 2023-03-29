import { Typography, TypographyTypeMap } from '@mui/material';

type Props = {
  children?: React.ReactNode;
  text?: string;
  className?: string;
} & TypographyTypeMap['props'];

const TypoNotoSans = ({ children, className, text, ...props }: Props) => {
  return (
    <Typography component='div' fontFamily='Noto Sans KR' {...props} className={className} noWrap={true}>
      {text}
      {children}
    </Typography>
  );
};

export default TypoNotoSans;
