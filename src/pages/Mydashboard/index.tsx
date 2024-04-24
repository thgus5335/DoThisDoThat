import DashboardButton from '@/src/components/common/Button/DashboardButton';
import styles from './Mydashboard.module.scss';
import React, { useState, useEffect, ReactElement } from 'react';
import DashboardLinkButton, { dashboardData } from '@/src/components/common/Button/DashboardLinkButton';
import { fetchDashboards } from '@/src/apis/myDashboardService';
import { NextPageWithLayout } from '../_app';
import HeaderSidebarLayout from '@/src/components/common/Layout/HeaderSidebarLayout';
import PagenationButton from '@/src/components/common/Button/PagenationButton';
import TaskButton from '@/src/components/common/Button/TaskButton';
import { fetchInvitations } from '@/src/apis/invitationService';

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

  useEffect(() => {
    loadDashboardData(currentPage);
    loadInvitations();
  }, [currentPage]);

  // 나의 대시보드 목록 GET
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

  // 초대받은 목록 GET
  const loadInvitations = async () => {
    const params = {
      teamId: '4-16',
      size: 10,
    };
    try {
      const data = await fetchInvitations(params);
      setInvitations(data.invitations);
    } catch (error) {
      console.error('Failed to load invitations', error);
    }
  };

  // 페이지네이션
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
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
              <div className={styles.invitedListContainer}>
                <div className={styles.invitedListHeader}>
                  <div className={styles.invitedListColumn}>이름</div>
                  <div className={styles.invitedListColumn}>초대자</div>
                  <div className={styles.invitedListColumn}>수락여부</div>
                </div>
                {/* {invitations.map((invitation, index) => (
                    <div key={index} className={styles.invitedListItem}>
                      <div className={styles.invitedListColumn}>{invitation.dashboard.title}</div>
                      <div className={styles.invitedListColumn}>{invitation.inviter.nickname}</div>
                      <div className={styles.invitedListColumn}>
                        <button className={styles.acceptButton}>수락</button>
                        <button className={styles.rejectButton}>거절</button>
                      </div>
                    </div>
                  ))} */}
                <div className={styles.invitedListItem}>
                  <div className={styles.invitedListColumn}>제목1</div>
                  <div className={styles.invitedListColumn}>백지원</div>
                  <div className={`${styles.invitedListColumn} ${styles.button}`}>
                    <TaskButton size="large" color="violet">
                      수락
                    </TaskButton>
                    <TaskButton size="large" color="white">
                      거절
                    </TaskButton>
                  </div>
                </div>
                <div className={styles.invitedListItem}>
                  <div className={styles.invitedListColumn}>제목1</div>
                  <div className={styles.invitedListColumn}>백지원</div>
                  <div className={`${styles.invitedListColumn} ${styles.button}`}>
                    <TaskButton size="large" color="violet">
                      수락
                    </TaskButton>
                    <TaskButton size="large" color="white">
                      거절
                    </TaskButton>
                  </div>
                  <div className={styles.line}></div>
                </div>
              </div>
            </div>
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
