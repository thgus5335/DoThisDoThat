import styles from './CardList.module.scss';

import Card from './Card';

import { useEffect, useState } from 'react';
import type { CardList, Cards } from '@/src/types/dashboard';
import { dashboardHttp } from '@/src/apis/dashboard';
import { useInView } from 'react-intersection-observer';

interface Props {
  columnId: number;
}

const CardList = ({ columnId }: Props) => {
  const [cursorId, setCursorId] = useState<CardList['cursorId']>();
  const [cardList, setCardList] = useState<Cards[]>([]);
  const [ref, inView] = useInView();

  const loadCardList = async (cursorId?: number) => {
    if (cursorId) {
      const data = await dashboardHttp.getCardList(columnId, cursorId);
      setCardList(prevList => [...prevList, ...data.cards]);
      setCursorId(data.cursorId);
    } else {
      const data = await dashboardHttp.getCardList(columnId);
      setCardList(data.cards);
      setCursorId(data.cursorId);
    }
  };

  useEffect(() => {
    loadCardList();
  }, []);

  useEffect(() => {
    if (cursorId) loadCardList(cursorId);
  }, [inView]);

  return (
    <div className={styles.cardList}>
      {cardList && cardList.map(card => <Card key={card.id} card={card} />)}
      <div className={styles.target} ref={ref}></div>
    </div>
  );
};

export default CardList;
