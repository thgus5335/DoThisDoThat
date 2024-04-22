import Image from 'next/image';
import styles from './Header.module.scss';
import iconCrown from '@/src/assets/icons/crownIcon.svg';
import iconAdd from '@/src/assets/icons/addBox.svg';
import iconSetting from '@/src/assets/icons/setting.svg';

import { useRef, useState } from 'react';
import useClickOutside from '@/src/utils/useClickOutside';

const Header = () => {
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

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <p>내 대시보드</p>
        <Image src={iconCrown} alt={`대시보드.`} />
      </div>
      <div className={styles.operation}>
        <div className={styles.buttonGroup}>
          <button>
            <Image src={iconSetting} alt={`관리하기 버튼.`} />
            관리
          </button>
          <button>
            <Image src={iconAdd} alt={`초대하기 버튼.`} />
            초대하기
          </button>
        </div>
        <div className={styles.line} />
        <div className={styles.memberprofileGroup} onMouseOver={handleMemberDropdown} onMouseOut={handleMemberDropdown}>
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
        <div className={styles.myprofileGroup} onClick={handleDropdown} ref={dropdownRef}>
          <div className={styles.myProfile}>박</div>
          <p className={styles.myName}>박이름</p>
          {isDropdown && (
            <div className={styles.dropdown}>
              <div className={styles.nav}>
                <div className={styles.myNav}>내 대시보드</div>
                <div className={styles.myNav}>내 정보</div>
                <div className={styles.myNav}>로그아웃</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
