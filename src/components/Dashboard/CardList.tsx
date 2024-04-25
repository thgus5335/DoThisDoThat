import styles from './CardList.module.scss';

import Card from './Card';

import { useEffect, useState } from 'react';
import type { CardList, Cards } from '@/src/types/dashboard';
import { getCardList } from '@/src/apis/dashboard';

interface Props {
  columnId: number;
}

const CardList = ({ columnId }: Props) => {
  const [cardList, setCardList] = useState<Cards[]>([]);

  console.log(columnId);

  const loadCardList = async () => {
    const data = await getCardList(columnId);
    setCardList(data.cards);
  };

  useEffect(() => {
    loadCardList();
  }, []);

  return <div className={styles.cardList}>{cardList && cardList.map(card => <Card key={card.id} card={card} />)}</div>;
};

export default CardList;
