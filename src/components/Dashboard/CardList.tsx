import Card from './Card';
import styles from './CardList.module.scss';

interface Props {
  columnId: number;
}

const CardList = ({ columnId }: Props) => {
  console.log(columnId);

  return (
    <div className={styles.cardList}>
      <Card></Card>
    </div>
  );
};

export default CardList;
