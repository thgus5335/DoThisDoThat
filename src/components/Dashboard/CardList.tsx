import { ReactNode } from 'react';
import Card from './Card';
import styles from './CardList.module.scss';

interface Props {
  children: ReactNode;
}

const CardList = ({ children }: Props) => {
  return (
    <div className={styles.cardList}>
      <Card>{children}</Card>
    </div>
  );
};

export default CardList;
