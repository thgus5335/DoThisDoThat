import styles from './Dashboard.module.scss';

import HeaderSidebarLayout from '@/src/components/common/Layout/HeaderSidebarLayout';
import DashboardButton from '@/src/components/common/Button/DashboardButton';

import { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import { dashboardHttp } from '@/src/apis/dashboard';
import { ColumnList } from '@/src/types/dashboard';
import Column from '@/src/components/Dashboard/Column';
import DoubleButtonModal from '@/src/components/Modal/DoubleButtonModal';
import NewColumnModal from '@/src/components/Modal/ModalType/NewColumnModal/NewColumnModal';
import useModal from '@/src/hooks/useModal';

const Dashboard: NextPageWithLayout = () => {
  const { modalState, openModal, closeModal } = useModal();
  const [columnList, setColumnList] = useState<ColumnList[]>([]);

  const loadColumnList = async () => {
    const response = await dashboardHttp.getColumnList(5911);
    setColumnList(response.data);
  };

  useEffect(() => {
    loadColumnList();
  }, []);

  return (
    <>
      {modalState && (
        <DoubleButtonModal size={'small'} isOpen={modalState} onClose={closeModal}>
          <NewColumnModal />
        </DoubleButtonModal>
      )}
      <div className={styles.dashboard}>
        {columnList &&
          columnList.map(column => <Column columnId={column.id} columnTitle={column.title} key={column.id} />)}

        <div className={styles.addColumn}>
          <DashboardButton type={'columnLarge'} onClick={() => openModal()}>
            새로운 컬럼 추가하기
          </DashboardButton>
        </div>
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <HeaderSidebarLayout type="complex">{page}</HeaderSidebarLayout>;
};

export default Dashboard;
