import Image from 'next/legacy/image';
import router from 'next/router';
import styles from './HeaderMyProfile.module.scss';
import { removeTokenFromLocalStorage } from '@/src/utils/authUtils';
import iconDropDown from '@/src/assets/icons/arrowDown.svg';
import { headerHttp } from '@/src/apis/dashboard';
import { useEffect, useRef, useState } from 'react';
import { UserInfo } from '@/src/types/dashboard';
import useClickOutside from '@/src/hooks/useClickOutside';

const HeaderMyProfile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isDropdown, setIsDropdown] = useState(false);
  const myProfileText = userInfo?.profileImageUrl ? '' : userInfo?.nickname.substring(0, 1);

  const loadUserInfo = async () => {
    const response = await headerHttp.getUserInfo();
    setUserInfo(response);
  };

  const handleLogout = () => {
    removeTokenFromLocalStorage();
    router.push('/');
  };

  const handleDropdown = () => {
    setIsDropdown(prev => !prev);
  };

  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, setIsDropdown);

  useEffect(() => {
    loadUserInfo();
  }, []);

  return (
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
  );
};
export default HeaderMyProfile;
