import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

type Props = {
  open: boolean;
  message: string;
  handleClose: () => void;
  severity?: AlertColor;
};

const AlertSnackBar = ({ open, message, handleClose, severity }: Props) => {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} sx={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackBar;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
