import styles from './Dashboard.module.scss';

import HeaderSidebarLayout from '@/src/components/common/Layout/HeaderSidebarLayout';
import DashboardButton from '@/src/components/common/Button/DashboardButton';

import { Fragment, useEffect, useState } from 'react';
import { dashboardHttp } from '@/src/apis/dashboard';
import { ColumnList } from '@/src/types/dashboard';
import Column from '@/src/components/Dashboard/Column';
import DoubleButtonModal from '@/src/components/Modal/DoubleButtonModal';
import NewColumnModal from '@/src/components/Modal/ModalType/NewColumnModal/NewColumnModal';
import useModal from '@/src/hooks/useModal';
import { useRouter } from 'next/router';
import React from 'react';
import ColumnEditDeleteModal from '@/src/components/Modal/ModalType/ColumnEditDeleteModal/ColumnEditDeleteModal';

const Dashboard = () => {
  const router = useRouter();
  const dashboardId = Number(router.query.dashboardId);
  const { modalState, openModal, closeModal } = useModal();
  const [editColumnModal, setEditColumnModal] = useState(false);
  const [columnList, setColumnList] = useState<ColumnList[]>([]);

  const loadColumnList = async (dashboardId: number) => {
    const response = await dashboardHttp.getColumnList(dashboardId);
    setColumnList(response.data);
  };

  useEffect(() => {
    if (dashboardId) {
      loadColumnList(dashboardId);
    }
  }, [dashboardId, modalState]);

  return (
    <>
      {modalState && (
        <DoubleButtonModal size={'small'} isOpen={modalState} onClose={closeModal}>
          <NewColumnModal dashboardId={dashboardId} onClose={closeModal} />
        </DoubleButtonModal>
      )}

      <HeaderSidebarLayout dashboardId={dashboardId}>
        <div className={styles.dashboard}>
          {columnList &&
            columnList.map(column => (
              <Fragment key={column.id}>
                <Column
                  key={`${column.id}-column`}
                  dashboardId={dashboardId}
                  columnId={column.id}
                  columnTitle={column.title}
                />
                <div key={`${column.id}-line`} className={styles.line} />
              </Fragment>
            ))}
          <div className={styles.addColumn}>
            <DashboardButton type={'columnLarge'} onClick={() => openModal()}>
              새로운 컬럼 추가하기
            </DashboardButton>
          </div>
        </div>
      </HeaderSidebarLayout>
    </>
  );
};

export default Dashboard;
