import Image from 'next/image';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';

import styles from './Dashboard.module.scss';
import HeaderSidebarLayout from '@/src/components/common/Layout/HeaderSidebarLayout';
import DashboardButton from '@/src/components/common/Button/DashboardButton';
// import iconCrown from '@/src/assets/icons/crownIcon.svg';
// import iconAdd from '@/src/assets/icons/addBox.svg';
// import iconSetting from '@/src/assets/icons/setting.svg';

const Dashboard: NextPageWithLayout = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.column}>To Do</div>
      <div className={styles.column}>On Progress</div>
      <div className={styles.column}>Done</div>
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
