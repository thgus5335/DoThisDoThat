import { useState, useEffect } from 'react';
import styles from './NewInviteModal.module.scss';
import ModalButton from '../../ModalButton/ModalButton';
import NormalInput from '../../ModalInput/NormalInput/NormalInput';
import httpClient from '@/src/apis/httpClient';

const NewInviteModal = ({ dashboardId, onClose }: any) => {
  const [input, setInput] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleNewInvite = async () => {
    if (!input) {
      window.alert('이메일을 입력해주세요.');
      return;
    } else if (!emailRegex.test(input)) {
      window.alert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    //서버로 생성 요청 보내는 로직 추가
    try {
      await httpClient.post(`/dashboards/${dashboardId}/invitations`, {
        email: input,
      });
      onClose();
    } catch (error: any) {
      console.error('초대에 실패했습니다:', error);
      window.alert(error.response.data.message);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalName}>초대하기</div>
      <NormalInput inputName="이메일" placeholder="이메일을 입력하세요" value={input} onChange={handleInput} />
      <div className={styles.modalButton}>
        <ModalButton size={'large'} color={'violet'} onClick={handleNewInvite}>
          초대
        </ModalButton>
      </div>
    </div>
  );
};

export default NewInviteModal;
