import Image from 'next/image';
import crownIcon from '@/src/assets/icons/crownIcon.svg';
import rightArrowIcon from '@/src/assets/icons/rightArrowIcon.svg';
import styles from './DashboardLinkButton.module.scss';
import Link from 'next/link';

export interface dashboardData {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

interface DashboardLinkButtonProps {
  dashboardData: dashboardData;
  size: 'large' | 'medium' | 'small';
}

const DashboardLinkButton = ({ dashboardData, size }: DashboardLinkButtonProps) => {
  const { id, title, color, createdByMe } = dashboardData;

  return (
    <Link href={`/Dashboard/${id}`}>
      <button className={styles[size]}>
        <div className={styles.dashboardLinkBtnContent}>
          <div className={styles.dashboardDataBox}>
            <div className={styles.color} style={{ backgroundColor: color }} />
            <p className={styles.title}>{title}</p>
            {createdByMe && <Image src={crownIcon} alt="crownIcon" />}
          </div>
          <Image src={rightArrowIcon} alt="rightArrowIcon" />
        </div>
      </button>
    </Link>
  );
};

export default DashboardLinkButton;
