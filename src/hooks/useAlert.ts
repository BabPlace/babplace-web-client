import { useState } from 'react';

export default function useAlert() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return { handleClose, handleOpen, open };
}
