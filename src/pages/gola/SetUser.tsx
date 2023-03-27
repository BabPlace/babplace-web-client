import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import TypoNotoSans from '@/components/TypoNotoSans';
import Input from '@/components/Input';
import { useInput } from '@/hooks';
import { url } from '@/utils';
import styles from '@/styles/Gola.module.css';

const SetUser = () => {
  const router = useRouter();
  const { value, handleChange } = useInput('');

  function onReturn() {
    const teamId = router.query.teamId;

    axios.post(url(`/user?teamId=${teamId}`), { userId: value }).then((response) => {
      if (response.status === 200)
        router.push({
          pathname: router.asPath,
          query: { userId: response.data.userId },
        });
    });
  }

  return (
    <Layout title='유저 닉네임 설정하기 | 골라밥 🍚' description='생성한 팀 혹은 초대받은 팀에 보여질 사용자의 닉네임 설정 페이지입니다.'>
      <Header />
      <div className={styles.setuser}>
        <TypoNotoSans textAlign='center' variant='h6'>
          사용자 닉네임을 입력해주세요.
        </TypoNotoSans>
        <Input
          className={styles.setuser_input}
          name='txtDescEd'
          type='text'
          placeholder='3-10자의 닉네임 입력'
          value={value}
          onChange={handleChange}
          onReturn={onReturn}
        />
      </div>
    </Layout>
  );
};

export default SetUser;
