import React from 'react';
import { IconButton } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';

export type Icon = 'home' | 'invite' | 'GOOD' | 'BAD' | 'undo';
type Props = {
  icon: Icon;
} & React.ComponentProps<typeof IconButton>;

const PointerIconButton = ({ icon, ...props }: Props) => {
  function getIcon(icon: Icon) {
    switch (icon) {
      case 'home':
        return <HomeOutlinedIcon />;
      case 'invite':
        return <PersonAddAltIcon />;
      case 'GOOD':
        return <FavoriteBorderRoundedIcon />;
      case 'BAD':
        return <CloseRoundedIcon />;
      case 'undo':
        return <ReplayRoundedIcon />;
      default:
        return <HomeOutlinedIcon />;
    }
  }
  return (
    <IconButton aria-label='home' style={{ cursor: 'pointer' }} {...props}>
      {getIcon(icon)}
    </IconButton>
  );
};

export default PointerIconButton;
