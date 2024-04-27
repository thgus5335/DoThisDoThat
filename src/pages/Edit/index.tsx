import DashboardDeleteButton from '@/src/components/common/Button/DashboardDeleteButton';
import { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import HeaderSidebarLayout from '@/src/components/common/Layout/HeaderSidebarLayout';
import styles from './Edit.module.scss';
import Image from 'next/image';
import backIcon from '@/src/assets/icons/leftArrowIcon.svg';
import { useRouter } from 'next/router';
import TaskButton from '@/src/components/common/Button/TaskButton';
import PagenationButton from '@/src/components/common/Button/PagenationButton';
import crownIcon from '@/src/assets/icons/crownIcon.svg';
import addBoxIcon from '@/src/assets/icons/addBoxWhite.svg';
import checkIcon from '@/src/assets/icons/checkIcon.svg';
import createHttpClient from '@/src/apis/createHttpClient';
import SingleButtonModal from '@/src/components/Modal/SingleButtonModal';
import { DASHBOARD_COLOR_LIST } from '@/src/constants/constant';
import noInvitationsIcon from '@/src/assets/icons/unsubscribe.svg';
import { editDashboardHttp, editInvitationHttp, editMemberHttp } from '@/src/apis/editPage';

interface DashboardInfo {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  createdByMe: boolean;
}

const initialDashboardInfo: DashboardInfo = {
  id: 0,
  title: '',
  color: '',
  createdAt: '',
  updatedAt: '',
  userId: 0,
  createdByMe: true,
};

interface Member {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}

interface MemberData {
  members: Member[];
  totalCount: number;
}

interface Invitee {
  id: number;
  email: string;
  nickname: string;
}

interface Invitation {
  id: number;
  invitee: Invitee;
}

interface InvitationData {
  totalCount: number;
  invitations: Invitation[];
}

const Edit: NextPageWithLayout = () => {
  const dashboardId = 5916;

  const [dashboardInfo, setDashboardInfo] = useState<DashboardInfo>(initialDashboardInfo);
  const [isUpdateTrigger, setIsUpdateTrigger] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [dashboardTitle, setDashboardTitle] = useState<string>('');
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [memberList, setMemberList] = useState<MemberData[]>([]);
  const [invitationList, setInvitationList] = useState<InvitationData[]>([]);
  const [email, setEmail] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [invitationCurrentPage, setInvitationCurrentPage] = useState(1);
  const [invitationTotalPages, setInvitationTotalPages] = useState(0);

  const httpClient = createHttpClient();

  const router = useRouter();
  const { dashboardid } = router.query;

  // 대시보드 정보 가져오기
  const loadDashboardInfo = async () => {
    const data = await editDashboardHttp.getDashboardInfo(dashboardId);
    setDashboardInfo(data);
    setSelectedColor(data.color);
  };

  useEffect(() => {
    loadDashboardInfo();
  }, []);

  // 대시보드 수정
  const handleChangeTitleAndColor = async () => {
    const modifiedDashboardInfo = {
      title: dashboardTitle || dashboardInfo.title,
      color: selectedColor,
    };

    const response = await editDashboardHttp.putDashboardInfo(dashboardId, modifiedDashboardInfo);
    setDashboardInfo(response);
    setIsSuccessModalOpen(true);
    setDashboardTitle('');
    setIsUpdateTrigger(prevState => !prevState);
  };

  // 대시보드 수정 버튼 활성화 관련
  useEffect(() => {
    if (
      (dashboardTitle.length > 0 || dashboardInfo.color !== selectedColor) &&
      dashboardInfo.title !== dashboardTitle
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [dashboardTitle, selectedColor, isUpdateTrigger]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  // modal 닫기
  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  // 대시보드 멤버 불러오기
  const loadMemberList = async (page: number) => {
    const data = await editMemberHttp.getMemberList(page, dashboardId);
    setMemberList(data.members);
    setTotalPages(Math.ceil(data.totalCount / 5));
  };

  useEffect(() => {
    loadMemberList(currentPage);
  }, [currentPage]);

  // 구성원 페이지네이션
  const MAX_TEST_PAGE = 5;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    setMemberList(currentMembers => {
      const startIndex = (newPage - 1) * MAX_TEST_PAGE;
      return currentMembers.slice(startIndex, startIndex + MAX_TEST_PAGE);
    });
  };

  // 대시보드 멤버 삭제
  const handleMemberDelete = async (memberId: number) => {
    await editMemberHttp.deleteMember(memberId);
    loadMemberList(currentPage);
  };

  // 초대목록 불러오기
  const loadInvitationList = async (page: number) => {
    const data = await editInvitationHttp.getInvitationList(page, dashboardId);
    const invitees = data.invitations.map(invitation => ({
      id: invitation.id,
      invitee: invitation.invitee,
    }));
    setInvitationList(invitees);
    setInvitationTotalPages(Math.ceil(data.totalCount / 5));
  };

  useEffect(() => {
    loadInvitationList(invitationCurrentPage);
  }, [invitationCurrentPage]);

  // 초대목록 페이지네이션
  const MAX_INVITATION_TEST_PAGE = 5;

  const handleInvitationPageChange = (newPage: number) => {
    setInvitationCurrentPage(newPage);

    setInvitationList(currentInvitees => {
      const startIndex = (newPage - 1) * MAX_INVITATION_TEST_PAGE;
      return currentInvitees.slice(startIndex, startIndex + MAX_INVITATION_TEST_PAGE);
    });
  };

  // 초대하기
  const handleInvitation = async () => {
    try {
      await httpClient.post(`dashboards/${dashboardId}/invitations`, { email: email });
      loadInvitationList(invitationCurrentPage);
    } catch (error) {
      console.error('초대 실패:', error);
    }
  };

  // 초대 삭제
  const handleinvitationDelete = async (invitationId: number) => {
    await editInvitationHttp.deleteInvitation(dashboardId, invitationId);
    loadInvitationList(invitationCurrentPage);
  };

  // 대시보드 삭제
  const handleDashboardDelete = async () => {
    await editDashboardHttp.deleteDashboard(dashboardId);
    router.push('/Mydashboard');
  };

  return (
    <>
      {isSuccessModalOpen && (
        <div>
          <SingleButtonModal isOpen onClose={handleModalClose}>
            변경 완료 😉
          </SingleButtonModal>
        </div>
      )}
      <div className={styles.editpageLayout}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <Image src={backIcon} alt="돌아가기" />
          <p>돌아가기</p>
        </button>
        <section className={styles.editpageSection}>
          <div className={styles.dashboardNameAndColor}>
            <h3 className={styles.dashboardName}>{dashboardInfo.title}</h3>
            <div className={styles.colorBox}>
              {DASHBOARD_COLOR_LIST.map(color => (
                <div key={color} className={styles.colorSelectContainer}>
                  <input
                    className={styles.colorSelect}
                    type="radio"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => handleColorChange(color)}
                    style={{
                      backgroundColor: color,
                    }}
                  />
                  {selectedColor === color && (
                    <Image className={styles.checkIcon} src={checkIcon} alt="선택된 대시보드 색상" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.nameChangeInputBox}>
            <label className={styles.inputLabel}>대시보드 이름</label>
            <input
              className={styles.dashboardNameInput}
              placeholder={dashboardInfo.title}
              value={dashboardTitle}
              onChange={e => setDashboardTitle(e.target.value)}
            />
          </div>
          <div className={styles.taskBtn}>
            <TaskButton
              size={'large'}
              color={'violet'}
              isDisabled={!isButtonEnabled}
              onClick={handleChangeTitleAndColor}>
              변경
            </TaskButton>
          </div>
        </section>
        <section className={styles.editpageSection}>
          <div className={styles.titleAndPagenation}>
            <h3 className={styles.sectionTitle}>구성원</h3>
            <div className={styles.pagenation}>
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
          </div>
          <p className={styles.infoCategory}>이름</p>
          <div className={styles.members}>
            {memberList.map(member => (
              <div key={member.id} className={styles.memberInfo}>
                <div className={styles.imgAndNickname}>
                  <div className={styles.profileImg}>
                    {member.profileImageUrl && (
                      <Image
                        className={styles.profileImg}
                        src={member.profileImageUrl}
                        alt="프로필 이미지"
                        width={38}
                        height={38}
                      />
                    )}
                  </div>
                  <p className={styles.nickname}>{member.nickname}</p>
                </div>
                {member.isOwner ? (
                  <div className={styles.isOwner}>
                    <Image src={crownIcon} alt="대시보드 주인" width={30} height={30} />
                  </div>
                ) : (
                  <div>
                    <TaskButton size={'large'} color={'white'} onClick={() => handleMemberDelete(member.id)}>
                      삭제
                    </TaskButton>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className={styles.editpageSection}>
          <div className={styles.titleAndPagenation}>
            <h3 className={styles.sectionTitle}>초대 내역</h3>
            <div className={styles.btnBox}>
              <div className={styles.pagenation}>
                <div className={styles.whereAmI}>
                  {invitationTotalPages} 페이지 중 {invitationCurrentPage}
                </div>
                <PagenationButton
                  size="large"
                  isDisabledLeft={invitationCurrentPage <= 1}
                  isDisabledRight={invitationCurrentPage >= invitationTotalPages}
                  onClickLeft={() => handleInvitationPageChange(invitationCurrentPage - 1)}
                  onClickRight={() => handleInvitationPageChange(invitationCurrentPage + 1)}
                />
              </div>
              <button className={styles.invitationBtn}>
                <Image src={addBoxIcon} alt="초대하기" />
                초대하기
              </button>
            </div>
          </div>
          {invitationList.length > 0 ? (
            <>
              <p className={styles.infoCategory}>이메일</p>
              <div className={styles.members}>
                {invitationList.map(({ id, invitee }) => (
                  <div key={id} className={styles.memberInfo}>
                    <p className={styles.nickname}>{invitee.email}</p>
                    <TaskButton color={'white'} size={'large'} onClick={() => handleinvitationDelete(id)}>
                      취소
                    </TaskButton>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.noInvitations}>
              <Image src={noInvitationsIcon} alt="초대 내역이 없어요." width={100} height={100} />
              초대 내역이 없어요.
            </div>
          )}
        </section>
        <div className={styles.dashboardDeleteButton}>
          <DashboardDeleteButton size={'large'} onClick={handleDashboardDelete} />
        </div>
      </div>
    </>
  );
};

Edit.getLayout = function getLayout(page: ReactElement) {
  return <HeaderSidebarLayout>{page}</HeaderSidebarLayout>;
};

export default Edit;
