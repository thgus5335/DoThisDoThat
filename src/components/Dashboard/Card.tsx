import Image, { StaticImageData } from 'next/image';

import styles from './Card.module.scss';
import calendarIcon from '@/src/assets/icons/calendar.svg';
import noneDataImage from '@/src/assets/images/noneData.png';
import { Cards } from '@/src/types/dashboard';
import { useEffect, useState } from 'react';
import { createDate } from '@/src/utils/createDate';

interface Props {
  card: Cards;
}

const Card = ({ card }: Props) => {
  const [exTag, setExTag] = useState(0);
  const MAX_TAG = 5;
  const exTagCount = card.tags.length - MAX_TAG;
  const createCard = createDate(card.createdAt);

  const handleImageError = (e: any) => {
    const target = e.target;
    target.src = noneDataImage;
  };

  useEffect(() => {
    setExTag(exTagCount);
  }, []);

  return (
    <div className={styles.card}>
      {card.imageUrl && (
        <Image
          className={styles.cardImage}
          width={274}
          height={16}
          src={card.imageUrl}
          onError={handleImageError}
          alt="카드 이미지."
        />
      )}
      <p className={styles.cardTitle}>{card.title}</p>
      <div className={styles.tagContainer}>
        {card.tags &&
          card.tags.map(
            (tag, index) =>
              index < MAX_TAG && (
                <p key={index} className={styles.tag}>
                  {tag}
                </p>
              )
          )}
        {exTag > 0 && <p className={styles.tag}>{`+${exTag}`}</p>}
      </div>

      <div className={styles.dateContainer}>
        <Image src={calendarIcon} alt="카드 생성 날짜." />
        <p>{createCard}</p>
      </div>
      {card.assignee &&
        (card.assignee?.profileImageUrl ? (
          <Image
            className={styles.profile}
            width={24}
            height={24}
            src={card.assignee?.profileImageUrl}
            alt="담당자 프로필."
          />
        ) : (
          <div className={styles.profile}>P</div>
        ))}
    </div>
  );
};

export default Card;
