import Image from 'next/image';
import crownIcon from '@/src/assets/icons/crownIcon.svg';
import rightArrowIcon from '@/src/assets/icons/rightArrowIcon.svg';
import styles from './DashboardLinkButton.module.scss';
import Link from 'next/link';

interface DashboardLinkButtonProps {
  response?: {
    id: number;
    title: string;
    color: string;
    createdByMe: boolean;
  };
  size: 'large' | 'medium' | 'small';
}

const DashboardLinkButton = ({
  response = { id: 1, title: '일해라 절해라', color: '#7AC555', createdByMe: true },
  size,
}: DashboardLinkButtonProps) => {
  return (
    <Link href={`/dashboard/${response.id}`}>
      <button className={styles[size]}>
        <div className={styles.content}>
          <div className={styles.dataBox}>
            <div className={styles.color} style={{ backgroundColor: response.color }} />
            <p className={styles.title}>{response.title}</p>
            {response.createdByMe && <Image src={crownIcon} alt="crownIcon" />}
          </div>
          <Image src={rightArrowIcon} alt="rightArrowIcon" />
        </div>
      </button>
    </Link>
  );
};

export default DashboardLinkButton;
