import DashboardButton from '@/src/components/common/Button/DashboardButton';
import styles from './Mydashboard.module.scss';
import React, { useState, useEffect, ReactElement } from 'react';
import DashboardLinkButton, { dashboardData } from '@/src/components/common/Button/DashboardLinkButton';
import { fetchDashboards } from '@/src/apis/myDashboardService';
import PagenationButton from '@/src/components/common/Button/PagenationButton';
import TaskButton from '@/src/components/common/Button/TaskButton';
import { fetchInvitations, updateInvitation } from '@/src/apis/invitationService';
import { NextPageWithLayout } from '../_app';
import HeaderSidebarLayout from '@/src/components/common/Layout/HeaderSidebarLayout';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const MAX_DASHBOARD_PER_PAGE = 5;
  const [dashboards, setDashboards] = useState<dashboardData[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadingInvitations, setLoadingInvitations] = useState(false); // 초대받은 목록 무한스크롤 시 로딩 상태
  const [hasMoreInvitations, setHasMoreInvitations] = useState(true); // 더 이상 가져올 데이터가 있는지지
  const [nextCursorId, setNextCursorId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDashboardData(currentPage);
    loadInvitations(null);
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
  const loadInvitations = async (cursor: number | null) => {
    if (!hasMoreInvitations || loadingInvitations) return;

    setLoadingInvitations(true);
    const params = {
      teamId: '4-16',
      size: 10,
      cursorId: cursor, // 무한 스크롤 위해 다른 데이터 배치를 가져오는데 사용됨
    };
    try {
      const data = await fetchInvitations(params);
      const newInvitations = data.invitations;
      // Set을 사용하여 id 기반으로 중복 제거
      const uniqueInvitations = new Map(invitations.concat(newInvitations).map(inv => [inv.id, inv]));
      setInvitations(Array.from(uniqueInvitations.values())); // Map의 values를 배열로 변환
      setHasMoreInvitations(newInvitations.length === 10);
      setNextCursorId(data.cursorId); // 서버로부터 반환된 새로운 cursorId 설정
      setLoadingInvitations(false);
    } catch (error) {
      console.error('Failed to load invitations', error);
      setLoadingInvitations(false);
    }
  };

  // 수락, 거절 버튼 클릭 시 PUT
  // 초대 수락
  const acceptInvitation = async (invitationId: number) => {
    try {
      const response = await updateInvitation({ teamId: '4-16', invitationId, accept: true });
      setInvitations(current => current.filter(inv => inv.id !== invitationId));

      setDashboards(currentDashboards => {
        const newDashboards = [response.dashboard, ...currentDashboards];
        const newTotalPages = Math.ceil(newDashboards.length / MAX_DASHBOARD_PER_PAGE);

        // 총 페이지 수 업데이트
        setTotalPages(newTotalPages);
        setCurrentPage(1);
        // 현재 페이지에 맞는 대시보드 배열 반환
        const startIndex = (currentPage - 1) * MAX_DASHBOARD_PER_PAGE;
        return newDashboards.slice(startIndex, startIndex + MAX_DASHBOARD_PER_PAGE);
      });
    } catch (error) {
      console.error('Failed to accept invitation', error);
    }
  };

  // 초대 거절
  const rejectInvitation = async (invitationId: number) => {
    try {
      const response = await updateInvitation({ teamId: '4-16', invitationId, accept: false });
      setInvitations(current => current.filter(inv => inv.id !== invitationId));
    } catch (error) {
      console.error('Failed to reject invitation', error);
    }
  };

  // 키워드로 검색
  const filteredInvitations = invitations.filter(inv =>
    inv.dashboard.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이지네이션
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setDashboards(currentDashboards => {
      const startIndex = (newPage - 1) * MAX_DASHBOARD_PER_PAGE;
      return currentDashboards.slice(startIndex, startIndex + MAX_DASHBOARD_PER_PAGE);
    });
  };

  // 무한스크롤
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    const isBottom = scrollHeight - scrollTop <= clientHeight * 1.5; // 스크롤이 하단 근처에 도달하면 로드

    if (isBottom && !loadingInvitations && hasMoreInvitations && nextCursorId !== null) {
      loadInvitations(nextCursorId);
    }
  };
  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.newDashboard}>
          <DashboardButton type="dashboardLarge">새로운 대시보드</DashboardButton>
          {dashboards.map(dashboard => (
            <DashboardLinkButton
              key={dashboard.id}
              dashboardData={dashboard}
              size="large"
              onClick={() => router.push({ pathname: `/Dashboard`, query: { dashboardId: dashboard.id } })}
            />
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
          <div className={styles.yesInvitedContainer}>
            <input
              type="text"
              name="search"
              placeholder="검색"
              className={styles.invitedInput}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <img src="./search.svg" className={styles.searchIcon} />
            <div className={styles.invitedListContainer}>
              <div className={styles.invitedListHeader}>
                <div className={styles.invitedListColumn}>이름</div>
                <div className={styles.invitedListColumn}>초대자</div>
                <div className={styles.invitedListColumn}>수락여부</div>
              </div>
              <div className={styles.scroll} onScroll={handleScroll}>
                {invitations.length > 0 ? (
                  filteredInvitations.map(invitation => (
                    <div key={invitation.id} className={styles.invitedListItem}>
                      <div className={styles.invitedListColumn}>{invitation.dashboard.title}</div>
                      <div className={styles.invitedListColumn}>{invitation.inviter.nickname}</div>
                      <div className={`${styles.invitedListColumn} ${styles.button}`}>
                        <TaskButton size="large" color="violet" onClick={() => acceptInvitation(invitation.id)}>
                          수락
                        </TaskButton>
                        <TaskButton size="large" color="white" onClick={() => rejectInvitation(invitation.id)}>
                          거절
                        </TaskButton>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.noInvitedContainer}>
                    <img src="./unsubscribe.svg" className={styles.noInvitedImage}></img>
                    <div className={styles.noInvited}>아직 초대받은 대시보드가 없어요</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Mydashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeaderSidebarLayout type="simple" title="내 대시보드" hasBackward={false}>
      {page}
    </HeaderSidebarLayout>
  );
};

export default Mydashboard;
