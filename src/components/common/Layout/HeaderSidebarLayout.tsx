import Header from '@/src/components/common/Header/Header';
import Sidebar from '@/src/components/common/Sidebar/Sidebar';
import styles from './HeaderSidebarLayout.module.scss';

interface Props {
  dashboardId?: number;
  title?: string;
  hasBackward?: boolean;
  children: React.ReactNode;
}

const HeaderSidebarLayout = ({ dashboardId, title, hasBackward = true, children }: Props) => {
  return (
    <div className={styles.headerSidebarLayout}>
      <Sidebar />
      <div className={styles.headerContentLayout}>
        <Header title={title} dashboardId={dashboardId} hasBackward={hasBackward} />
        {children}
      </div>
    </div>
  );
};

export default HeaderSidebarLayout;
