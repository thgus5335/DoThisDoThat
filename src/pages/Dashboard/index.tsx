import Image from 'next/image';
import styles from './Dashboard.module.scss';
import iconSetting from '@/src/assets/icons/setting.svg';

import HeaderSidebarLayout from '@/src/components/common/Layout/HeaderSidebarLayout';
import DashboardButton from '@/src/components/common/Button/DashboardButton';
import CardList from '@/src/components/Dashboard/CardList';

import { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import { getColumnList } from '@/src/apis/dashboard';
import { ColumnList } from '@/src/types/dashboardType';

const Dashboard: NextPageWithLayout = () => {
  const [columnList, setColumnList] = useState<ColumnList[]>([]);

  const loadColumnList = async () => {
    const data = await getColumnList(5911);
    setColumnList(data);
  };

  useEffect(() => {
    loadColumnList();
  }, []);

  return (
    <div className={styles.dashboard}>
      {columnList &&
        columnList.map(column => (
          <div className={styles.column}>
            <div className={styles.columnInfo}>
              <div className={styles.columnTitle}>
                <div className={styles.color} />
                <p>{column.title}</p>
                <div className={styles.number}>N</div>
              </div>
              <Image src={iconSetting} alt="컬럼 환경설정." />
            </div>
            <DashboardButton type={'taskLarge'} />
            <CardList columnId={column.id}></CardList>
          </div>
        ))}

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
