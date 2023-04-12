import React from 'react';
import { TypoNotoSans } from '@/components';
import type { RestaurantSatisfaction, SatisfactionResponse } from '@/interfaces';
import { styled } from '@mui/material';
import styles from '@/styles/ResultDetail.module.css';

type Props = {
  satisfaction: RestaurantSatisfaction;
};

const ResultDetail = ({ satisfaction }: Props) => {
  const content: { name: string; satisfaction: SatisfactionResponse }[] = [
    {
      name: '짱 좋아요',
      satisfaction: 'veryGood',
    },
    {
      name: '좋아요',
      satisfaction: 'good',
    },
    {
      name: '싫어요',
      satisfaction: 'bad',
    },
    {
      name: '못먹어요',
      satisfaction: 'veryBad',
    },
  ];

  if (!satisfaction) return <div>loading...</div>;
  return (
    <div className={styles.container}>
      <div className={styles.flexwrap}>
        {content.map((item) => (
          <div key={`satisfaction-${item.satisfaction}`} className={styles.category}>
            <div className={styles.category_title}>
              <div className={styles.category_title__name}>
                <ColoredCircle satisfaction={item.satisfaction} />
                <TypoNotoSans text={item.name} variant='body2' />
              </div>
              <TypoNotoSans text={(satisfaction[item.satisfaction]?.length ?? 0) + '명'} variant='body2' />
            </div>
            {satisfaction[item.satisfaction]?.map((name, index) => (
              <TypoNotoSans text={name} key={`satisfaction-user-${name}-${index}`} {...userNicknameStyle} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultDetail;

const ColoredCircle = styled('div')<{ satisfaction: SatisfactionResponse }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: rgb(var(${(props) => `--gola-${props.satisfaction.toLowerCase()}-rgb`}));
`;

const userNicknameStyle = {
  variant: 'caption' as const,
  color: 'rgba(var(--secondary-foreground-rgba))',
  lineHeight: '1.2',
  paddingLeft: '15px',
};
