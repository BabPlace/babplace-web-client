import { Typography, TypographyTypeMap } from '@mui/material';

type Props = {
  children: React.ReactNode;
  className?: string;
} & TypographyTypeMap['props'];

const TypoNotoSans = ({ children, className, ...props }: Props) => {
  return (
    <Typography component='div' fontFamily='Noto Sans KR' {...props} className={className}>
      {children}
    </Typography>
  );
};

export default TypoNotoSans;
