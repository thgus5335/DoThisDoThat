import DashboardButton from '@/src/components/common/Button/DashboardButton';
import styles from './Mydashboard.module.scss';
import React, { useState, useEffect, ReactElement } from 'react';
import DashboardLinkButton, { dashboardData } from '@/src/components/common/Button/DashboardLinkButton';
import { fetchDashboards } from '@/src/apis/myDashboardService';
import { NextPageWithLayout } from '../_app';
import HeaderSidebarLayout from '@/src/components/common/Layout/HeaderSidebarLayout';

interface Invitation {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InvitationResponse {
  totalCount: number;
  invitations: Invitation[];
}

const Mydashboard: NextPageWithLayout = () => {
  const [dashboards, setDashboards] = useState<dashboardData[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // 나의 대시보드 목록 GET
  useEffect(() => {
    const loadDashboardData = async () => {
      const params = {
        teamId: '4-16',
        navigationMethod: 'pagination' as 'pagination' | 'infiniteScroll',
        page: 1,
        size: 10,
      };
      const data = await fetchDashboards(params);
      console.log(data);
      setDashboards(data.dashboards);
    };

    loadDashboardData();
  }, []);

  // 초대받은 목록 GET
  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.newDashboard}>
          <DashboardButton type="dashboardLarge">새로운 대시보드</DashboardButton>
          {dashboards.map(dashboard => (
            <DashboardLinkButton key={dashboard.id} dashboardData={dashboard} size="large" />
          ))}
        </div>

        <div className={styles.invitedDashboard}>
          <div className={styles.invitedTitle}>초대받은 대시보드</div>
          <div>
            {invitations.length > 0 ? (
              <div>
                {invitations.map(invitation => (
                  <div>{invitation.dashboard.title}</div>
                ))}
              </div>
            ) : (
              <div className={styles.noInvitedContainer}>
                <img src="./unsubscribe.svg" className={styles.noInvitedImage}></img>
                <div className={styles.noInvited}>아직 초대받은 대시보드가 없어요</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Mydashboard.getLayout = function getLayout(page: ReactElement) {
  return <HeaderSidebarLayout>{page}</HeaderSidebarLayout>;
};

export default Mydashboard;
