import { useState } from 'react';
import styles from './NewDashboardModal.module.scss';
import Image from 'next/image';
import ModalButton from '../../ModalButton/ModalButton';
import NormalInput from '../../ModalInput/NormalInput/NormalInput';
import ColorPickBox from './ColorPickBox';
import httpClient from '@/src/apis/httpClient';

const NewDashboardModal = ({ onClose }: any) => {
  const [input, setInput] = useState<string>('');
  const [selectColor, setSelectColor] = useState<string>('');

  const COLOR_ARRAY = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSelectColor = (color: string) => {
    setSelectColor(color);
  };

  const handleCreateDashboard = async () => {
    //서버로 생성 요청 보내는 로직 추가
    try {
      await httpClient.post('/dashboards', {
        title: input,
        color: selectColor,
      });
      window.alert('새 대시보드가 생성되었습니다.');
      console.log('새 대시보드 생성에 성공했습니다.');
      onClose();
    } catch (error) {
      console.error('새 대시보드 생성에 실패했습니다:', error);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalName}>새로운 대시보드</div>
      <NormalInput
        inputName="대시보드 이름"
        placeholder="새 대시보드 이름을 입력하세요"
        value={input}
        onChange={handleInput}
      />
      <ColorPickBox colors={COLOR_ARRAY} selectedColor={selectColor} onSelectColor={handleSelectColor} />
      <div className={styles.modalButton}>
        <ModalButton size={'large'} color={'violet'} onClick={handleCreateDashboard}>
          생성
        </ModalButton>
      </div>
    </div>
  );
};

export default NewDashboardModal;
