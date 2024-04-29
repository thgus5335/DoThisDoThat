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
  dashboardId: number;
  columnId: number;
  columnTitle: string;
}

const Column = ({ dashboardId, columnId, columnTitle }: Props) => {
  const [toDoModal, setToDoModal] = useState(false);
  const [editColumnModal, setEditColumnModal] = useState(false);
  const [cardTotal, setCardTotal] = useState<dashboard.CardList['totalCount']>(0);

  const loadCardList = async () => {
    const data = await dashboardHttp.getCardList(columnId);
    setCardTotal(data.totalCount);
  };

  useEffect(() => {
    loadCardList();
  }, []);

  return (
    <>
      {toDoModal && (
        <DoubleButtonModal size={'large'} isOpen onClose={() => setToDoModal(false)}>
          <TodoPostModal dashboardId={dashboardId} columnId={columnId} onClose={() => setToDoModal(false)} />
        </DoubleButtonModal>
      )}
      {editColumnModal && (
        <DoubleButtonModal size={'small'} isOpen onClose={() => setEditColumnModal(false)}>
          <ColumnEditDeleteModal columnId={columnId} onClose={() => setEditColumnModal(false)} />
        </DoubleButtonModal>
      )}
      <div className={styles.column}>
        <div className={styles.columnInfo}>
          <div className={styles.columnTitle}>
            <div className={styles.color} />
            <p>{columnTitle}</p>
            <div className={styles.number}>{cardTotal}</div>
          </div>
          <Image src={iconSetting} onClick={() => setEditColumnModal(true)} alt="컬럼 환경설정." />
        </div>
        <DashboardButton type={'taskLarge'} onClick={() => setToDoModal(true)} />
        <CardList columnId={columnId}></CardList>
      </div>
    </>
  );
};

export default Column;
