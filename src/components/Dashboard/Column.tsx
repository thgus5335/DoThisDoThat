import Image from 'next/image';
import * as dashboard from '@/src/types/dashboard';
import iconSetting from '@/src/assets/icons/setting.svg';
import styles from './Column.module.scss';
import { useEffect, useState } from 'react';
import { dashboardHttp } from '@/src/apis/dashboard';
import CardList from './CardList';
import DashboardButton from '../common/Button/DashboardButton';
import useModal from '@/src/hooks/useModal';
import DoubleButtonModal from '../Modal/DoubleButtonModal';
import TodoPostModal from '../Modal/ModalType/TodoPostModal/TodoPostModal';
import ColumnEditDeleteModal from '../Modal/ModalType/ColumnEditDeleteModal/ColumnEditDeleteModal';

interface Props {
  columnId: number;
  columnTitle: string;
}

const Column = ({ columnId, columnTitle }: Props) => {
  const { modalState: createToDoState, openModal: openCreateToDo, closeModal: closeCreateToDo } = useModal();
  const { modalState: editColumnState, openModal: openEditColumn, closeModal: closeEditColumn } = useModal();
  const [cardList, setCardList] = useState<dashboard.Cards[]>([]);
  const [cardTotal, setCardTotal] = useState<dashboard.CardList['totalCount']>(0);

  const loadCardList = async () => {
    const data = await dashboardHttp.getCardList(columnId);
    setCardList(data.cards);
    setCardTotal(data.totalCount);
  };

  useEffect(() => {
    loadCardList();
  }, []);

  return (
    <>
      {createToDoState && (
        <DoubleButtonModal size={'large'} isOpen={createToDoState} onClose={closeCreateToDo}>
          <TodoPostModal />
        </DoubleButtonModal>
      )}
      {editColumnState && (
        <DoubleButtonModal size={'small'} isOpen={editColumnState} onClose={closeEditColumn}>
          <ColumnEditDeleteModal />
        </DoubleButtonModal>
      )}
      <div className={styles.column}>
        <div className={styles.columnInfo}>
          <div className={styles.columnTitle}>
            <div className={styles.color} />
            <p>{columnTitle}</p>
            <div className={styles.number}>{cardTotal}</div>
          </div>
          <Image src={iconSetting} onClick={() => openEditColumn} alt="컬럼 환경설정." />
        </div>
        <DashboardButton type={'taskLarge'} onClick={() => openCreateToDo} />
        <CardList columnId={columnId}></CardList>
      </div>
    </>
  );
};

export default Column;
