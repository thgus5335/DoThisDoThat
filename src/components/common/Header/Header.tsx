import Image from 'next/image';
import styles from './Header.module.scss';
import iconCrown from '@/src/assets/icons/crownIcon.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <p>내 대시보드</p>
        <Image src={iconCrown} alt="내가 만든 대시보드." />
      </div>
      <div className={styles.operation}>
        <div className={styles.button}>
          <p>관리_버튼</p>
          <p>초대하기_버튼</p>
        </div>
        <div className={styles.line} />
        <div className={styles.memberprofileGroup}>
          <div className={styles.memberProfile}>P</div>
          <div className={styles.memberProfile}>S</div>
          <div className={styles.memberProfile}>H</div>
          <div className={styles.plusProfile}>+9</div>
        </div>
        <div className={styles.myprofileGroup}>
          <div className={styles.myProfile}>박</div>
          <p className={styles.myName}>박이름</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
