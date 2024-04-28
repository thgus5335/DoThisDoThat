import Image from 'next/image';
import Link from 'next/link';
import styles from './MainHeader.module.scss';
import headerIcon from '@/public/Logo.png';
import headerTitle from '@/public/Title.png';

const MainHeader = () => {
  return (
    <>
      <header className={styles.mainHeader}>
        <Link href={'/'} className={styles.headerLogo}>
          <Image src={headerIcon} alt="logo image" width={50} height={40} layout="intrinsic" />
          <Image
            className={styles.headerTitle}
            src={headerTitle}
            alt="logo title"
            width={120}
            height={40}
            layout="intrinsic"
          />
        </Link>
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
