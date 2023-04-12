import React from 'react';
import { Button } from '@mui/material';
import { ProgressButton, FlexColumn, TypoNotoSans } from '@/layouts';
import { Input, Header, Layout } from '@/components';
import { useInput, useCreateUser } from '@/hooks';
import styles from '@/styles/Gola.module.css';

const SetUser = () => {
  const { value: nickName, isError, handleChange, valitate } = useInput('', maxLength);
  const { isLoaded, onReturn, toResultPage } = useCreateUser(nickName);
  return (
    <Layout title={title} description={description}>
      <Header />
      <div className={styles.setuser}>
        <TypoNotoSans text='사용할 닉네임을 입력해주세요' textAlign='center' variant='h6' />
        <Input
          className={styles.setuser_input}
          type='text'
          enterKeyHint='done'
          error={isError.state}
          errorText={isError.message}
          placeholder='3-10자의 닉네임 입력'
          value={nickName}
          onChange={handleChange}
          onReturn={onReturn}
        />
        <FlexColumn gap='10px'>
          <ProgressButton isLoaded={isLoaded} onClick={onReturn} variant='contained' disabled={!valitate} sx={sendButtonSx}>
            <TypoNotoSans text='생성하기' variant='button' />
          </ProgressButton>
          <Button onClick={toResultPage}>
            <TypoNotoSans text='결과 보러 가기' variant='caption' textAlign='center' color='rgba(var(--caption-foreground-rgba))' />
          </Button>
        </FlexColumn>
      </div>
    </Layout>
  );
};

export default SetUser;

const maxLength = 10;
const title = '팀에 참가하기 | 골라밥 🍚';
const description = '생성한 팀 혹은 초대받은 팀에 보여질 사용자의 닉네임 설정 페이지입니다.';
const sendButtonSx = {
  width: '200px',
  height: 'var(--button-default-height)',
  marginTop: '150px',
};
