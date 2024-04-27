import Header from '@/src/components/common/Header/Header';
import Sidebar from '@/src/components/common/Sidebar/Sidebar';
import styles from './HeaderSidebarLayout.module.scss';

interface Props {
  type: 'simple' | 'complex';
  title?: string;
  hasBackward?: boolean;
  // isOwner?: boolean;
  // hasMember?: boolean;
  children: React.ReactNode;
}

const HeaderSidebarLayout = ({ type, title, hasBackward = true, children }: Props) => {
  return (
    <div className={styles.headerSidebarLayout}>
      <Header type={type} title={title} hasBackward={hasBackward} />
      <Sidebar />
      {children}
    </div>
  );
};

export default HeaderSidebarLayout;
