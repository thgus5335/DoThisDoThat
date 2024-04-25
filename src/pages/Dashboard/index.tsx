import Image from 'next/image';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';

import styles from './Dashboard.module.scss';
import HeaderSidebarLayout from '@/src/components/common/Layout/HeaderSidebarLayout';
import DashboardButton from '@/src/components/common/Button/DashboardButton';
import CardList from '@/src/components/Dashboard/CardList';
import iconSetting from '@/src/assets/icons/setting.svg';

const Dashboard: NextPageWithLayout = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.column}>
        <div className={styles.columnInfo}>
          <div className={styles.columnTitle}>
            <div className={styles.color} />
            <p>To do</p>
            <div className={styles.number}>N</div>
          </div>
          <Image src={iconSetting} alt="컬럼 환경설정." />
        </div>
        <DashboardButton type={'taskLarge'} />
        <CardList></CardList>
      </div>
      <div className={styles.column}>
        <div className={styles.columnInfo}>
          <div className={styles.columnTitle}>
            <div className={styles.color} />
            <p>On Progress</p>
            <div className={styles.number}>N</div>
          </div>
          <Image src={iconSetting} alt="컬럼 환경설정." />
        </div>
        <DashboardButton type={'taskLarge'} />
        <CardList></CardList>
      </div>
      <div className={styles.column}>
        <div className={styles.columnInfo}>
          <div className={styles.columnTitle}>
            <div className={styles.color} />
            <p>Done</p>
            <div className={styles.number}>N</div>
          </div>
          <Image src={iconSetting} alt="컬럼 환경설정." />
        </div>
        <DashboardButton type={'taskLarge'} />
        <CardList></CardList>
      </div>
      <div className={styles.addColumn}>
        <DashboardButton type={'columnLarge'}>새로운 컬럼 추가하기</DashboardButton>
      </div>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <HeaderSidebarLayout>{page}</HeaderSidebarLayout>;
};

export default Dashboard;