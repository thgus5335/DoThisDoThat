import MainHeader from '../components/common/Header/MainHeader';
import styles from './index.module.scss';

export default function Home() {
  return (
    <>
      <MainHeader />
      <p className={styles.test}>main</p>
    </>
  );
}
