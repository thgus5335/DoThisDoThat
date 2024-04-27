import Image from 'next/image';
import styles from './Header.module.scss';
import iconCrown from '@/src/assets/icons/crownIcon.svg';
import iconAdd from '@/src/assets/icons/addBox.svg';
import iconSetting from '@/src/assets/icons/setting.svg';
import iconBackward from '@/src/assets/icons/arrowLeft.svg';
import iconDropDown from '@/src/assets/icons/arrowDown.svg';

import { useRef, useState } from 'react';
import { removeTokenFromLocalStorage } from '@/src/utils/authUtils';
import useClickOutside from '@/src/hooks/useClickOutside';
import router from 'next/router';
import DoubleButtonModal from '../../Modal/DoubleButtonModal';
import NewInviteModal from '../../Modal/ModalType/NewInviteModal/NewInviteModal';
import useModal from '@/src/hooks/useModal';

interface Props {
  type: 'simple' | 'complex';
  title?: string;
  hasBackward: boolean;
  isOwner?: boolean;
}

const Header = ({ type, isOwner = true, title, hasBackward }: Props) => {
  const { modalState, openModal, closeModal } = useModal();
  const [isMemberDropdown, setIsMemberDropdown] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);

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
          {/* props : dashboardId 보내주기! */}
          <NewInviteModal />
        </DoubleButtonModal>
      )}
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          {hasBackward && (
            <Image width={20} height={20} src={iconBackward} onClick={() => router.back()} alt={`뒤로 가기.`} />
          )}
          <p className={styles.title}>{title}</p>
          {isOwner && <Image src={iconCrown} alt={`대시보드.`} />}
        </div>
        <div className={styles.operation}>
          {isOwner && (
            <div className={styles.buttonGroup}>
              <button>
                <Image
                  src={iconSetting}
                  onClick={() => router.push({ pathname: `/dashboard/${5911}/edit`, query: { dashboardId: 5911 } })}
                  alt={`관리하기 버튼.`}
                />
                관리
              </button>
              <button>
                <Image src={iconAdd} onClick={() => openModal()} alt={`초대하기 버튼.`} />
                초대하기
              </button>
            </div>
          )}
          {type === 'complex' && (
            <>
              <div
                className={styles.memberprofileGroup}
                onMouseOver={handleMemberDropdown}
                onMouseOut={handleMemberDropdown}>
                <div className={styles.memberProfile}>P</div>
                <div className={styles.memberProfile}>S</div>
                <div className={styles.memberProfile}>H</div>
                <div className={styles.plusProfile}>+9</div>
                {isMemberDropdown && (
                  <div className={styles.dropdown}>
                    {/* map 돌릴 예정 o.< */}
                    <div className={styles.memberList}>
                      <div className={styles.member}>
                        <div className={styles.memberProfile}>P</div>
                        <p className={styles.memberName}>PPPP</p>
                      </div>
                      <div className={styles.member}>
                        <div className={styles.memberProfile}>S</div>
                        <p className={styles.memberName}>SSSS</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.line} />
            </>
          )}
          <div className={styles.myprofileGroup} onClick={handleDropdown} ref={dropdownRef}>
            <div className={styles.myProfile}>박</div>
            <p className={styles.myName}>박이름</p>
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
