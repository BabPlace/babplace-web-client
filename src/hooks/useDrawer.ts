import { useEffect, useRef, useState } from 'react';
import useQuery from './useQuery';

export default function useDrawer() {
  const { setQuery } = useQuery();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleDrawer = (bool: boolean) => {
    setOpen(bool);
  };

  useEffect(() => {
    if (open) {
      setQuery('drawer', 'open');
    } else {
      setQuery('drawer');
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside({ target }: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(target as Node)) {
        handleDrawer(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [drawerRef]);

  useEffect(() => {
    let touchDownPosition = 0;
    function handleTouchStart(event: TouchEvent) {
      touchDownPosition = event.touches[0].pageY;
    }
    function handleTouchMove(event: TouchEvent) {
      event.preventDefault();
      if (event.touches.length === 0) return;
      if (touchDownPosition - event.touches[0].pageY > 10) {
        handleDrawer(true);
      }
      if (touchDownPosition - event.touches[0].pageY < -20) {
        handleDrawer(false);
      }
    }
    if (drawerRef.current) {
      drawerRef.current.addEventListener('touchstart', handleTouchStart);
      drawerRef.current.addEventListener('touchmove', handleTouchMove);
      return () => {
        drawerRef.current?.removeEventListener('touchstart', handleTouchStart);
        drawerRef.current?.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [drawerRef]);

  return { drawerRef, open, handleDrawer };
}
