import Image from 'next/image';
import * as dashboard from '@/src/types/dashboard';
import iconSetting from '@/src/assets/icons/setting.svg';
import styles from './Column.module.scss';
import { useEffect, useState } from 'react';
import { dashboardHttp } from '@/src/apis/dashboard';
import CardList from './CardList';
import DashboardButton from '../common/Button/DashboardButton';

interface Props {
  columnId: number;
  columnTitle: string;
}

const Column = ({ columnId, columnTitle }: Props) => {
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
    <div className={styles.column}>
      <div className={styles.columnInfo}>
        <div className={styles.columnTitle}>
          <div className={styles.color} />
          <p>{columnTitle}</p>
          <div className={styles.number}>{cardTotal}</div>
        </div>
        <Image src={iconSetting} alt="컬럼 환경설정." />
      </div>
      <DashboardButton type={'taskLarge'} />
      <CardList columnId={columnId}></CardList>
    </div>
  );
};

export default Column;
