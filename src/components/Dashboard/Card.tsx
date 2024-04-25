import Image from 'next/image';

import styles from './Card.module.scss';
import calendarIcon from '@/src/assets/icons/calendar.svg';
import noneDataImage from '@/src/assets/images/noneData.png';

const Card = () => {
  return (
    <div className={styles.card}>
      <Image className={styles.cardImage} src={noneDataImage} alt="카드 이미지." />
      <p className={styles.cardTitle}>CardTitle</p>
      <div className={styles.tagContainer}>
        <p>태그1</p>
        <p>태그2</p>
      </div>
      <div className={styles.dateContainer}>
        <Image src={calendarIcon} alt="카드 생성 날짜." />
        <p>20XX.XX.XX</p>
      </div>
      <div className={styles.profile}>P</div>
    </div>
  );
};

export default Card;
