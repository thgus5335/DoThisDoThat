import DashboardDeleteButton from '@/src/components/common/Button/DashboardDeleteButton';
import { NextPageWithLayout } from '../_app';
import { ReactElement, lazy, useState } from 'react';
import HeaderSidebarLayout from '@/src/components/common/Layout/HeaderSidebarLayout';
import styles from './Editpage.module.scss';
import Image from 'next/image';
import backIcon from '@/src/assets/icons/leftArrowIcon.svg';
import { useRouter } from 'next/router';
import TaskButton from '@/src/components/common/Button/TaskButton';
import PagenationButton from '@/src/components/common/Button/PagenationButton';
import crownIcon from '@/src/assets/icons/crownIcon.svg';
import addBoxIcon from '@/src/assets/icons/addBoxWhite.svg';
import checkIcon from '@/src/assets/icons/checkIcon.svg';

const DASHBOARD_COLOR_LIST = ['#7AC555', '#760DDE', '#FFA500', '#76A5EA', '#E876EA'];

const memberTest = {
  members: [
    {
      id: 8063,
      email: 'testtest@test.com',
      nickname: '되냐',
      profileImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/1-7_1652_1714039866686.jpeg',
      createdAt: '2024-04-16T15:19:35.854Z',
      updatedAt: '2024-04-26T02:55:52.090Z',
      isOwner: true,
      userId: 1652,
    },
    {
      id: 8073,
      email: 'linason7889@gmail.com',
      nickname: '승이버섯',
      profileImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/1-7_1657_1713444915949.jpeg',
      createdAt: '2024-04-16T16:13:21.653Z',
      updatedAt: '2024-04-18T21:55:16.117Z',
      isOwner: false,
      userId: 1657,
    },
    {
      id: 8071,
      email: 'test123@codeit123.com',
      nickname: '🥲이상한 부분 발견',
      profileImageUrl: null,
      createdAt: '2024-04-16T15:19:35.258Z',
      updatedAt: '2024-04-25T11:11:15.091Z',
      isOwner: false,
      userId: 1651,
    },
  ],
  totalCount: 3,
};

const invitationTest = {
  invitations: [
    {
      id: 7930,
      inviter: {
        id: 1652,
        email: 'testtest@test.com',
        nickname: '되냐',
      },
      teamId: '1-7',
      dashboard: {
        id: 5910,
        title: '달고나달고나',
      },
      invitee: {
        id: 3233,
        email: '1234@test.com',
        nickname: '테스트중이다',
      },
      inviteAccepted: null,
      createdAt: '2024-04-26T14:18:52.994Z',
      updatedAt: '2024-04-26T14:18:52.994Z',
    },
    {
      id: 7920,
      inviter: {
        id: 1652,
        email: 'testtest@test.com',
        nickname: '되냐',
      },
      teamId: '1-7',
      dashboard: {
        id: 5910,
        title: '달고나달고나',
      },
      invitee: {
        id: 1728,
        email: '123@naver.com',
        nickname: 'ㅎㅎ',
      },
      inviteAccepted: null,
      createdAt: '2024-04-26T14:06:00.576Z',
      updatedAt: '2024-04-26T14:06:00.576Z',
    },
  ],
  totalCount: 2,
};

const Editpage: NextPageWithLayout = () => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const invitees = invitationTest.invitations.map(invitation => invitation.invitee);

  console.log(invitees);
  return (
    <div className={styles.editpageLayout}>
      <button className={styles.backBtn} onClick={() => router.back()}>
        <Image src={backIcon} alt="돌아가기" />
        <p>돌아가기</p>
      </button>
      <section className={styles.editpageSection}>
        <div className={styles.dashboardNameAndColor}>
          <h3 className={styles.dashboardName}>대시보드</h3>
          <div className={styles.colorBox}>
            {DASHBOARD_COLOR_LIST.map(color => (
              <div className={styles.colorSelectContainer}>
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
                <Image className={styles.checkIcon} src={checkIcon} alt="선택된 대시보드 색상" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.nameChangeInputBox}>
          <label className={styles.inputLabel}>대시보드 이름</label>
          <input className={styles.dashboardNameInput} />
        </div>
        <div className={styles.taskBtn}>
          <TaskButton size={'large'} color={'violet'}>
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
          {memberTest.members.map(member => (
            <div className={styles.memberInfo}>
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
                  <TaskButton size={'large'} color={'white'}>
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
          {invitees.map(invitee => (
            <div className={styles.memberInfo}>
              <p className={styles.nickname}>{invitee.email}</p>
              <TaskButton color={'white'} size={'large'}>
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
  );
};

Editpage.getLayout = function getLayout(page: ReactElement) {
  return <HeaderSidebarLayout>{page}</HeaderSidebarLayout>;
};

export default Editpage;
