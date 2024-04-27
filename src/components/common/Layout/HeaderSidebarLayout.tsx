import Header from '@/src/components/common/Header/Header';
import Sidebar from '@/src/components/common/Sidebar/Sidebar';
import styles from './HeaderSidebarLayout.module.scss';

const HeaderSidebarLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className={styles.headerSidebarLayout}>
      <Header />
      <Sidebar />
      {props.children}
    </div>
  );
};

export default HeaderSidebarLayout;
