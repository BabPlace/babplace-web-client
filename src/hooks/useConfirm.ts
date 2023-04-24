import { useState } from 'react';
import type { SelectPlace } from '@/interfaces';

export default function useConfirm() {
  const [isShow, setIsShow] = useState(false);
  const [action, setAction] = useState<(select: SelectPlace) => void>(() => {});

  const open = () => {
    setIsShow(true);
  };

  const handleConfirm = (select: SelectPlace) => {
    setIsShow(false);
    action(select);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  return { isShow, open, setAction, handleConfirm, handleClose };
}
