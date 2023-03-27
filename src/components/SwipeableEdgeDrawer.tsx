import React, { useState } from 'react';
import styles from '@/styles/Drawer.module.css';
import { Button } from '@mui/material';

type Props = {
  children: React.ReactNode;
};
const List = ({ children }: Props) => {
  return <ul className={styles.ul}>{children}</ul>;
};

const ListItem = ({ children }: Props) => {
  return <li className={styles.li}>{children}</li>;
};

export default function SwipeableEdgeDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div className={[styles.container, open ? styles.show : ''].join(' ')}>
      <div className={[styles.drawer, open ? styles.open : styles.default].join(' ')} onClick={() => setOpen((prev) => !prev)}>
        <List>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
        {/* 버튼 그룹넣기 */}
        <Button variant='contained' fullWidth>
          완료
        </Button>
      </div>
    </div>
  );
}
