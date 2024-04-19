import Image from 'next/image';
import leftArrowIcon from '@/src/assets/icons/leftArrowIcon.svg';
import rightArrowIcon from '@/src/assets/icons/rightArrowIcon.svg';
import disabledLeftArrowIcon from '@/src/assets/icons/disabledLeftArrowIcon.svg';
import disabledRightArrowIcon from '@/src/assets/icons/disabledRightArrowIcon.svg';
import styles from './PagenationButton.module.scss';

interface PagenationButtonProps {
  size: 'large' | 'small';
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PagenationButton = ({ size, isDisabled, onClick }: PagenationButtonProps) => {
  return (
    <div className={styles.pagenationButton}>
      <button className={`${styles[size]} ${styles.left}`} onClick={onClick} disabled={isDisabled}>
        {isDisabled ? (
          <Image src={disabledLeftArrowIcon} alt="disabledLeftArrowIcon" />
        ) : (
          <Image src={leftArrowIcon} alt="leftArrowIcon" />
        )}
      </button>
      <button className={`${styles[size]} ${styles.right}`} onClick={onClick} disabled={isDisabled}>
        {isDisabled ? (
          <Image src={disabledRightArrowIcon} alt="disabledRightArrowIcon" />
        ) : (
          <Image src={rightArrowIcon} alt="rightArrowIcon" />
        )}
      </button>
    </div>
  );
};

export default PagenationButton;
