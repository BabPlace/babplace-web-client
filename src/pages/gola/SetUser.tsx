import React from 'react';
import { useRouter } from 'next/router';
import { Input, TypoNotoSans, Header, Layout } from '@/components';
import { useInput } from '@/hooks';
import { createUser } from '@/controller';
import styles from '@/styles/Gola.module.css';

const title = '팀에 참가하기 | 골라밥 🍚';
const description = '생성한 팀 혹은 초대받은 팀에 보여질 사용자의 닉네임 설정 페이지입니다.';

const SetUser = () => {
  const router = useRouter();
  const { value: nickName, handleChange } = useInput('');

  function onReturn() {
    const teamId = router.query.teamId as string;
    createUser({ teamId, nickName })
      .then(({ userId }) => {
        router.push({ pathname: router.asPath, query: { userId } });
      })
      .catch(() => {
        router.push({ pathname: '/404' });
      });
  }

  function handleToResultButtonClick() {
    const teamId = router.query.teamId as string;
    router.push(`/result/${teamId}`);
  }

  return (
    <Layout title={title} description={description}>
      <Header />
      <div className={styles.setuser}>
        <TypoNotoSans text='사용자 닉네임을 입력해주세요.' textAlign='center' variant='h6' />
        <Input
          className={styles.setuser_input}
          style={{ width: '50%' }}
          name='txtDescEd'
          type='text'
          placeholder='3-10자의 닉네임 입력'
          value={nickName}
          onChange={handleChange}
          onReturn={onReturn}
          enterKeyHint='done'
        />
        <button onClick={handleToResultButtonClick}>
          <TypoNotoSans text='결과 보러 가기' variant='button' textAlign='center' />
        </button>
      </div>
    </Layout>
  );
};

export default SetUser;
