import Image from 'next/image';
import leftArrowIcon from '@/src/assets/icons/leftArrowIcon.svg';
import rightArrowIcon from '@/src/assets/icons/rightArrowIcon.svg';
import disabledLeftArrowIcon from '@/src/assets/icons/disabledLeftArrowIcon.svg';
import disabledRightArrowIcon from '@/src/assets/icons/disabledRightArrowIcon.svg';
import styles from './PagenationButton.module.scss';

interface PagenationButtonProps {
  size: 'large' | 'small';
  isDisabledLeft?: boolean;
  isDisabledRight?: boolean;
  onClickLeft?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickRight?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PagenationButton = ({
  size,
  isDisabledLeft,
  isDisabledRight,
  onClickLeft,
  onClickRight,
}: PagenationButtonProps) => {
  return (
    <div className={styles.pagenationButton}>
      <button className={`${styles[size]} ${styles.left}`} onClick={onClickLeft} disabled={isDisabledLeft}>
        {isDisabledLeft ? (
          <Image src={disabledLeftArrowIcon} alt="disabledLeftArrowIcon" />
        ) : (
          <Image src={leftArrowIcon} alt="leftArrowIcon" />
        )}
      </button>
      <button className={`${styles[size]} ${styles.right}`} onClick={onClickRight} disabled={isDisabledRight}>
        {isDisabledRight ? (
          <Image src={disabledRightArrowIcon} alt="disabledRightArrowIcon" />
        ) : (
          <Image src={rightArrowIcon} alt="rightArrowIcon" />
        )}
      </button>
    </div>
  );
};

export default PagenationButton;
