import { useState, useEffect } from 'react';
import styles from './NewColumnModal.module.scss';
import ModalButton from '../../ModalButton/ModalButton';
import NormalInput from '../../ModalInput/NormalInput/NormalInput';
import httpClient from '@/src/apis/httpClient';

type ColumnData = {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
};

//dashboardId를 props로 받아와야함
const NewColumnModal = () => {
  const [input, setInput] = useState('');
  const [isExist, setIsExist] = useState(false); //이름 중복 여부 확인하는 state
  const [columns, setColumns] = useState<ColumnData[]>([]);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await httpClient.get('/columns?dashboardId=5911');
        const columnData = response.data.data;
        setColumns(columnData);
      } catch (error) {
        console.error('담당자 목록을 불러오는데 실패했습니다:', error);
      }
    };

    fetchColumns();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCreateColumn = async () => {
    //이름 중복 확인 로직 추가
    if (columns.some(column => column.title === input)) {
      setIsExist(true);
      return;
    }
    //서버로 생성 요청 보내는 로직 추가
    try {
      await httpClient.post('/columns', {
        title: input,
        dashboardId: 5911,
      });
      window.alert('새 컬럼이 생성되었습니다.');
      console.log('새 컬럼 생성에 성공했습니다.');
    } catch (error) {
      console.error('새 컬럼 생성에 실패했습니다:', error);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalName}>새 컬럼 생성</div>
      <NormalInput
        inputName="이름"
        placeholder="새 컬럼 이름을 입력하세요"
        value={input}
        onChange={handleInput}
        isExist={isExist}
      />
      {isExist && <div className={styles.errorText}>이미 존재하는 컬럼 이름입니다.</div>}
      <div className={styles.modalButton}>
        <ModalButton size={'large'} color={'violet'} onClick={handleCreateColumn}>
          생성
        </ModalButton>
      </div>
    </div>
  );
};

export default NewColumnModal;
