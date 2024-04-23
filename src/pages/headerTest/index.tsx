import Header from '@/src/components/common/Header/Header';
import Sidebar from '@/src/components/common/Sidebar/Sidebar';
import Mydashboard from '../Mydashboard';
import styles from './headerTest.module.scss';

const test = () => {
  return (
    <main className={styles.test}>
      <Header />
      <Sidebar />
      <Mydashboard />
    </main>
  );
};

export default test;
