import Image from 'next/legacy/image';

import styles from './Card.module.scss';
import calendarIcon from '@/src/assets/icons/calendar.svg';
import noneDataImage from '@/src/assets/images/noneData.png';
import { Cards } from '@/src/types/dashboard';
import { useEffect, useState } from 'react';
import { createDate } from '@/src/utils/createDate';
import useModal from '@/src/hooks/useModal';
import NormalModal from '../Modal/NormalModal';
import TodoCardModal from '../Modal/ModalType/TodoCardModal/TodoCardModal';
import { getRandomcolorForPrefix } from '@/src/utils/makeRandomColor';
import TagChip from '../Modal/ModalInput/TagInput/TagChip';

interface Props {
  card: Cards;
}

const Card = ({ card }: Props) => {
  const { modalState, openModal, closeModal } = useModal();
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
    <>
      {modalState && (
        <NormalModal isOpen={modalState} onClose={closeModal}>
          <TodoCardModal columnId={card.columnId} cardId={card.id} dashboardId={card.dashboardId} />
        </NormalModal>
      )}
      <div className={styles.card} onClick={() => openModal()}>
        {card.imageUrl && (
          <div className={styles.cardImage}>
            <Image
              className={styles.cardImage}
              width={274}
              height={160}
              src={card.imageUrl}
              layout="fixed"
              onError={handleImageError}
              alt="카드 이미지."
              priority
            />
          </div>
        )}
        <p className={styles.cardTitle}>{card.title}</p>
        <div className={styles.tagContainer}>
          {card.tags && card.tags.map((tag, index) => index < MAX_TAG && <TagChip key={index} name={tag} />)}
          {exTag > 0 && <p className={styles.tag}>{`+${exTag}`}</p>}
        </div>

        <div className={styles.dateContainer}>
          <Image src={calendarIcon} alt="카드 생성 날짜." />
          <p className={styles.date}>{createCard}</p>
        </div>
        {card.assignee &&
          (card.assignee?.profileImageUrl ? (
            <div className={styles.profile}>
              <Image
                className={styles.profile}
                width={24}
                height={24}
                src={card.assignee?.profileImageUrl}
                alt="담당자 프로필."
              />
            </div>
          ) : (
            <div
              className={styles.profile}
              style={{
                backgroundColor: getRandomcolorForPrefix(card.assignee.nickname.substring(0, 1)).color,
              }}>
              {card.assignee.nickname.substring(0, 1)}
            </div>
          ))}
      </div>
    </>
  );
};

export default Card;
