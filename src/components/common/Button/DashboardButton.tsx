import { ReactNode } from 'react';
import Image from 'next/image';
import addIcon from '@/src/assets/icons/addIcon.svg';
import styles from './DashboardButton.module.scss';

interface DashboardButtonProps {
  children?: ReactNode;
  type:
    | 'columnLarge'
    | 'columnLong'
    | 'columnSmall'
    | 'taskLarge'
    | 'taskLong'
    | 'taskSmall'
    | 'dashboardLarge'
    | 'dashboardMedium'
    | 'dashboardSmall';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DashboardButton = ({ children, type, onClick }: DashboardButtonProps) => {
  return (
    <button className={styles[type]} onClick={onClick}>
      {children}
      <Image className={styles.icon} src={addIcon} alt="addIcon" />
    </button>
  );
};

export default DashboardButton;
