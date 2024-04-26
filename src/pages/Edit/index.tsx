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

const DASHBOARD_COLOR_LIST = ['#7ac555', '#760dde', '#ffa500', '#76a5ea', '#e876ea'];

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

const Edit: NextPageWithLayout = () => {
  const dashboardId = 5910;

  const [dashboardInfo, setDashboardInfo] = useState<DashboardInfo>(initialDashboardInfo);
  const [isUpdateTrigger, setIsUpdateTrigger] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [dashboardTitle, setDashboardTitle] = useState<string>('');
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [memberList, setMemberList] = useState([]);
  const [invitationList, setInvitationList] = useState([]);
  const [email, setEmail] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const httpClient = createHttpClient();

  // 대시보드 정보 가져오기
  const loadDashboardInfo = async () => {
    try {
      const data = await httpClient.get(`/dashboards/${dashboardId}`);
      setDashboardInfo(data);
      setSelectedColor(data.color);
    } catch (error) {
      console.error('대시보드 정보를 불러오는 동안 오류가 발생했습니다:', error);
    }
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

    try {
      const response = await httpClient.put(`/dashboards/${dashboardId}`, modifiedDashboardInfo);
      setDashboardInfo(response);
      setIsSuccessModalOpen(true);
      setDashboardTitle('');
      setIsUpdateTrigger(prevState => !prevState);
    } catch (error) {
      console.error('대시보드 수정 오류:', error);
    }
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

  const router = useRouter();
  // const { dashboardid } = router.query;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // modal 닫기
  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
  };

  // 대시보드 멤버 불러오기
  const loadMemberList = async () => {
    try {
      const data = await httpClient.get(`members?page=1&size=20&dashboardId=${dashboardId}`);
      setMemberList(data.members);
    } catch (error) {
      console.error('대시보드 멤버 목록 조회 실패:', error);
    }
  };

  useEffect(() => {
    loadMemberList();
  }, []);

  // 대시보드 멤버 삭제
  const handleMemberDelete = async memberId => {
    try {
      await httpClient.delete(`members/${memberId}`);
      loadMemberList();
    } catch (error) {
      console.error('대시보드 멤버 삭제 실패:', error);
    }
  };

  // 초대목록 불러오기
  const loadInvitationList = async () => {
    try {
      const data = await httpClient.get(`dashboards/${dashboardId}/invitations?page=1&size=10`);
      const invitees = data.invitations.map(invitation => ({
        id: invitation.id,
        invitee: invitation.invitee,
      }));
      setInvitationList(invitees);
    } catch (error) {
      console.error('대시보드 정보를 불러오는 동안 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    loadInvitationList();
  }, []);

  // 초대하기
  const handleInvitation = async () => {
    try {
      await httpClient.post(`dashboards/${dashboardId}/invitations`, { email: email });
      loadInvitationList();
    } catch (error) {
      console.error('초대 실패:', error);
    }
  };

  // 초대 삭제
  const handleinvitationDelete = async invitationId => {
    try {
      await httpClient.delete(`dashboards/${dashboardId}/invitations/${invitationId}`);
      loadInvitationList();
    } catch (error) {
      console.error('초대 삭제 실패:', error);
    }
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
              <button className={styles.invitationBtn}>
                <Image src={addBoxIcon} alt="초대하기" />
                초대하기
              </button>
            </div>
          </div>
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
        </section>
        <div className={styles.dashboardDeleteButton}>
          <DashboardDeleteButton size={'large'} />
        </div>
      </div>
    </>
  );
};

Edit.getLayout = function getLayout(page: ReactElement) {
  return <HeaderSidebarLayout>{page}</HeaderSidebarLayout>;
};

export default Edit;
