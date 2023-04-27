import React, { useState } from 'react';
import { FlexRow, TypoNotoSans } from '@/layouts';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import styled from '@emotion/styled';
import styles from '@/styles/Tabs.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  titles: string[];
  contents: React.ReactNode[];
};

const Tabs = ({ titles, contents }: Props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  return (
    <Swiper
      spaceBetween={50}
      style={swiperStyle}
      onSlideChange={(swiper) => {
        setSlideIndex(swiper.realIndex);
      }}
    >
      <TabsTitle titles={titles} slideIndex={slideIndex} />
      {contents.map((content, index) => (
        <SwiperSlide key={`tabs-content-${index}`} className={styles.tabs_content}>
          {content}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Tabs;

const swiperStyle = { width: '100%', height: '100%' };
const textPrimary = 'rgba(var(--primary-foreground-rgba))';
const textSecondary = 'rgba(var(--tertiary-foreground-rgb))';

const TabsTitle = ({ titles, slideIndex }: { titles: string[]; slideIndex: number }) => {
  const swiper = useSwiper();

  return (
    <FlexRow className={styles.tabs_title} justifyContent='stretch' alignItems='center'>
      <TabsTitleHighlighter slideIndex={slideIndex} />
      {titles.map((title, index) => (
        <div
          key={`tabs-title-item-${index}`}
          className={styles.tabs_title__item}
          onClick={() => {
            swiper.slideTo(index);
          }}
        >
          <TypoNotoSans text={title} color={index === slideIndex ? textPrimary : textSecondary} />
        </div>
      ))}
    </FlexRow>
  );
};

const TabsTitleHighlighter = styled.div<{ slideIndex: number }>`
  position: absolute;
  top: 0;
  width: 50%;
  height: var(--tabs-default-height);
  border-bottom: 1px solid rgba(var(--secondary-foreground-rgba));
  transform: ${({ slideIndex }) => `translateX(calc(${slideIndex} * 100%))`};
  transition: transform 0.3s ease-in-out;
`;
