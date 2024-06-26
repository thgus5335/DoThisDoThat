import { useState, useEffect } from 'react';
import styles from './ColumnEditDeleteModal.module.scss';
import ModalButton from '../../ModalButton/ModalButton';
import NormalInput from '../../ModalInput/NormalInput/NormalInput';
import httpClient from '@/src/apis/httpClient';
import useModal from '@/src/hooks/useModal';
import DoubleButtonModal from '../../DoubleButtonModal';
import DeleteAlertModal from '../DeleteAlertModal/DeleteAlertModal';
import router from 'next/router';

type ColumnData = {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
};

//input 초깃값 설정하려면 columnId를 props로 받아와야함
const ColumnEditDeleteModal = ({ columnId, onClose }: any) => {
  const [input, setInput] = useState('');
  const { modalState, openModal, closeModal } = useModal();
  //const [columns, setColumns] = useState<ColumnData[]>([]);

  /*useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await httpClient.get('/columns?dashboardId=5911');
        const columnData = response.data.data;
        setColumns(columnData);
      } catch (error) {
        console.error('컬럼 목록을 불러오는데 실패했습니다:', error);
      }
    };

    fetchColumns();
  }, []);*/

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleEditColumn = async () => {
    try {
      await httpClient.put(`/columns/${columnId}`, {
        title: input,
      });
      onClose();
    } catch (error) {
      console.error('컬럼 수정에 실패했습니다:', error);
    }
  };

  const handleDeleteColumn = async () => {
    try {
      await httpClient.delete(`/columns/${columnId}`);
      onClose();
      router.reload();
    } catch (error) {
      console.error('컬럼 삭제에 실패했습니다:', error);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalName}>컬럼 관리</div>
      <NormalInput inputName="이름" placeholder="변경할 컬럼 이름을 입력하세요" value={input} onChange={handleInput} />
      <button className={styles.columnDelete} onClick={openModal}>
        삭제하기
      </button>
      {modalState && (
        <DoubleButtonModal size={'small'} isOpen={modalState} onClose={closeModal}>
          <DeleteAlertModal onDeleteColumn={handleDeleteColumn} />
        </DoubleButtonModal>
      )}
      <div className={styles.modalButton}>
        <ModalButton size={'large'} color={'violet'} onClick={handleEditColumn}>
          변경
        </ModalButton>
      </div>
    </div>
  );
};

export default ColumnEditDeleteModal;
