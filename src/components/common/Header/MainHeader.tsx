import Image from 'next/image';
import Link from 'next/link';
import headerIcon from '@/src/assets/icons/headerLogo.svg';
import headerTitle from '@/src/assets/icons/headerTitle.svg';
import styles from './MainHeader.module.scss';

const MainHeader = () => {
  return (
    <>
      <header className={styles.mainHeader}>
        <div className={styles.headerLogo}>
          <Image src={headerIcon} alt="logo image" />
          <Image src={headerTitle} alt="logo title" />
        </div>
        <div className={styles.linkBox}>
          <Link href={'/Login'} className={styles.signLink}>
            로그인
          </Link>
          <Link href={'/SignUp'} className={styles.signLink}>
            회원가입
          </Link>
        </div>
      </header>
    </>
  );
};

export default MainHeader;
