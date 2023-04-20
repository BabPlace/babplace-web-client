import React, { useEffect } from 'react';
import { useQuery } from '@/hooks';
import { Visible, TypoNotoSans, FlexRow, FlexColumn } from '@/layouts';
import { CategoryIcon } from '@/icons';
import { distanceFormat } from '@/utils';
import styles from '@/styles/Search.module.css';

type Props = {
  value: string;
  searchResult: kakao.maps.services.PlacesSearchResult;
  reset: () => void;
};

const SearchResultBox = ({ value, searchResult, reset }: Props) => {
  const { isSearch } = useQuery();

  const splitValue = (source: string, delim: string) => {
    const isValidDelim = (delim: string) => {
      const regex = /^[a-zA-Z0-9가-힣\s]*$/;
      return regex.test(delim);
    };
    if (!isValidDelim(delim)) {
      return [source];
    }
    return source.split(new RegExp(`(${delim})`, 'gi'));
  };

  // useEffect(() => {
  //   if (!isSearch) reset();
  // }, [isSearch]);

  return (
    <Visible visible={isSearch} className={styles.search_result}>
      <div>
        <ul className={styles.search_result__ul}>
          {searchResult.map((item) => (
            <li key={item.id} className={styles.search_result__li}>
              <FlexRow alignItems='center' gap='15px'>
                <FlexColumn alignItems='center' width='30px'>
                  <CategoryIcon category={item.category_group_name} />
                  <TypoNotoSans
                    text={distanceFormat(parseInt(item.distance))}
                    variant='caption'
                    color='rgba(var(--caption-foreground-rgba))'
                    sx={{ transform: 'scale(0.7)' }}
                  />
                </FlexColumn>
                <FlexColumn>
                  <div>
                    {splitValue(item.place_name, value).map((word) =>
                      word.toLowerCase() === value.toLowerCase() ? (
                        <TypoNotoSans text={word} component='span' fontSize='0.9rem' color='blue' />
                      ) : (
                        <TypoNotoSans text={word} component='span' fontSize='0.9rem' paddingLeft='1px' />
                      )
                    )}
                  </div>
                  <TypoNotoSans
                    text={item.road_address_name.length > 0 ? item.road_address_name : item.address_name}
                    variant='caption'
                    color='rgba(var(--secondary-foreground-rgba))'
                  />
                </FlexColumn>
              </FlexRow>
            </li>
          ))}
        </ul>
      </div>
    </Visible>
  );
};

export default SearchResultBox;
