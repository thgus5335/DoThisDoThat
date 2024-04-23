import DashboardButton from '@/src/components/common/Button/DashboardButton';
import styles from './Mydashboard.module.scss';
import React, { useState, useEffect } from 'react';
import DashboardLinkButton, { dashboardData } from '@/src/components/common/Button/DashboardLinkButton';
import { fetchDashboards } from '@/src/apis/myDashboardService';
import PagenationButton from '@/src/components/common/Button/PagenationButton';

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

export default function Mydashboard() {
  const [dashboards, setDashboards] = useState<dashboardData[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // // 나의 대시보드 목록 GET
  useEffect(() => {
    loadDashboardData(currentPage);
  }, [currentPage]);

  const loadDashboardData = async (page: number) => {
    const params = {
      teamId: '4-16',
      navigationMethod: 'pagination' as 'pagination' | 'infiniteScroll',
      page: page,
      size: 5,
    };
    const data = await fetchDashboards(params);
    setDashboards(data.dashboards);
    setTotalPages(Math.ceil(data.totalCount / params.size));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // 초대받은 목록 GET
  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}></div>
        <div className={styles.navbar}></div>
        <div className={styles.contentContainer}>
          <div className={styles.newDashboard}>
            <DashboardButton type="dashboardLarge">새로운 대시보드</DashboardButton>
            {dashboards.map(dashboard => (
              <DashboardLinkButton key={dashboard.id} dashboardData={dashboard} size="large" />
            ))}
          </div>
          <div className={styles.pagination}>
            <div className={styles.whereAmI}>
              {totalPages} 페이지 중 {currentPage}
            </div>
            <PagenationButton
              size="large"
              isDisabledLeft={currentPage <= 1}
              isDisabledRight={currentPage >= totalPages}
              onClickLeft={() => handlePageChange(currentPage - 1)}
              onClickRight={() => handlePageChange(currentPage + 1)}
            />
          </div>
          <div className={styles.invitedDashboard}>
            <div className={styles.invitedTitle}>초대받은 대시보드</div>
            <div>
              {/* {invitations.length > 0 ? (
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
              )} */}
              <div className={styles.yesInvitedContainer}>
                <input type="text" name="search" placeholder="검색" className={styles.invitedInput} />
                <img src="./search.svg" className={styles.searchIcon} />
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
