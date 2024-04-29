import Image from 'next/legacy/image';
import styles from './Header.module.scss';
import iconCrown from '@/src/assets/icons/crownIcon.svg';
import iconAdd from '@/src/assets/icons/addBox.svg';
import iconSetting from '@/src/assets/icons/setting.svg';
import iconBackward from '@/src/assets/icons/arrowLeft.svg';
import iconDropDown from '@/src/assets/icons/arrowDown.svg';

import { useEffect, useRef, useState } from 'react';
import { removeTokenFromLocalStorage } from '@/src/utils/authUtils';
import useClickOutside from '@/src/hooks/useClickOutside';
import router from 'next/router';
import DoubleButtonModal from '../../Modal/DoubleButtonModal';
import NewInviteModal from '../../Modal/ModalType/NewInviteModal/NewInviteModal';
import useModal from '@/src/hooks/useModal';
import { DashboardDetail, Members, UserInfo } from '@/src/types/dashboard';
import { headerHttp } from '@/src/apis/dashboard';

interface Props {
  title?: string;
  dashboardId?: number;
  hasBackward: boolean;
}

const Header = ({ title, dashboardId, hasBackward }: Props) => {
  const { modalState, openModal, closeModal } = useModal();
  const [isMemberDropdown, setIsMemberDropdown] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [dashboardDetail, setDashboardDetail] = useState<DashboardDetail>();
  const [memberList, setmemberList] = useState<Members[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const myProfileText = userInfo?.profileImageUrl ? '' : userInfo?.nickname.substring(0, 1);

  const loadDashboardDetail = async (dashboardId: number) => {
    const response = await headerHttp.getDashboardDetail(dashboardId);
    setDashboardDetail(response);
  };

  const loadMemberList = async (dashboardId: number) => {
    const response = await headerHttp.getMemberList(dashboardId);
    setmemberList(response.members);
  };

  const loadUserInfo = async () => {
    const response = await headerHttp.getUserInfo();
    setUserInfo(response);
  };

  useEffect(() => {
    if (dashboardId) {
      loadDashboardDetail(dashboardId);
      loadMemberList(dashboardId);
    }
    loadUserInfo();
  }, [dashboardId]);

  const isOwner = dashboardDetail?.createdByMe;
  const dashboardTitle = title ? title : dashboardDetail?.title;

  const handleDropdown = () => {
    setIsDropdown(prev => !prev);
  };

  const handleMemberDropdown = () => {
    setIsMemberDropdown(prev => !prev);
  };

  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, setIsDropdown);

  const handleLogout = () => {
    removeTokenFromLocalStorage();
    router.push('/');
  };

  return (
    <>
      {modalState && (
        <DoubleButtonModal size={'small'} isOpen={modalState} onClose={closeModal}>
          <NewInviteModal dashboardId={dashboardId} onClose={closeModal} />
        </DoubleButtonModal>
      )}
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          {hasBackward && (
            <Image width={20} height={20} src={iconBackward} onClick={() => router.back()} alt={`뒤로 가기.`} />
          )}
          <p className={styles.title}>{dashboardTitle}</p>
          {isOwner && <Image src={iconCrown} alt={`대시보드.`} />}
        </div>
        <div className={styles.operation}>
          {isOwner && (
            <div className={styles.buttonGroup}>
              <button onClick={() => router.push({ pathname: `/Dashboard/${dashboardId}/Edit` })}>
                <Image src={iconSetting} alt={`관리하기 버튼.`} />
                관리
              </button>
              <button onClick={() => openModal()}>
                <Image src={iconAdd} alt={`초대하기 버튼.`} />
                초대하기
              </button>
            </div>
          )}
          {dashboardId && (
            <>
              <div
                className={styles.memberprofileGroup}
                onMouseOver={handleMemberDropdown}
                onMouseOut={handleMemberDropdown}>
                {memberList &&
                  memberList.map(member => (
                    <div key={member.id}>
                      {member.profileImageUrl ? (
                        <Image
                          className={styles.memberProfile}
                          width={40}
                          height={40}
                          layout="intrinsic"
                          src={member.profileImageUrl}
                          alt={'프로필 이미지.'}
                        />
                      ) : (
                        <div className={styles.memberProfile} key={member.id}>
                          {member.nickname.substring(0, 1)}
                        </div>
                      )}
                    </div>
                  ))}
                <div className={styles.plusProfile}>+9</div>
                {isMemberDropdown && (
                  <div className={styles.dropdown}>
                    <div className={styles.memberList}>
                      {memberList &&
                        memberList.map(member => (
                          <div className={styles.member} key={member.id}>
                            {member.profileImageUrl ? (
                              <Image
                                className={styles.memberProfile}
                                width={40}
                                height={40}
                                layout="intrinsic"
                                src={member.profileImageUrl}
                                alt={'프로필 이미지.'}
                              />
                            ) : (
                              <div className={styles.memberProfile}>{member.nickname.substring(0, 1)}</div>
                            )}
                            <p className={styles.memberName}>{member.nickname}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.line} />
            </>
          )}
          <div className={styles.myprofileGroup} onClick={handleDropdown} ref={dropdownRef}>
            <div className={styles.myProfile}>{myProfileText}</div>
            <p className={styles.myName}>{userInfo?.nickname}</p>
            <Image width={30} height={30} src={iconDropDown} alt={`프로필 메뉴.`} />
            {isDropdown && (
              <div className={styles.dropdown}>
                <div className={styles.nav}>
                  <div className={styles.myNav} onClick={() => router.push('/Mydashboard')}>
                    내 대시보드
                  </div>
                  <div className={styles.myNav} onClick={() => router.push('/Mypage')}>
                    내 정보
                  </div>
                  <div className={styles.myNav} onClick={() => handleLogout()}>
                    로그아웃
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
