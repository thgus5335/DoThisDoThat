import styles from './Dashboard.module.scss';

import HeaderSidebarLayout from '@/src/components/common/Layout/HeaderSidebarLayout';
import DashboardButton from '@/src/components/common/Button/DashboardButton';

import { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import { dashboardHttp } from '@/src/apis/dashboard';
import { ColumnList } from '@/src/types/dashboard';
import Column from '@/src/components/Dashboard/Column';

const Dashboard: NextPageWithLayout = () => {
  const [columnList, setColumnList] = useState<ColumnList[]>([]);

  const loadColumnList = async () => {
    const response = await dashboardHttp.getColumnList(5911);
    setColumnList(response.data);
  };

  useEffect(() => {
    loadColumnList();
  }, []);

  return (
    <div className={styles.dashboard}>
      {columnList &&
        columnList.map(column => <Column columnId={column.id} columnTitle={column.title} key={column.id} />)}

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
